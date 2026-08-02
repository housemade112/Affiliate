import { useAuth } from '../../context/AuthContext.jsx'
import { useToast } from '../../context/ToastContext.jsx'
import { formatCurrency } from '../../lib/utils.js'
import { CheckCircle, XCircle, Clock, ArrowDownLeft, ArrowUpRight, Activity } from 'lucide-react'
import { useState } from 'react'

export default function AdminRequests() {
  const { getTransactions, updateTransaction, updateUser, getUserById } = useAuth()
  const { addToast } = useToast()
  const [filter, setFilter] = useState('all')

  const transactions = getTransactions()
  const filtered = filter === 'all' ? transactions : transactions.filter(t => t.status === filter)

  const handleApprove = (tx) => {
    updateTransaction(tx.id, { status: 'approved', processedAt: new Date().toISOString() })
    if (tx.type === 'deposit') {
      const u = getUserById(tx.userId)
      if (u) updateUser(tx.userId, { balance: (u.balance || 0) + tx.amount })
    } else if (tx.type === 'withdrawal') {
      const u = getUserById(tx.userId)
      if (u && u.balance >= tx.amount) updateUser(tx.userId, { balance: u.balance - tx.amount })
    }
    addToast('Request approved', 'success')
  }

  const handleDecline = (tx) => {
    updateTransaction(tx.id, { status: 'declined', processedAt: new Date().toISOString() })
    addToast('Request declined', 'error')
  }

  const statusIcon = (status) => {
    if (status === 'approved') return <CheckCircle className="w-4 h-4 text-emerald-400" />
    if (status === 'declined') return <XCircle className="w-4 h-4 text-rose-400" />
    return <Clock className="w-4 h-4 text-amber-400" />
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Pending Requests</h1>
          <p className="text-slate-400 mt-1">{transactions.filter(t => t.status === 'pending').length} pending</p>
        </div>
        <div className="flex gap-2">
          {['all', 'pending', 'approved', 'declined'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                filter === f
                  ? 'bg-indigo-500 text-white'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="table-header">Type</th>
              <th className="table-header">User</th>
              <th className="table-header">Amount</th>
              <th className="table-header">Status</th>
              <th className="table-header">Date</th>
              <th className="table-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(tx => (
              <tr key={tx.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                <td className="table-cell">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      tx.type === 'deposit' ? 'bg-emerald-500/10' : tx.type === 'withdrawal' ? 'bg-rose-500/10' : 'bg-indigo-500/10'
                    }`}>
                      {tx.type === 'deposit' ? (
                        <ArrowDownLeft className="w-4 h-4 text-emerald-400" />
                      ) : tx.type === 'withdrawal' ? (
                        <ArrowUpRight className="w-4 h-4 text-rose-400" />
                      ) : (
                        <Activity className="w-4 h-4 text-indigo-400" />
                      )}
                    </div>
                    <span className="text-white capitalize">{tx.type.replace('_', ' ')}</span>
                  </div>
                </td>
                <td className="table-cell">
                  <div>
                    <p className="text-sm text-white">{tx.userName || 'Unknown'}</p>
                    <p className="text-xs text-slate-400">{tx.userEmail}</p>
                  </div>
                </td>
                <td className="table-cell font-medium text-white">{formatCurrency(tx.amount)}</td>
                <td className="table-cell">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                    tx.status === 'approved' ? 'text-emerald-400 bg-emerald-500/10' :
                    tx.status === 'declined' ? 'text-rose-400 bg-rose-500/10' :
                    'text-amber-400 bg-amber-500/10'
                  }`}>
                    {statusIcon(tx.status)}
                    {tx.status}
                  </span>
                </td>
                <td className="table-cell text-slate-400">
                  {new Date(tx.createdAt).toLocaleDateString()}
                </td>
                <td className="table-cell">
                  {tx.status === 'pending' && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleApprove(tx)}
                        className="px-3 py-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 rounded-lg hover:bg-emerald-500/20 transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleDecline(tx)}
                        className="px-3 py-1.5 text-xs font-medium text-rose-400 bg-rose-500/10 rounded-lg hover:bg-rose-500/20 transition-colors"
                      >
                        Decline
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
