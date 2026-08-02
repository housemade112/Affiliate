import { Link } from 'react-router-dom'
import { getAllAffiliates } from '../data/affiliates.js'
import { formatCurrency, formatNumber } from '../lib/utils.js'
import { Trophy, Star, Medal } from 'lucide-react'

export default function Leaderboard() {
  const affiliates = getAllAffiliates().sort((a, b) => b.revenue - a.revenue)
  const top3 = affiliates.slice(0, 3)
  const rest = affiliates.slice(3)

  const rankColors = ['text-amber-400', 'text-slate-300', 'text-amber-600']
  const rankBg = ['bg-amber-500/10 border-amber-500/20', 'bg-slate-500/10 border-slate-500/20', 'bg-amber-700/10 border-amber-700/20']

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white">Leaderboard</h1>
        <p className="text-slate-400 mt-1">Top performing affiliate marketers by total revenue</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {top3.map((aff, i) => (
          <Link to={`/marketer/${aff.id}`} key={aff.id} className={`glass-card p-6 border ${rankBg[i]} text-center hover:border-violet-500/20 transition-all group`}>
            <div className={`w-16 h-16 rounded-2xl ${aff.avatarColor} flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl`}>
              {aff.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex items-center justify-center gap-1 mb-1">
              <Medal className={`w-5 h-5 ${rankColors[i]}`} />
              <span className={`text-lg font-bold ${rankColors[i]}`}>#{i + 1}</span>
            </div>
            <h3 className="font-semibold text-white text-lg">{aff.name}</h3>
            <p className="text-sm text-slate-400">{aff.niche}</p>
            <div className="mt-4 space-y-2">
              <p className="text-2xl font-bold text-white">{formatCurrency(aff.revenue)}</p>
              <p className="text-xs text-slate-400">Total Revenue</p>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/5">
              <div><p className="text-sm font-bold text-white">{aff.rating}</p><p className="text-[10px] text-slate-400">Rating</p></div>
              <div><p className="text-sm font-bold text-emerald-400">+{aff.monthlyReturn}%</p><p className="text-[10px] text-slate-400">Monthly</p></div>
              <div><p className="text-sm font-bold text-white">{formatNumber(aff.followers)}</p><p className="text-[10px] text-slate-400">Audience</p></div>
            </div>
          </Link>
        ))}
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="table-header">Rank</th>
              <th className="table-header">Marketer</th>
              <th className="table-header">Niche</th>
              <th className="table-header">Revenue</th>
              <th className="table-header">Monthly</th>
              <th className="table-header">Win Rate</th>
              <th className="table-header">Audience</th>
            </tr>
          </thead>
          <tbody>
            {rest.map((aff, i) => (
              <tr key={aff.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                <td className="table-cell"><span className="text-sm font-bold text-slate-500">#{i + 4}</span></td>
                <td className="table-cell">
                  <Link to={`/marketer/${aff.id}`} className="flex items-center gap-3 group">
                    <div className={`w-8 h-8 rounded-lg ${aff.avatarColor} flex items-center justify-center text-white text-xs font-bold`}>
                      {aff.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="font-medium text-white group-hover:text-violet-400 transition-colors">{aff.name}</span>
                    {aff.verified && <Star className="w-3 h-3 text-emerald-400 fill-emerald-400" />}
                  </Link>
                </td>
                <td className="table-cell text-slate-400">{aff.niche}</td>
                <td className="table-cell font-medium text-white">{formatCurrency(aff.revenue)}</td>
                <td className="table-cell text-emerald-400">+{aff.monthlyReturn}%</td>
                <td className="table-cell text-white">{aff.winRate}%</td>
                <td className="table-cell text-slate-400">{formatNumber(aff.followers)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
