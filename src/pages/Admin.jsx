import { useState, useEffect } from 'react'
import { api } from '../lib/api.js'
import { useToast } from '../context/ToastContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import { formatCurrency } from '../lib/utils.js'
import {
  ShieldCheck, CheckCircle2, XCircle, Wallet, Users, Clock,
  ArrowDownToLine, ArrowUpFromLine, RefreshCw, Edit3, Save, Plus, AlertCircle
} from 'lucide-react'

export default function Admin() {
  const { addToast } = useToast()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const [activeTab, setActiveTab] = useState('pending') // 'pending', 'wallets', 'users', 'all_txs'
  const [transactions, setTransactions] = useState([])
  const [wallets, setWallets] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  // Decline Modal State
  const [declineTxId, setDeclineTxId] = useState(null)
  const [declineReason, setDeclineReason] = useState('')

  // User Balance Adjust Modal State
  const [adjustUser, setAdjustUser] = useState(null)
  const [newBalance, setNewBalance] = useState('')
  const [adjustReason, setAdjustReason] = useState('Admin Manual Adjustment')

  const fetchData = async () => {
    setLoading(true)
    try {
      const [txRes, walletRes, userRes] = await Promise.all([
        api.admin.getTransactions(),
        api.admin.getWallets(),
        api.admin.getUsers()
      ])
      if (txRes.success) setTransactions(txRes.transactions || [])
      if (walletRes.success) setWallets(walletRes.wallets || [])
      if (userRes.success) setUsers(userRes.users || [])
    } catch (e) {
      console.error(e)
      addToast('Failed to load admin data', 'error')
    } fontally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const pendingTxs = transactions.filter(t => t.status === 'pending')

  const handleApprove = async (txId) => {
    const res = await api.admin.approveTransaction(txId)
    if (res.success) {
      addToast('Transaction APPROVED successfully!', 'success')
      fetchData()
    } else {
      addToast(res.error || 'Failed to approve', 'error')
    }
  }

  const handleDeclineSubmit = async (e) => {
    e.preventDefault()
    if (!declineTxId) return
    const res = await api.admin.declineTransaction(declineTxId, declineReason)
    if (res.success) {
      addToast('Transaction DECLINED and updated', 'info')
      setDeclineTxId(null)
      setDeclineReason('')
      fetchData()
    } else {
      addToast(res.error || 'Failed to decline', 'error')
    }
  }

  const handleSaveWallets = async (updatedWallets) => {
    const res = await api.admin.saveWallets(updatedWallets)
    if (res.success) {
      addToast('Deposit Wallets updated successfully!', 'success')
      setWallets(res.wallets)
    } else {
      addToast('Failed to update deposit wallets', 'error')
    }
  }

  const handleWalletChange = (index, field, value) => {
    const next = [...wallets]
    next[index][field] = value
    setWallets(next)
  }

  const handleAddWallet = () => {
    const newW = {
      id: 'w_' + Date.now(),
      name: 'New Crypto Asset',
      asset: 'SOL',
      address: 'Paste Address Here...',
      network: 'Solana',
      active: true
    }
    setWallets([...wallets, newW])
  }

  const handleBalanceSubmit = async (e) => {
    e.preventDefault()
    if (!adjustUser) return
    const val = parseFloat(newBalance)
    if (isNaN(val) || val < 0) {
      addToast('Please enter a valid balance', 'error')
      return
    }
    const res = await api.admin.updateUserBalance(adjustUser.id, val, adjustReason)
    if (res.success) {
      addToast(`Updated balance for ${adjustUser.name} to ${formatCurrency(val)}`, 'success')
      setAdjustUser(null)
      setNewBalance('')
      fetchData()
    } else {
      addToast(res.error || 'Failed to update balance', 'error')
    }
  }

  const cardStyle = `rounded-[24px] border p-6 ${isDark ? 'bg-[#1A1D21] border-white/5' : 'bg-white border-slate-200/80 shadow-sm'}`

  return (
    <div className="animate-fade-in pb-24 space-y-6 max-w-[1400px] mx-auto">
      
      {/* ── HEADER STRIP ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-5">
        <div>
          <div className="flex items-center gap-2 text-emerald-500 font-extrabold text-xs uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" /> Platform Control Center
          </div>
          <h1 className={`text-3xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Admin Management Portal
          </h1>
        </div>
        <button onClick={fetchData}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors w-fit">
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh Data
        </button>
      </div>

      {/* ── OVERVIEW METRICS STRIP ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={cardStyle}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold ${isDark ? 'text-white/40' : 'text-slate-400'}`}>Pending Requests</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-extrabold text-xs">
              {pendingTxs.length}
            </div>
          </div>
          <p className={`text-3xl font-black mt-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>{pendingTxs.length}</p>
          <span className="text-[11px] font-semibold text-amber-500 mt-1 inline-block">Requires Action</span>
        </div>

        <div className={cardStyle}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold ${isDark ? 'text-white/40' : 'text-slate-400'}`}>Deposit Wallets</span>
            <Wallet className="w-5 h-5 text-emerald-500" />
          </div>
          <p className={`text-3xl font-black mt-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>{wallets.length}</p>
          <span className="text-[11px] font-semibold text-emerald-500 mt-1 inline-block">Configured Assets</span>
        </div>

        <div className={cardStyle}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold ${isDark ? 'text-white/40' : 'text-slate-400'}`}>Total Registered Users</span>
            <Users className="w-5 h-5 text-blue-500" />
          </div>
          <p className={`text-3xl font-black mt-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>{users.length}</p>
          <span className="text-[11px] font-semibold text-blue-500 mt-1 inline-block">Active Platform Accounts</span>
        </div>

        <div className={cardStyle}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold ${isDark ? 'text-white/40' : 'text-slate-400'}`}>Total System Transactions</span>
            <Clock className="w-5 h-5 text-purple-500" />
          </div>
          <p className={`text-3xl font-black mt-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>{transactions.length}</p>
          <span className="text-[11px] font-semibold text-purple-500 mt-1 inline-block">Audit Logs</span>
        </div>
      </div>

      {/* ── TAB NAVIGATION ── */}
      <div className={`flex flex-wrap items-center gap-2 p-1.5 rounded-2xl w-fit ${isDark ? 'bg-white/5' : 'bg-slate-100 border border-slate-200'}`}>
        {[
          { id: 'pending', label: `Pending Queue (${pendingTxs.length})` },
          { id: 'wallets', label: 'Deposit Wallets Configurator' },
          { id: 'users',   label: 'User Control & Balances' },
          { id: 'all_txs', label: 'All Transactions Log' },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
              activeTab === tab.id
                ? isDark
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-emerald-600 text-white shadow-sm'
                : isDark
                  ? 'text-white/40 hover:text-white'
                  : 'text-slate-500 hover:text-slate-900'
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── TAB 1: PENDING REQUESTS QUEUE ── */}
      {activeTab === 'pending' && (
        <div className={cardStyle}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className={`text-lg font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>Pending Deposit & Withdrawal Queue</h3>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-white/40' : 'text-slate-500'}`}>Review and approve or decline user financial requests</p>
            </div>
          </div>

          {pendingTxs.length === 0 ? (
            <div className="py-16 text-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-500/40 mx-auto mb-3" />
              <p className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>No Pending Requests!</p>
              <p className={`text-xs mt-1 ${isDark ? 'text-white/40' : 'text-slate-500'}`}>All user deposits and withdrawals have been processed.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs whitespace-nowrap">
                <thead className={`border-b font-bold uppercase tracking-wider ${isDark ? 'bg-white/5 border-white/5 text-white/40' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                  <tr>
                    <th className="px-6 py-4 text-left">Type</th>
                    <th className="px-6 py-4 text-left">User</th>
                    <th className="px-6 py-4 text-left">Amount</th>
                    <th className="px-6 py-4 text-left">Asset & Network</th>
                    <th className="px-6 py-4 text-left">TxHash / Address</th>
                    <th className="px-6 py-4 text-left">Date</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-white/5' : 'divide-slate-100'}`}>
                  {pendingTxs.map(t => (
                    <tr key={t.id} className={isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'}>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-black uppercase text-[10px] ${
                          t.type === 'deposit' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}>
                          {t.type === 'deposit' ? <ArrowDownToLine className="w-3 h-3" /> : <ArrowUpFromLine className="w-3 h-3" />}
                          {t.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>User #{t.userId}</p>
                      </td>
                      <td className="px-6 py-4 font-black text-sm text-emerald-400">
                        {formatCurrency(t.amount)}
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-400">
                        {t.asset || 'Crypto'} ({t.method})
                      </td>
                      <td className="px-6 py-4 font-mono text-[11px]">
                        {t.txHash ? (
                          <span className="text-blue-400 break-all">Tx: {t.txHash}</span>
                        ) : t.walletAddress ? (
                          <span className="text-purple-400 break-all">To: {t.walletAddress}</span>
                        ) : (
                          <span className="text-slate-500">Standard</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-slate-400 font-medium">
                        {new Date(t.createdAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => handleApprove(t.id)}
                            className="px-3.5 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-black hover:bg-emerald-400 transition-colors shadow-sm">
                            Approve
                          </button>
                          <button onClick={() => { setDeclineTxId(t.id); setDeclineReason('') }}
                            className="px-3.5 py-1.5 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30 font-bold hover:bg-rose-500/30 transition-colors">
                            Decline
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ── TAB 2: DEPOSIT WALLETS CONFIGURATOR ── */}
      {activeTab === 'wallets' && (
        <div className={cardStyle}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className={`text-lg font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>Admin Deposit Wallets Configurator</h3>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-white/40' : 'text-slate-500'}`}>Configure the exact crypto deposit addresses presented to users</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleAddWallet}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-colors">
                <Plus className="w-3.5 h-3.5" /> Add Asset Wallet
              </button>
              <button onClick={() => handleSaveWallets(wallets)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors shadow-sm">
                <Save className="w-3.5 h-3.5" /> Save All Wallets
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {wallets.map((w, index) => (
              <div key={w.id} className={`p-5 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'} space-y-3`}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Wallet Label</label>
                    <input type="text" value={w.name} onChange={e => handleWalletChange(index, 'name', e.target.value)}
                      className={`w-full px-3 py-2 rounded-xl text-xs font-bold border mt-1 ${isDark ? 'bg-black/30 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'}`} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Asset Code</label>
                    <input type="text" value={w.asset} onChange={e => handleWalletChange(index, 'asset', e.target.value)}
                      className={`w-full px-3 py-2 rounded-xl text-xs font-bold border mt-1 ${isDark ? 'bg-black/30 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'}`} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Network</label>
                    <input type="text" value={w.network} onChange={e => handleWalletChange(index, 'network', e.target.value)}
                      className={`w-full px-3 py-2 rounded-xl text-xs font-bold border mt-1 ${isDark ? 'bg-black/30 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'}`} />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Crypto Deposit Address (Displayed to Users)</label>
                  <input type="text" value={w.address} onChange={e => handleWalletChange(index, 'address', e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl text-xs font-mono font-bold border mt-1 ${isDark ? 'bg-black/30 border-white/10 text-emerald-400' : 'bg-white border-slate-200 text-emerald-600'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB 3: USER CONTROL & BALANCES ── */}
      {activeTab === 'users' && (
        <div className={cardStyle}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className={`text-lg font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>Registered Users & Balance Control</h3>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-white/40' : 'text-slate-500'}`}>Override user balances or manage platform accounts</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs whitespace-nowrap">
              <thead className={`border-b font-bold uppercase tracking-wider ${isDark ? 'bg-white/5 border-white/5 text-white/40' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                <tr>
                  <th className="px-6 py-4 text-left">User ID</th>
                  <th className="px-6 py-4 text-left">Name</th>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-left">Current Balance</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-white/5' : 'divide-slate-100'}`}>
                {users.map(u => (
                  <tr key={u.id} className={isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'}>
                    <td className="px-6 py-4 font-mono font-bold text-slate-400">#{u.id}</td>
                    <td className={`px-6 py-4 font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>{u.name}</td>
                    <td className="px-6 py-4 text-slate-400">{u.email}</td>
                    <td className="px-6 py-4 font-black text-sm text-emerald-400">{formatCurrency(u.balance)}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {u.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => { setAdjustUser(u); setNewBalance(String(u.balance)); setAdjustReason('Admin Adjustment') }}
                        className="px-3.5 py-1.5 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 font-bold hover:bg-blue-500/30 transition-colors">
                        Override Balance
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── TAB 4: ALL TRANSACTIONS LOG ── */}
      {activeTab === 'all_txs' && (
        <div className={cardStyle}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className={`text-lg font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>Full Transaction Audit Log</h3>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-white/40' : 'text-slate-500'}`}>Complete history of approved, pending, and declined requests</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs whitespace-nowrap">
              <thead className={`border-b font-bold uppercase tracking-wider ${isDark ? 'bg-white/5 border-white/5 text-white/40' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                <tr>
                  <th className="px-6 py-4 text-left">Tx ID</th>
                  <th className="px-6 py-4 text-left">Type</th>
                  <th className="px-6 py-4 text-left">User</th>
                  <th className="px-6 py-4 text-left">Amount</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Date</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-white/5' : 'divide-slate-100'}`}>
                {transactions.map(t => (
                  <tr key={t.id} className={isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'}>
                    <td className="px-6 py-4 font-mono text-slate-500">{t.id}</td>
                    <td className="px-6 py-4 font-bold capitalize">{t.type}</td>
                    <td className="px-6 py-4">User #{t.userId}</td>
                    <td className="px-6 py-4 font-black text-emerald-400">{formatCurrency(t.amount)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase ${
                        t.status === 'approved' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                        t.status === 'declined' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                        'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400">{new Date(t.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── DECLINE REASON MODAL ── */}
      {declineTxId && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleDeclineSubmit} className={`w-full max-w-md p-6 rounded-[24px] border shadow-2xl space-y-4 ${isDark ? 'bg-[#1A1D21] border-white/10' : 'bg-white border-slate-200'}`}>
            <h3 className={`text-lg font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>Decline Transaction</h3>
            <p className={`text-xs ${isDark ? 'text-white/40' : 'text-slate-500'}`}>Specify reason for declining this request (will be logged):</p>
            <textarea value={declineReason} onChange={e => setDeclineReason(e.target.value)}
              placeholder="e.g. Invalid TxHash / Incorrect network / Unverified funds"
              className={`w-full p-3 rounded-xl text-xs border ${isDark ? 'bg-black/30 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} focus:outline-none`}
              rows={3} required />
            <div className="flex gap-2 justify-end pt-2">
              <button type="button" onClick={() => setDeclineTxId(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white">Cancel</button>
              <button type="submit"
                className="px-4 py-2 rounded-xl text-xs font-extrabold bg-rose-500 text-white hover:bg-rose-600">Confirm Decline</button>
            </div>
          </form>
        </div>
      )}

      {/* ── USER BALANCE ADJUST MODAL ── */}
      {adjustUser && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleBalanceSubmit} className={`w-full max-w-md p-6 rounded-[24px] border shadow-2xl space-y-4 ${isDark ? 'bg-[#1A1D21] border-white/10' : 'bg-white border-slate-200'}`}>
            <h3 className={`text-lg font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>Override User Balance</h3>
            <p className={`text-xs ${isDark ? 'text-white/40' : 'text-slate-500'}`}>Adjusting balance for <span className="font-bold text-emerald-400">{adjustUser.name}</span></p>
            
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase">New Total Balance ($)</label>
              <input type="number" step="0.01" value={newBalance} onChange={e => setNewBalance(e.target.value)}
                className={`w-full p-3 rounded-xl text-sm font-extrabold border mt-1 ${isDark ? 'bg-black/30 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} focus:outline-none`}
                required />
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase">Adjustment Reason</label>
              <input type="text" value={adjustReason} onChange={e => setAdjustReason(e.target.value)}
                className={`w-full p-3 rounded-xl text-xs border mt-1 ${isDark ? 'bg-black/30 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} focus:outline-none`}
                required />
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <button type="button" onClick={() => setAdjustUser(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-[#A3A3A3] hover:text-white">Cancel</button>
              <button type="submit"
                className="px-4 py-2 rounded-xl text-xs font-extrabold bg-emerald-500 text-slate-950 hover:bg-emerald-400">Save Balance</button>
            </div>
          </form>
        </div>
      )}

    </div>
  )
}
