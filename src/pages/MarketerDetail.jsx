import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import { api } from '../lib/api.js'
import { formatCurrency } from '../lib/utils.js'
import {
  ArrowLeft, Star, CheckCircle2, TrendingUp,
  Users, Shield, Zap, Check, AlertCircle, Package, ArrowUpRight
} from 'lucide-react'
import MirrorModal from '../components/MirrorModal.jsx'
import { useState, useEffect } from 'react'

export default function MarketerDetail() {
  const { id }       = useParams()
  const navigate     = useNavigate()
  const { user, unmirrorAffiliate } = useAuth()
  const { addToast } = useToast()
  const { theme }    = useTheme()
  const isDark       = theme === 'dark'

  const [aff, setAff]             = useState(null)
  const [history, setHistory]     = useState([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [unmirroring, setUnmirroring] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(null)
    Promise.all([
      api.marketers.get(id),
      api.marketers.history(id),
    ]).then(([detailRes, histRes]) => {
      if (!detailRes.marketer) { setError('Partner not found'); setLoading(false); return }
      setAff(detailRes.marketer)
      setHistory(histRes.history || [])
      setLoading(false)
    }).catch(() => {
      setError('Partner profile not found.')
      setLoading(false)
    })
  }, [id])

  const isCurrentlyMirrored = user?.mirroredAffiliates?.includes(id)

  const handleUnmirror = async () => {
    setUnmirroring(true)
    await unmirrorAffiliate(id)
    setUnmirroring(false)
    addToast('Stopped copying strategy', 'info')
  }

  const card = `rounded-[24px] border shadow-sm transition-colors ${isDark ? 'bg-[#1A1D21] border-white/5' : 'bg-white border-slate-200/80'}`

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5">
      <div className={`w-20 h-20 rounded-3xl flex items-center justify-center ${isDark ? 'bg-white/5' : 'bg-slate-100'}`}>
        <AlertCircle className="w-10 h-10 text-rose-400" />
      </div>
      <div className="text-center">
        <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Partner Not Found</p>
        <p className={`text-sm mt-1 ${isDark ? 'text-white/40' : 'text-slate-500'}`}>{error}</p>
      </div>
      <button onClick={() => navigate('/marketers')}
        className="btn-lime text-sm">
        Back to Directory
      </button>
    </div>
  )

  if (loading) return (
    <div className="space-y-6 animate-pulse pb-24">
      <div className={`h-8 w-48 rounded-xl ${isDark ? 'bg-white/5' : 'bg-slate-100'}`} />
      <div className={`h-64 rounded-[24px] ${isDark ? 'bg-white/5' : 'bg-slate-100'}`} />
      <div className="grid lg:grid-cols-3 gap-6">
        {[1,2,3].map(i => <div key={i} className={`h-40 rounded-[24px] ${isDark ? 'bg-white/5' : 'bg-slate-100'}`} />)}
      </div>
    </div>
  )

  if (!aff) return null

  const revenue = aff.revenue >= 1_000_000
    ? `$${(aff.revenue / 1_000_000).toFixed(1)}M`
    : `$${(aff.revenue / 1_000).toFixed(0)}K`

  return (
    <div className="space-y-6 animate-fade-in pb-24 max-w-5xl mx-auto">

      {/* Back */}
      <div className="pt-6">
        <button onClick={() => navigate(-1)}
          className={`flex items-center gap-2 text-sm font-bold transition-colors ${isDark ? 'text-white/50 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>
          <ArrowLeft className="w-4 h-4" /> Back to Directory
        </button>
      </div>

      {/* ── PROFILE HERO ── */}
      <div className={`${card} p-8`}>
        <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
          
          <div className="flex flex-col sm:flex-row gap-6 items-start flex-1">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <img src={aff.avatar} alt={aff.name}
                className="w-24 h-24 rounded-[20px] object-cover border-2 border-slate-200 shadow-md"
                onError={e => { e.target.style.display = 'none' }} />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center shadow-md">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className={`text-3xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{aff.name}</h1>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${isDark ? 'bg-emerald-900/40 text-emerald-400 border border-emerald-800/40' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>
                    <Shield className="w-3 h-3" /> Verified Partner
                  </span>
                </div>
                <p className={`text-sm font-semibold ${isDark ? 'text-white/50' : 'text-slate-500'}`}>{aff.niche}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {(aff.products || []).map((prod, i) => (
                  <span key={i}
                    className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border ${isDark ? 'bg-[#C3F53C]/10 text-[#C3F53C] border-[#C3F53C]/20' : 'bg-emerald-50 text-[#005645] border-emerald-100'}`}>
                    <Package className="w-3 h-3" />
                    {typeof prod === 'object' ? prod.name : prod}
                  </span>
                ))}
              </div>

              <div className={`flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold ${isDark ? 'text-white/40' : 'text-slate-500'}`}>
                <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-[#005645]" /> {aff.followers} followers</span>
                <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-amber-500 fill-amber-500" /> {aff.rating} / 5.0 rating</span>
              </div>
            </div>
          </div>

          {/* Revenue Block */}
          <div className={`flex-shrink-0 text-right p-6 rounded-[20px] ${isDark ? 'bg-white/5 border border-white/5' : 'bg-slate-50 border border-slate-100'}`}>
            <p className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-white/30' : 'text-slate-400'}`}>Lifetime Revenue</p>
            <p className={`text-4xl font-extrabold mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{revenue}</p>
            <p className="text-xl font-extrabold text-[#005645] mt-2 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-xl inline-block">
              +{aff.monthlyReturn}% / mo
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <div className={`grid grid-cols-3 gap-4 mt-8 p-4 rounded-[18px] ${isDark ? 'bg-white/5 border border-white/5' : 'bg-slate-50 border border-slate-100'}`}>
          {[
            { label: 'Min Deposit', value: formatCurrency(aff.minDeposit) },
            { label: 'Monthly Profit', value: `+${aff.monthlyReturn}%`, highlight: true },
            { label: 'Est. Monthly Return', value: formatCurrency((aff.minDeposit * aff.monthlyReturn) / 100) },
          ].map(s => (
            <div key={s.label} className="text-center">
              <p className={`text-sm font-extrabold ${s.highlight ? 'text-[#005645] dark:text-[#C3F53C]' : isDark ? 'text-white' : 'text-slate-900'}`}>{s.value}</p>
              <p className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${isDark ? 'text-white/30' : 'text-slate-400'}`}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`mt-8 pt-6 border-t flex flex-wrap items-center justify-between gap-4 ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
          <div className="flex flex-wrap gap-3">
            <span className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border ${isDark ? 'bg-white/5 border-white/5 text-white/40' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Accepting New Copies
            </span>
          </div>
          {isCurrentlyMirrored ? (
            <button onClick={handleUnmirror} disabled={unmirroring}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-extrabold text-sm transition-all ${
                isDark ? 'bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20' : 'bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100'
              }`}>
              {unmirroring
                ? <span className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                : <><Check className="w-4 h-4" /> Currently Copying (Stop)</>
              }
            </button>
          ) : (
            <button onClick={() => setModalOpen(true)} className={`flex items-center gap-2 px-8 py-3 rounded-2xl text-sm font-extrabold shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all ${
              isDark ? 'bg-white text-slate-900 hover:bg-white/90' : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}>
              <Zap className="w-4 h-4" /> Start Copying This Partner
            </button>
          )}
        </div>
      </div>

      {/* ── PERFORMANCE HISTORY ── */}
      {history.length > 0 && (
        <div className={`${card} p-8`}>
          <div className={`flex items-center justify-between border-b pb-5 mb-6 ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
            <div>
              <h3 className={`text-xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>12-Month Performance</h3>
              <p className={`text-xs font-semibold mt-1 ${isDark ? 'text-white/40' : 'text-slate-400'}`}>Audited monthly revenue data</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold mt-4 md:mt-0">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-md bg-[#AA96F7]" />
                <span className={isDark ? 'text-white/40' : 'text-slate-500'}>Revenue</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-md bg-[#C3F53C]" />
                <span className={isDark ? 'text-white/40' : 'text-slate-500'}>Profit</span>
              </div>
            </div>
          </div>

          {/* Bar chart via CSS */}
          <div className="flex items-end gap-3 h-48 w-full mt-8">
            {history.map((m, i) => {
              const maxRev = Math.max(...history.map(h => h.revenue))
              const pct    = (m.revenue / maxRev) * 100
              return (
                <div key={i} className="flex-1 h-full flex flex-col justify-end items-center gap-2 group">
                  <div className="w-full relative rounded-t-xl rounded-b-md overflow-hidden flex flex-col-reverse transition-all group-hover:opacity-80" 
                       style={{height: `${Math.max(pct, 15)}%`}}>
                    <div className="w-full bg-[#AA96F7] transition-all" style={{height:'40%'}} />
                    <div className="w-full bg-[#C3F53C] transition-all" style={{height:'60%'}} />
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-white/40' : 'text-slate-400'}`}>{m.month}</span>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            {[
              { label: 'Best Month', value: formatCurrency(Math.max(...history.map(h => h.revenue))) },
              { label: 'Avg Monthly', value: formatCurrency(history.reduce((s, h) => s + h.revenue, 0) / history.length) },
              { label: 'Total 12-Month', value: formatCurrency(history.reduce((s, h) => s + h.revenue, 0)) },
            ].map(s => (
              <div key={s.label} className={`p-4 rounded-2xl text-center ${isDark ? 'bg-white/5 border border-white/5' : 'bg-slate-50 border border-slate-100'}`}>
                <p className={`text-lg font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>{s.value}</p>
                <p className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${isDark ? 'text-white/30' : 'text-slate-400'}`}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── PRODUCTS ── */}
      {aff.products && aff.products.length > 0 && (
        <div className={`${card} p-8`}>
          <h3 className={`text-xl font-extrabold mb-5 ${isDark ? 'text-white' : 'text-slate-900'}`}>Products & Offerings</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {aff.products.map((prod, i) => {
              const p = typeof prod === 'object' ? prod : { name: prod, price: null, type: 'Product' }
              return (
                <div key={i} className={`p-5 rounded-2xl border transition-all hover:-translate-y-0.5 ${isDark ? 'bg-white/5 border-white/5 hover:border-[#C3F53C]/30' : 'bg-slate-50 border-slate-100 hover:border-[#005645]/30'}`}>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#005645] text-[#C3F53C] flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Package className="w-5 h-5" />
                    </div>
                    <div>
                      <p className={`font-extrabold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>{p.name}</p>
                      <p className={`text-[11px] font-semibold mt-0.5 ${isDark ? 'text-white/40' : 'text-slate-400'}`}>{p.type}</p>
                      {p.price && <p className="text-[#005645] font-extrabold text-sm mt-2">{formatCurrency(p.price)}</p>}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {aff && (
        <MirrorModal marketer={aff} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      )}
    </div>
  )
}
