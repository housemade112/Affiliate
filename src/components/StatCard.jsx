import { cn } from '../lib/utils.js'

export default function StatCard({ title, value, change, icon: Icon, trend = 'up' }) {
  return (
    <div className="glass-card p-6 hover:border-indigo-500/20 transition-all duration-300 group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-400">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
          {change && (
            <p className={cn('text-xs font-medium mt-1', trend === 'up' ? 'text-emerald-400' : 'text-rose-400')}>
              {trend === 'up' ? '+' : ''}{change} from last month
            </p>
          )}
        </div>
        {Icon && (
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
            <Icon className="w-5 h-5 text-indigo-400" />
          </div>
        )}
      </div>
    </div>
  )
}
