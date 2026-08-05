import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { ToastProvider } from './context/ToastContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { NotifProvider } from './context/NotifContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Layout from './components/Layout.jsx'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Marketers from './pages/Marketers.jsx'
import MarketerDetail from './pages/MarketerDetail.jsx'
import Leaderboard from './pages/Leaderboard.jsx'
import Wallet from './pages/Wallet.jsx'
import Admin from './pages/Admin.jsx'
import Profile from './pages/Profile.jsx'
import Portfolio from './pages/Portfolio.jsx'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/marketers" element={<Marketers />} />
        <Route path="/marketer/:id" element={<MarketerDetail />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <NotifProvider>
            <AppRoutes />
          </NotifProvider>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
