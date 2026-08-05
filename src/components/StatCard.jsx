import { cn } from '../lib/utils.js'

export default function StatCard({ title, value, change, icon: Icon, trend = 'up' }) {
  return (
    <div className="glass-card-hover p-6 group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-mono text-slate-400 uppercase tracking-widest">{title}</p>
          <p className="text-2xl font-bold font-mono text-white mt-2">{value}</p>
          {change && (
            <p className={cn('text-xs font-mono mt-2 flex items-center gap-1', trend === 'up' ? 'text-amber-400' : 'text-rose-400')}>
              {trend === 'up' ? '+' : ''}{change}% <span className="text-slate-500 font-sans">vs last month</span>
            </p>
          )}
        </div>
        {Icon && (
          <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center group-hover:bg-amber-500/20 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all duration-300">
            <Icon className="w-5 h-5 text-amber-400" />
          </div>
        )}
      </div>
    </div>
  )
}
