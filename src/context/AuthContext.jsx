import { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../lib/api.js'

const AuthContext = createContext(null)

const LOCAL_BAL_KEY  = (id) => `mm_bal_${id}`
const LOCAL_USR_KEY  = 'mm_currentUser'
const LOCAL_MIR_KEY  = (id) => `mm_mir_${id}`

function readBalance(id) {
  const raw = localStorage.getItem(LOCAL_BAL_KEY(id))
  return raw !== null ? parseFloat(raw) : 12500
}
function saveBalance(id, bal) {
  localStorage.setItem(LOCAL_BAL_KEY(id), String(bal))
}
function readMirrored(id) {
  try { return JSON.parse(localStorage.getItem(LOCAL_MIR_KEY(id)) || '[]') } catch { return [] }
}
function saveMirrored(id, list) {
  localStorage.setItem(LOCAL_MIR_KEY(id), JSON.stringify(list))
}

export function AuthProvider({ children }) {
  const [user, setUser]   = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_USR_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        // Always read balance + mirrors from localStorage so they persist properly
        const balance  = readBalance(parsed.id)
        const mirrored = readMirrored(parsed.id)
        setUser({ ...parsed, balance, mirroredAffiliates: mirrored })
      } catch {
        localStorage.removeItem(LOCAL_USR_KEY)
      }
    }
    setLoading(false)
  }, [])

  const saveUser = (u) => {
    const { balance, mirroredAffiliates, ...rest } = u
    localStorage.setItem(LOCAL_USR_KEY, JSON.stringify(rest))
    saveBalance(u.id, balance)
    saveMirrored(u.id, mirroredAffiliates || [])
    setUser(u)
  }

  const login = async (email, password) => {
    const id   = 'usr_' + btoa(email).replace(/=/g,'').slice(0, 8)
    const name = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    const balance  = readBalance(id)
    const mirrored = readMirrored(id)
    const activeUser = { id, name, email, role: 'investor', balance, mirroredAffiliates: mirrored }
    saveUser(activeUser)
    return { success: true, user: activeUser }
  }

  const register = async (name, email, password) => {
    const id = 'usr_' + btoa(email).replace(/=/g,'').slice(0, 8)
    const newUser = { id, name, email, role: 'investor', balance: 12500, mirroredAffiliates: [] }
    saveUser(newUser)
    return { success: true, user: newUser }
  }

  const logout = () => {
    localStorage.removeItem(LOCAL_USR_KEY)
    setUser(null)
  }

  const addTransaction = async (type, amount, status = 'approved', method = 'Transfer') => {
    if (!user) return null
    const data = await api.wallet.transact(user.id, type, amount, method)
    if (data.success) {
      setUser(prev => ({ ...prev, balance: data.balance }))
      saveBalance(user.id, data.balance)
      return data.transaction
    }
    return null
  }

  const mirrorAffiliate = async (affiliateId, depositAmount = 500) => {
    if (!user) return { success: false, error: 'Must be logged in' }
    if ((user.balance || 0) < depositAmount) return { success: false, error: 'Insufficient balance' }

    const newBalance  = (user.balance || 0) - depositAmount
    const newMirrored = [...(user.mirroredAffiliates || []), affiliateId]
    const updatedUser = { ...user, balance: newBalance, mirroredAffiliates: newMirrored }
    saveUser(updatedUser)

    // Also record a transaction
    await api.wallet.transact(user.id, 'allocation', depositAmount, 'Copy Allocation')
    return { success: true, balance: newBalance, mirroredAffiliates: newMirrored }
  }

  const unmirrorAffiliate = async (affiliateId) => {
    if (!user) return { success: false }
    const newMirrored = (user.mirroredAffiliates || []).filter(id => id !== affiliateId)
    const updatedUser = { ...user, mirroredAffiliates: newMirrored }
    saveUser(updatedUser)
    return { success: true, mirroredAffiliates: newMirrored }
  }

  return (
    <AuthContext.Provider value={{
      user, loading, login, register, logout,
      addTransaction, mirrorAffiliate, unmirrorAffiliate,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
