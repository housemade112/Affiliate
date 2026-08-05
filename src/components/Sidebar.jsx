import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, Trophy, Wallet, LogOut, User, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { formatCurrency } from '../lib/utils.js'

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const location = useLocation()
  const { user, logout } = useAuth()

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/marketers', label: 'Directory', icon: Users },
    { path: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    { path: '/wallet', label: 'Wallet', icon: Wallet },
    { path: '/profile', label: 'Profile', icon: User },
  ]

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(`${path}/`)

  const SidebarContent = () => (
    <div className="h-full flex flex-col bg-white border-r border-slate-200/80 text-slate-900 w-60 shadow-sm">
      <div className="h-16 flex items-center justify-between px-5 border-b border-slate-100">
        <Link to="/dashboard" onClick={() => setMobileOpen?.(false)} className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#C3F53C] flex items-center justify-center text-[#141414] font-black text-xs">
            S
          </div>
          <span className="text-base font-bold tracking-tight">
            calely<span className="text-[#005645]">.ai</span>
          </span>
        </Link>
        {setMobileOpen && (
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 text-slate-400 hover:text-slate-900 rounded-lg"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex-1 py-5 px-3 space-y-0.5 overflow-y-auto">
        <p className="px-3 pb-2 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Menu</p>
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setMobileOpen?.(false)}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              isActive(item.path)
                ? 'bg-[#C3F53C]/20 text-[#005645] border border-[#C3F53C]/40'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
            }`}
          >
            <item.icon className={`w-4 h-4 flex-shrink-0 ${isActive(item.path) ? 'text-[#005645]' : 'text-slate-400'}`} />
            {item.label}
          </Link>
        ))}
      </div>

      {user && (
        <div className="p-3 border-t border-slate-100">
          <Link
            to="/profile"
            onClick={() => setMobileOpen?.(false)}
            className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[#005645] flex items-center justify-center text-[#C3F53C] text-xs font-bold">
              {user.name?.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
              <p className="text-[10px] text-[#005645] font-mono font-bold">{formatCurrency(user.balance || 0)}</p>
            </div>
          </Link>
          <button
            onClick={logout}
            className="mt-2 w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign out
          </button>
        </div>
      )}
    </div>
  )

  return (
    <>
      <div className="hidden lg:block h-screen fixed left-0 top-0 z-40">
        <SidebarContent />
      </div>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="relative animate-fade-in">
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  )
}
