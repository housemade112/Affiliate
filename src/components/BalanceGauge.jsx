import { formatCurrency } from '../lib/utils.js'
import { TrendingUp } from 'lucide-react'

export default function BalanceGauge({ total, deployed, liquid, ProfitPct = 14.2 }) {
  const pct = total > 0 ? Math.round((deployed / total) * 100) : 0
  const circumference = Math.PI * 80
  const filled = (pct / 100) * circumference

  return (
    <div className="bento-card h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="bento-label">Current balance</p>
          <p className="text-xs text-slate-500 mt-0.5">Liquid + deployed capital</p>
        </div>
        <div className="flex items-center gap-1 text-xs font-bold text-[#005645] bg-emerald-50 px-2 py-1 rounded-full">
          <TrendingUp className="w-3 h-3" /> {ProfitPct}%
        </div>
      </div>

      <div className="bento-card-lime flex-1 flex flex-col items-center justify-center relative min-h-[200px]">
        <div className="relative w-44 h-24 mt-2">
          <svg viewBox="0 0 180 90" className="w-full h-full overflow-visible">
            <path
              d="M 10 80 A 80 80 0 0 1 170 80"
              fill="none"
              stroke="#141414"
              strokeWidth="18"
              strokeLinecap="round"
            />
            <path
              d="M 10 80 A 80 80 0 0 1 170 80"
              fill="none"
              stroke="url(#gaugeStripe)"
              strokeWidth="18"
              strokeLinecap="round"
              strokeDasharray={`${filled} ${circumference}`}
            />
            <defs>
              <pattern id="gaugeStripe" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(-45)">
                <rect width="4" height="8" fill="#141414" />
                <rect x="4" width="4" height="8" fill="#A8E026" />
              </pattern>
            </defs>
          </svg>
          <div className="absolute inset-x-0 bottom-0 text-center">
            <p className="text-2xl font-bold font-mono text-[#141414]">{formatCurrency(total)}</p>
            <p className="text-[10px] font-mono text-[#141414]/60 mt-0.5">{pct}% deployed</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full mt-4 pt-4 border-t border-[#141414]/10">
          <div>
            <p className="text-[9px] font-mono font-bold uppercase text-[#141414]/50">Liquid</p>
            <p className="text-sm font-bold font-mono">{formatCurrency(liquid)}</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] font-mono font-bold uppercase text-[#141414]/50">Deployed</p>
            <p className="text-sm font-bold font-mono">{formatCurrency(deployed)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
