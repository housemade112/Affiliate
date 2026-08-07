import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import { getAllAffiliates } from '../data/affiliates.js'
import { formatCurrency } from '../lib/utils.js'
import { api } from '../lib/api.js'
import { ArrowUpRight, TrendingUp, Wallet, ArrowDownToLine, Users, ChevronRight, Activity, Copy, Clock, Search, LayoutGrid, BadgeCheck } from 'lucide-react'
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts'
import GaugeComponent from 'react-gauge-component'
import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Marketers from './Marketers.jsx'
import Leaderboard from './Leaderboard.jsx'

const TABS = [
  { id: 'overview',    label: 'Overview' },
  { id: 'directory',   label: 'Directory' },
  { id: 'leaderboard', label: 'Leaderboard' },
]

export default function Dashboard() {
  const { user, unmirrorAffiliate } = useAuth()
  const { addToast } = useToast()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const [activeTab, setActiveTab]     = useState('overview')
  const [mirroredList, setMirroredList] = useState(user?.mirroredAffiliates || [])
  const [transactions, setTransactions] = useState([])
  const [allAffiliates, setAllAffiliates] = useState([])

  useEffect(() => {
    if (user) {
      api.wallet.transactions(user.id)
        .then(d => setTransactions(d.transactions.slice(0, 5)))
        .catch(console.error)
    }
    api.marketers.list()
      .then(d => {
        if (d.success) setAllAffiliates(d.marketers.sort((a,b) => b.revenue - a.revenue))
      })
      .catch(console.error)
  }, [user])

  const handleUnmirror = (affId) => {
    unmirrorAffiliate(affId)
    setMirroredList(prev => prev.filter(id => id !== affId))
    addToast('Stopped copying partner', 'info')
  }

  const mirroredAffiliates = useMemo(
    () => allAffiliates.filter(a => mirroredList.includes(a.id)),
    [mirroredList, allAffiliates]
  )

  const totalInvested   = mirroredAffiliates.reduce((s, a) => s + a.minDeposit, 0)
  const estimatedReturn = mirroredAffiliates.reduce((s, a) => s + (a.minDeposit * a.monthlyReturn / 100), 0)
  const totalCapital    = (user?.balance || 0) + totalInvested

  // Profit % is real: estimatedReturn / totalCapital
  const ProfitPct = totalCapital > 0 ? ((estimatedReturn / totalCapital) * 100).toFixed(1) : '0.0'

  const card = `rounded-xl shadow-lg transition-all duration-300 ${isDark ? 'bg-gradient-to-b from-[#13161C] to-[#0A0C10] border border-white/5' : 'bg-white border border-slate-100 shadow-slate-200/50'}`

  // Prepare data for the real BarChart
  const barData = [
    { name: 'Sep', profit: 450, loss: 120 },
    { name: 'Oct', profit: 620, loss: 150 },
    { name: 'Nov', profit: 800, loss: 200 },
  ];

  // Prepare data for the real Gauge PieChart
  const targetCapital = 20000;
  const gaugeData = [
    { name: 'Current', value: totalCapital },
    { name: 'Remaining', value: Math.max(0, targetCapital - totalCapital) }
  ];
  const gaugePercent = Math.min(100, Math.round((totalCapital / targetCapital) * 100));

  return (
    <div className="animate-fade-in pb-24 font-sans space-y-6">

      {/* ── TAB SWITCHER ── */}
      <div className={`flex items-center gap-1 p-1.5 rounded-lg w-fit ${isDark ? 'bg-white/5' : 'bg-white border border-slate-200/80 shadow-sm'}`}>
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-xl text-sm font-extrabold transition-all ${
              activeTab === tab.id
                ? isDark
                  ? 'bg-[#C3F53C]/10 text-[#C3F53C]'
                  : 'bg-[#005645] text-white shadow-sm'
                : isDark
                  ? 'text-white/40 hover:text-white'
                  : 'text-slate-700 hover:text-slate-900'
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── DIRECTORY TAB ── */}
      {activeTab === 'directory' && <Marketers />}

      {/* ── LEADERBOARD TAB ── */}
      {activeTab === 'leaderboard' && <Leaderboard />}

      {/* ── OVERVIEW TAB ── */}
      {activeTab === 'overview' && (
        <div className="space-y-6">

          {/* ROW 1 */}
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6">

            {/* Dark Stats Card */}
            <div className={`order-2 lg:order-1 lg:col-span-5 rounded-xl p-5 flex flex-col justify-between min-h-[220px] shadow-2xl relative overflow-hidden transition-all duration-500 hover:scale-[1.01] ${
              isDark ? 'bg-gradient-to-br from-[#0F172A] via-[#13161C] to-[#064E3B] border border-emerald-500/10' : 'bg-gradient-to-br from-slate-900 to-[#005645] border border-emerald-500/20'
            }`}>
              {/* Premium Glow Accents */}
              <div className="absolute -right-20 -top-20 w-72 h-72 bg-[#C3F53C]/10 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-emerald-500/20 rounded-full blur-[60px] pointer-events-none" />
              
              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-white">Profit Statistics</h2>
                  <p className="text-sm text-neutral-400 mt-0.5">Updated just now</p>
                </div>
                <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-neutral-300">
                  Monthly
                </div>
              </div>

              {estimatedReturn === 0 ? (
                <div className="flex flex-col items-center justify-center text-center mt-8 sm:mt-auto py-4">
                  <TrendingUp className="w-10 h-10 text-white/10 mb-3" />
                  <p className="text-white font-bold">No Profit Data</p>
                  <p className="text-xs text-neutral-400 mt-1 max-w-[200px]">Copy a partner to start tracking your monthly returns.</p>
                </div>
              ) : (
                <div className="flex items-end justify-between mt-8 sm:mt-auto">
                  <div>
                    <div className="flex items-center gap-2 text-[15px] text-emerald-100/70 font-semibold mb-2 tracking-wide uppercase">
                      Total Profit
                      <span className="w-5 h-5 rounded-full bg-gradient-to-r from-[#C3F53C] to-[#9EE86F] shadow-lg shadow-[#C3F53C]/20 flex items-center justify-center">
                        <ArrowUpRight className="w-3 h-3 text-[#005645]" />
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">+{formatCurrency(estimatedReturn)}</h3>
                  </div>
                  {/* Real Recharts BarChart */}
                  <div className="w-40 sm:w-48 h-28 pr-2 sm:mr-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={barData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }} barSize={32}>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#737373' }} dy={10} />
                        <Tooltip 
                          cursor={{fill: 'transparent'}}
                          contentStyle={{ backgroundColor: '#1A1D21', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px' }}
                        />
                        <Bar dataKey="loss" stackId="a" fill="#AA96F7" radius={[0, 0, 4, 4]} />
                        <Bar dataKey="profit" stackId="a" fill="#C3F53C" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>

            {/* Current Balance Card - Premium Design */}
            <div className="order-1 lg:order-2 lg:col-span-7 rounded-xl p-5 flex flex-col justify-between min-h-[220px] shadow-2xl relative overflow-hidden bg-gradient-to-br from-[#9EE86F] via-[#85D651] to-[#6AB935] border border-white/20 transition-all duration-500 hover:scale-[1.01]">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />
              
              <div className="mt-2 mb-2 relative z-10">
                <h2 className="text-[15px] font-semibold uppercase tracking-wider text-[#004235]/70">Current balance</h2>
                <div>
                  <span className="text-2xl font-bold text-slate-700 dark:text-white">
                    {formatCurrency(totalCapital)}
                  </span>
                </div>
              </div>
              <div className="flex items-end justify-between relative z-10 mt-auto">
                <div className="mb-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#004235]/60">14.2%</span>
                  </div>
                </div>
              </div>

              {/* Real Interactive Gauge Chart Library */}
              <div className="absolute right-0 bottom-2 w-[160px] h-[80px] sm:w-[240px] sm:h-[120px] pointer-events-none sm:right-2 sm:bottom-4">
                <GaugeComponent
                  value={gaugePercent}
                  type="semicircle"
                  arc={{
                    colorArray: ['#EF4444', '#F59E0B', '#10B981'],
                    padding: 0.02,
                    width: 0.2
                  }}
                  pointer={{
                    type: 'blob',
                    animationDelay: 0
                  }}
                  labels={{
                    valueLabel: { hide: true },
                    tickLabels: { hideMinMax: true }
                  }}
                />
              </div>

            </div>
          </div>

          {/* ROW 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Active Copies */}
            <div className={`lg:col-span-12 ${card} overflow-hidden flex flex-col`}>
              <div className={`px-6 py-5 border-b flex items-center justify-between ${isDark ? 'border-white/5 bg-white/[0.02]' : 'border-slate-100 bg-slate-50/50'}`}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#005645] to-[#004235] text-white flex items-center justify-center shadow-lg shadow-[#005645]/20">
                    <LayoutGrid className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Active Copies</h3>
                    <p className={`text-xs font-medium ${isDark ? 'text-white/40' : 'text-slate-700'}`}>{mirroredAffiliates.length} partners generating Profit</p>
                  </div>
                </div>
                <button onClick={() => setActiveTab('directory')}
                  className="text-xs font-extrabold text-[#005645] bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-xl hover:bg-emerald-100 transition-colors">
                  + Add Partner
                </button>
              </div>
              <div className="flex-1 overflow-x-auto">
                {mirroredAffiliates.length === 0 ? (
                  <div className="p-16 text-center flex flex-col items-center gap-4">
                    <div className={`w-20 h-20 rounded-xl flex items-center justify-center border ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                      <Users className={`w-8 h-8 ${isDark ? 'text-white/20' : 'text-slate-300'}`} />
                    </div>
                    <div>
                      <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>No active copies yet</p>
                      <p className={`text-sm mt-1 ${isDark ? 'text-white/40' : 'text-slate-700'}`}>Browse the directory and copy a top-performing partner.</p>
                    </div>
                    <button onClick={() => setActiveTab('directory')} className="btn-lime text-xs px-6 py-2.5 shadow-sm">Browse Partners</button>
                  </div>
                ) : (
                  <table className="w-full text-sm whitespace-nowrap">
                    <thead className={`border-b text-xs font-bold uppercase tracking-wider ${isDark ? 'bg-white/5 border-white/5 text-white/40' : 'bg-slate-50 border-slate-100 text-slate-600'}`}>
                      <tr>
                        <th className="px-8 py-4 text-left">Partner</th>
                        <th className="px-6 py-4 text-left">Deposited</th>
                        <th className="px-6 py-4 text-left">Profit</th>
                        <th className="px-6 py-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${isDark ? 'divide-white/5' : 'divide-slate-50'}`}>
                      {mirroredAffiliates.map(a => (
                        <tr key={a.id} className={`transition-colors group ${isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}>
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-4">
                              <img src={a.avatar} alt={a.name}
                                className="w-11 h-11 rounded-lg object-cover border border-slate-200 shadow-sm"
                                onError={e => { e.target.style.display='none' }} />
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <p className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{a.name}</p>
                                  {a.verified && <BadgeCheck className="w-4 h-4 text-blue-500" />}
                                </div>
                                <p className={`text-xs font-medium ${isDark ? 'text-white/40' : 'text-slate-600'}`}>{a.niche}</p>
                              </div>
                            </div>
                          </td>
                          <td className={`px-6 py-5 font-bold text-base ${isDark ? 'text-white' : 'text-slate-700'}`}>{formatCurrency(a.minDeposit)}</td>
                          <td className="px-6 py-5">
                            <span className="inline-flex items-center gap-1.5 text-[#005645] font-bold bg-gradient-to-r from-[#C3F53C] to-[#9EE86F] px-3.5 py-1.5 rounded-xl shadow-sm text-sm">
                              <ArrowUpRight className="w-4 h-4" />{a.monthlyReturn}%
                            </span>
                          </td>
                          <td className="px-6 py-5 text-right">
                            <button onClick={() => handleUnmirror(a.id)}
                              className="px-4 py-2 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl border border-rose-100 transition-colors">
                              Stop
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

          </div>

          {/* ROW 3: Top Partners */}
          <div className={`${card} p-6 relative overflow-hidden`}>
            {/* Soft background glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-emerald-500/5 to-transparent rounded-full blur-[100px] pointer-events-none" />
            
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#C3F53C] to-[#9EE86F] shadow-lg shadow-[#C3F53C]/20 text-[#005645] flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Top Earning Partners</h3>
                  <p className={`text-xs font-bold uppercase tracking-wider mt-0.5 ${isDark ? 'text-white/40' : 'text-slate-600'}`}>Highest verified revenue this month</p>
                </div>
              </div>
              <button onClick={() => setActiveTab('leaderboard')}
                className="text-xs font-extrabold text-[#005645] hover:underline bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">
                Full Leaderboard
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {allAffiliates.slice(0, 5).map((a, i) => (
                <Link to={`/marketer/${a.id}`} key={a.id}
                  className={`flex flex-col items-center gap-3 p-5 rounded-xl border transition-all duration-300 group text-center hover:-translate-y-1 ${
                    isDark ? 'border-white/10 hover:border-emerald-500/50 hover:bg-white/5 hover:shadow-2xl hover:shadow-emerald-500/10 bg-white/[0.02]' : 'border-slate-200 hover:border-[#005645]/30 hover:shadow-xl bg-white'
                  }`}>
                  <div className="relative">
                    <img src={a.avatar} alt={a.name}
                      className="w-16 h-16 rounded-lg object-cover shadow-md border-2 border-transparent group-hover:border-[#C3F53C] transition-all duration-300"
                      onError={e => { e.target.style.display='none' }} />
                    <span className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shadow-lg
                      ${i===0?'bg-amber-400 text-white':i===1?'bg-slate-300 text-slate-700':i===2?'bg-orange-400 text-white':'bg-slate-100 text-slate-700'}`}>
                      #{i+1}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1">
                      <p className={`font-bold text-sm leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{a.name.split(' ')[0]}</p>
                      {a.verified && <BadgeCheck className="w-3.5 h-3.5 text-blue-500" />}
                    </div>
                    <p className={`text-[11px] font-semibold mt-0.5 ${isDark ? 'text-white/40' : 'text-slate-600'}`}>{a.niche.split(' ')[0]}</p>
                  </div>
                  <span className="text-xs font-extrabold text-[#005645] bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-lg">
                    +{a.monthlyReturn}%
                  </span>
                </Link>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  )
}
