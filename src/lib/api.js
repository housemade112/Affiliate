// Removed affiliates.js import

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export const api = {
  auth: {
    login: async (email, password) => {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      return await res.json()
    },
    register: async (name, email, password) => {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })
      return await res.json()
    },
    me: async (userId) => {
      const res = await fetch(`${API_BASE}/api/auth/me/${userId}`)
      return await res.json()
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

  mirror: {
    list: async (userId) => {
      const res = await fetch(`${API_BASE}/api/mirror/${userId}`)
      return await res.json()
    },
    add: async (userId, marketerId, multiplier, stopLoss, deposit) => {
      const res = await fetch(`${API_BASE}/api/mirror`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, marketerId, multiplier, stopLoss, deposit })
      })
      return await res.json()
    },
    remove: async (userId, marketerId) => {
      const res = await fetch(`${API_BASE}/api/mirror/${userId}/${marketerId}`, {
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
      return await res.json()
    },
  },

  admin: {
    login: async (email, password) => {
      const res = await fetch(`${API_BASE}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      if (!res.ok) {
        const err = await res.json()
        return { success: false, error: err.error || 'Authentication failed' }
      }
      return await res.json()
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
    getMirrors: async () => {
      const res = await fetch(`${API_BASE}/api/admin/mirrors`)
      return await res.json()
    },
    blockMirror: async (id) => {
      const res = await fetch(`${API_BASE}/api/admin/mirrors/${id}/block`, { method: 'PATCH' })
      return await res.json()
    },
    approveMirror: async (id) => {
      const res = await fetch(`${API_BASE}/api/admin/mirrors/${id}/approve`, { method: 'POST' })
      return await res.json()
    },
    declineMirror: async (id, adminEmail) => {
      const res = await fetch(`${API_BASE}/api/admin/mirrors/${id}/decline?adminEmail=${encodeURIComponent(adminEmail)}`, { method: 'POST' })
      return await res.json()
    },
    deleteMirror: async (id, adminEmail) => {
      const res = await fetch(`${API_BASE}/api/admin/mirrors/${id}?adminEmail=${encodeURIComponent(adminEmail)}`, { method: 'DELETE' })
      return await res.json()
    }
  },

  feed: {
    trades: async () => {
      return { success: true, trades: [] }
    },
  },
}
