import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { getAllAffiliates } from '../data/affiliates.js'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { formatCurrency, formatNumber } from '../lib/utils.js'
import { Search, Star, CheckCircle, ArrowRight, TrendingUp } from 'lucide-react'

export default function Affiliates() {
  const [search, setSearch] = useState('')
  const [nicheFilter, setNicheFilter] = useState('All')
  const [sortBy, setSortBy] = useState('revenue')
  const { user, copyAffiliate } = useAuth()
  const { addToast } = useToast()

  const allAffiliates = getAllAffiliates()
  const niches = ['All', ...new Set(allAffiliates.map(a => a.niche))]

  const filtered = useMemo(() => {
    let result = [...allAffiliates]
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(a => a.name.toLowerCase().includes(q) || a.niche.toLowerCase().includes(q))
    }
    if (nicheFilter !== 'All') result = result.filter(a => a.niche === nicheFilter)
    result.sort((a, b) => {
      if (sortBy === 'revenue') return b.revenue - a.revenue
      if (sortBy === 'rating') return b.rating - a.rating
      if (sortBy === 'followers') return b.followers - a.followers
      if (sortBy === 'return') return b.monthlyReturn - a.monthlyReturn
      return 0
    })
    return result
  }, [allAffiliates, search, nicheFilter, sortBy])

  const handleCopy = (aff) => {
    if (!user) { addToast('Please sign in to copy traders', 'warning'); return }
    const result = copyAffiliate(aff.id, aff.minDeposit)
    if (result.success) addToast(`Now copying ${aff.name}`, 'success')
    else addToast(result.error, 'error')
  }

  const isCopied = (affId) => user?.copiedAffiliates?.includes(affId)

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white">Affiliate Directory</h1>
        <p className="text-slate-400 mt-1">{allAffiliates.length} professional traders available to copy</p>
      </div>

      <div className="glass-card p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or niche..." className="input-field pl-10" />
          </div>
          <select value={nicheFilter} onChange={(e) => setNicheFilter(e.target.value)} className="input-field sm:w-48">
            {niches.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="input-field sm:w-40">
            <option value="revenue">Revenue</option>
            <option value="rating">Rating</option>
            <option value="followers">Followers</option>
            <option value="return">Monthly Return</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(aff => (
          <div key={aff.id} className="glass-card-hover p-5 group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl ${aff.avatarColor} flex items-center justify-center text-white font-bold text-lg`}>
                  {aff.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-white">{aff.name}</span>
                    {aff.verified && <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />}
                    {aff.premium && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
                  </div>
                  <p className="text-xs text-slate-400">{aff.niche}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span className="text-sm font-medium">{aff.rating}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center p-2 bg-white/5 rounded-lg">
                <p className="text-sm font-bold text-white">{formatCurrency(aff.revenue)}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wide">Revenue</p>
              </div>
              <div className="text-center p-2 bg-white/5 rounded-lg">
                <p className="text-sm font-bold text-emerald-400">+{aff.monthlyReturn}%</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wide">Monthly</p>
              </div>
              <div className="text-center p-2 bg-white/5 rounded-lg">
                <p className="text-sm font-bold text-white">{formatNumber(aff.followers)}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wide">Followers</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-xs text-slate-400">
                Min: <span className="text-white font-medium">{formatCurrency(aff.minDeposit)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Link to={`/affiliate/${aff.id}`} className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  View
                </Link>
                {isCopied(aff.id) ? (
                  <span className="px-3 py-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 rounded-lg flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Copied
                  </span>
                ) : (
                  <button onClick={() => handleCopy(aff)} className="btn-primary text-xs px-3 py-1.5">
                    Copy
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
