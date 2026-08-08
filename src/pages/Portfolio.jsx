import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import { getAllAffiliates } from '../data/affiliates.js'
import { formatCurrency } from '../lib/utils.js'
import { api } from '../lib/api.js'
import { PieChart, LineChart, TrendingUp, ArrowUpRight, Activity } from 'lucide-react'

export default function Portfolio() {
  const { user } = useAuth()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const [activeCopies, setActiveCopies] = useState([])
  
  useEffect(() => {
    if (user?.id) {
      api.copy.list(user.id).then(res => {
        if (res.success) setActiveCopies(res.activeCopies || [])
      })
    }
  }, [user])

  const allAffiliates = getAllAffiliates()
  const mirroredAffiliates = activeCopies.map(copy => {
    const affiliate = allAffiliates.find(a => a.id === copy.marketerId)
    return { ...affiliate, copy } // attach the copy data to the affiliate
  }).filter(a => a.name) // ensure affiliate exists
  
  const totalInvested = activeCopies.reduce((s, c) => s + (c.deposit || 0), 0)
  const estimatedReturn = activeCopies.reduce((s, c) => s + ((c.deposit || 0) * ((c.profitPercent || 0) / 100) * (c.payoutsPerDay || 1) * 30), 0) // rough 30-day est
  const totalCapital = (user?.balance || 0) + totalInvested

  const card = `rounded-xl p-6 shadow-sm border ${isDark ? 'bg-[#1A1D21] border-white/5' : 'bg-white border-slate-200/80'}`

  return (
    <div className="animate-fade-in pb-24 font-sans space-y-6">
      
      <div className="flex items-center gap-3 mb-8">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center shadow-sm border ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-800'}`}>
          <PieChart className="w-6 h-6" />
        </div>
        <div>
          <h1 className={`text-2xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>My Portfolio</h1>
          <p className={`text-sm font-medium mt-1 ${isDark ? 'text-white/40' : 'text-slate-500'}`}>Analytics and personal performance tracking</p>
        </div>
      </div>

      {mirroredAffiliates.length === 0 ? (
        <div className={`${card} flex flex-col items-center justify-center text-center p-16`}>
          <Activity className={`w-16 h-16 mb-4 ${isDark ? 'text-white/10' : 'text-slate-200'}`} />
          <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>No active investments</h3>
          <p className={`text-sm font-medium mt-2 max-w-sm ${isDark ? 'text-white/40' : 'text-slate-500'}`}>
            You aren't copying anyone yet. Head to the Directory to allocate capital and start seeing analytics.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={card}>
              <p className={`text-[15px] font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-white/40' : 'text-slate-500'}`}>Total Capital</p>
              <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-700'}`}>{formatCurrency(totalCapital)}</h3>
              <p className={`text-xs font-medium mt-2 ${isDark ? 'text-white/30' : 'text-slate-400'}`}>Includes {formatCurrency(user?.balance || 0)} available cash</p>
            </div>
            <div className={card}>
              <p className={`text-[15px] font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-white/40' : 'text-slate-500'}`}>Active Allocations</p>
              <h3 className={`text-2xl font-bold ${isDark ? 'text-[#C3F53C]' : 'text-[#005645]'}`}>{formatCurrency(totalInvested)}</h3>
              <p className={`text-xs font-medium mt-2 ${isDark ? 'text-white/30' : 'text-slate-400'}`}>Across {mirroredAffiliates.length} partners</p>
            </div>
            <div className={`${card} relative overflow-hidden`}>
              <div className="absolute right-0 top-0 opacity-10"><TrendingUp className="w-48 h-48 -mr-10 -mt-10" /></div>
              <p className={`text-[15px] font-semibold uppercase tracking-wider mb-2 relative z-10 ${isDark ? 'text-white/40' : 'text-slate-500'}`}>Est. 30-Day Growth</p>
              <h3 className={`text-2xl font-bold relative z-10 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>+{formatCurrency(estimatedReturn)}</h3>
              <div className="mt-2 inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-500 px-2.5 py-1 rounded-lg text-xs font-extrabold relative z-10">
                <ArrowUpRight className="w-3 h-3" />
                {((estimatedReturn / totalCapital) * 100).toFixed(1)}% ROI
              </div>
            </div>
          </div>

          <div className={`${card} overflow-hidden`}>
            <div className="flex items-center justify-between mb-8">
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Allocation Breakdown</h3>
              <div className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 ${isDark ? 'bg-white/5 text-white/50' : 'bg-slate-50 text-slate-500'}`}>
                <LineChart className="w-4 h-4" /> By Partner
              </div>
            </div>
            
            <div className="space-y-6">
              {mirroredAffiliates.map(a => {
                const copy = a.copy;
                const pct = totalInvested > 0 ? ((copy.deposit / totalInvested) * 100).toFixed(1) : 0;
                const progressPct = copy.totalPayouts > 0 ? Math.min(100, ((copy.payoutsCompleted || 0) / copy.totalPayouts) * 100) : 0;
                
                return (
                  <div key={copy.id} className={`p-4 rounded-xl border ${isDark ? 'border-white/5 bg-white/5' : 'border-slate-100 bg-slate-50'}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <img src={a.avatar} alt={a.name} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                          <p className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>{a.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400`}>
                              Active
                            </span>
                            <span className={`text-xs font-medium ${isDark ? 'text-white/40' : 'text-slate-500'}`}>
                              Allocated: {formatCurrency(copy.deposit)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-xs font-extrabold ${isDark ? 'text-[#C3F53C]' : 'text-[#005645]'}`}>{pct}% of portfolio</p>
                        <p className={`text-[10px] font-medium mt-1 ${isDark ? 'text-white/40' : 'text-slate-500'}`}>
                          {copy.payoutsPerDay} payouts/day @ {copy.profitPercent}%
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-bold mb-1.5">
                        <span className={isDark ? 'text-white/60' : 'text-slate-500'}>Payout Progress</span>
                        <span className={isDark ? 'text-emerald-400' : 'text-emerald-600'}>{copy.payoutsCompleted || 0} / {copy.totalPayouts || 0}</span>
                      </div>
                      <div className={`w-full h-2.5 rounded-full overflow-hidden ${isDark ? 'bg-black/50' : 'bg-slate-200'}`}>
                        <div className="h-full rounded-full bg-emerald-500 transition-all duration-1000" style={{ width: `${progressPct}%` }} />
                      </div>
                      {copy.nextPayoutTime && copy.payoutsCompleted < copy.totalPayouts && (
                        <p className={`text-[10px] font-medium mt-2 text-right ${isDark ? 'text-white/40' : 'text-slate-400'}`}>
                          Next Payout: {new Date(copy.nextPayoutTime).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
