import { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../lib/api.js'

const AuthContext = createContext(null)

const LOCAL_USR_KEY = 'mm_currentUser'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchUser = async (userId) => {
    try {
      const res = await api.auth.me(userId)
      if (res.success) {
        setUser(res.user)
        localStorage.setItem(LOCAL_USR_KEY, JSON.stringify({ id: res.user.id }))
      } else {
        localStorage.removeItem(LOCAL_USR_KEY)
        setUser(null)
      }
    } catch (e) {
      console.error('Error fetching user', e)
    }
  }

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_USR_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (parsed.id) {
          fetchUser(parsed.id).finally(() => setLoading(false))
          return
        }
      } catch {}
    }
    setLoading(false)
  }, [])

  // Add an interval to occasionally poll for balance updates (e.g. after admin approves)
  useEffect(() => {
    if (!user) return
    const interval = setInterval(() => {
      fetchUser(user.id)
    }, 10000) // Poll every 10 seconds
    return () => clearInterval(interval)
  }, [user?.id])

  const login = async (email, password) => {
    const res = await api.auth.login(email, password)
    if (res.success) {
      setUser(res.user)
      localStorage.setItem(LOCAL_USR_KEY, JSON.stringify({ id: res.user.id }))
      return { success: true, user: res.user }
    }
    return res
  }

  const register = async (name, email, password) => {
    const res = await api.auth.register(name, email, password)
    if (res.success) {
      setUser(res.user)
      localStorage.setItem(LOCAL_USR_KEY, JSON.stringify({ id: res.user.id }))
      return { success: true, user: res.user }
    }
    return res
  }

  const logout = () => {
    localStorage.removeItem(LOCAL_USR_KEY)
    setUser(null)
  }

  // The WalletModal and other components should really call api.wallet.transact directly
  // But we provide this helper for backward compatibility
  const addTransaction = async (type, amount, status = 'pending', method = 'Transfer') => {
    if (!user) return null
    const res = await api.wallet.transact(user.id, type, amount, method)
    if (res.success) {
      setUser(prev => ({ ...prev, balance: res.balance }))
      return res.transaction
    }
    return null
  }

  const requestCopy = async (affiliateId, depositAmount = 500) => {
    if (!user) return { success: false, error: 'Must be logged in' }
    const res = await api.copy.request(user.id, affiliateId, 1.0, 10, depositAmount)
    if (res.success) {
      // Re-fetch user to get updated balance and mirrored list (though balance won't change yet for requests)
      await fetchUser(user.id)
      return { success: true }
    }
    return res
  }

  const stopCopying = async (affiliateId) => {
    if (!user) return { success: false }
    const res = await api.copy.remove(user.id, affiliateId)
    if (res.success) {
      await fetchUser(user.id)
      return { success: true }
    }
    return res
  }

  // We provide a refreshUser method for components to trigger a forced update
  const refreshUser = async () => {
    if (user?.id) {
      await fetchUser(user.id)
    }
  }

  return (
    <AuthContext.Provider value={{
      user, loading, login, register, logout,
      addTransaction, requestCopy, stopCopying,
      refreshUser
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
