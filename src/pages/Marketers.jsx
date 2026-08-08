import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { formatCurrency, formatNumber } from '../lib/utils.js'
import { api } from '../lib/api.js'
import CopyModal from '../components/CopyModal.jsx'
import { 
  Search, Star, CheckCircle2, TrendingUp, Users, DollarSign,
  SlidersHorizontal, ArrowUpRight, ChevronDown, X, BadgeCheck
} from 'lucide-react'

const SORT_OPTIONS = [
  { value: 'revenue',   label: 'Revenue',        icon: DollarSign },
  { value: 'return',    label: 'Monthly Return',  icon: TrendingUp },
  { value: 'rating',    label: 'Rating',          icon: Star },
  { value: 'followers', label: 'Audience',        icon: Users },
]

function PartnerCard({ m, isMirrored, onCopy }) {
  const revenue = m.revenue >= 1_000_000
    ? `$${(m.revenue / 1_000_000).toFixed(1)}M`
    : `$${(m.revenue / 1_000).toFixed(0)}K`

  return (
    <div className="rounded-xl overflow-hidden shadow-sm hover:-translate-y-1 transition-all duration-300 flex flex-col group bg-white border border-slate-200 hover:border-[#005645]/30 hover:shadow-xl dark:bg-white/[0.02] dark:border-white/10 dark:hover:border-emerald-500/50 dark:hover:bg-white/5 dark:hover:shadow-2xl dark:hover:shadow-emerald-500/10 p-6 items-center text-center relative">
      
      <div className="relative mb-4">
        <img
          src={m.avatar} alt={m.name}
          className="w-20 h-20 rounded-[20px] object-cover shadow-md border-2 border-transparent group-hover:border-[#C3F53C] transition-all duration-300"
          onError={e => { e.target.style.display = 'none' }}
        />
      </div>

      <div className="flex items-center gap-1.5 justify-center w-full">
        <h3 className="font-bold text-slate-900 dark:text-white text-lg leading-tight truncate">{m.name}</h3>
        {m.verified && <BadgeCheck className="w-4 h-4 text-blue-500 flex-shrink-0" />}
      </div>
      <p className="text-xs text-slate-500 dark:text-white/50 font-semibold mt-1 mb-4">{m.niche}</p>

      <div className="w-full grid grid-cols-3 gap-2 bg-slate-50 dark:bg-white/5 rounded-xl p-3 mb-5 border border-slate-100 dark:border-white/5">
        <div className="text-center">
          <p className="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase">Revenue</p>
          <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">{revenue}</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase">Monthly</p>
          <p className="text-xs font-bold text-[#005645] mt-0.5">+{m.monthlyReturn}%</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase">Rating</p>
          <div className="flex items-center justify-center gap-1 mt-0.5">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <p className="text-xs font-bold text-slate-900 dark:text-white">{m.rating}</p>
          </div>
        </div>
      </div>

      <div className="mt-auto w-full flex items-center justify-between gap-3">
        <Link
          to={`/marketer/${m.id}`}
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-sm font-bold text-slate-700 dark:text-white/80 hover:border-[#005645] hover:text-[#005645] transition-colors bg-white dark:bg-[#1A1D21]"
        >
          View
        </Link>
        <button
          onClick={() => onCopy(m)}
          disabled={isMirrored}
          className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm ${
            isMirrored
              ? 'bg-emerald-50 text-[#005645] border border-emerald-200 cursor-default'
              : 'bg-[#005645] text-[#C3F53C] hover:bg-[#004235] active:scale-95'
          }`}
        >
          {isMirrored ? '✓ Copied' : 'Copy'}
        </button>
      </div>
    </div>
  )
}

export default function Marketers() {
  const { user } = useAuth()
  const [marketers, setMarketers] = useState([])
  const [loading, setLoading]     = useState(true)
  const [search, setSearch]       = useState('')
  const [nicheFilter, setNicheFilter] = useState('All')
  const [sortBy, setSortBy]       = useState('revenue')
  const [targetMarketer, setTargetMarketer] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    api.marketers.list()
      .then(data => { setMarketers(data.marketers); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const niches = useMemo(() => ['All', ...new Set(marketers.map(m => m.niche))], [marketers])

  const filtered = useMemo(() => {
    let res = [...marketers]
    if (search) {
      const q = search.toLowerCase()
      res = res.filter(m => m.name.toLowerCase().includes(q) || m.niche.toLowerCase().includes(q))
    }
    if (nicheFilter !== 'All') res = res.filter(m => m.niche === nicheFilter)
    res.sort((a, b) => {
      if (sortBy === 'revenue')   return b.revenue - a.revenue
      if (sortBy === 'rating')    return b.rating - a.rating
      if (sortBy === 'return')    return b.monthlyReturn - a.monthlyReturn
      if (sortBy === 'followers') {
        const parseFollowers = (val) => {
          if (typeof val === 'string') return parseFloat(val.replace(/[^0-9.]/g, '')) * (val.toLowerCase().includes('k') ? 1000 : val.toLowerCase().includes('m') ? 1000000 : 1)
          return val
        }
        return parseFollowers(b.followers) - parseFollowers(a.followers)
      }
      return 0
    })
    return res
  }, [marketers, search, nicheFilter, sortBy])

  const isMirrored = id => user?.mirroredAffiliates?.includes(id)

  return (
    <div className="animate-fade-in pb-24 font-sans space-y-6">

      {/* Header */}
      <div className="bg-[#005645] rounded-xl p-6 relative overflow-hidden flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-xl">

        <div className="relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C3F53C] text-[#005645] text-xs font-bold mb-3 shadow-sm">
            DIRECTORY
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Affiliate Partner Directory</h1>
          <p className="text-emerald-100/80 font-medium mt-2">{marketers.length} verified affiliate earners</p>
        </div>
        <Link to="/dashboard" className="btn-lime text-sm shadow-lg relative z-10 whitespace-nowrap">
          Go to Dashboard
        </Link>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white dark:bg-[#1A1D21] border border-slate-200/80 rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-white/40" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or niche..."
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#005645] focus:ring-2 focus:ring-[#005645]/10 transition-all text-sm font-medium"
            />
          </div>
          <div className="relative">
            <select
              value={nicheFilter}
              onChange={e => setNicheFilter(e.target.value)}
              className="appearance-none pl-4 pr-10 py-3.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-[#005645] text-sm font-bold cursor-pointer"
            >
              {niches.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-white/40 pointer-events-none" />
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs font-bold text-slate-400 dark:text-white/40 uppercase tracking-wider flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Sort:
          </span>
          {SORT_OPTIONS.map(s => (
            <button
              key={s.value}
              onClick={() => setSortBy(s.value)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                sortBy === s.value
                  ? 'bg-[#C3F53C] text-[#005645] shadow-sm'
                  : 'bg-slate-100 text-slate-500 dark:bg-white/5 dark:text-white/50 hover:bg-slate-200 dark:hover:bg-white/10'
              }`}
            >
              <s.icon className="w-3.5 h-3.5" />{s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <p className="text-sm font-semibold text-slate-500 dark:text-white/50 px-1">
        Showing <span className="font-bold text-slate-800 dark:text-white/90">{filtered.length}</span> partners
        {search && <span> for "<span className="text-[#005645]">{search}</span>"</span>}
      </p>

      {/* Partner Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-[#1A1D21] border border-slate-200 dark:border-white/10 rounded-xl p-6 animate-pulse space-y-4">
              <div className="flex gap-4">
                <div className="w-14 h-14 bg-slate-100 rounded-[18px]" />
                <div className="flex-1 space-y-2 pt-1">
                  <div className="h-4 bg-slate-100 rounded-lg w-3/4" />
                  <div className="h-3 bg-slate-100 rounded-lg w-1/2" />
                </div>
              </div>
              <div className="h-16 bg-slate-50 dark:bg-white/5 rounded-xl" />
              <div className="h-10 bg-slate-50 dark:bg-white/5 rounded-xl" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(m => (
            <PartnerCard
              key={m.id}
              m={m}
              isMirrored={isMirrored(m.id)}
              onCopy={m => { setTargetMarketer(m); setModalOpen(true) }}
            />
          ))}
        </div>
      )}

      {modalOpen && targetMarketer && (
        <CopyModal
          marketer={targetMarketer}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  )
}
