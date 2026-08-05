import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { Eye, EyeOff, ArrowRight, CheckCircle2 } from 'lucide-react'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    const result = register(name, email, password)
    setLoading(false)
    if (result.success) {
      addToast('Account created successfully!', 'success')
      navigate('/dashboard')
    } else {
      addToast(result.error, 'error')
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center px-4 py-12 relative overflow-hidden font-sans">
      


      <div className="relative w-full max-w-md space-y-8">
        
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-[#C3F53C] flex items-center justify-center text-[#005645] font-black text-xl shadow-md">
              S
            </div>
            <span className="text-2xl font-black text-white tracking-tight">
              scalely<span className="text-[#C3F53C] font-normal">.ai</span>
            </span>
          </Link>
          <h1 className="text-2xl font-extrabold text-white tracking-tight pt-2">Create your account</h1>
          <p className="text-xs text-slate-400 font-mono">Start copying top performance affiliate strategies</p>
        </div>

        {/* Card Form Surface */}
        <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-3xl shadow-xl space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase font-mono mb-2">Full Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="w-full px-4 py-3.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#C3F53C] focus:ring-1 focus:ring-[#C3F53C] font-mono text-sm transition-all" 
                placeholder="Jane Doe" 
                required 
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase font-mono mb-2">Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full px-4 py-3.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#C3F53C] focus:ring-1 focus:ring-[#C3F53C] font-mono text-sm transition-all" 
                placeholder="you@example.com" 
                required 
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase font-mono mb-2">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="w-full px-4 py-3.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#C3F53C] focus:ring-1 focus:ring-[#C3F53C] font-mono text-sm pr-12 transition-all" 
                  placeholder="At least 6 characters" 
                  required 
                  minLength={6} 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="btn-lime w-full font-extrabold py-3.5 text-sm shadow-md mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-[#005645]/30 border-t-[#005645] rounded-full animate-spin mx-auto" />
              ) : (
                <>Create Free Account <ArrowRight className="w-4 h-4" /></>
              )}
            </button>

            <div className="relative py-2 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-neutral-800" /></div>
              <span className="relative px-3 bg-neutral-900 text-[11px] font-mono text-slate-500 uppercase">Or</span>
            </div>

            <button 
              type="button" 
              onClick={() => { register('Demo Member', 'alex.morgan@scalely.ai', 'demo'); addToast('Instant Demo Access granted!', 'success'); navigate('/dashboard') }}
              className="w-full py-3.5 px-4 bg-neutral-950 border border-neutral-800 hover:border-emerald-800/60 rounded-xl text-white text-xs font-bold font-mono flex items-center justify-center gap-2 transition-all hover:bg-neutral-800"
            >
              ⚡ Instant Demo Access (Skip Form)
            </button>
          </form>

          <div className="pt-4 border-t border-neutral-800 text-center">
            <p className="text-xs text-slate-400">
              Already have an account?{' '}
              <Link to="/login" className="text-[#C3F53C] font-bold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link to="/" className="text-xs text-slate-500 hover:text-slate-300 transition-colors font-mono">
            ← Back to Home Page
          </Link>
        </div>

      </div>
    </div>
  )
}
