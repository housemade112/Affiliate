import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import { getAllAffiliates } from '../data/affiliates.js'
import { formatCurrency } from '../lib/utils.js'
import { api } from '../lib/api.js'
import {
  TrendingUp, Wallet, ArrowUpRight, Copy, LayoutGrid, Clock, Users, ArrowRight
} from 'lucide-react'
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
  const allAffiliates = getAllAffiliates()

  useEffect(() => {
    if (user) {
      api.wallet.transactions(user.id)
        .then(d => setTransactions(d.transactions.slice(0, 5)))
        .catch(console.error)
    }
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

  const card = `rounded-[24px] shadow-sm border transition-colors ${isDark ? 'bg-[#1A1D21] border-white/5' : 'bg-white border-slate-200/80'}`

  return (
    <div className="animate-fade-in pb-24 font-sans space-y-6">

      {/* ── TAB SWITCHER ── */}
      <div className={`flex items-center gap-1 p-1.5 rounded-2xl w-fit ${isDark ? 'bg-white/5' : 'bg-white border border-slate-200/80 shadow-sm'}`}>
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-xl text-sm font-extrabold transition-all ${
              activeTab === tab.id
                ? isDark
                  ? 'bg-[#C3F53C]/10 text-[#C3F53C]'
                  : 'bg-[#005645] text-white shadow-sm'
                : isDark
                  ? 'text-white/40 hover:text-white'
                  : 'text-slate-500 hover:text-slate-900'
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Dark Stats Card */}
            <div className={`lg:col-span-5 rounded-[24px] p-6 flex flex-col justify-between min-h-[280px] shadow-xl relative overflow-hidden ${
              isDark ? 'bg-[#1A1D21] border border-white/5' : 'bg-[#1E2128]'
            }`}>
              <div className="absolute right-8 top-8 opacity-10 pointer-events-none">
                <div className="w-40 h-40 rounded-full border-[20px] border-[#C3F53C]" />
              </div>
              <div className="flex justify-between items-start">
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
                    <div className="flex items-center gap-2 text-sm text-neutral-400 mb-2">
                      Total Profit
                      <span className="w-5 h-5 rounded-full bg-[#C3F53C] flex items-center justify-center">
                        <ArrowUpRight className="w-3 h-3 text-[#005645]" />
                      </span>
                    </div>
                    <h3 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">+{formatCurrency(estimatedReturn)}</h3>
                  </div>
                  {/* CSS Bar Chart */}
                  <div className="flex items-end gap-2 sm:gap-3 h-24 sm:h-28 pr-2 sm:mr-4">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[10px] text-neutral-500">Prev</span>
                      <div className="w-10 sm:w-14 rounded-t-xl rounded-b-md overflow-hidden flex flex-col-reverse" style={{height:'60px'}}>
                        <div className="w-full bg-[#AA96F7]" style={{height:'40%'}} />
                        <div className="w-full bg-[#C3F53C]" style={{height:'60%'}} />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[10px] text-neutral-500">Now</span>
                      <div className="w-10 sm:w-14 rounded-t-xl rounded-b-md overflow-hidden flex flex-col-reverse" style={{height:'90px'}}>
                        <div className="w-full bg-[#AA96F7]" style={{height:'35%'}} />
                        <div className="w-full bg-[#C3F53C]" style={{height:'65%'}} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Current Balance Card */}
            <div className={`lg:col-span-7 rounded-[24px] p-6 flex flex-col justify-between min-h-[280px] shadow-sm relative overflow-hidden bg-[#C3F53C]`}>
              {/* Arch decoration */}
              <div className="absolute -right-4 -bottom-4 w-40 h-40 border-[10px] border-[#005645] rounded-full border-l-transparent border-b-transparent rotate-[-35deg] opacity-80" />
              
              <div className="flex justify-between items-center mb-6 relative z-10">
                <h2 className="text-xl font-bold text-[#005645]">Current Balance</h2>
                <div className="p-2.5 rounded-xl bg-white/50 text-[#005645]">
                  <Wallet className="w-5 h-5" />
                </div>
              </div>
              
              <div className="mt-auto relative z-10">
                <p className="text-sm font-bold mb-1 text-[#005645]/70">Total Available Funds</p>
                <h3 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#005645]">
                  {formatCurrency(totalCapital)}
                </h3>
                
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[#005645]/10">
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-[#005645]/10 text-[#005645]">
                    +{ProfitPct}%
                  </span>
                  <span className="text-xs font-semibold text-[#005645]/70">Est. Monthly ROI</span>
                </div>
              </div>
            </div>
          </div>

          {/* ROW 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Active Copies */}
            <div className={`lg:col-span-8 ${card} overflow-hidden flex flex-col`}>
              <div className={`px-8 py-6 border-b flex items-center justify-between ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#005645] text-white flex items-center justify-center shadow-md">
                    <LayoutGrid className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className={`text-lg font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>Active Copies</h3>
                    <p className={`text-xs font-medium ${isDark ? 'text-white/40' : 'text-slate-500'}`}>{mirroredAffiliates.length} partners generating Profit</p>
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
                    <div className={`w-20 h-20 rounded-[24px] flex items-center justify-center border ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                      <Users className={`w-8 h-8 ${isDark ? 'text-white/20' : 'text-slate-300'}`} />
                    </div>
                    <div>
                      <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>No active copies yet</p>
                      <p className={`text-sm mt-1 ${isDark ? 'text-white/40' : 'text-slate-500'}`}>Browse the directory and copy a top-performing partner.</p>
                    </div>
                    <button onClick={() => setActiveTab('directory')} className="btn-lime text-xs px-6 py-2.5 shadow-sm">Browse Partners</button>
                  </div>
                ) : (
                  <table className="w-full text-sm whitespace-nowrap">
                    <thead className={`border-b text-xs font-bold uppercase tracking-wider ${isDark ? 'bg-white/5 border-white/5 text-white/40' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
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
                                className="w-11 h-11 rounded-2xl object-cover border border-slate-200 shadow-sm"
                                onError={e => { e.target.style.display='none' }} />
                              <div>
                                <p className={`font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>{a.name}</p>
                                <p className={`text-xs font-medium ${isDark ? 'text-white/40' : 'text-slate-400'}`}>{a.niche}</p>
                              </div>
                            </div>
                          </td>
                          <td className={`px-6 py-5 font-bold text-base ${isDark ? 'text-white' : 'text-slate-800'}`}>{formatCurrency(a.minDeposit)}</td>
                          <td className="px-6 py-5">
                            <span className="inline-flex items-center gap-1 text-[#005645] font-extrabold bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100 text-sm">
                              <ArrowUpRight className="w-3.5 h-3.5" />{a.monthlyReturn}%
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

            {/* Live Social Proof Feed */}
            <div className={`lg:col-span-4 ${card} flex flex-col overflow-hidden`}>
              <div className={`px-6 py-6 border-b flex items-center justify-between ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${isDark ? 'bg-[#C3F53C]/10 text-[#C3F53C]' : 'bg-emerald-50 text-[#005645]'}`}>
                    <Users className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className={`text-lg font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>Live Activity</h3>
                    <p className={`text-xs font-medium ${isDark ? 'text-white/40' : 'text-slate-500'}`}>Real-time platform action</p>
                  </div>
                </div>
              </div>
              <div className="p-4 flex-1 overflow-y-auto space-y-3">
                {[
                  { id: 1, user: 'Alex M.', action: 'allocated', amount: '$5,000', target: 'Frances Campbell', time: 'Just now' },
                  { id: 2, user: 'Sarah J.', action: 'withdrew', amount: '$1,250', target: 'profits', time: '2m ago' },
                  { id: 3, user: 'David K.', action: 'allocated', amount: '$10,000', target: 'Crypto Niche', time: '5m ago' },
                  { id: 4, user: 'Emily R.', action: 'deposited', amount: '$2,500', target: 'wallet', time: '12m ago' },
                  { id: 5, user: 'Michael B.', action: 'withdrew', amount: '$3,400', target: 'profits', time: '21m ago' },
                ].map((feed) => (
                  <div key={feed.id} className={`p-4 rounded-2xl flex items-start gap-3 transition-colors ${isDark ? 'hover:bg-white/5 bg-white/[0.02]' : 'hover:bg-slate-50 bg-white border border-slate-100'}`}>
                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${
                      feed.action === 'withdrew' ? 'bg-amber-100 text-amber-700' : 
                      feed.action === 'deposited' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {feed.user[0]}
                    </div>
                    <div>
                      <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{feed.user}</span> {feed.action} <span className={`font-extrabold px-1.5 py-0.5 rounded ${isDark ? 'text-[#C3F53C] bg-[#C3F53C]/20' : 'text-[#005645] bg-[#C3F53C]/40'}`}>{feed.amount}</span> to {feed.target}
                      </p>
                      <p className={`text-[10px] font-bold mt-1 uppercase ${isDark ? 'text-white/30' : 'text-slate-400'}`}>{feed.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ROW 3: Top Partners */}
          <div className={`${card} p-6 sm:p-8`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#C3F53C] text-[#005645] flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`text-lg font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>Top Earning Partners</h3>
                  <p className={`text-xs font-medium ${isDark ? 'text-white/40' : 'text-slate-400'}`}>Highest verified revenue this month</p>
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
                  className={`flex flex-col items-center gap-3 p-5 rounded-[20px] border transition-all group text-center ${
                    isDark ? 'border-white/5 hover:border-[#C3F53C]/40 hover:bg-white/5' : 'border-slate-100 hover:border-[#C3F53C] hover:shadow-md'
                  }`}>
                  <div className="relative">
                    <img src={a.avatar} alt={a.name}
                      className="w-16 h-16 rounded-2xl object-cover shadow-sm border border-slate-200 group-hover:border-[#005645] transition-colors"
                      onError={e => { e.target.style.display='none' }} />
                    <span className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shadow-sm
                      ${i===0?'bg-amber-400 text-white':i===1?'bg-slate-300 text-slate-700':i===2?'bg-orange-400 text-white':'bg-slate-100 text-slate-500'}`}>
                      #{i+1}
                    </span>
                  </div>
                  <div>
                    <p className={`font-extrabold text-sm leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{a.name.split(' ')[0]}</p>
                    <p className={`text-[11px] font-semibold mt-0.5 ${isDark ? 'text-white/40' : 'text-slate-400'}`}>{a.niche.split(' ')[0]}</p>
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
