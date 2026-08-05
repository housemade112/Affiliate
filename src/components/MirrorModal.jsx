import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import { formatCurrency } from '../lib/utils.js'
import { api } from '../lib/api.js'
import { X, CheckCircle2, DollarSign, ArrowRight, TrendingUp } from 'lucide-react'

export default function MirrorModal({ marketer, isOpen, onClose, onSuccess }) {
  const { user } = useAuth()
  const { addToast } = useToast()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const [deposit, setDeposit]       = useState(marketer?.minDeposit || 500)
  const [submitting, setSubmitting] = useState(false)

  if (!isOpen || !marketer) return null

  const estimatedMonthlyReturn = (deposit * (marketer.monthlyReturn / 100)).toFixed(2)
  const projectedQuarterlyReturn = (estimatedMonthlyReturn * 3).toFixed(2)

  const handleConfirm = async (e) => {
    e.preventDefault()
    if (!user) { addToast('Please sign in to copy marketers', 'warning'); return }
    if (user.balance < deposit) {
      addToast(`Insufficient balance. You need at least ${formatCurrency(deposit)}`, 'error')
      return
    }

    setSubmitting(true)
    try {
      // API call now ignores multiplier/stoploss (sends defaults)
      const res = await api.mirror.add(user.id, marketer.id, 1.0, 10, deposit)
      setSubmitting(false)
      if (res.success) {
        addToast(`Copy allocation active for ${marketer.name}!`, 'success')
        if (onSuccess) onSuccess(res)
        onClose()
      } else {
        addToast(res.error || 'Copy setup failed', 'error')
      }
    } catch (err) {
      setSubmitting(false)
      addToast(err.message || 'Error configuring copy strategy', 'error')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className={`max-w-md w-full p-6 sm:p-8 rounded-[28px] shadow-2xl relative overflow-hidden space-y-6 ${isDark ? 'bg-[#1A1D21] border border-white/5' : 'bg-white border border-slate-200/80'}`}>
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className={`absolute top-5 right-5 p-2 rounded-full transition-colors ${isDark ? 'text-slate-400 hover:text-white hover:bg-white/10' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'}`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-4 pb-4 border-b border-slate-100/10">
          <div className="relative">
            <img src={marketer.avatar} alt={marketer.name} className="w-14 h-14 rounded-2xl object-cover border border-slate-200/50" />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
              <CheckCircle2 className="w-3 h-3 text-white" />
            </div>
          </div>
          <div>
            <h3 className={`font-extrabold text-xl tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{marketer.name}</h3>
            <p className={`text-xs font-semibold mt-0.5 ${isDark ? 'text-white/50' : 'text-slate-500'}`}>
              {marketer.niche} • <span className="text-[#005645] font-bold">+{marketer.monthlyReturn}% avg monthly</span>
            </p>
          </div>
        </div>

        <form onSubmit={handleConfirm} className="space-y-6">
          
          {/* SECTION 1: CAPITAL ALLOCATION */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                <DollarSign className="w-4 h-4 text-[#005645]" /> Investment Amount
              </span>
              <div className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                <span className={`text-sm font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>$</span>
                <input 
                  type="number" 
                  min={marketer.minDeposit}
                  max={25000}
                  value={deposit}
                  onChange={e => setDeposit(Math.max(marketer.minDeposit, parseFloat(e.target.value) || 0))}
                  className={`w-24 bg-transparent text-right font-extrabold text-base focus:outline-none ${isDark ? 'text-white' : 'text-slate-900'}`}
                />
              </div>
            </div>

            <input 
              type="range" 
              min={marketer.minDeposit} 
              max="25000" 
              step="250" 
              value={deposit} 
              onChange={e => setDeposit(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#005645]"
            />

            <div className={`flex justify-between items-center text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              <span>Min Required: <strong className={isDark ? 'text-white' : 'text-slate-900'}>${marketer.minDeposit}</strong></span>
              <span>Available Cash: <strong className="text-[#005645]">{formatCurrency(user?.balance || 0)}</strong></span>
            </div>
          </div>

          {/* SECTION 2: PROJECTED RETURNS */}
          <div className="space-y-3 pt-2">
            <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              <TrendingUp className="w-4 h-4 text-[#005645]" /> Projected Profit
            </span>

            <div className="grid grid-cols-2 gap-3">
              <div className={`p-4 rounded-2xl text-center border ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-100'}`}>
                <span className={`text-[10px] uppercase font-bold tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Est. Monthly</span>
                <span className={`text-xl font-black mt-1 block ${isDark ? 'text-white' : 'text-slate-900'}`}>+${parseFloat(estimatedMonthlyReturn).toLocaleString()}</span>
              </div>
              <div className={`p-4 rounded-2xl text-center border ${isDark ? 'bg-white/5 border-emerald-900/30' : 'bg-emerald-50 border-emerald-100'}`}>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#005645]">Est. 90-Day</span>
                <span className="text-xl font-black mt-1 block text-[#005645]">+${parseFloat(projectedQuarterlyReturn).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* ACTION BUTTON */}
          <button 
            type="submit" 
            disabled={submitting} 
            className="btn-lime w-full py-4 text-sm font-extrabold uppercase tracking-wider shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-[#005645]/30 border-t-[#005645] rounded-full animate-spin" />
                Executing Allocation…
              </span>
            ) : (
              <>Start Copying <ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </form>

      </div>
    </div>
  )
}
