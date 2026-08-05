import { getAllAffiliates, getAffiliateById } from '../data/affiliates.js'

// ---------------------------------------------------------------------------
// Pure client-side mock API — no backend needed
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
      const txns = getStoredTransactions(userId)
      return { success: true, transactions: txns }
    },
    transact: async (userId, type, amount, method) => {
      const currentBal = getStoredBalance(userId)
      const newBal = type === 'deposit' ? currentBal + amount : currentBal - amount
      saveBalance(userId, newBal)
      const tx = {
        id: `tx_${Date.now()}`,
        userId,
        type,
        amount,
        method: method || 'Transfer',
        status: 'approved',
        date: new Date().toISOString(),
      }
      const txns = getStoredTransactions(userId)
      txns.unshift(tx)
      saveTransactions(userId, txns)
      return { success: true, transaction: tx, balance: newBal }
    },
  },

  feed: {
    trades: async () => {
      return { success: true, trades: [] }
    },
  },
}
