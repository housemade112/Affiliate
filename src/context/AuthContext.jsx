import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

function initStorage() {
  if (!localStorage.getItem('mm_users')) localStorage.setItem('mm_users', JSON.stringify([]))
  if (!localStorage.getItem('mm_transactions')) localStorage.setItem('mm_transactions', JSON.stringify([]))
  if (!localStorage.getItem('mm_affiliateEdits')) localStorage.setItem('mm_affiliateEdits', JSON.stringify({}))
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    initStorage()
    const stored = localStorage.getItem('mm_currentUser')
    if (stored) {
      try { setUser(JSON.parse(stored)) } catch { localStorage.removeItem('mm_currentUser') }
    }
    setLoading(false)
  }, [])

  const getAllUsers = () => JSON.parse(localStorage.getItem('mm_users') || '[]')

  const updateUser = (userId, updates) => {
    const users = getAllUsers()
    const idx = users.findIndex(u => u.id === userId)
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...updates }
      localStorage.setItem('mm_users', JSON.stringify(users))
      if (user && user.id === userId) {
        const updated = { ...user, ...updates }
        setUser(updated)
        localStorage.setItem('mm_currentUser', JSON.stringify(updated))
      }
      return true
    }
    return false
  }

  const login = (email, password) => {
    const users = getAllUsers()
    const found = users.find(u => u.email === email && u.password === password)
    if (!found) return { success: false, error: 'Invalid credentials' }
    if (found.isSuspended) return { success: false, error: 'Account suspended. Contact support.' }
    const { password: _, ...safeUser } = found
    setUser(safeUser)
    localStorage.setItem('mm_currentUser', JSON.stringify(safeUser))
    return { success: true, user: safeUser }
  }

  const register = (name, email, password) => {
    const users = getAllUsers()
    if (users.some(u => u.email === email)) return { success: false, error: 'Email already registered' }
    const newUser = {
      id: `user_${Date.now()}`,
      email, password, name,
      balance: 0,
      mirroredAffiliates: [],
      isSuspended: false,
      createdAt: new Date().toISOString(),
    }
    users.push(newUser)
    localStorage.setItem('mm_users', JSON.stringify(users))
    const { password: _, ...safeUser } = newUser
    setUser(safeUser)
    localStorage.setItem('mm_currentUser', JSON.stringify(safeUser))
    return { success: true, user: safeUser }
  }

  const logout = () => { setUser(null); localStorage.removeItem('mm_currentUser') }

  const addTransaction = (type, amount, status = 'pending') => {
    const txs = JSON.parse(localStorage.getItem('mm_transactions') || '[]')
    const newTx = {
      id: `tx_${Date.now()}`,
      userId: user?.id, userName: user?.name, userEmail: user?.email,
      type, amount, status,
      createdAt: new Date().toISOString(),
    }
    txs.unshift(newTx)
    localStorage.setItem('mm_transactions', JSON.stringify(txs))
    return newTx
  }

  const getTransactions = () => JSON.parse(localStorage.getItem('mm_transactions') || '[]')

  const mirrorAffiliate = (affiliateId, depositAmount) => {
    if (!user || user.balance < depositAmount) return { success: false, error: 'Insufficient balance' }
    const mirrored = user.mirroredAffiliates || []
    if (mirrored.includes(affiliateId)) return { success: false, error: 'Already mirroring this marketer' }
    updateUser(user.id, { balance: user.balance - depositAmount, mirroredAffiliates: [...mirrored, affiliateId] })
    addTransaction('mirror_deposit', depositAmount, 'completed')
    return { success: true }
  }

  const unmirrorAffiliate = (affiliateId) => {
    if (!user) return { success: false }
    const mirrored = user.mirroredAffiliates || []
    updateUser(user.id, { mirroredAffiliates: mirrored.filter(id => id !== affiliateId) })
    return { success: true }
  }

  return (
    <AuthContext.Provider value={{
      user, loading, login, register, logout,
      getAllUsers, updateUser,
      addTransaction, getTransactions,
      mirrorAffiliate, unmirrorAffiliate,
    }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
