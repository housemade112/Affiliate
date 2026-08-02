import { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), duration)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
        {toasts.map(toast => (
          <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used within ToastProvider')
  return context
}

function Toast({ message, type, onClose }) {
  const styles = {
    success: 'bg-emerald-500/90 border-emerald-400/30 text-white',
    error: 'bg-rose-500/90 border-rose-400/30 text-white',
    warning: 'bg-amber-500/90 border-amber-400/30 text-white',
    info: 'bg-indigo-500/90 border-indigo-400/30 text-white',
  }
  return (
    <div className={`pointer-events-auto px-5 py-3 rounded-xl border backdrop-blur-sm shadow-2xl animate-slide-up ${styles[type]}`}>
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">{message}</span>
        <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100 transition-opacity text-xs">x</button>
      </div>
    </div>
  )
}
