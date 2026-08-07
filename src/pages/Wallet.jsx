import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { formatCurrency } from '../lib/utils.js'
import { api } from '../lib/api.js'
import WalletModal from '../components/WalletModal.jsx'
import {
  Wallet as WalletIcon, ArrowDownLeft, ArrowUpRight,
  Clock, CheckCircle, XCircle, PlusCircle, ShieldCheck, ArrowDownToLine, ArrowUpFromLine
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext.jsx'

export default function Wallet() {
  const { user } = useAuth()
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  
  const [transactions, setTransactions] = useState([])
  const [txLoading, setTxLoading]       = useState(true)
  const [modalOpen, setModalOpen]       = useState(false)
  const [defaultType, setDefaultType]   = useState('deposit')

  const load = () => {
    if (!user) return
    api.wallet.transactions(user.id)
      .then(d => { setTransactions(d.transactions); setTxLoading(false) })
      .catch(() => setTxLoading(false))
  }

  useEffect(() => { load() }, [user?.id])

  const openDeposit    = () => { setDefaultType('deposit');    setModalOpen(true) }
  const openWithdrawal = () => { setDefaultType('withdrawal'); setModalOpen(true) }

  const statusMeta = {
    approved: { icon: CheckCircle, pill: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
    declined: { icon: XCircle,    pill: 'bg-rose-100 text-rose-700 border-rose-200' },
    pending:  { icon: Clock,      pill: 'bg-amber-100 text-amber-700 border-amber-200' },
  }

  const totalDeposited  = transactions.filter(t => t.type === 'deposit'    && t.status === 'approved').reduce((s, t) => s + t.amount, 0)
  const totalWithdrawn  = transactions.filter(t => t.type === 'withdrawal' && t.status === 'approved').reduce((s, t) => s + t.amount, 0)

  return (
    <div className="animate-fade-in pb-24 font-sans space-y-6">

      {/* Hero Header */}
      <div className="bg-[#005645] rounded-xl p-6 relative overflow-hidden flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-xl">

        <div className="relative z-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/20 text-emerald-300 text-[10px] uppercase font-extrabold tracking-widest mb-3">
            <WalletIcon className="w-3 h-3" /> Capital Console
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Wallet and Ledger</h1>
          <p className="text-emerald-100/80 font-medium mt-2">Manage crypto deposits, withdrawals, and transfers</p>
        </div>
        <div className="flex gap-3 relative z-10 w-full sm:w-auto">
          <button onClick={openDeposit}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-[#C3F53C] text-[#005645] font-extrabold text-sm rounded-lg shadow-lg hover:bg-[#b0e22b] active:scale-95 transition-all">
            <ArrowDownToLine className="w-4 h-4" /> Deposit
          </button>
          <button onClick={openWithdrawal}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white font-extrabold text-sm rounded-lg hover:bg-white/20 active:scale-95 transition-all">
            <ArrowUpFromLine className="w-4 h-4" /> Withdraw
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`rounded-xl p-6 shadow-xl flex flex-col justify-between gap-4 hover:-translate-y-1 transition-all duration-300 border ${isDark ? 'bg-gradient-to-b from-[#13161C] to-[#0A0C10] border-white/5' : 'bg-white dark:bg-[#1A1D21] border-slate-100 dark:border-white/5'}`}>
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center shadow-sm ${isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-100 text-emerald-600'}`}>
            <WalletIcon className="w-6 h-6" />
          </div>
          <div className="relative z-10">
            <h2 className={`text-[13px] font-semibold uppercase tracking-wider ${isDark ? 'text-white/40' : 'text-slate-500 dark:text-white/50'}`}>Available Balance</h2>
            <p className={`text-2xl font-bold mt-1 ${isDark ? 'text-white' : 'text-slate-700 dark:text-white'}`}>{formatCurrency(user?.balance || 0)}</p>
          </div>
          <div className="relative z-10 flex items-center gap-2 text-xs font-bold text-[#005645] dark:text-[#C3F53C]">
            <ShieldCheck className="w-4 h-4" /> Verified & Secured
          </div>
        </div>

        <div className={`rounded-xl p-6 shadow-xl flex flex-col gap-3 hover:-translate-y-1 transition-all duration-300 border ${isDark ? 'bg-gradient-to-b from-[#13161C] to-[#0A0C10] border-white/5' : 'bg-white dark:bg-[#1A1D21] border-slate-100 dark:border-white/5'}`}>
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center shadow-sm ${isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-100 text-emerald-600'}`}>
            <ArrowDownLeft className="w-6 h-6" />
          </div>
          <div>
            <p className={`text-[13px] font-semibold uppercase tracking-wider ${isDark ? 'text-white/40' : 'text-slate-500 dark:text-white/50'}`}>Total Deposited</p>
            <p className={`text-2xl font-bold mt-1 ${isDark ? 'text-white' : 'text-slate-700 dark:text-white'}`}>{formatCurrency(totalDeposited)}</p>
          </div>
          <p className={`text-xs font-bold ${isDark ? 'text-white/30' : 'text-slate-400 dark:text-white/40'}`}>{transactions.filter(t => t.type === 'deposit').length} transactions</p>
        </div>

        <div className={`rounded-xl p-6 shadow-xl flex flex-col gap-3 hover:-translate-y-1 transition-all duration-300 border ${isDark ? 'bg-gradient-to-b from-[#13161C] to-[#0A0C10] border-white/5' : 'bg-white dark:bg-[#1A1D21] border-slate-100 dark:border-white/5'}`}>
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center shadow-sm ${isDark ? 'bg-rose-500/10 text-rose-400' : 'bg-rose-100 text-rose-600'}`}>
            <ArrowUpRight className="w-6 h-6" />
          </div>
          <div>
            <p className={`text-[13px] font-semibold uppercase tracking-wider ${isDark ? 'text-white/40' : 'text-slate-500 dark:text-white/50'}`}>Total Withdrawn</p>
            <p className={`text-2xl font-bold mt-1 ${isDark ? 'text-white' : 'text-slate-700 dark:text-white'}`}>{formatCurrency(totalWithdrawn)}</p>
          </div>
          <p className={`text-xs font-bold ${isDark ? 'text-white/30' : 'text-slate-400 dark:text-white/40'}`}>{transactions.filter(t => t.type === 'withdrawal').length} transactions</p>
        </div>
      </div>

      {/* Transaction Table */}
      <div className={`rounded-xl shadow-sm overflow-hidden flex flex-col border transition-colors ${isDark ? 'bg-[#1A1D21] border-white/5' : 'bg-white dark:bg-[#1A1D21] border-slate-200/80'}`}>
        <div className={`px-8 py-6 border-b flex items-center justify-between ${isDark ? 'border-white/5' : 'border-slate-100 dark:border-white/5'}`}>
          <div>
            <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Transaction Ledger</h3>
            <p className={`text-xs font-medium mt-1 ${isDark ? 'text-white/40' : 'text-slate-400'}`}>{transactions.length} total records</p>
          </div>
          <button onClick={openDeposit}
            className="flex items-center gap-2 text-xs font-extrabold text-[#005645] bg-emerald-50 border border-emerald-100 px-4 py-2.5 rounded-xl hover:bg-emerald-100 transition-colors">
            <PlusCircle className="w-4 h-4" /> New Transfer
          </button>
        </div>

        <div className="flex-1 overflow-x-auto">
          {txLoading ? (
            <div className="p-6 space-y-4">
              {[1,2,3].map(i => <div key={i} className="h-16 bg-slate-100 rounded-lg animate-pulse" />)}
            </div>
          ) : transactions.length === 0 ? (
            <div className="p-20 text-center flex flex-col items-center gap-5">
              <div className="w-20 h-20 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center">
                <WalletIcon className="w-8 h-8 text-slate-300" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 dark:text-white text-xl">No transactions yet</h4>
                <p className="text-slate-500 dark:text-white/50 font-medium mt-2 max-w-xs mx-auto text-sm">Deposit funds to start allocating capital to top-performing affiliate partners.</p>
              </div>
              <button onClick={openDeposit} className="btn-lime px-8 py-3 text-sm shadow-lg">Make a Deposit</button>
            </div>
          ) : (
            <>
              {/* Desktop Ledger Table */}
              <div className="overflow-x-auto">
                <table className="hidden md:table w-full text-sm whitespace-nowrap">
                <thead className={`border-b text-xs font-bold uppercase tracking-wider ${isDark ? 'bg-white/5 border-white/5 text-white/40' : 'bg-slate-50 dark:bg-white/5 border-slate-100 dark:border-white/5 text-slate-400 dark:text-white/40'}`}>
                  <tr>
                    <th className="px-8 py-4 text-left">Transaction Details</th>
                    <th className="px-6 py-4 text-left">Date & Time</th>
                    <th className="px-6 py-4 text-left">Amount</th>
                    <th className="px-6 py-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-white/5' : 'divide-slate-50'}`}>
                  {transactions.map(tx => {
                    const isDeposit = tx.type === 'deposit'
                    const meta = statusMeta[tx.status] || statusMeta.pending
                    const txId = tx.id.substring(0, 8).toUpperCase()
                    return (
                      <tr key={tx.id} className={`transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50/80'}`}>
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-4">
                            <div className={`w-11 h-11 rounded-lg flex items-center justify-center border shadow-sm
                              ${isDeposit 
                                ? isDark ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-emerald-50 border-emerald-100 text-[#005645]' 
                                : isDark ? 'bg-white/5 border-white/10 text-white/60' : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-white/60'}`}>
                              {isDeposit ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                            </div>
                            <div>
                              <p className={`font-extrabold capitalize flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                                {tx.type} 
                                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${isDark ? 'bg-white/10 text-white/50' : 'bg-slate-100 text-slate-400 dark:text-white/40'}`}>#{txId}</span>
                              </p>
                              <p className={`text-xs font-semibold ${isDark ? 'text-white/40' : 'text-slate-400 dark:text-white/40'}`}>{tx.method || 'Platform Transfer'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <p className={`font-semibold ${isDark ? 'text-white/80' : 'text-slate-700 dark:text-white/80'}`}>
                            {new Date(tx.createdAt || tx.date || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                          </p>
                          <p className={`text-xs font-semibold mt-0.5 ${isDark ? 'text-white/40' : 'text-slate-400 dark:text-white/40'}`}>
                            {new Date(tx.createdAt || tx.date || Date.now()).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`font-extrabold text-lg ${isDeposit ? (isDark ? 'text-emerald-400' : 'text-[#005645]') : (isDark ? 'text-white' : 'text-slate-900 dark:text-white')}`}>
                            {isDeposit ? '+' : '-'}{formatCurrency(tx.amount)}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-extrabold uppercase tracking-wide ${meta.pill}`}>
                            <meta.icon className="w-3.5 h-3.5" />{tx.status}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              </div>

              {/* Mobile Ledger List */}
              <div className="md:hidden overflow-x-auto flex flex-col divide-y divide-slate-100">
                {transactions.map(tx => {
                  const isDeposit = tx.type === 'deposit'
                  const meta = statusMeta[tx.status] || statusMeta.pending
                  const txId = tx.id.substring(0, 8).toUpperCase()
                  
                  return (
                    <div key={tx.id} className="p-4 sm:p-5 flex flex-col gap-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center border shadow-sm
                              ${isDeposit ? 'bg-emerald-50 border-emerald-100 text-[#005645]' : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-white/60'}`}>
                            {isDeposit ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                          </div>
                          <div>
                            <p className="font-extrabold text-slate-900 dark:text-white capitalize leading-tight">{tx.type}</p>
                            <p className="text-xs text-slate-400 dark:text-white/40 font-semibold mt-0.5">{tx.method || 'Platform Transfer'}</p>
                          </div>
                        </div>
                        <span className={`font-extrabold text-lg ${isDeposit ? 'text-[#005645]' : 'text-slate-900 dark:text-white'}`}>
                          {isDeposit ? '+' : '-'}{formatCurrency(tx.amount)}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between bg-slate-50 dark:bg-white/5 p-3 rounded-xl border border-slate-100 dark:border-white/5">
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase">Date</p>
                          <p className="text-xs font-bold text-slate-700 dark:text-white/80 mt-0.5">
                            {new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase">TxID</p>
                          <p className="text-xs font-mono font-bold text-slate-500 dark:text-white/50 mt-0.5">#{txId}</p>
                        </div>
                        <div className="text-right">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md border text-[10px] font-extrabold uppercase tracking-wide ${meta.pill}`}>
                            <meta.icon className="w-3 h-3" />{tx.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </div>

      <WalletModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={() => load()}
        defaultType={defaultType}
      />
    </div>
  )
}
