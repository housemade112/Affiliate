import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import StatCard from '../components/StatCard.jsx'
import { getAllAffiliates } from '../data/affiliates.js'
import { formatCurrency } from '../lib/utils.js'
import { TrendingUp, DollarSign, Copy, Wallet, X, ArrowUpRight, Zap } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const { user, unmirrorAffiliate } = useAuth()
  const { addToast } = useToast()
  const [mirroredList, setMirroredList] = useState(user?.mirroredAffiliates || [])
  const allAffiliates = getAllAffiliates()

  const mirroredAffiliates = allAffiliates.filter(a => mirroredList.includes(a.id))
  const totalInvested = mirroredAffiliates.reduce((sum, a) => sum + a.minDeposit, 0)
  const estimatedReturn = mirroredAffiliates.reduce((sum, a) => sum + (a.minDeposit * a.monthlyReturn / 100), 0)

  const handleUnmirror = (affId) => {
    unmirrorAffiliate(affId)
    setMirroredList(prev => prev.filter(id => id !== affId))
    addToast('Stopped mirroring marketer', 'info')
  }

  const topAffiliates = [...allAffiliates].sort((a, b) => b.revenue - a.revenue).slice(0, 5)

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 mt-1">Welcome back, {user?.name}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Account Value" value={formatCurrency((user?.balance || 0) + totalInvested)} icon={DollarSign} change="12.5" />
        <StatCard title="Available Balance" value={formatCurrency(user?.balance || 0)} icon={Wallet} />
        <StatCard title="Active Mirrors" value={mirroredAffiliates.length} icon={Copy} change="3" />
        <StatCard title="Est. Monthly Earnings" value={formatCurrency(estimatedReturn)} icon={TrendingUp} change="8.2" trend="up" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Your Mirrored Marketers</h3>
            <span className="text-sm text-slate-400">{mirroredAffiliates.length} active</span>
          </div>

          {mirroredAffiliates.length === 0 ? (
            <div className="text-center py-12">
              <Zap className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400">No marketers mirrored yet</p>
              <p className="text-sm text-slate-500 mt-1">Browse the directory to start mirroring top affiliates</p>
              <Link to="/marketers" className="btn-primary inline-flex mt-4 text-sm">
                Browse Marketers
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {mirroredAffiliates.map(aff => (
                <div key={aff.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/[0.07] transition-colors">
                  <div className={`w-10 h-10 rounded-full ${aff.avatarColor} flex items-center justify-center text-white font-bold text-sm`}>
                    {aff.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-white truncate block">{aff.name}</span>
                    <p className="text-xs text-slate-400">{aff.niche}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-white">{formatCurrency(aff.minDeposit)}</p>
                    <p className="text-xs text-emerald-400">+{aff.monthlyReturn}% / mo</p>
                  </div>
                  <button onClick={() => handleUnmirror(aff.id)} className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Top Performers</h3>
          <div className="space-y-4">
            {topAffiliates.map((aff, i) => (
              <Link to={`/marketer/${aff.id}`} key={aff.id} className="flex items-center gap-3 group">
                <span className="w-6 text-center text-sm font-bold text-slate-500">{i + 1}</span>
                <div className={`w-8 h-8 rounded-full ${aff.avatarColor} flex items-center justify-center text-white text-xs font-bold`}>
                  {aff.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate group-hover:text-violet-400 transition-colors">{aff.name}</p>
                  <p className="text-xs text-slate-400">{formatCurrency(aff.revenue)} revenue</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
