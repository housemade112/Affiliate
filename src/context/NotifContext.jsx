import { createContext, useContext, useState } from 'react'

const NotifContext = createContext(null)

const INITIAL_NOTIFICATIONS = [
  { id: 'n1', title: 'Profit Credited', body: 'Your monthly Profit has been credited to your wallet.', time: '2 min ago', read: false, type: 'success' },
  { id: 'n2', title: 'New Partner Available', body: 'A new top-rated partner just joined the directory.', time: '1 hr ago', read: false, type: 'info' },
  { id: 'n3', title: 'Deposit Confirmed', body: 'Your deposit of $1,000 has been approved.', time: '3 hrs ago', read: true, type: 'success' },
  { id: 'n4', title: 'Copy Started', body: 'You are now copying Elena Rodriguez.', time: 'Yesterday', read: true, type: 'info' },
]

export function NotifProvider({ children }) {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS)

  const unreadCount = notifications.filter(n => !n.read).length

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const markRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const addNotification = (title, body, type = 'info') => {
    const newNotif = {
      id: `n_${Date.now()}`,
      title,
      body,
      time: 'Just now',
      read: false,
      type,
    }
    setNotifications(prev => [newNotif, ...prev])
  }

  return (
    <NotifContext.Provider value={{ notifications, unreadCount, markAllRead, markRead, addNotification }}>
      {children}
    </NotifContext.Provider>
  )
}

export function useNotif() {
  const ctx = useContext(NotifContext)
  if (!ctx) throw new Error('useNotif must be used within NotifProvider')
  return ctx
}
