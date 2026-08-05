import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { getAllAffiliates, updateAffiliate } from '../data/affiliates.js'
import { formatCurrency, formatNumber } from '../lib/utils.js'
import { 
  ShieldAlert, Users, CheckCircle, XCircle, Edit3, 
  DollarSign, Sliders, RefreshCw, Lock, Unlock, Search, TrendingUp, AlertTriangle, ChevronRight
} from 'lucide-react'

export default function Admin() {
  const { user } = useAuth()
  const { addToast } = useToast()

  const [activeTab, setActiveTab] = useState('users') // 'users', 'requests', 'affiliates'
  const [affiliates, setAffiliates] = useState([])
  const [search, setSearch] = useState('')
  const [editingAff, setEditingAff] = useState(null)

  // Local state for mock users & requests
  const [users, setUsers] = useState([
    { id: 'usr-1', name: 'Alex Morgan', email: 'alex.morgan@scalely.ai', balance: 12500, status: 'active', role: 'User' },
    { id: 'usr-2', name: 'Admin Account', email: 'admin@copy.com', balance: 50000, status: 'active', role: 'Admin' },
    { id: 'usr-3', name: 'Jordan Smith', email: 'jordan.smith@gmail.com', balance: 3400, status: 'active', role: 'User' },
    { id: 'usr-4', name: 'Elena Vance', email: 'elena.vance@tech.co', balance: 8900, status: 'suspended', role: 'User' },
  ])

  const [requests, setRequests] = useState([
    { id: 'req-1', userId: 'usr-1', userName: 'Alex Morgan', type: 'deposit', amount: 2500, status: 'pending', date: '2025-08-04' },
    { id: 'req-2', userId: 'usr-3', userName: 'Jordan Smith', type: 'withdrawal', amount: 1000, status: 'pending', date: '2025-08-04' },
    { id: 'req-3', userId: 'usr-1', userName: 'Alex Morgan', type: 'deposit', amount: 5000, status: 'approved', date: '2025-08-02' },
  ])

  useEffect(() => {
    setAffiliates(getAllAffiliates())
  }, [])

  // User Actions
  const toggleUserStatus = (userId) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === 'active' ? 'suspended' : 'active'
        addToast(`User account ${nextStatus}`, 'info')
        return { ...u, status: nextStatus }
      }
      return u
    }))
  }

  const adjustUserBalance = (userId, delta) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const newBalance = Math.max(0, u.balance + delta)
        addToast(`Balance updated to ${formatCurrency(newBalance)}`, 'success')
        return { ...u, balance: newBalance }
      }
      return u
    }))
  }

  // Request Actions
  const handleApproveRequest = (reqId) => {
    setRequests(prev => prev.map(r => {
      if (r.id === reqId) {
        addToast(`Request #${reqId} Approved`, 'success')
        return { ...r, status: 'approved' }
      }
      return r
    }))
  }

  const handleDeclineRequest = (reqId) => {
    setRequests(prev => prev.map(r => {
      if (r.id === reqId) {
        addToast(`Request #${reqId} Declined`, 'error')
        return { ...r, status: 'declined' }
      }
      return r
    }))
  }

  // Affiliate Profile Edit Save
  const handleSaveAffiliate = (e) => {
    e.preventDefault()
    if (!editingAff) return
    updateAffiliate(editingAff.id, {
      revenue: Number(editingAff.revenue),
      rating: Number(editingAff.rating),
      minDeposit: Number(editingAff.minDeposit),
      niche: editingAff.niche,
    })
    setAffiliates(getAllAffiliates())
    addToast(`Partner profile updated`, 'success')
    setEditingAff(null)
  }

  const filteredAffiliates = affiliates.filter(a => 
    a.name.toLowerCase().includes(search.toLowerCase()) || 
    a.niche.toLowerCase().includes(search.toLowerCase())
  )

  const pendingRequests = requests.filter(r => r.status === 'pending')

  return (
    <div className="space-y-8 animate-fade-in text-white font-sans pb-20">

      {/* Admin Header Banner */}
      <div className="bg-[#005645] text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-emerald-800/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C3F53C]/15 border border-[#C3F53C]/30 text-[#C3F53C] text-xs font-bold font-mono mb-3">
            <ShieldAlert className="w-3.5 h-3.5 text-[#C3F53C]" /> SYSTEM CONTROLLER
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Administrative Management Console</h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 font-mono">Control center for user accounts, transaction approvals, and partner metadata</p>
        </div>

        <div className="flex items-center gap-2 bg-neutral-950/60 border border-neutral-800 px-4 py-2 rounded-2xl font-mono text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Admin Access Active</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-neutral-800 pb-4 font-mono text-xs">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-5 py-2.5 rounded-full font-bold transition-all ${
            activeTab === 'users' ? 'bg-[#C3F53C] text-[#005645] shadow-md' : 'bg-neutral-900 text-slate-400 hover:text-white border border-neutral-800'
          }`}
        >
          User Accounts ({users.length})
        </button>

        <button
          onClick={() => setActiveTab('requests')}
          className={`px-5 py-2.5 rounded-full font-bold transition-all relative ${
            activeTab === 'requests' ? 'bg-[#C3F53C] text-[#005645] shadow-md' : 'bg-neutral-900 text-slate-400 hover:text-white border border-neutral-800'
          }`}
        >
          Approval Queue
          {pendingRequests.length > 0 && (
            <span className="ml-2 px-2 py-0.5 rounded-full bg-amber-500 text-black text-[10px] font-black">
              {pendingRequests.length} PENDING
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('affiliates')}
          className={`px-5 py-2.5 rounded-full font-bold transition-all ${
            activeTab === 'affiliates' ? 'bg-[#C3F53C] text-[#005645] shadow-md' : 'bg-neutral-900 text-slate-400 hover:text-white border border-neutral-800'
          }`}
        >
          Partner Metadata ({affiliates.length})
        </button>
      </div>

      {/* ── TAB 1: USERS LEDGER ── */}
      {activeTab === 'users' && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Registered Account Directory</h3>
            <span className="text-xs font-mono text-slate-400">{users.length} total registered accounts</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="bg-neutral-950/60 text-slate-400 border-b border-neutral-800">
                  <th className="p-4">User</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Capital Balance</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-neutral-950/40 transition-colors">
                    <td className="p-4 font-bold text-white">{u.name}</td>
                    <td className="p-4 text-slate-300">{u.email}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${u.role === 'Admin' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-neutral-800 text-slate-300'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-[#C3F53C]">{formatCurrency(u.balance)}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${u.status === 'active' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'}`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => adjustUserBalance(u.id, 1000)}
                        className="px-2.5 py-1 bg-neutral-950 hover:bg-neutral-800 border border-neutral-700 rounded-lg text-emerald-400 text-[11px] font-bold"
                        title="Add $1,000 Balance"
                      >
                        +$1k
                      </button>
                      <button
                        onClick={() => toggleUserStatus(u.id)}
                        className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all ${
                          u.status === 'active' 
                            ? 'bg-rose-950/60 hover:bg-rose-900 border border-rose-800 text-rose-300'
                            : 'bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-800 text-emerald-300'
                        }`}
                      >
                        {u.status === 'active' ? 'Suspend' : 'Reactivate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── TAB 2: REQUEST APPROVAL QUEUE ── */}
      {activeTab === 'requests' && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-sm space-y-6 p-6">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white">Deposit & Withdrawal Queue</h3>
              <p className="text-xs text-slate-400">All capital transfers require manual administrative approval</p>
            </div>
            <span className="text-xs font-mono text-amber-400 bg-amber-950/50 border border-amber-800/40 px-3 py-1 rounded-full">
              {pendingRequests.length} PENDING APPROVAL
            </span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {requests.map(req => (
              <div key={req.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-neutral-950/60 border border-neutral-800 rounded-2xl">
                <div className="space-y-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{req.userName}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${req.type === 'deposit' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-indigo-950 text-indigo-400 border border-indigo-800'}`}>
                      {req.type}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">Request ID: {req.id} · Date: {req.date}</p>
                </div>

                <div className="flex items-center gap-6">
                  <span className="text-base font-black text-white">{formatCurrency(req.amount)}</span>
                  
                  {req.status === 'pending' ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleApproveRequest(req.id)}
                        className="px-3 py-1.5 bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 text-emerald-400 font-bold rounded-lg transition-colors flex items-center gap-1"
                      >
                        <CheckCircle className="w-3.5 h-3.5" /> Approve
                      </button>
                      <button
                        onClick={() => handleDeclineRequest(req.id)}
                        className="px-3 py-1.5 bg-rose-950 hover:bg-rose-900 border border-rose-800 text-rose-400 font-bold rounded-lg transition-colors flex items-center gap-1"
                      >
                        <XCircle className="w-3.5 h-3.5" /> Decline
                      </button>
                    </div>
                  ) : (
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${req.status === 'approved' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'}`}>
                      {req.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB 3: AFFILIATE METADATA MANAGER ── */}
      {activeTab === 'affiliates' && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white">Partner Profile Metadata</h3>
              <p className="text-xs text-slate-400">Edit verified revenues, ratings, min deposit tiers, and niches</p>
            </div>
            
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search partner..."
                className="w-full pl-9 pr-4 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-[#C3F53C]"
              />
            </div>
          </div>

          {/* Edit Modal Overlay */}
          {editingAff && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
              <form onSubmit={handleSaveAffiliate} className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl w-full max-w-md space-y-4 text-left font-mono">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <h4 className="text-base font-bold text-white">Edit Partner Metadata</h4>
                  <button type="button" onClick={() => setEditingAff(null)} className="text-slate-400 hover:text-white">✕</button>
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1">Partner Name</label>
                  <input type="text" disabled value={editingAff.name} className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-slate-400 text-xs" />
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1">Niche Category</label>
                  <input type="text" value={editingAff.niche} onChange={e => setEditingAff({...editingAff, niche: e.target.value})} className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Revenue ($)</label>
                    <input type="number" value={editingAff.revenue} onChange={e => setEditingAff({...editingAff, revenue: e.target.value})} className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Star Rating (1-5)</label>
                    <input type="number" step="0.1" max="5" value={editingAff.rating} onChange={e => setEditingAff({...editingAff, rating: e.target.value})} className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs" />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1">Minimum Deposit ($)</label>
                  <input type="number" value={editingAff.minDeposit} onChange={e => setEditingAff({...editingAff, minDeposit: e.target.value})} className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs" />
                </div>

                <div className="pt-3 flex gap-3">
                  <button type="button" onClick={() => setEditingAff(null)} className="btn-outline-light flex-1 py-2.5 text-xs">Cancel</button>
                  <button type="submit" className="btn-lime flex-1 py-2.5 text-xs">Save Changes</button>
                </div>
              </form>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
            {filteredAffiliates.slice(0, 18).map(a => (
              <div key={a.id} className="p-4 bg-neutral-950/60 border border-neutral-800 rounded-2xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <img src={a.avatar} alt={a.name} className="w-10 h-10 rounded-xl object-cover border border-neutral-800 flex-shrink-0" />
                  <div className="min-w-0 text-left">
                    <p className="font-bold text-white truncate">{a.name}</p>
                    <p className="text-[10px] text-slate-400 truncate">{a.niche}</p>
                    <p className="text-[11px] font-bold text-[#C3F53C] mt-0.5">${(a.revenue / 1000).toFixed(0)}k rev · Min ${a.minDeposit}</p>
                  </div>
                </div>

                <button
                  onClick={() => setEditingAff(a)}
                  className="p-2 text-slate-400 hover:text-white bg-neutral-900 border border-neutral-800 rounded-lg hover:border-emerald-800 transition-colors"
                  title="Edit Metadata"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}
