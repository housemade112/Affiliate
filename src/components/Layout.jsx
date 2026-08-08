import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import {
  LayoutDashboard, Users, Trophy, Wallet, User, LogOut, Menu, X,
  Bell, Sun, Moon, Search, ArrowDownToLine, ArrowUpFromLine,
  CheckCircle2, Info, AlertCircle, PieChart, ShieldCheck
} from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import { useNotif } from '../context/NotifContext.jsx'
import WalletModal from './WalletModal.jsx'

const NAV_ITEMS = [
  { path: '/dashboard',   label: 'Dashboard',   icon: LayoutDashboard },
  { path: '/portfolio',   label: 'Portfolio',   icon: PieChart },
  { path: '/marketers',   label: 'Directory',   icon: Users },
  { path: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { path: '/wallet',      label: 'Wallet',      icon: Wallet },
  { path: '/profile',     label: 'Profile',     icon: User },
]

function NotifIcon({ type }) {
  if (type === 'success') return <CheckCircle2 className="w-4 h-4 text-emerald-500" />
  if (type === 'warning') return <AlertCircle  className="w-4 h-4 text-amber-500" />
  return <Info className="w-4 h-4 text-blue-500" />
}

export default function Layout() {
  const location  = useLocation()
  const navigate  = useNavigate()
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { notifications, unreadCount, markAllRead, markRead } = useNotif()

  const [mobileOpen, setMobileOpen] = useState(false)
  const [notifOpen,  setNotifOpen]  = useState(false)
  const [walletOpen, setWalletOpen] = useState(false)
  const [walletType, setWalletType] = useState('deposit')
  const notifRef = useRef(null)

  const isDark = theme === 'dark'

  // Close notif panel on outside click
  useEffect(() => {
    function handler(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const isActive = (path) => location.pathname === path

  // Current page label for breadcrumb
  const currentNav = NAV_ITEMS.find(n => isActive(n.path)) || { label: 'Dashboard' }

  const openDeposit    = () => { setWalletType('deposit');    setWalletOpen(true) }
  const openWithdrawal = () => { setWalletType('withdrawal'); setWalletOpen(true) }

  const SidebarContent = () => (
    <div className={`h-full flex flex-col w-64 transition-colors ${isDark ? 'bg-[#1A1D21] border-r border-white/5' : 'bg-[#005645] border-r border-emerald-800/40'}`}>
      {/* Logo */}
      <div className="h-20 flex items-center justify-between px-6 border-b border-emerald-800/30">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#C3F53C] flex items-center justify-center text-[#005645] font-black text-sm shadow-sm">
            S
          </div>
          <span className="text-xl font-bold text-white tracking-tight">scalely<span className="text-[#C3F53C]">.ai</span></span>
        </Link>
        <button onClick={() => setMobileOpen(false)} className="lg:hidden p-2 text-white/50 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Nav */}
      <div className="flex-1 py-8 px-4 space-y-1 overflow-y-auto">
        <p className="px-4 text-[10px] font-medium text-white/30 uppercase tracking-widest mb-4">MAIN MENU</p>
        {NAV_ITEMS.map(item => (
          <Link key={item.path} to={item.path}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
              isActive(item.path)
                ? isDark
                  ? 'bg-[#C3F53C]/10 text-[#C3F53C]'
                  : 'bg-[#C3F53C]/10 text-[#C3F53C]'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}>
            <item.icon className={`w-4 h-4 ${isActive(item.path) ? 'text-[#C3F53C]' : 'text-white/40'}`} />
            {item.label}
          </Link>
        ))}
      </div>

      {/* User Info (NO balance shown here) */}
      {user && (
        <div className={`p-4 border-t ${isDark ? 'border-white/5' : 'border-emerald-800/30'}`}>
          <Link to="/profile"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors mb-3">
            <img
              src={`https://randomuser.me/api/portraits/women/${user.name?.length % 99 || 44}.jpg`}
              alt={user.name}
              className="w-10 h-10 rounded-full border border-emerald-500/30 bg-emerald-700/50 flex-shrink-0 object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{user.name}</p>
              <p className="text-[10px] text-[#C3F53C]/80 font-medium uppercase tracking-widest">Verified</p>
            </div>
          </Link>
          <button onClick={() => { logout(); navigate('/') }}
            className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-medium text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors">
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      )}
    </div>
  )

  return (
    <div className={`min-h-[100dvh] flex flex-col lg:flex-row transition-colors overflow-x-hidden ${isDark ? 'bg-[#111317] text-white' : 'bg-[#EFF2F0] text-slate-900'}`}>

      {/* ── DESKTOP SIDEBAR ── */}
      <div className="hidden lg:block h-screen fixed left-0 top-0 z-40 shadow-2xl">
        <SidebarContent />
      </div>

      {/* ── MOBILE SIDEBAR OVERLAY ── */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="relative w-64 animate-slide-right z-50 shadow-2xl">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* ── MAIN AREA ── */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-[100dvh] w-full overflow-x-hidden">

        {/* ── TOP BAR ── */}
        <header className={`sticky top-0 z-30 flex items-center justify-between h-16 px-4 sm:px-8 border-b transition-colors ${
          isDark ? 'bg-[#111317]/95 border-white/5 backdrop-blur-xl' : 'bg-[#EFF2F0]/95 border-slate-200/80 backdrop-blur-xl'
        }`}>

          {/* Left: hamburger + breadcrumb */}
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)}
              className={`lg:hidden p-2 rounded-xl transition-colors ${isDark ? 'bg-white/5 text-white' : 'bg-white border border-slate-200 text-slate-700'}`}>
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2">
              <span className={`text-xs font-semibold uppercase tracking-widest ${isDark ? 'text-white/30' : 'text-slate-400'}`}>DASHBOARD</span>
              <span className={isDark ? 'text-white/20' : 'text-slate-300'}>/</span>
              <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{currentNav.label}</span>
            </div>
          </div>

          {/* Right: balance pill + deposit + withdraw + theme + notif + search */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Deposit */}
            <button onClick={openDeposit}
              className={`flex items-center justify-center gap-1.5 w-9 sm:w-auto h-9 sm:h-auto sm:px-4 py-2 text-xs font-medium rounded-xl active:scale-95 transition-all shadow-sm ${
                isDark ? 'bg-emerald-900/40 text-emerald-400 hover:bg-emerald-900/60' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/50'
              }`}>
              <ArrowDownToLine className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">Deposit</span>
            </button>

            {/* Withdraw */}
            <button onClick={openWithdrawal}
              className={`flex items-center justify-center gap-1.5 w-9 sm:w-auto h-9 sm:h-auto sm:px-4 py-2 text-xs font-medium rounded-xl active:scale-95 transition-all ${
                isDark ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10' : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300 shadow-sm'
              }`}>
              <ArrowUpFromLine className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">Withdraw</span>
            </button>

            {/* Search */}
            <button onClick={() => navigate('/marketers')} className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
              isDark ? 'bg-white/5 border border-white/10 text-white/60 hover:text-white' : 'bg-white border border-slate-200 text-slate-500 hover:text-slate-900 shadow-sm'
            }`}>
              <Search className="w-4 h-4" />
            </button>

            {/* Theme Toggle */}
            <button onClick={toggleTheme}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                isDark ? 'bg-white/5 border border-white/10 text-amber-400 hover:bg-white/10' : 'bg-white border border-slate-200 text-slate-500 hover:text-slate-900 shadow-sm'
              }`}>
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Notifications */}
            <div className="relative" ref={notifRef}>
              <button onClick={() => setNotifOpen(v => !v)}
                className={`w-9 h-9 rounded-xl flex items-center justify-center relative transition-colors ${
                  isDark ? 'bg-white/5 border border-white/10 text-white/60 hover:text-white' : 'bg-white border border-slate-200 text-slate-500 hover:text-slate-900 shadow-sm'
                }`}>
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-extrabold flex items-center justify-center shadow-sm">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Panel */}
              {notifOpen && (
                <div className={`absolute right-0 top-12 w-80 rounded-lg shadow-2xl border overflow-hidden z-50 ${
                  isDark ? 'bg-[#1A1D21] border-white/10' : 'bg-white border-slate-200'
                }`}>
                  <div className={`flex items-center justify-between px-5 py-4 border-b ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
                    <h4 className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Notifications
                      {unreadCount > 0 && (
                        <span className="ml-2 px-2 py-0.5 bg-rose-100 text-rose-600 text-[10px] font-bold rounded-full">{unreadCount} new</span>
                      )}
                    </h4>
                    {unreadCount > 0 && (
                      <button onClick={markAllRead} className="text-xs font-bold text-[#005645] hover:underline">Mark all read</button>
                    )}
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className={`p-6 text-center text-sm font-medium ${isDark ? 'text-white/40' : 'text-slate-400'}`}>No notifications</p>
                    ) : notifications.map(n => (
                      <button key={n.id} onClick={() => markRead(n.id)}
                        className={`w-full flex items-start gap-3 px-5 py-4 text-left transition-colors border-b last:border-0 ${
                          isDark ? 'border-white/5 hover:bg-white/5' : 'border-slate-50 hover:bg-slate-50'
                        } ${!n.read ? (isDark ? 'bg-white/5' : 'bg-emerald-50/50') : ''}`}>
                        <div className="mt-0.5 flex-shrink-0"><NotifIcon type={n.type} /></div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'} flex items-center gap-1.5`}>
                            {n.title}
                            {!n.read && <span className="w-2 h-2 rounded-full bg-[#C3F53C] inline-block" />}
                          </p>
                          <p className={`text-xs font-medium mt-0.5 ${isDark ? 'text-white/50' : 'text-slate-500'}`}>{n.body}</p>
                          <p className={`text-[10px] font-bold mt-1 uppercase tracking-wider ${isDark ? 'text-white/30' : 'text-slate-400'}`}>{n.time}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ── PAGE CONTENT ── */}
        <main className="flex-1 w-full max-w-[100vw] lg:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-6 pb-28 lg:pb-8 overflow-x-hidden">
          <Outlet />
        </main>

        {/* ── MANDATORY DASHBOARD FOOTER ── */}
        <footer className={`mt-auto py-6 px-4 sm:px-6 lg:px-10 border-t pb-20 lg:pb-6 ${isDark ? 'border-white/5 bg-[#111317]' : 'border-slate-200/60 bg-white/50'}`}>
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
            <div className={`text-xs font-medium ${isDark ? 'text-white/40' : 'text-slate-400'}`}>
              © 2026 Scalely.ai · All rights reserved.
            </div>
            <div className={`flex items-center gap-5 text-xs font-medium ${isDark ? 'text-white/50' : 'text-slate-400'}`}>
              <a href="#terms"   className="hover:underline">Terms</a>
              <a href="#privacy" className="hover:underline">Privacy</a>
              <a href="#support" className="hover:underline">Support</a>
            </div>
          </div>
        </footer>

        {/* ── MOBILE BOTTOM NAV ── */}
        <nav className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t h-[72px] pb-safe ${
          isDark ? 'bg-[#1A1D21]/95 border-white/10 backdrop-blur-2xl' : 'bg-white/95 border-slate-200 backdrop-blur-2xl shadow-[0_-4px_24px_rgba(0,0,0,0.04)]'
        }`}>
          {NAV_ITEMS.map(item => {
            // Keep wallet out of bottom nav if it gets too crowded, or show 5 max. Let's show 5 max.
            if (item.path === '/leaderboard') return null; // hide leaderboard from bottom nav to save space
            
            return (
              <Link key={item.path} to={item.path}
                className={`flex flex-col items-center justify-center gap-1 w-16 h-full transition-all active:scale-90 ${
                  isActive(item.path)
                    ? 'text-[#005645] dark:text-[#C3F53C]'
                    : isDark ? 'text-white/40 hover:text-white/80' : 'text-slate-400 hover:text-slate-600'
                }`}>
                <item.icon className={`w-5 h-5 transition-transform duration-300 ${isActive(item.path) ? 'scale-110' : ''}`} />
                <span className="text-[10px] font-bold">
                  {item.label}
                </span>
                {isActive(item.path) && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-[#005645] dark:bg-[#C3F53C]" />
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* ── WALLET MODAL ── */}
      <WalletModal
        isOpen={walletOpen}
        onClose={() => setWalletOpen(false)}
        onSuccess={() => {}}
        defaultType={walletType}
      />
    </div>
  )
}
