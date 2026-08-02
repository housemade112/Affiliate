import { useState } from 'react'
import { getAllAffiliates, updateAffiliate } from '../../data/affiliates.js'
import { useToast } from '../../context/ToastContext.jsx'
import { formatCurrency, formatNumber } from '../../lib/utils.js'
import { Search, Star, Edit3, Save, X, CheckCircle } from 'lucide-react'

export default function AdminAffiliates() {
  const [search, setSearch] = useState('')
  const [editingAff, setEditingAff] = useState(null)
  const [editData, setEditData] = useState({})
  const { addToast } = useToast()

  const affiliates = getAllAffiliates()
  const filtered = affiliates.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.niche.toLowerCase().includes(search.toLowerCase())
  )

  const startEdit = (aff) => {
    setEditingAff(aff.id)
    setEditData({
      name: aff.name,
      niche: aff.niche,
      revenue: aff.revenue,
      rating: aff.rating,
      minDeposit: aff.minDeposit,
      followers: aff.followers,
      monthlyReturn: aff.monthlyReturn,
      winRate: aff.winRate,
    })
  }

  const saveEdit = (affId) => {
    updateAffiliate(affId, editData)
    setEditingAff(null)
    addToast('Affiliate updated', 'success')
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Manage Affiliates</h1>
          <p className="text-slate-400 mt-1">{affiliates.length} total affiliates</p>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search affiliates..."
            className="input-field pl-10"
          />
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="table-header">Affiliate</th>
              <th className="table-header">Niche</th>
              <th className="table-header">Revenue</th>
              <th className="table-header">Rating</th>
              <th className="table-header">Min Deposit</th>
              <th className="table-header">Followers</th>
              <th className="table-header">Monthly</th>
              <th className="table-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(aff => (
              <tr key={aff.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                <td className="table-cell">
                  {editingAff === aff.id ? (
                    <input
                      value={editData.name || ''}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="w-32 bg-slate-800 border border-white/10 rounded px-2 py-1 text-sm text-white"
                    />
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg ${aff.avatarColor} flex items-center justify-center text-white text-xs font-bold`}>
                        {aff.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <span className="font-medium text-white">{aff.name}</span>
                        {aff.verified && <CheckCircle className="w-3 h-3 text-emerald-400 inline ml-1" />}
                      </div>
                    </div>
                  )}
                </td>
                <td className="table-cell text-slate-400">
                  {editingAff === aff.id ? (
                    <input
                      value={editData.niche || ''}
                      onChange={(e) => setEditData({ ...editData, niche: e.target.value })}
                      className="w-32 bg-slate-800 border border-white/10 rounded px-2 py-1 text-sm text-white"
                    />
                  ) : aff.niche}
                </td>
                <td className="table-cell text-white">
                  {editingAff === aff.id ? (
                    <input
                      type="number"
                      value={editData.revenue || 0}
                      onChange={(e) => setEditData({ ...editData, revenue: parseInt(e.target.value) || 0 })}
                      className="w-24 bg-slate-800 border border-white/10 rounded px-2 py-1 text-sm text-white"
                    />
                  ) : formatCurrency(aff.revenue)}
                </td>
                <td className="table-cell">
                  {editingAff === aff.id ? (
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      max="5"
                      value={editData.rating || 0}
                      onChange={(e) => setEditData({ ...editData, rating: parseFloat(e.target.value) || 0 })}
                      className="w-16 bg-slate-800 border border-white/10 rounded px-2 py-1 text-sm text-white"
                    />
                  ) : (
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{aff.rating}</span>
                    </div>
                  )}
                </td>
                <td className="table-cell text-white">
                  {editingAff === aff.id ? (
                    <input
                      type="number"
                      value={editData.minDeposit || 0}
                      onChange={(e) => setEditData({ ...editData, minDeposit: parseInt(e.target.value) || 0 })}
                      className="w-20 bg-slate-800 border border-white/10 rounded px-2 py-1 text-sm text-white"
                    />
                  ) : formatCurrency(aff.minDeposit)}
                </td>
                <td className="table-cell text-slate-400">
                  {editingAff === aff.id ? (
                    <input
                      type="number"
                      value={editData.followers || 0}
                      onChange={(e) => setEditData({ ...editData, followers: parseInt(e.target.value) || 0 })}
                      className="w-20 bg-slate-800 border border-white/10 rounded px-2 py-1 text-sm text-white"
                    />
                  ) : formatNumber(aff.followers)}
                </td>
                <td className="table-cell text-emerald-400">
                  {editingAff === aff.id ? (
                    <input
                      type="number"
                      step="0.1"
                      value={editData.monthlyReturn || 0}
                      onChange={(e) => setEditData({ ...editData, monthlyReturn: parseFloat(e.target.value) || 0 })}
                      className="w-16 bg-slate-800 border border-white/10 rounded px-2 py-1 text-sm text-white"
                    />
                  ) : `+${aff.monthlyReturn}%`}
                </td>
                <td className="table-cell">
                  {editingAff === aff.id ? (
                    <div className="flex items-center gap-2">
                      <button onClick={() => saveEdit(aff.id)} className="text-emerald-400 hover:text-emerald-300">
                        <Save className="w-4 h-4" />
                      </button>
                      <button onClick={() => setEditingAff(null)} className="text-slate-400 hover:text-slate-300">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => startEdit(aff)} className="text-slate-400 hover:text-indigo-400 transition-colors">
                      <Edit3 className="w-4 h-4" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
