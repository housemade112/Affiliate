import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../lib/api.js'
import { formatCurrency } from '../lib/utils.js'
import { Star, CheckCircle2, Award, TrendingUp, Users, ArrowUpRight, ArrowRight } from 'lucide-react'

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
    { rank: 1, border: 'border-amber-300',   bg: 'bg-amber-50',   badge: 'bg-amber-400',   text: 'text-amber-600',   icon: '🥇' },
    { rank: 2, border: 'border-slate-300',   bg: 'bg-slate-50',   badge: 'bg-slate-400',   text: 'text-slate-500',   icon: '🥈' },
    { rank: 3, border: 'border-orange-300',  bg: 'bg-orange-50',  badge: 'bg-orange-400',  text: 'text-orange-600',  icon: '🥉' },
  ]

  return (
    <div className="animate-fade-in pb-24 font-sans space-y-8">

      {/* Header */}
      <div className="bg-[#005645] rounded-[28px] p-8 sm:p-10 relative overflow-hidden shadow-xl">

        <div className="relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C3F53C] text-[#005645] text-xs font-extrabold mb-3 shadow-sm">
            <Award className="w-3.5 h-3.5" /> LEADERBOARD
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Top Performing Partners</h1>
          <p className="text-emerald-100/80 font-medium mt-2">Ranked by 30-day verified performance revenue</p>
        </div>
      </div>

      {/* Podium Top 3 */}
      {loading ? (
        <div className="grid md:grid-cols-3 gap-6">
          {[1,2,3].map(i => (
            <div key={i} className="bg-white border border-slate-200 rounded-[24px] p-6 animate-pulse space-y-4">
              <div className="w-20 h-20 bg-slate-100 rounded-2xl mx-auto" />
              <div className="h-4 bg-slate-100 rounded w-2/3 mx-auto" />
              <div className="h-16 bg-slate-50 rounded-2xl" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {top3.map((m, i) => {
            const s = podiumStyles[i]
            return (
              <Link to={`/marketer/${m.id}`} key={m.id}
                className={`bg-white rounded-[24px] p-6 border-2 ${s.border} shadow-md hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col items-center gap-5 text-center relative overflow-hidden group`}>
                {/* Rank Medal */}
                <div className="absolute top-4 right-4 text-2xl">{s.icon}</div>
                
                {/* Avatar */}
                <div className="relative mt-2">
                  <img src={m.avatar} alt={m.name}
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-200 shadow-md group-hover:border-[#005645] transition-colors"
                    onError={e => { e.target.style.display = 'none' }} />
                  <span className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-xl ${s.badge} text-white text-xs font-black flex items-center justify-center shadow-md`}>
                    #{i+1}
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <h3 className="font-extrabold text-slate-900 text-lg">{m.name}</h3>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                  <p className="text-xs text-slate-500 font-semibold">{m.niche}</p>
                </div>

                {/* Revenue Block */}
                <div className={`w-full p-5 ${s.bg} border border-slate-100 rounded-[18px]`}>
                  <p className="text-2xl font-extrabold text-slate-900">{formatCurrency(m.revenue)}</p>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Lifetime Revenue</p>
                </div>

                <div className="grid grid-cols-3 gap-2 w-full border-t border-slate-100 pt-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-0.5 text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      <span className="text-sm font-extrabold">{m.rating}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Rating</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-extrabold text-[#005645]">+{m.monthlyReturn}%</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Monthly</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-extrabold text-slate-900">{m.followers}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Audience</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}

      {/* Ranked Table #4–20 */}
      {!loading && rest.length > 0 && (
        <div className="bg-white border border-slate-200/80 rounded-[28px] shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-slate-900">Full Rankings</h2>
            <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-xl">{rest.length + 3} Partners</span>
          </div>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm whitespace-nowrap">
              <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 text-xs font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-8 py-4 text-left">Rank</th>
                  <th className="px-6 py-4 text-left">Partner</th>
                  <th className="px-6 py-4 text-left">Revenue</th>
                  <th className="px-6 py-4 text-left">Monthly Profit</th>
                  <th className="px-6 py-4 text-left">Rating</th>
                  <th className="px-6 py-4 text-right">View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {rest.map((m, i) => (
                  <tr key={m.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-8 py-5">
                      <span className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-sm font-extrabold text-slate-600">
                        #{i + 4}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <img src={m.avatar} alt={m.name}
                          className="w-11 h-11 rounded-2xl object-cover border border-slate-200 shadow-sm group-hover:border-[#005645] transition-colors"
                          onError={e => { e.target.style.display = 'none' }} />
                        <div>
                          <p className="font-extrabold text-slate-900">{m.name}</p>
                          <p className="text-xs text-slate-400 font-semibold">{m.niche}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 font-extrabold text-slate-900">{formatCurrency(m.revenue)}</td>
                    <td className="px-6 py-5">
                      <span className="inline-flex items-center gap-1 text-[#005645] font-extrabold bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100 text-xs">
                        <ArrowUpRight className="w-3 h-3" />+{m.monthlyReturn}%
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span className="font-extrabold text-slate-900">{m.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <Link to={`/marketer/${m.id}`}
                        className="inline-flex items-center gap-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:border-[#005645] hover:text-[#005645] transition-colors">
                        View <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card List */}
          <div className="md:hidden flex flex-col divide-y divide-slate-100">
            {rest.map((m, i) => (
              <div key={m.id} className="p-4 sm:p-5 flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img src={m.avatar} alt={m.name} className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shadow-sm" />
                      <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-lg bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-extrabold text-slate-600 shadow-sm">
                        #{i + 4}
                      </div>
                    </div>
                    <div>
                      <p className="font-extrabold text-slate-900 leading-tight">{m.name}</p>
                      <p className="text-xs text-slate-400 font-semibold mt-0.5">{m.niche}</p>
                    </div>
                  </div>
                  <Link to={`/marketer/${m.id}`} className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-600">
                    View
                  </Link>
                </div>
                
                <div className="grid grid-cols-3 gap-2 bg-slate-50 rounded-xl p-3">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Revenue</p>
                    <p className="text-xs font-extrabold text-slate-900 mt-0.5">{formatCurrency(m.revenue)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Monthly</p>
                    <p className="text-xs font-extrabold text-[#005645] mt-0.5">+{m.monthlyReturn}%</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Rating</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span className="text-xs font-extrabold text-slate-900">{m.rating}</span>
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
