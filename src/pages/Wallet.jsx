import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { formatCurrency } from '../lib/utils.js'
import { Wallet as WalletIcon, ArrowDownLeft, ArrowUpRight, Clock, CheckCircle, XCircle } from 'lucide-react'

export default function Wallet() {
  const { user, addTransaction, getTransactions } = useAuth()
  const { addToast } = useToast()
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('deposit')
  const [loading, setLoading] = useState(false)

  const transactions = getTransactions().filter(t => t.userId === user?.id)

  const handleSubmit = (e) => {
    e.preventDefault()
    const val = parseFloat(amount)
    if (!val || val <= 0) { addToast('Enter a valid amount', 'error'); return }
    setLoading(true)
    addTransaction(type, val, 'pending')
    setLoading(false)
    setAmount('')
    addToast(`${type === 'deposit' ? 'Deposit' : 'Withdrawal'} request submitted`, 'success')
  }

  const statusIcon = (status) => {
    if (status === 'approved') return <CheckCircle className="w-4 h-4 text-emerald-400" />
    if (status === 'declined') return <XCircle className="w-4 h-4 text-rose-400" />
    return <Clock className="w-4 h-4 text-amber-400" />
  }

  const statusClass = (status) => {
    if (status === 'approved') return 'text-emerald-400 bg-emerald-500/10'
    if (status === 'declined') return 'text-rose-400 bg-rose-500/10'
    return 'text-amber-400 bg-amber-500/10'
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white">Wallet</h1>
        <p className="text-slate-400 mt-1">Manage your funds and transactions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
              <WalletIcon className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Available Balance</p>
              <p className="text-2xl font-bold text-white">{formatCurrency(user?.balance || 0)}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Amount (USD)</label>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="input-field" placeholder="0.00" min="1" step="0.01" required />
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => setType('deposit')} className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${type === 'deposit' ? 'bg-emerald-500 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>Deposit</button>
              <button type="button" onClick={() => setType('withdrawal')} className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${type === 'withdrawal' ? 'bg-rose-500 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>Withdraw</button>
            </div>
            <button type="submit" disabled={loading} className={`w-full py-3 rounded-xl font-semibold text-white transition-all ${type === 'deposit' ? 'bg-emerald-500 hover:bg-emerald-450' : 'bg-rose-500 hover:bg-rose-450'} disabled:opacity-50`}>
              {loading ? 'Processing...' : `Request ${type === 'deposit' ? 'Deposit' : 'Withdrawal'}`}
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 glass-card p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Transaction History</h3>
          {transactions.length === 0 ? (
            <div className="text-center py-12">
              <Clock className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400">No transactions yet</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {transactions.map(tx => (
                <div key={tx.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.type === 'deposit' ? 'bg-emerald-500/10' : tx.type === 'withdrawal' ? 'bg-rose-500/10' : 'bg-violet-500/10'}`}>
                    {tx.type === 'deposit' ? <ArrowDownLeft className="w-5 h-5 text-emerald-400" /> : tx.type === 'withdrawal' ? <ArrowUpRight className="w-5 h-5 text-rose-400" /> : <WalletIcon className="w-5 h-5 text-violet-400" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white capitalize">{tx.type.replace('_', ' ')}</p>
                    <p className="text-xs text-slate-400">{new Date(tx.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold ${tx.type === 'withdrawal' ? 'text-rose-400' : 'text-emerald-400'}`}>{tx.type === 'withdrawal' ? '-' : '+'}{formatCurrency(tx.amount)}</p>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusClass(tx.status)}`}>{statusIcon(tx.status)}{tx.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
