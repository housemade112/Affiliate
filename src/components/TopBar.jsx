import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { formatCurrency } from '../lib/utils.js'
import WalletModal from './WalletModal.jsx'
import { ArrowDownLeft, ArrowUpRight, Bell, Search } from 'lucide-react'

export default function TopBar() {
  const { user } = useAuth()
  const location = useLocation()
  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState('deposit')

  if (!user) return null

  const pageTitles = {
    '/dashboard': 'Portfolio Overview',
    '/marketers': 'Affiliate Directory',
    '/leaderboard': 'Leaderboard',
    '/wallet': 'Wallet & Capital',
    '/profile': 'Profile',
    '/admin': 'Admin Console',
  }

  const title = Object.entries(pageTitles).find(([path]) => location.pathname.startsWith(path))?.[1]
    || (location.pathname.startsWith('/marketer/') ? 'Partner Dossier' : 'Scalely.ai')

  const openModal = (type) => {
    setModalType(type)
    setModalOpen(true)
  }

  return (
    <>
      <header className="sticky top-0 z-20 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4 mb-5 bg-[#E4EAE6]/95 backdrop-blur-md">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Dashboard</p>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight truncate">{title}</h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-slate-200/80 shadow-sm">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Balance</span>
              <span className="text-sm font-bold font-mono text-[#005645]">{formatCurrency(user.balance || 0)}</span>
            </div>

            <button
              type="button"
              onClick={() => openModal('deposit')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#C3F53C] text-[#141414] text-xs font-extrabold hover:bg-[#b0e22b] transition-colors shadow-sm"
            >
              <ArrowDownLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Deposit</span>
            </button>

            <button
              type="button"
              onClick={() => openModal('withdrawal')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-800 text-xs font-bold hover:bg-slate-50 transition-colors shadow-sm"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Withdraw</span>
            </button>

            <Link
              to="/marketers"
              className="hidden md:flex items-center justify-center w-9 h-9 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-slate-900 shadow-sm transition-colors"
              title="Browse partners"
            >
              <Search className="w-3.5 h-3.5" />
            </Link>

            <button
              type="button"
              className="hidden md:flex items-center justify-center w-9 h-9 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-slate-900 shadow-sm transition-colors"
              title="Notifications"
            >
              <Bell className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      <WalletModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialType={modalType}
      />
    </>
  )
}
