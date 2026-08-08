import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { Eye, EyeOff, ArrowRight, Zap, CheckCircle, Camera, CheckCircle2, X } from 'lucide-react'

const PERKS = [
  'No trading experience required',
  'Copy verified top-earners automatically',
  'Real-time portfolio tracking & analytics',
  'Withdraw profits anytime, no lock-ins',
]

export default function Signup() {
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow]         = useState(false)
  const [loading, setLoading]   = useState(false)
  const [selfieVerified, setSelfieVerified] = useState(false)
  const [selfieFileName, setSelfieFileName] = useState('')
  const { register, login }     = useAuth()
  const { addToast }            = useToast()
  const navigate                = useNavigate()

  const handleSelfie = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelfieFileName(file.name)
      setSelfieVerified(true)
      addToast('Selfie verified successfully', 'success')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selfieVerified) {
      addToast('Please complete the selfie verification', 'error')
      return
    }
    setLoading(true)
    const result = await register(name, email, password)
    setLoading(false)
    if (result.success) {
      addToast('Account created! Welcome aboard.', 'success')
      navigate('/dashboard')
    } else {
      addToast(result.error, 'error')
    }
  }

  const handleDemo = async () => {
    setLoading(true)
    const result = await login('demo@mirrormarket.net', 'password123')
    setLoading(false)
    if (result.success) {
      addToast('Demo access granted!', 'success')
      navigate('/dashboard')
    } else {
      addToast(result.error || 'Demo login failed', 'error')
    }
  }

  return (
    <div className="min-h-screen flex font-sans">

      {/* ── RIGHT (form) first on mobile, LEFT on desktop ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-10 py-12 bg-[#FAFAFA] relative">
        <Link to="/" className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-200/60 transition-colors" title="Go to Home">
          <X className="w-6 h-6 text-slate-400 hover:text-slate-700" />
        </Link>
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-xl bg-[#005645] flex items-center justify-center">
            <span className="text-[#C3F53C] font-black text-lg">S</span>
          </div>
          <span className="text-xl font-bold text-slate-900">
            scalely<span className="text-[#005645] font-light">.ai</span>
          </span>
        </div>

        <div className="w-full max-w-[400px]">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Create your account</h2>
            <p className="text-slate-500 text-sm font-medium mt-2">Start copying top performers in under 2 minutes</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[12px] font-semibold text-slate-900 mb-1.5 uppercase tracking-wide">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Jane Doe"
                required
                className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none focus:border-[#005645] focus:ring-2 focus:ring-[#005645]/10 transition-all"
              />
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-slate-900 mb-1.5 uppercase tracking-wide">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none focus:border-[#005645] focus:ring-2 focus:ring-[#005645]/10 transition-all"
              />
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-slate-900 mb-1.5 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  required
                  minLength={6}
                  className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none focus:border-[#005645] focus:ring-2 focus:ring-[#005645]/10 transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-[12px] font-semibold text-slate-900 mb-1.5 uppercase tracking-wide">
                Bot Verification
              </label>
              <input 
                type="file" 
                accept="image/*" 
                capture="user" 
                onChange={handleSelfie} 
                className="hidden" 
                id="selfie-upload" 
              />
              <label
                htmlFor={selfieVerified ? undefined : "selfie-upload"}
                className={`w-full py-3.5 rounded-xl border-2 border-dashed flex items-center justify-center gap-2 text-sm font-bold transition-all ${
                  selfieVerified 
                    ? 'border-[#005645] bg-[#005645]/5 text-[#005645] cursor-default' 
                    : 'border-slate-300 bg-slate-50 text-slate-700 hover:border-slate-400 hover:bg-slate-100 cursor-pointer'
                }`}
              >
                {selfieVerified ? (
                  <><CheckCircle2 className="w-4 h-4 text-[#005645]" /> Identity Verified</>
                ) : (
                  <><Camera className="w-4 h-4" /> Take Selfie to Verify</>
                )}
              </label>
              <p className="text-[11px] font-semibold text-slate-500 mt-1.5 text-center">Required to prevent bots and fake accounts</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#005645] text-white text-sm font-semibold hover:bg-[#004235] active:scale-[0.99] transition-all shadow-sm flex items-center justify-center gap-2 mt-2"
            >
              {loading
                ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <><span>Create Free Account</span><ArrowRight className="w-4 h-4" /></>
              }
            </button>

            <div className="relative flex items-center gap-3 py-1">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">or</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            <button
              type="button"
              onClick={handleDemo}
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#C3F53C] text-[#004d3d] text-sm font-bold hover:bg-[#aeda20] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4" />
              Try Instant Demo (No Sign Up)
            </button>
          </form>

          <p className="text-[13px] font-medium text-slate-600 text-center mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-[#005645] font-bold hover:underline">
              Sign in
            </Link>
          </p>

          <p className="text-center text-[11px] font-medium text-slate-500 mt-6">
            By signing up you agree to our{' '}
            <a href="#" className="hover:underline">Terms</a> &amp;{' '}
            <a href="#" className="hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL (Branding) ────────────────────── */}
      <div className="hidden lg:flex lg:w-[52%] bg-[#1c5541] relative flex-col justify-between p-12 xl:p-16 overflow-hidden">
        
        {/* Logo */}
        <div className="relative z-10 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-[10px] bg-[#C3F53C] flex items-center justify-center">
            <span className="text-[#004d3d] font-black text-xl">S</span>
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">
            scalely<span className="text-[#C3F53C] font-light">.ai</span>
          </span>
        </div>

        {/* Main content */}
        <div className="relative z-10 mt-8 space-y-12">
          <div className="space-y-4">
            <p className="text-[#C3F53C] text-[13px] font-bold uppercase tracking-widest">Join 12,400+ Investors</p>
            <h1 className="text-3xl xl:text-4xl font-bold text-white leading-[1.1] tracking-tight">
              Start copying the<br />
              <span className="text-[#C3F53C]">
                top 1% of earners
              </span>
            </h1>
            <p className="text-white/80 text-[17px] font-medium mt-4 leading-relaxed max-w-[90%]">
              No charts to read. No strategies to learn. Just set your allocation and watch your balance grow.
            </p>
          </div>

          {/* Perks */}
          <div className="space-y-5">
            {PERKS.map(p => (
              <div key={p} className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-[12px] bg-[#C3F53C] flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-[18px] h-[18px] text-[#004d3d]" />
                </div>
                <p className="text-white/90 text-[15px] font-medium tracking-wide">{p}</p>
              </div>
            ))}
          </div>

          {/* Partner avatars */}
          <div className="space-y-4 pt-4">
            <p className="text-white/60 text-[11px] font-semibold uppercase tracking-widest">Top Partners You Can Copy Today</p>
            <div className="flex items-center gap-4">
              {['Sarah Chen','Marcus Johnson','Elena Rodriguez','James Park'].map((n, i) => (
                <div key={n} className="flex flex-col items-center gap-2 group cursor-pointer">
                  <img
                    src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 12}.jpg`}
                    alt={n}
                    className="w-14 h-14 rounded-lg border-2 border-white/20 bg-white/10 object-cover group-hover:scale-105 group-hover:border-[#C3F53C] transition-all shadow-md"
                  />
                  <p className="text-white/80 text-[11px] font-bold text-center leading-tight w-14 truncate">{n.split(' ')[0]}</p>
                </div>
              ))}
              <div className="w-14 h-14 rounded-lg border-2 border-dashed border-white/20 flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors cursor-pointer mb-[19px]">
                <span className="text-white/60 text-xs font-bold">+8</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar Stats */}
        <div className="relative z-10 flex items-center gap-6 pt-4">
          {[['$48M+','Volume Copied'],['31%','Avg Monthly ROI'],['99.9%','Uptime']].map(([v,l]) => (
            <div key={l}>
              <p className="text-3xl font-bold text-white tracking-tight">{v}</p>
              <p className="text-white/60 text-[11px] font-semibold mt-1">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
