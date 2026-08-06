import { getAllAffiliates, getAffiliateById } from '../data/affiliates.js'

// ---------------------------------------------------------------------------
// Pure client-side mock API - no backend needed
// All data comes from affiliates.js (localStorage for wallet/transactions)
// ---------------------------------------------------------------------------

function getStoredTransactions(userId) {
  try {
    const raw = localStorage.getItem(`mm_txn_${userId}`)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

function saveTransactions(userId, txns) {
  localStorage.setItem(`mm_txn_${userId}`, JSON.stringify(txns))
}

function getStoredBalance(userId) {
  try {
    const raw = localStorage.getItem(`mm_bal_${userId}`)
    return raw !== null ? parseFloat(raw) : 12500
  } catch { return 12500 }
}

function saveBalance(userId, bal) {
  localStorage.setItem(`mm_bal_${userId}`, String(bal))
}

export const api = {
  auth: {
    login: async (email, password) => {
      return { success: true, user: null } // handled by AuthContext
    },
    register: async (name, email, password) => {
      return { success: true, user: null } // handled by AuthContext
    },
    me: async (userId) => {
      return { success: false }
    },
  },

  marketers: {
    list: async () => {
      const marketers = getAllAffiliates()
      return { success: true, marketers }
    },
    get: async (id) => {
      const marketer = getAffiliateById(id)
      if (!marketer) throw new Error('Not found')
      return { success: true, marketer }
    },
    history: async (id) => {
      // Generate 12-month mock history
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
      const history = months.map((month, i) => ({
        month,
        revenue: Math.floor(Math.random() * 80000 + 20000),
        return: parseFloat((Math.random() * 10 + 5).toFixed(1)),
      }))
      return { success: true, history }
    },
  },

  mirror: {
    list: async (userId) => {
      try {
        const raw = localStorage.getItem(`mm_currentUser`)
        const user = raw ? JSON.parse(raw) : null
        return { success: true, mirrors: user?.mirroredAffiliates || [] }
      } catch { return { success: true, mirrors: [] } }
    },
    add: async (userId, marketerId, multiplier, stopLoss, deposit) => {
      return { success: true }
    },
    remove: async (userId, marketerId) => {
      return { success: true }
    },
  },

  wallet: {
    transactions: async (userId) => {
      try {
        const res = await fetch(`http://localhost:3001/api/wallet/transactions/${userId}`)
        if (res.ok) return await res.json()
      } catch (e) {}
      const txns = getStoredTransactions(userId)
      return { success: true, transactions: txns }
    },
    depositWallets: async () => {
      try {
        const res = await fetch('http://localhost:3001/api/wallet/deposit-wallets')
        if (res.ok) return await res.json()
      } catch (e) {}
      return {
        success: true,
        wallets: [
          { id: 'w1', name: 'USDT (TRC20)', asset: 'USDT-TRC20', address: 'T9xQeK3Xm8qV7n2b1a0c9d8e7f6g5h4i3j2k1l', network: 'TRON (TRC20)', active: true },
          { id: 'w2', name: 'Bitcoin (BTC)', asset: 'BTC', address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', network: 'Bitcoin', active: true },
          { id: 'w3', name: 'Ethereum (ETH)', asset: 'ETH', address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F', network: 'ERC20', active: true }
        ]
      }
    },
    transact: async (userId, type, amount, method, asset, txHash, walletAddress) => {
      try {
        const res = await fetch('http://localhost:3001/api/wallet/transaction', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, type, amount, method, asset, txHash, walletAddress })
        })
        if (res.ok) return await res.json()
      } catch (e) {}

      // Fallback local simulation
      const currentBal = getStoredBalance(userId)
      const isPending = (type === 'deposit' || type === 'withdrawal')
      const status = isPending ? 'pending' : 'approved'
      let newBal = currentBal
      
      if (status === 'approved') {
        newBal = type === 'deposit' ? currentBal + amount : currentBal - amount
        saveBalance(userId, newBal)
      } else if (type === 'withdrawal') {
        newBal = Math.max(0, currentBal - amount)
        saveBalance(userId, newBal)
      }

      const tx = {
        id: `tx_${Date.now()}`,
        userId,
        type,
        amount,
        method: method || 'Crypto Transfer',
        asset: asset || 'USDT',
        txHash: txHash || '',
        walletAddress: walletAddress || '',
        status,
        createdAt: new Date().toISOString(),
      }
      const txns = getStoredTransactions(userId)
      txns.unshift(tx)
      saveTransactions(userId, txns)
      return { success: true, transaction: tx, balance: newBal }
    },
  },

  admin: {
    login: async (email, password) => {
      try {
        const res = await fetch('http://localhost:3001/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        })
        if (res.ok) return await res.json()
        const err = await res.json()
        return { success: false, error: err.error || 'Authentication failed' }
      } catch (e) {}
      
      // Fallback for standalone preview if backend is unattached
      if (password === 'admin123' || password === 'admin') {
        return {
          success: true,
          user: { id: 'admin_1', name: 'Master Admin', email, role: 'admin', loggedInAt: new Date().toISOString() }
        }
      }
      return { success: false, error: 'Invalid admin credentials' }
    },
    getTransactions: async () => {
      try {
        const res = await fetch('http://localhost:3001/api/admin/transactions')
        if (res.ok) return await res.json()
      } catch (e) {}
      return { success: true, transactions: [] }
    },
    approveTransaction: async (txId) => {
      try {
        const res = await fetch(`http://localhost:3001/api/admin/transactions/${txId}/approve`, {
          method: 'POST'
        })
        if (res.ok) return await res.json()
      } catch (e) {}
      return { success: false, error: 'Network error' }
    },
    declineTransaction: async (txId, reason) => {
      try {
        const res = await fetch(`http://localhost:3001/api/admin/transactions/${txId}/decline`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reason })
        })
        if (res.ok) return await res.json()
      } catch (e) {}
      return { success: false, error: 'Network error' }
    },
    getWallets: async () => {
      try {
        const res = await fetch('http://localhost:3001/api/admin/wallets')
        if (res.ok) return await res.json()
      } catch (e) {}
      return { success: true, wallets: [] }
    },
    saveWallets: async (wallets) => {
      try {
        const res = await fetch('http://localhost:3001/api/admin/wallets', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ wallets })
        })
        if (res.ok) return await res.json()
      } catch (e) {}
      return { success: false, error: 'Network error' }
    },
    getUsers: async () => {
      try {
        const res = await fetch('http://localhost:3001/api/admin/users')
        if (res.ok) return await res.json()
      } catch (e) {}
      return { success: true, users: [] }
    },
    updateUserBalance: async (userId, balance, reason) => {
      try {
        const res = await fetch(`http://localhost:3001/api/admin/users/${userId}/balance`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ balance, reason })
        })
        if (res.ok) return await res.json()
      } catch (e) {}
      return { success: false, error: 'Network error' }
    }
  },

  feed: {
    trades: async () => {
      return { success: true, trades: [] }
    },
  },
}
