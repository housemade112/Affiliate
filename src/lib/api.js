// Removed affiliates.js import

const API_BASE = import.meta.env.VITE_API_URL || 'https://affiliate-backend-ft4a.onrender.com'

export const api = {
  auth: {
    login: async (email, password) => {
      try {
        const res = await fetch(`${API_BASE}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        })
        return await res.json()
      } catch (e) {
        return { success: false, error: 'Network error - Backend unreachable' }
      }
    },
    register: async (name, email, password) => {
      try {
        const res = await fetch(`${API_BASE}/api/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password })
        })
        return await res.json()
      } catch (e) {
        return { success: false, error: 'Network error - Backend unreachable' }
      }
    },
    me: async (userId) => {
      try {
        const res = await fetch(`${API_BASE}/api/auth/me/${userId}`)
        return await res.json()
      } catch (e) {
        return { success: false, error: 'Network error - Backend unreachable' }
      }
    },
  },

  marketers: {
    list: async () => {
      const res = await fetch(`${API_BASE}/api/marketers`)
      return await res.json()
    },
    get: async (id) => {
      const res = await fetch(`${API_BASE}/api/marketers/${id}`)
      return await res.json()
    },
    history: async (id) => {
      try {
        const detailRes = await fetch(`${API_BASE}/api/marketers/${id}`)
        const detail = await detailRes.json()
        const histRes = await fetch(`${API_BASE}/api/marketers/${id}/history`)
        const hist = await histRes.json()

        if (detail.success && hist.success && detail.marketer) {
          const totalRevenue = detail.marketer.revenue
          const growth = hist.history || []
          const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

          // If growth is just an array of numbers (from data.json)
          if (growth.length > 0 && typeof growth[0] === 'number') {
            const sum = growth.reduce((s, v) => s + v, 0)
            const history = growth.map((val, i) => ({
              month: months[i % 12],
              revenue: Math.round(val * (totalRevenue / (sum || 1)))
            }))
            return { success: true, history }
          }

          // If growth is an array of OHLC objects (from db.js fallback)
          if (growth.length > 0 && typeof growth[0] === 'object') {
            const sumClose = growth.reduce((s, v) => s + (v.close || 0), 0)
            const history = growth.map((item, i) => ({
              month: item.date || months[i % 12],
              revenue: Math.round((item.close || 0) * (totalRevenue / (sumClose || 1)))
            }))
            return { success: true, history }
          }
        }
      } catch (err) {
        console.error('Error fetching marketer history:', err)
      }
      return { success: false, history: [] }
    },
  },

  copy: {
    list: async (userId) => {
      const res = await fetch(`${API_BASE}/api/copy/${userId}`)
      return await res.json()
    },
    request: async (userId, marketerId, multiplier, stopLoss, deposit) => {
      const res = await fetch(`${API_BASE}/api/copy/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, marketerId, multiplier, stopLoss, deposit })
      })
      return await res.json()
    },
    remove: async (userId, marketerId) => {
      const res = await fetch(`${API_BASE}/api/copy/${userId}/${marketerId}`, {
        method: 'DELETE'
      })
      return await res.json()
    },
  },

  wallet: {
    transactions: async (userId) => {
      const res = await fetch(`${API_BASE}/api/wallet/transactions/${userId}`)
      return await res.json()
    },
    depositWallets: async () => {
      const res = await fetch(`${API_BASE}/api/wallet/deposit-wallets`)
      return await res.json()
    },
    transact: async (userId, type, amount, method, asset, txHash, walletAddress) => {
      const res = await fetch(`${API_BASE}/api/wallet/transaction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, type, amount, method, asset, txHash, walletAddress })
      })
      try {
        const res = await fetch(`${API_BASE}/api/wallet/transaction`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, type, amount, method, asset, txHash, walletAddress })
        })
        return await res.json()
      } catch (e) {
        return { success: false, error: 'Network error - Backend unreachable' }
      }
    },
  },

  admin: {
    login: async (email, password) => {
      try {
        const res = await fetch(`${API_BASE}/api/admin/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        })
        return await res.json()
      } catch (e) {
        return { success: false, error: 'Network error - Backend unreachable' }
      }
    },
    getTransactions: async () => {
      const res = await fetch(`${API_BASE}/api/admin/transactions`)
      return await res.json()
    },
    approveTransaction: async (txId) => {
      const res = await fetch(`${API_BASE}/api/admin/transactions/${txId}/approve`, {
        method: 'POST'
      })
      return await res.json()
    },
    declineTransaction: async (txId, reason) => {
      const res = await fetch(`${API_BASE}/api/admin/transactions/${txId}/decline`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason })
      })
      return await res.json()
    },
    getWallets: async () => {
      const res = await fetch(`${API_BASE}/api/admin/wallets`)
      return await res.json()
    },
    saveWallets: async (wallets) => {
      const res = await fetch(`${API_BASE}/api/admin/wallets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallets })
      })
      return await res.json()
    },
    getUsers: async () => {
      const res = await fetch(`${API_BASE}/api/admin/users`)
      return await res.json()
    },
    updateUserBalance: async (userId, balance, reason) => {
      const res = await fetch(`${API_BASE}/api/admin/users/${userId}/balance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ balance, reason })
      })
      return await res.json()
    },
    getCopyRequests: async () => {
      const res = await fetch(`${API_BASE}/api/admin/copy-requests`)
      return await res.json()
    },
    getActiveCopies: async () => {
      const res = await fetch(`${API_BASE}/api/admin/copies`)
      return await res.json()
    },
    activateCopy: async (id, payload) => {
      const res = await fetch(`${API_BASE}/api/admin/copies/${id}/activate`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      return await res.json()
    },
    blockCopy: async (id) => {
      const res = await fetch(`${API_BASE}/api/admin/copies/${id}/block`, { method: 'PATCH' })
      return await res.json()
    },
    approveCopyRequest: async (id) => {
      const res = await fetch(`${API_BASE}/api/admin/copy-requests/${id}/approve`, { method: 'POST' })
      return await res.json()
    },
    declineCopyRequest: async (id, adminEmail) => {
      const res = await fetch(`${API_BASE}/api/admin/copy-requests/${id}/decline?adminEmail=${encodeURIComponent(adminEmail)}`, { method: 'POST' })
      return await res.json()
    },
    deleteCopy: async (id, adminEmail) => {
      const res = await fetch(`${API_BASE}/api/admin/copies/${id}?adminEmail=${encodeURIComponent(adminEmail)}`, { method: 'DELETE' })
      return await res.json()
    }
  },

  feed: {
    trades: async () => {
      return { success: true, trades: [] }
    },
  },
}
