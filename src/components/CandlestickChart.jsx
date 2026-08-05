import { useState } from 'react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { TrendingUp, TrendingDown } from 'lucide-react'

export default function CandlestickChart({ data = [], metrics = {} }) {
  const [range, setRange] = useState('1M')

  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center bg-neutral-950/60 rounded-2xl border border-neutral-800">
        <p className="text-slate-500 text-xs font-mono">No historical time-series data available</p>
      </div>
    )
  }

  const latest = data[data.length - 1] || {}
  const previous = data[data.length - 2] || data[0] || {}
  const latestClose = latest.close || 0
  const prevClose = previous.close || 0
  const isBullish = latestClose >= prevClose
  const changePercent = prevClose > 0 ? (((latestClose - prevClose) / prevClose) * 100).toFixed(2) : '0.00'

  return (
    <div className="space-y-5 text-white">
      
      {/* Chart Toolbar & Header Summary */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-white font-mono">${latestClose.toLocaleString()}</span>
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold font-mono ${
              isBullish ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40' : 'bg-rose-950/60 text-rose-400 border border-rose-800/40'
            }`}>
              {isBullish ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              {isBullish ? '+' : ''}{changePercent}%
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Open: ${latest.open ?? 0} | High: ${latest.high ?? 0} | Low: ${latest.low ?? 0} | Vol: ${((latest.volume) || 0).toLocaleString()}
          </p>
        </div>

        {/* Range Controls */}
        <div className="flex items-center gap-1.5 bg-neutral-950/60 p-1.5 rounded-2xl border border-neutral-800">
          {['1D', '1W', '1M', '3M', '1Y', 'ALL'].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all ${
                range === r 
                  ? 'bg-[#C3F53C] text-[#005645] shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-64 relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isBullish ? "#C3F53C" : "#EF4444"} stopOpacity={0.35}/>
                <stop offset="95%" stopColor={isBullish ? "#C3F53C" : "#EF4444"} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="date" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0A0A0A', 
                border: '1px solid #262626', 
                borderRadius: '16px', 
                color: '#fff', 
                fontFamily: 'JetBrains Mono, monospace', 
                fontSize: '12px' 
              }} 
              itemStyle={{ color: '#C3F53C' }} 
              cursor={{ stroke: '#C3F53C', strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            <Area 
              type="monotone" 
              dataKey="close" 
              stroke={isBullish ? "#C3F53C" : "#EF4444"} 
              fillOpacity={1} 
              fill="url(#chartGlow)" 
              strokeWidth={2.5} 
              dot={false}
              activeDot={{ r: 5, fill: "#C3F53C" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Numerical Metrics Strip */}
      <div className="grid grid-cols-4 gap-3 pt-2 font-mono text-center">
        <div className="p-3 bg-neutral-950/60 border border-neutral-800 rounded-2xl">
          <p className="text-[10px] text-slate-400 uppercase font-sans">WIN RATE</p>
          <p className="text-sm font-bold text-white mt-0.5">{metrics.winRate || 88}%</p>
        </div>
        <div className="p-3 bg-neutral-950/60 border border-neutral-800 rounded-2xl">
          <p className="text-[10px] text-slate-400 uppercase font-sans">PROFIT FACTOR</p>
          <p className="text-sm font-bold text-[#C3F53C] mt-0.5">{metrics.profitFactor || 2.85}</p>
        </div>
        <div className="p-3 bg-neutral-950/60 border border-neutral-800 rounded-2xl">
          <p className="text-[10px] text-slate-400 uppercase font-sans">SHARPE RATIO</p>
          <p className="text-sm font-bold text-white mt-0.5">{metrics.sharpeRatio || 2.14}</p>
        </div>
        <div className="p-3 bg-neutral-950/60 border border-neutral-800 rounded-2xl">
          <p className="text-[10px] text-slate-400 uppercase font-sans">MAX DRAWDOWN</p>
          <p className="text-sm font-bold text-rose-400 mt-0.5">{metrics.maxDrawdown || 6.2}%</p>
        </div>
      </div>

    </div>
  )
}
