import { useAuth } from '../context/AuthContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import { ShieldCheck, Mail, Lock, Key, Bell, CheckCircle2, AlertCircle, Camera, Wallet, Link as LinkIcon } from 'lucide-react'
import { useState } from 'react'

export default function Profile() {
  const { user } = useAuth()
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  
  const [activeTab, setActiveTab] = useState('general')

  const card = `rounded-xl shadow-sm border ${isDark ? 'bg-[#1A1D21] border-white/5' : 'bg-white border-slate-200/80'}`

  return (
    <div className="animate-fade-in pb-24 font-sans space-y-6">
      
      {/* Header */}
      <div className={`${card} p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden`}>

        
        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10 w-full md:w-auto">
          <div className="relative group cursor-pointer">
            <img
              src={`https://randomuser.me/api/portraits/women/${user?.name?.length % 99 || 44}.jpg`}
              alt={user?.name}
              className={`w-24 h-24 rounded-full border-4 shadow-lg transition-transform group-hover:scale-105 object-cover ${
                isDark ? 'border-[#C3F53C]/20' : 'border-white'
              }`}
            />
            <div className="absolute bottom-0 right-0 p-2 bg-slate-900 text-white rounded-full border-2 border-white shadow-sm hover:bg-slate-800 transition-colors">
              <Camera className="w-4 h-4" />
            </div>
          </div>
          <div className="text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-1">
              <h2 className={`text-2xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{user?.name || 'User Profile'}</h2>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border shadow-sm backdrop-blur-sm ${
                isDark ? 'bg-white/5 text-emerald-400 border-emerald-500/20' : 'bg-white text-[#005645] border-slate-200'
              }`}>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> KYC Verified
              </span>
            </div>
            <p className={`font-semibold ${isDark ? 'text-white/70' : 'text-slate-800'}`}>{user?.email}</p>
          </div>
        </div>
        
        <div className="w-full md:w-auto flex gap-2 z-10">
          <button className={`flex-1 md:flex-none px-6 py-2.5 text-sm font-extrabold rounded-xl transition-all ${
            isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}>Edit Profile</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sidebar Nav */}
        <div className="lg:col-span-3 space-y-2">
          {[
            { id: 'general', label: 'General Info', icon: Mail },
            { id: 'wallets', label: 'Linked Wallets', icon: Wallet },
            { id: 'security', label: 'Security', icon: Lock },
            { id: 'notifications', label: 'Notifications', icon: Bell },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-5 py-4 rounded-lg font-bold text-sm transition-all ${
                activeTab === tab.id 
                  ? isDark ? 'bg-[#005645]/40 text-[#C3F53C] border border-[#005645]' : 'bg-emerald-50 text-[#005645] border border-emerald-100 shadow-sm'
                  : isDark ? 'text-white/50 hover:bg-white/5 hover:text-white border border-transparent' : 'text-slate-800 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
              }`}>
              <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? '' : isDark ? 'text-white/30' : 'text-slate-600'}`} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className={`lg:col-span-9 ${card} p-6 min-h-[400px]`}>
          
          {activeTab === 'general' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Personal Details</h3>
                <p className={`text-sm font-medium mt-1 ${isDark ? 'text-white/70' : 'text-slate-800'}`}>Manage your basic profile information.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <label className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-white/70' : 'text-slate-600'}`}>Full Name</label>
                  <input type="text" defaultValue={user?.name} className={`w-full px-4 py-3.5 rounded-xl font-bold text-sm border focus:outline-none transition-colors ${
                    isDark ? 'bg-white/5 border-white/10 text-white focus:border-[#C3F53C]' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#005645]'
                  }`} />
                </div>
                <div className="space-y-2">
                  <label className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-white/70' : 'text-slate-600'}`}>Email Address</label>
                  <div className="relative">
                    <input type="email" defaultValue={user?.email} disabled className={`w-full px-4 py-3.5 rounded-xl font-bold text-sm border opacity-70 ${
                      isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`} />
                    <div className={`absolute right-3 top-2.5 flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wide ${isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}`}>
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                    </div>
                  </div>
                </div>
              </div>
              <button className="btn-lime px-8 py-3 text-sm shadow-sm mt-4">Save Changes</button>
            </div>
          )}

          {activeTab === 'wallets' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Linked Payment Methods</h3>
                <p className={`text-sm font-medium mt-1 ${isDark ? 'text-white/70' : 'text-slate-800'}`}>Manage your saved withdrawal addresses and accounts.</p>
              </div>
              
              <div className="space-y-4 pt-4">
                {[
                  { id: 'btc', label: 'Bitcoin Wallet', address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', connected: true },
                  { id: 'eth', label: 'Ethereum (ERC-20)', address: '0x71C...976F', connected: true },
                  { id: 'cashapp', label: 'Cash App', address: 'Not connected', connected: false },
                  { id: 'paypal', label: 'PayPal', address: 'Not connected', connected: false },
                ].map(wallet => (
                  <div key={wallet.id} className={`flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-lg border transition-colors ${
                    isDark ? 'bg-white/5 border-white/10 hover:border-white/20' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}>
                    <div className="flex items-center gap-4 mb-4 sm:mb-0">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${
                        wallet.connected 
                          ? isDark ? 'bg-[#005645]/40 text-[#C3F53C]' : 'bg-emerald-50 text-[#005645]'
                          : isDark ? 'bg-white/5 text-white/30' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <Wallet className="w-5 h-5" />
                      </div>
                      <div>
                        <p className={`font-extrabold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>{wallet.label}</p>
                        <p className={`text-xs font-mono mt-1 ${
                          wallet.connected ? (isDark ? 'text-emerald-400' : 'text-emerald-600') : (isDark ? 'text-white/30' : 'text-slate-600')
                        }`}>{wallet.address}</p>
                      </div>
                    </div>
                    <button className={`px-5 py-2 text-xs font-extrabold rounded-xl transition-colors flex items-center gap-2 border ${
                      wallet.connected 
                        ? isDark ? 'bg-transparent border-rose-500/30 text-rose-400 hover:bg-rose-500/10' : 'bg-white border-slate-200 text-rose-600 hover:bg-rose-50'
                        : isDark ? 'bg-white/10 border-white/10 text-white hover:bg-white/20' : 'bg-slate-800 border-slate-800 text-white hover:bg-slate-900 shadow-sm'
                    }`}>
                      <LinkIcon className="w-3.5 h-3.5" />
                      {wallet.connected ? 'Unlink' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Security Settings</h3>
                <p className={`text-sm font-medium mt-1 ${isDark ? 'text-white/70' : 'text-slate-800'}`}>Update your password and secure your account.</p>
              </div>
              
              <div className="space-y-4 pt-4">
                {[
                  { icon: Lock, title: 'Change Password', desc: 'Update your account password regularly' },
                  { icon: Key, title: 'Two-Factor Authentication', desc: 'Add an extra layer of security', badge: 'Recommended' },
                ].map(item => (
                  <div key={item.title} className={`flex items-center justify-between p-5 rounded-lg border transition-colors cursor-pointer group ${
                    isDark ? 'bg-white/5 border-white/10 hover:border-white/20' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}>
                    <div className="flex items-center gap-4">
                      <item.icon className={`w-5 h-5 transition-colors ${isDark ? 'text-white/30 group-hover:text-[#C3F53C]' : 'text-slate-600 group-hover:text-[#005645]'}`} />
                      <div>
                        <h4 className={`text-sm font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</h4>
                        <p className={`text-xs font-semibold mt-0.5 ${isDark ? 'text-white/70' : 'text-slate-800'}`}>{item.desc}</p>
                      </div>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] font-extrabold uppercase tracking-wide bg-amber-100 text-amber-700 px-3 py-1 rounded-lg border border-amber-200">
                        {item.badge}
                      </span>
                    )}
                  </div>
                ))}

                <div className="mt-8 p-6 bg-rose-50/50 dark:bg-rose-500/5 border border-rose-200 dark:border-rose-500/20 rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-rose-500 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-extrabold text-rose-600 dark:text-rose-400">Danger Zone</h4>
                      <p className="text-xs font-semibold text-rose-500/70 mt-1">Permanently delete your account and all data. This action cannot be undone.</p>
                    </div>
                  </div>
                  <button className="px-5 py-2.5 text-xs font-extrabold text-rose-600 bg-rose-100 hover:bg-rose-200 rounded-xl transition-colors whitespace-nowrap">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Notification Preferences</h3>
                <p className={`text-sm font-medium mt-1 ${isDark ? 'text-white/70' : 'text-slate-800'}`}>Control what alerts you receive.</p>
              </div>
              <div className="p-6 text-center">
                <Bell className={`w-12 h-12 mx-auto mb-4 ${isDark ? 'text-white/10' : 'text-slate-200'}`} />
                <p className={`font-semibold ${isDark ? 'text-white/70' : 'text-slate-800'}`}>Push notifications are currently active.</p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
