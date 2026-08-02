import { useState } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import { useToast } from '../../context/ToastContext.jsx'
import { formatCurrency } from '../../lib/utils.js'
import { Search, Ban, CheckCircle, UserCheck, DollarSign, Edit3, Save, X } from 'lucide-react'

export default function AdminUsers() {
  const { getAllUsers, suspendUser, unsuspendUser, updateUser } = useAuth()
  const { addToast } = useToast()
  const [search, setSearch] = useState('')
  const [editingUser, setEditingUser] = useState(null)
  const [editBalance, setEditBalance] = useState('')

  const users = getAllUsers()
  const filtered = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  )

  const handleSuspend = (userId, isSuspended) => {
    if (isSuspended) {
      unsuspendUser(userId)
      addToast('User unsuspended', 'success')
    } else {
      suspendUser(userId)
      addToast('User suspended', 'warning')
    }
  }

  const startEdit = (u) => {
    setEditingUser(u.id)
    setEditBalance(u.balance?.toString() || '0')
  }

  const saveBalance = (userId) => {
    updateUser(userId, { balance: parseFloat(editBalance) || 0 })
    setEditingUser(null)
    addToast('Balance updated', 'success')
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Manage Users</h1>
          <p className="text-slate-400 mt-1">{users.length} total users</p>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
            className="input-field pl-10"
          />
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="table-header">User</th>
              <th className="table-header">Email</th>
              <th className="table-header">Role</th>
              <th className="table-header">Balance</th>
              <th className="table-header">Status</th>
              <th className="table-header">Joined</th>
              <th className="table-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                <td className="table-cell">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-xs font-bold">
                      {u.name?.split(' ').map(n => n[0]).join('') || 'U'}
                    </div>
                    <span className="font-medium text-white">{u.name}</span>
                  </div>
                </td>
                <td className="table-cell text-slate-400">{u.email}</td>
                <td className="table-cell">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    u.role === 'admin' ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-400 bg-white/5'
                  }`}>
                    {u.role}
                  </span>
                </td>
                <td className="table-cell">
                  {editingUser === u.id ? (
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-3 h-3 text-slate-500" />
                      <input
                        type="number"
                        value={editBalance}
                        onChange={(e) => setEditBalance(e.target.value)}
                        className="w-24 bg-slate-800 border border-white/10 rounded px-2 py-1 text-sm text-white"
                        autoFocus
                      />
                      <button onClick={() => saveBalance(u.id)} className="text-emerald-400 hover:text-emerald-300">
                        <Save className="w-4 h-4" />
                      </button>
                      <button onClick={() => setEditingUser(null)} className="text-slate-400 hover:text-slate-300">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => startEdit(u)} className="flex items-center gap-1 text-white hover:text-indigo-400 transition-colors">
                      {formatCurrency(u.balance || 0)}
                      <Edit3 className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                    </button>
                  )}
                </td>
                <td className="table-cell">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                    u.isSuspended ? 'text-rose-400 bg-rose-500/10' : 'text-emerald-400 bg-emerald-500/10'
                  }`}>
                    {u.isSuspended ? <Ban className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                    {u.isSuspended ? 'Suspended' : 'Active'}
                  </span>
                </td>
                <td className="table-cell text-slate-400">
                  {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}
                </td>
                <td className="table-cell">
                  <button
                    onClick={() => handleSuspend(u.id, u.isSuspended)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      u.isSuspended
                        ? 'text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20'
                        : 'text-rose-400 bg-rose-500/10 hover:bg-rose-500/20'
                    }`}
                  >
                    {u.isSuspended ? 'Unsuspend' : 'Suspend'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
