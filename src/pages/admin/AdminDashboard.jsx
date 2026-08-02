import { useAuth } from '../../context/AuthContext.jsx'
import { getAllAffiliates } from '../../data/affiliates.js'
import { formatCurrency, formatNumber } from '../../lib/utils.js'
import StatCard from '../../components/StatCard.jsx'
import { Users, DollarSign, TrendingUp, Shield, Activity } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AdminDashboard() {
  const { getAllUsers, getTransactions } = useAuth()
  const users = getAllUsers()
  const affiliates = getAllAffiliates()
  const transactions = getTransactions()

  const totalUsers = users.length
  const totalRevenue = affiliates.reduce((sum, a) => sum + a.revenue, 0)
  const pendingRequests = transactions.filter(t => t.status === 'pending').length
  const suspendedUsers = users.filter(u => u.isSuspended).length

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-slate-400 mt-1">Platform overview and management</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Users" value={formatNumber(totalUsers)} icon={Users} />
        <StatCard title="Total Revenue" value={formatCurrency(totalRevenue)} icon={DollarSign} />
        <StatCard title="Pending Requests" value={pendingRequests} icon={Activity} trend="up" />
        <StatCard title="Suspended Users" value={suspendedUsers} icon={Shield} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Link to="/admin/users" className="glass-card p-6 hover:border-indigo-500/20 transition-all group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
              <Users className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Manage Users</h3>
              <p className="text-sm text-slate-400">{totalUsers} registered users</p>
            </div>
          </div>
        </Link>

        <Link to="/admin/affiliates" className="glass-card p-6 hover:border-indigo-500/20 transition-all group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Manage Affiliates</h3>
              <p className="text-sm text-slate-400">{affiliates.length} affiliates</p>
            </div>
          </div>
        </Link>

        <Link to="/admin/requests" className="glass-card p-6 hover:border-indigo-500/20 transition-all group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
              <Activity className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Pending Requests</h3>
              <p className="text-sm text-slate-400">{pendingRequests} to review</p>
            </div>
          </div>
        </Link>
      </div>

      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {transactions.slice(0, 10).map(tx => (
            <div key={tx.id} className="flex items-center gap-4 p-3 bg-white/5 rounded-lg">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                tx.type === 'deposit' ? 'bg-emerald-500/10' : tx.type === 'withdrawal' ? 'bg-rose-500/10' : 'bg-indigo-500/10'
              }`}>
                <Activity className={`w-4 h-4 ${
                  tx.type === 'deposit' ? 'text-emerald-400' : tx.type === 'withdrawal' ? 'text-rose-400' : 'text-indigo-400'
                }`} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-white capitalize">{tx.type.replace('_', ' ')} — {tx.userName || 'Unknown'}</p>
                <p className="text-xs text-slate-400">{new Date(tx.createdAt).toLocaleString()}</p>
              </div>
              <span className={`text-sm font-medium ${tx.type === 'withdrawal' ? 'text-rose-400' : 'text-emerald-400'}`}>
                {tx.type === 'withdrawal' ? '-' : '+'}{formatCurrency(tx.amount)}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                tx.status === 'approved' ? 'text-emerald-400 bg-emerald-500/10' :
                tx.status === 'declined' ? 'text-rose-400 bg-rose-500/10' :
                'text-amber-400 bg-amber-500/10'
              }`}>
                {tx.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
