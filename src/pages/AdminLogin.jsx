import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ShieldCheck, Lock, ArrowRight, ShieldAlert } from 'lucide-react'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('admin@scalely.ai')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Master Admin Authentication
    if (password === 'admin123' || password === 'admin' || password.length >= 6) {
      const adminSession = {
        id: 'admin_1',
        name: 'Master Admin',
        email: email,
        role: 'admin',
        loggedInAt: new Date().toISOString()
      }
      localStorage.setItem('scalely_admin_session', JSON.stringify(adminSession))
      setLoading(false)
      navigate('/admin')
    } else {
      setLoading(false)
      setError('Invalid admin credentials. (Hint: Use password "admin123")')
    }
  }

  return (
    <div className="min-h-screen bg-[#090B0E] text-white flex items-center justify-center p-4 selection:bg-emerald-500 selection:text-black">
      <div className="w-full max-w-md bg-[#13161C] border border-white/10 rounded-[32px] p-8 shadow-2xl space-y-6 relative overflow-hidden">
        
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center space-y-2 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 shadow-lg">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-black tracking-tight">Admin Master Portal</h1>
          <p className="text-xs text-white/40 font-semibold">Restricted access for system administrators</p>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 relative z-10">
          <div>
            <label className="text-[10px] font-extrabold text-white/40 uppercase tracking-wider block mb-1">Admin Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm font-semibold focus:outline-none focus:border-emerald-500 transition-all"
              required />
          </div>

          <div>
            <label className="text-[10px] font-extrabold text-white/40 uppercase tracking-wider block mb-1">Admin Passcode</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
              className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm font-semibold focus:outline-none focus:border-emerald-500 transition-all"
              required />
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-4 rounded-xl bg-emerald-500 text-slate-950 font-black text-sm hover:bg-emerald-400 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 disabled:opacity-50">
            {loading ? 'Authenticating...' : 'Access Admin Console'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-white/5 text-center">
          <Link to="/" className="text-xs font-bold text-white/40 hover:text-white transition-colors">
            ← Return to Scalely App
          </Link>
        </div>

      </div>
    </div>
  )
}
