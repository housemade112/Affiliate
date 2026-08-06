import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
  ShieldCheck, LayoutDashboard, Wallet, Users, Clock, LogOut,
  Bell, CheckCircle2, ShieldAlert, ArrowLeft
} from 'lucide-react'

export default function AdminLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const [adminUser, setAdminUser] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('scalely_admin_session')
    if (!stored) {
      navigate('/admin/login')
    } else {
      try {
        setAdminUser(JSON.parse(stored))
      } catch {
        navigate('/admin/login')
      }
    }
  }, [navigate])

  const handleAdminLogout = () => {
    localStorage.removeItem('scalely_admin_session')
    navigate('/admin/login')
  }

  if (!adminUser) return null

  return (
    <div className="min-h-screen bg-[#0E1013] text-white flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      
      {/* ── TOP ADMIN NAV ── */}
      <header className="h-16 border-b border-white/10 bg-[#14171C] px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <Link to="/admin" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-emerald-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-white block leading-none">Scalely Admin</span>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Master Console</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Backend REST API Connected
          </div>

          <div className="flex items-center gap-3 pl-4 border-l border-white/10">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-extrabold text-white leading-none">{adminUser.name || 'Master Administrator'}</p>
              <p className="text-[10px] font-semibold text-white/40 mt-1">{adminUser.email}</p>
            </div>
            <button onClick={handleAdminLogout} title="Sign Out of Admin Console"
              className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ── ADMIN MAIN CONTENT AREA ── */}
      <div className="flex-1 max-w-[1400px] w-full mx-auto p-6 sm:p-10">
        <Outlet />
      </div>

      {/* ── ADMIN FOOTER ── */}
      <footer className="border-t border-white/5 py-6 text-center text-xs text-white/30 font-semibold">
        Scalely Financial Terminal · Restricted Master Admin Console · Confidential
      </footer>

    </div>
  )
}
