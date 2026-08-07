import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../lib/api.js'
import { formatCurrency } from '../lib/utils.js'
import { Star, CheckCircle2, Award, TrendingUp, Users, ArrowUpRight, ArrowRight, BadgeCheck } from 'lucide-react'

export default function Leaderboard() {
  const [marketers, setMarketers] = useState([])
  const [loading, setLoading]     = useState(true)

  useEffect(() => {
    api.marketers.list()
      .then(d => {
        const sorted = [...d.marketers].sort((a, b) => b.revenue - a.revenue)
        setMarketers(sorted)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const top3 = marketers.slice(0, 3)
  const rest  = marketers.slice(3, 20)

  const podiumStyles = [
    { rank: 1, border: 'border-amber-300',   bg: 'bg-amber-50 dark:bg-amber-500/10',   badge: 'bg-amber-400',   text: 'text-amber-600',   icon: '🥇' },
    { rank: 2, border: 'border-slate-300',   bg: 'bg-slate-50 dark:bg-white/5',   badge: 'bg-slate-400',   text: 'text-slate-500 dark:text-white/50',   icon: '🥈' },
    { rank: 3, border: 'border-orange-300',  bg: 'bg-orange-50 dark:bg-orange-500/10',  badge: 'bg-orange-400',  text: 'text-orange-600',  icon: '🥉' },
  ]

  return (
    <div className="animate-fade-in pb-24 font-sans space-y-8">

      {/* Header */}
      <div className="bg-[#005645] rounded-xl p-6 relative overflow-hidden shadow-xl">

        <div className="relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C3F53C] text-[#005645] text-xs font-bold mb-3 shadow-sm">
            <Award className="w-3.5 h-3.5" /> LEADERBOARD
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Top Performing Partners</h1>
          <p className="text-emerald-100/80 font-medium mt-2">Ranked by 30-day verified performance revenue</p>
        </div>
      </div>

      {/* Podium Top 3 */}
      {loading ? (
        <div className="grid md:grid-cols-3 gap-6">
          {[1,2,3].map(i => (
            <div key={i} className="bg-white dark:bg-[#1A1D21] border border-slate-200 dark:border-white/10 rounded-xl p-6 animate-pulse space-y-4">
              <div className="w-20 h-20 bg-slate-100 rounded-lg mx-auto" />
              <div className="h-4 bg-slate-100 rounded w-2/3 mx-auto" />
              <div className="h-16 bg-slate-50 dark:bg-white/5 rounded-lg" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {top3.map((m, i) => {
            const s = podiumStyles[i]
            return (
              <Link to={`/marketer/${m.id}`} key={m.id}
                className={`bg-white rounded-xl p-6 border-2 ${s.border} hover:border-[#005645]/30 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col items-center gap-5 text-center relative overflow-hidden group dark:bg-white/[0.02] dark:border-white/10 dark:hover:border-emerald-500/50 dark:hover:bg-white/5 dark:hover:shadow-2xl dark:hover:shadow-emerald-500/10`}>
                {/* Rank Medal */}
                <div className="absolute top-4 right-4 text-2xl">{s.icon}</div>
                
                {/* Avatar */}
                <div className="relative mt-2">
                  <img src={m.avatar} alt={m.name}
                    className="w-20 h-20 rounded-lg object-cover shadow-md border-2 border-transparent group-hover:border-[#C3F53C] transition-all duration-300"
                    onError={e => { e.target.style.display = 'none' }} />
                  <span className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-xl ${s.badge} text-white text-xs font-black flex items-center justify-center shadow-md`}>
                    #{i+1}
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <h3 className="font-bold text-slate-900 dark:text-white text-lg">{m.name}</h3>
                    {m.verified && <BadgeCheck className="w-4 h-4 text-blue-500" />}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-white/50 font-semibold">{m.niche}</p>
                </div>

                {/* Revenue Block */}
                <div className={`w-full p-5 ${s.bg} border border-slate-100 dark:border-white/5 rounded-[18px]`}>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(m.revenue)}</p>
                  <p className="text-xs text-slate-400 dark:text-white/40 font-bold uppercase tracking-wider mt-1">Lifetime Revenue</p>
                </div>

                <div className="grid grid-cols-3 gap-2 w-full border-t border-slate-100 dark:border-white/5 pt-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-0.5 text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      <span className="text-sm font-bold">{m.rating}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 dark:text-white/40 font-bold uppercase mt-0.5">Rating</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-[#005645]">+{m.monthlyReturn}%</p>
                    <p className="text-[10px] text-slate-400 dark:text-white/40 font-bold uppercase mt-0.5">Monthly</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{m.followers}</p>
                    <p className="text-[10px] text-slate-400 dark:text-white/40 font-bold uppercase mt-0.5">Audience</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}

      {/* Ranked Table #4–20 */}
      {!loading && rest.length > 0 && (
        <div className="bg-white dark:bg-[#1A1D21] border border-slate-200/80 rounded-xl shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Full Rankings</h2>
            <span className="text-xs font-bold text-slate-400 dark:text-white/40 bg-slate-100 px-3 py-1.5 rounded-xl">{rest.length + 3} Partners</span>
          </div>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm whitespace-nowrap">
              <thead className="bg-slate-50 dark:bg-white/5 border-b border-slate-100 dark:border-white/5 text-slate-400 dark:text-white/40 text-xs font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-8 py-4 text-left">Rank</th>
                  <th className="px-6 py-4 text-left">Partner</th>
                  <th className="px-6 py-4 text-left">Revenue</th>
                  <th className="px-6 py-4 text-left">Monthly Profit</th>
                  <th className="px-6 py-4 text-left">Rating</th>
                  <th className="px-6 py-4 text-right">View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                {rest.map((m, i) => (
                  <tr key={m.id} className="hover:bg-slate-50/80 dark:hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-5">
                      <span className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-white/10 flex items-center justify-center text-sm font-extrabold text-slate-600 dark:text-white">
                        #{i + 4}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <img src={m.avatar} alt={m.name}
                          className="w-11 h-11 rounded-lg object-cover border border-slate-200 dark:border-white/10 shadow-sm group-hover:border-[#005645] transition-colors"
                          onError={e => { e.target.style.display = 'none' }} />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="font-bold text-slate-900 dark:text-white">{m.name}</p>
                            {m.verified && <BadgeCheck className="w-4 h-4 text-blue-500" />}
                          </div>
                          <p className="text-xs text-slate-400 dark:text-white/40 font-semibold">{m.niche}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 font-bold text-slate-900 dark:text-white">{formatCurrency(m.revenue)}</td>
                    <td className="px-6 py-5">
                      <span className="inline-flex items-center gap-1 text-[#005645] font-bold bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100 text-xs">
                        <ArrowUpRight className="w-3 h-3" />+{m.monthlyReturn}%
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span className="font-bold text-slate-900 dark:text-white">{m.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <Link to={`/marketer/${m.id}`}
                        className="inline-flex items-center gap-1 px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-700 dark:text-white/80 hover:border-[#005645] hover:text-[#005645] transition-colors">
                        View <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card List */}
          <div className="md:hidden flex flex-col divide-y divide-slate-100 dark:divide-white/5">
            {rest.map((m, i) => (
              <div key={m.id} className="p-4 sm:p-5 flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img src={m.avatar} alt={m.name} className="w-12 h-12 rounded-lg object-cover border border-slate-200 dark:border-white/10 shadow-sm" />
                      <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-lg bg-slate-100 dark:bg-[#1A1D21] border-2 border-white dark:border-white/10 flex items-center justify-center text-[10px] font-extrabold text-slate-600 dark:text-white shadow-sm">
                        #{i + 4}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="font-bold text-slate-900 dark:text-white leading-tight">{m.name}</p>
                        {m.verified && <BadgeCheck className="w-3.5 h-3.5 text-blue-500" />}
                      </div>
                      <p className="text-xs text-slate-400 dark:text-white/40 font-semibold mt-0.5">{m.niche}</p>
                    </div>
                  </div>
                  <Link to={`/marketer/${m.id}`} className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-600 dark:text-white/60">
                    View
                  </Link>
                </div>
                
                <div className="grid grid-cols-3 gap-2 bg-slate-50 dark:bg-white/5 rounded-xl p-3">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase">Revenue</p>
                    <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">{formatCurrency(m.revenue)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase">Monthly</p>
                    <p className="text-xs font-bold text-[#005645] mt-0.5">+{m.monthlyReturn}%</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase">Rating</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span className="text-xs font-bold text-slate-900 dark:text-white">{m.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
