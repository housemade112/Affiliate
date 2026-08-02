import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { LayoutDashboard, Users, Trophy, Wallet, LogOut, Menu, X, Zap } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  if (!user) return null

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/marketers', label: 'Marketers', icon: Users },
    { path: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    { path: '/wallet', label: 'Wallet', icon: Wallet },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-rose-500 flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-shadow">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              Mirror<span className="text-violet-400">Market</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <Link key={item.path} to={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.path) ? 'bg-violet-500/10 text-violet-400' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}>
                <item.icon className="w-4 h-4" />{item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="text-sm text-slate-400">
              <span className="text-emerald-400 font-semibold">${user.balance?.toLocaleString() || 0}</span>
            </div>
            <button onClick={() => { logout(); navigate('/login') }} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
              <LogOut className="w-4 h-4" />Logout
            </button>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-slate-400 hover:text-white">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-slate-900 border-b border-white/5 px-4 py-4 space-y-1">
          {navItems.map(item => (
            <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive(item.path) ? 'bg-violet-500/10 text-violet-400' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}>
              <item.icon className="w-4 h-4" />{item.label}
            </Link>
          ))}
          <button onClick={() => { logout(); navigate('/login'); setMobileOpen(false) }} className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-400 hover:text-white w-full">
            <LogOut className="w-4 h-4" />Logout
          </button>
        </div>
      )}
    </nav>
  )
}
