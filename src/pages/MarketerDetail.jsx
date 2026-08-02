import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { getAffiliateById } from '../data/affiliates.js'
import { formatCurrency, formatNumber } from '../lib/utils.js'
import { 
  ArrowLeft, Star, CheckCircle, MapPin, Calendar, TrendingUp, 
  Users, Target, Activity, Shield, BarChart3, Zap, Check 
} from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useState, useMemo } from 'react'

export default function MarketerDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, mirrorAffiliate, unmirrorAffiliate } = useAuth()
  const { addToast } = useToast()
  const aff = getAffiliateById(id)
  const [mirrored, setMirrored] = useState(user?.mirroredAffiliates?.includes(id) || false)

  if (!aff) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 text-lg">Marketer not found</p>
          <button onClick={() => navigate('/marketers')} className="btn-primary mt-4">
            Back to Directory
          </button>
        </div>
      </div>
    )
  }

  const chartData = useMemo(() => aff.growth.map((v, i) => ({ month: `M${i + 1}`, value: v })), [aff])
  const isMirrored = user?.mirroredAffiliates?.includes(aff.id)

  const handleMirror = () => {
    if (!user) { navigate('/login'); return }
    const result = mirrorAffiliate(aff.id, aff.minDeposit)
    if (result.success) { setMirrored(true); addToast(`Now mirroring ${aff.name}`, 'success') }
    else addToast(result.error, 'error')
  }

  const handleUnmirror = () => {
    unmirrorAffiliate(aff.id)
    setMirrored(false)
    addToast('Stopped mirroring', 'info')
  }

  const stats = [
    { label: 'Win Rate', value: `${aff.winRate}%`, icon: Target },
    { label: 'Campaigns Run', value: formatNumber(aff.totalTrades), icon: Activity },
    { label: 'Profit Factor', value: aff.profitFactor, icon: BarChart3 },
    { label: 'Sharpe Ratio', value: aff.sharpeRatio, icon: TrendingUp },
    { label: 'Max Drawdown', value: `${aff.maxDrawdown}%`, icon: Shield },
    { label: 'Experience', value: `${aff.yearsExperience} years`, icon: Calendar },
  ]

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      <button onClick={() => navigate('/marketers')} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm">
        <ArrowLeft className="w-4 h-4" /> Back to Directory
      </button>

      <div className="glass-card p-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className={`w-24 h-24 rounded-2xl ${aff.avatarColor} flex items-center justify-center text-white font-bold text-3xl flex-shrink-0`}>
            {aff.name.split(' ').map(n => n[0]).join('')}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-white">{aff.name}</h1>
              {aff.verified && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium">
                  <CheckCircle className="w-3 h-3" /> Verified
                </span>
              )}
              {aff.premium && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-medium">
                  <Star className="w-3 h-3 fill-amber-400" /> Premium
                </span>
              )}
            </div>

            <p className="text-slate-400 text-lg mb-4">{aff.niche}</p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {aff.location}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Joined {new Date(aff.joinedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
              <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {formatNumber(aff.followers)} audience</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 md:text-right">
            <div>
              <p className="text-sm text-slate-400">Total Revenue</p>
              <p className="text-3xl font-bold text-white">{formatCurrency(aff.revenue)}</p>
            </div>
            <div className="flex items-center gap-1 md:justify-end text-amber-400">
              <Star className="w-5 h-5 fill-amber-400" />
              <span className="text-xl font-bold">{aff.rating}</span>
              <span className="text-sm text-slate-400 ml-1">/ 5.0</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wide">Min Deposit</p>
              <p className="text-xl font-bold text-white">{formatCurrency(aff.minDeposit)}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wide">Monthly Return</p>
              <p className="text-xl font-bold text-emerald-400">+{aff.monthlyReturn}%</p>
            </div>
          </div>

          {isMirrored || mirrored ? (
            <button onClick={handleUnmirror} className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 transition-all">
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Mirroring Active</span>
            </button>
          ) : (
            <button onClick={handleMirror} className="btn-primary px-8 py-3 flex items-center gap-2">
              <Zap className="w-4 h-4" /> Mirror This Marketer
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="glass-card p-4 text-center">
            <s.icon className="w-5 h-5 text-violet-400 mx-auto mb-2" />
            <p className="text-lg font-bold text-white">{s.value}</p>
            <p className="text-xs text-slate-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Revenue History</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#334155" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#334155" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} itemStyle={{ color: '#10b981' }} />
                <Area type="monotone" dataKey="value" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorGrowth)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">About</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{aff.bio}</p>
          </div>
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Strategy</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{aff.strategy}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
