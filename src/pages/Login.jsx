import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { Eye, EyeOff, ArrowRight, Zap, ShieldCheck, TrendingUp, Users, X } from 'lucide-react'

const STATS = [
  { value: '$48M+', label: 'Total Volume Copied' },
  { value: '12,400+', label: 'Active Investors' },
  { value: '31%', label: 'Avg Monthly ROI' },
]

const FEATURES = [
  { icon: TrendingUp, text: 'Copy top-performing affiliate partners automatically' },
  { icon: ShieldCheck, text: 'KYC-verified partners with audited track records' },
  { icon: Users, text: 'Real-time payout tracking and portfolio analytics' },
]

export default function Login() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow]         = useState(false)
  const [loading, setLoading]   = useState(false)
  const { login }               = useAuth()
  const { addToast }            = useToast()
  const navigate                = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const result = await login(email, password)
    setLoading(false)
    if (result.success) {
      addToast('Welcome back!', 'success')
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

      {/* ── LEFT PANEL (Branding) ────────────────────── */}
      <div className="hidden lg:flex w-[45%] xl:w-[40%] bg-[#1c5541] relative flex-col justify-between p-12 xl:p-16 overflow-hidden">
        
        {/* Logo */}
        <div className="relative z-10 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-[10px] bg-[#C3F53C] flex items-center justify-center">
            <span className="text-[#004d3d] font-black text-xl">S</span>
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">
            scalely<span className="text-[#C3F53C] font-light">.ai</span>
          </span>
        </div>

        {/* Big headline */}
        <div className="relative z-10 mt-8 space-y-12">
          <div className="space-y-4">
            <p className="text-[#C3F53C] text-[13px] font-bold uppercase tracking-widest">
              Automated Returns
            </p>
            <h1 className="text-3xl xl:text-4xl font-bold text-white leading-[1.1] tracking-tight">
              Copy the best.<br />
              <span className="text-[#C3F53C]">
                Earn passively.
              </span>
            </h1>
            <p className="text-white/80 text-[17px] font-medium mt-4 leading-relaxed max-w-[90%]">
              Mirror top affiliate partners and let your capital work automatically. No experience needed.
            </p>
          </div>

          {/* Feature list */}
          <div className="space-y-5">
            {FEATURES.map(f => (
              <div key={f.text} className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-[12px] bg-white/10 flex items-center justify-center flex-shrink-0">
                  <f.icon className="w-[18px] h-[18px] text-[#C3F53C]" />
                </div>
                <p className="text-white/90 text-[15px] font-medium tracking-wide">{f.text}</p>
              </div>
            ))}
          </div>

          {/* Stats Grid */}
          <div className="flex items-center gap-6 pt-4">
            {STATS.map(s => (
              <div key={s.label}>
                <p className="text-3xl font-bold text-white tracking-tight">{s.value}</p>
                <p className="text-white/60 text-[11px] font-semibold mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="relative z-10 p-6 rounded-lg bg-white/5 border border-white/10 max-w-md mt-12">
          <p className="text-white/90 text-[15px] font-medium leading-relaxed italic">
            "Scalely completely changed how I generate passive income. My portfolio grew 28% in the first month without any manual effort."
          </p>
          <div className="flex items-center gap-3 mt-5">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Testimonial"
              className="w-10 h-10 rounded-full border border-white/20 object-cover"
            />
            <div>
              <p className="text-white text-[13px] font-bold">Alex Morgan</p>
              <p className="text-white/60 text-[11px] font-medium mt-0.5">Investor since 2024</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ─────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-10 py-12 bg-[#FAFAFA] min-h-screen relative">
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
          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome back</h2>
            <p className="text-slate-500 text-sm font-medium mt-2">Sign in to your account to continue</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
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
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[12px] font-semibold text-slate-900 uppercase tracking-wide">
                  Password
                </label>
                <a href="#" className="text-[12px] font-medium text-[#005645] hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#005645] text-white text-sm font-semibold hover:bg-[#004235] active:scale-[0.99] transition-all shadow-sm flex items-center justify-center gap-2 mt-2"
            >
              {loading
                ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <><span>Sign In</span><ArrowRight className="w-4 h-4" /></>
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

          <p className="text-center text-[13px] font-medium text-slate-600 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#005645] font-bold hover:underline">
              Create one free
            </Link>
          </p>

          <p className="text-center text-[11px] font-medium text-slate-500 mt-6">
            By continuing you agree to our{' '}
            <a href="#" className="hover:underline">Terms</a> &amp;{' '}
            <a href="#" className="hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  )
}
