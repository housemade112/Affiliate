import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { LayoutDashboard, Users, Trophy, Wallet, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  const navItems = [
    { path: '/dashboard',  label: 'Dashboard',          icon: LayoutDashboard },
    { path: '/marketers',  label: 'Affiliate Directory', icon: Users },
    { path: '/leaderboard',label: 'Leaderboard',         icon: Trophy },
    { path: '/wallet',     label: 'Wallet',              icon: Wallet },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#005645] border-b border-emerald-800/40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-[#C3F53C] flex items-center justify-center text-[#005645] font-black text-lg shadow-sm">
              S
            </div>
            <span className="text-xl font-bold text-white tracking-tight">calely<span className="text-[#C3F53C]">.ai</span></span>
          </Link>

          {/* Desktop Nav */}
          {user && (
            <div className="hidden md:flex items-center gap-6">
              {navItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${
                    isActive(item.path)
                      ? 'bg-[#C3F53C]/15 text-[#C3F53C] border border-[#C3F53C]/30'
                      : 'text-emerald-100/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}
            </div>
          )}

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-bold text-white">{formatCurrency(user.balance || 0)}</p>
                    <p className="text-[10px] text-[#C3F53C] font-mono tracking-widest uppercase">Verified</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-emerald-700/50 border border-emerald-500/30 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                    {user.name?.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <button
                  onClick={() => { logout(); navigate('/') }}
                  className="w-9 h-9 flex items-center justify-center text-emerald-300 hover:text-rose-400 hover:bg-rose-500/20 rounded-full transition-all"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-sm font-bold text-emerald-100 hover:text-white transition-colors">Log In</Link>
                <Link to="/signup" className="btn-lime text-xs px-6 py-2.5">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-emerald-100 hover:text-white"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-[#004235] border-b border-emerald-800/40">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {user ? (
              <>
                <div className="flex items-center gap-3 mb-4 p-4 bg-[#005645] rounded-xl border border-emerald-800/50">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                    {user.name?.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{user.name}</p>
                    <p className="text-[10px] text-[#C3F53C] font-mono tracking-widest uppercase">{formatCurrency(user.balance || 0)}</p>
                  </div>
                </div>
                {navItems.map(item => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                      isActive(item.path)
                        ? 'bg-[#C3F53C]/15 text-[#C3F53C] border border-[#C3F53C]/30'
                        : 'text-emerald-100 hover:text-white'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                ))}
                <button
                  onClick={() => { logout(); setMobileOpen(false); navigate('/') }}
                  className="w-full flex items-center gap-3 px-4 py-3 mt-4 text-sm font-bold text-rose-400 bg-rose-500/10 rounded-xl hover:bg-rose-500/20"
                >
                  <LogOut className="w-5 h-5" /> Log Out
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-3 pt-2">
                <Link to="/login" onClick={() => setMobileOpen(false)} className="w-full py-3 text-center text-sm font-bold text-emerald-100 hover:text-white border border-emerald-600 rounded-xl">
                  Log In
                </Link>
                <Link to="/signup" onClick={() => setMobileOpen(false)} className="btn-lime w-full justify-center">
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

function formatCurrency(val) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(val)
}
