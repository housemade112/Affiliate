import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { formatCurrency, formatNumber } from '../lib/utils.js'
import { api } from '../lib/api.js'
import MirrorModal from '../components/MirrorModal.jsx'
import { 
  Search, Star, CheckCircle2, TrendingUp, Users, DollarSign,
  SlidersHorizontal, ArrowUpRight, ChevronDown, X
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
    <div className="bg-white border border-slate-200/80 rounded-[24px] overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col group">
      {/* Card Header */}
      <div className="p-6 flex items-start justify-between border-b border-slate-100">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={m.avatar} alt={m.name}
              className="w-14 h-14 rounded-[18px] object-cover border border-slate-200 shadow-sm group-hover:border-[#005645] transition-colors"
              onError={e => { e.target.style.display = 'none' }}
            />
            <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
              <CheckCircle2 className="w-2.5 h-2.5 text-white" />
            </span>
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-base leading-tight">{m.name}</h3>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">{m.niche}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 group/chart cursor-help relative ml-auto h-8 items-end">
          {/* Mini Sparkline Chart (6 months) */}
          {[40, 65, 30, 80, 50, 95].map((pct, i) => (
            <div key={i} className="w-1.5 rounded-t-sm bg-[#C3F53C] hover:bg-[#005645] transition-colors" style={{ height: `${pct}%` }} />
          ))}
          
          {/* Tooltip on hover */}
          <div className="absolute -top-10 right-0 opacity-0 group-hover/chart:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] py-1.5 px-2.5 rounded-lg font-bold whitespace-nowrap z-10 shadow-xl pointer-events-none">
            <span className="text-slate-400">Avg Monthly Profit:</span> ${(m.revenue / 12).toLocaleString(undefined, {maximumFractionDigits:0})}
            {/* Arrow down to point to bars */}
            <div className="absolute -bottom-1 right-3 border-4 border-transparent border-t-slate-900" />
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100">
        <div className="p-4 text-center">
          <p className="text-sm font-extrabold text-slate-900">{revenue}</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Revenue</p>
        </div>
        <div className="p-4 text-center">
          <p className="text-sm font-extrabold text-[#005645]">+{m.monthlyReturn}%</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Monthly</p>
        </div>
        <div className="p-4 text-center">
          <p className="text-sm font-extrabold text-slate-900">{m.followers}</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Followers</p>
        </div>
      </div>

      {/* Footer */}
      <div className="p-5 flex items-center justify-between mt-auto">
        <div>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Min Deposit</p>
          <p className="text-base font-extrabold text-slate-900 mt-0.5">{formatCurrency(m.minDeposit)}</p>
        </div>
        <div className="flex gap-2">
          <Link
            to={`/marketer/${m.id}`}
            className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:border-[#005645] hover:text-[#005645] transition-colors bg-white"
          >
            View
          </Link>
          <button
            onClick={() => onCopy(m)}
            disabled={isMirrored}
            className={`px-4 py-2 rounded-xl text-sm font-extrabold transition-all shadow-sm ${
              isMirrored
                ? 'bg-emerald-50 text-[#005645] border border-emerald-200 cursor-default'
                : 'bg-[#005645] text-[#C3F53C] hover:bg-[#004235] active:scale-95'
            }`}
          >
            {isMirrored ? '✓ Copied' : 'Copy'}
          </button>
        </div>
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
      return 0
    })
    return res
  }, [marketers, search, nicheFilter, sortBy])

  const isMirrored = id => user?.mirroredAffiliates?.includes(id)

  return (
    <div className="animate-fade-in pb-24 font-sans space-y-6">

      {/* Header */}
      <div className="bg-[#005645] rounded-[28px] p-8 sm:p-10 relative overflow-hidden flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-xl">
        <div className="absolute right-0 top-0 w-64 h-64 bg-[#C3F53C]/10 rounded-full blur-[60px] pointer-events-none" />
        <div className="relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C3F53C] text-[#005645] text-xs font-extrabold mb-3 shadow-sm">
            DIRECTORY
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Affiliate Partner Directory</h1>
          <p className="text-emerald-100/80 font-medium mt-2">{marketers.length} verified affiliate earners</p>
        </div>
        <Link to="/dashboard" className="btn-lime text-sm shadow-lg relative z-10 whitespace-nowrap">
          Go to Dashboard
        </Link>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white border border-slate-200/80 rounded-[24px] p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or niche..."
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#005645] focus:ring-2 focus:ring-[#005645]/10 transition-all text-sm font-medium"
            />
          </div>
          <div className="relative">
            <select
              value={nicheFilter}
              onChange={e => setNicheFilter(e.target.value)}
              className="appearance-none pl-4 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:outline-none focus:border-[#005645] text-sm font-bold cursor-pointer"
            >
              {niches.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Sort:
          </span>
          {SORT_OPTIONS.map(s => (
            <button
              key={s.value}
              onClick={() => setSortBy(s.value)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                sortBy === s.value
                  ? 'bg-[#C3F53C] text-[#005645] shadow-sm'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              <s.icon className="w-3.5 h-3.5" />{s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <p className="text-sm font-semibold text-slate-500 px-1">
        Showing <span className="font-extrabold text-slate-800">{filtered.length}</span> partners
        {search && <span> for "<span className="text-[#005645]">{search}</span>"</span>}
      </p>

      {/* Partner Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-[24px] p-6 animate-pulse space-y-4">
              <div className="flex gap-4">
                <div className="w-14 h-14 bg-slate-100 rounded-[18px]" />
                <div className="flex-1 space-y-2 pt-1">
                  <div className="h-4 bg-slate-100 rounded-lg w-3/4" />
                  <div className="h-3 bg-slate-100 rounded-lg w-1/2" />
                </div>
              </div>
              <div className="h-16 bg-slate-50 rounded-xl" />
              <div className="h-10 bg-slate-50 rounded-xl" />
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
        <MirrorModal
          marketer={targetMarketer}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  )
}
