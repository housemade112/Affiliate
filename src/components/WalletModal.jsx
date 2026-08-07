import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { api } from '../lib/api.js'
import { formatCurrency } from '../lib/utils.js'
import {
  X, CheckCircle2, ArrowDownToLine, ArrowUpFromLine,
  ChevronRight, Bitcoin
} from 'lucide-react'

// Reliable Logo URLs
const LOGOS = {
  USDT: 'https://cryptologos.cc/logos/tether-usdt-logo.svg?v=033',
  BTC: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=033',
  ETH: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=033',
  USDC: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=033',
  CASHAPP: 'https://cdn.jsdelivr.net/npm/simple-icons@11/icons/cashapp.svg',
  PAYPAL: 'https://cdn.jsdelivr.net/npm/simple-icons@11/icons/paypal.svg',
}

const IconImage = ({ src, color }) => (
  <img 
    src={src} 
    alt="logo" 
    className="w-7 h-7 object-contain" 
    style={color ? { filter: `invert(40%) sepia(80%) saturate(1000%) hue-rotate(90deg)` } : {}}
    // simple-icons are black by default, we can use CSS filter for CashApp/PayPal, or just use them black. 
    // Actually, Cash App and PayPal logos are recognizable. Let's just use them as is, or with the proper filter. 
    // To make it easier, let's just use normal image rendering.
  />
)

const FilteredIcon = ({ src, filter }) => (
  <img src={src} alt="icon" className="w-7 h-7 object-contain" style={{ filter }} />
)

// DEPOSIT_METHODS is now generated dynamically from adminWallets

const WITHDRAW_METHODS = [
  { id: 'cashapp',    label: 'Cash App',       network: 'USD Transfer',        icon: LOGOS.CASHAPP, filter: 'invert(58%) sepia(86%) saturate(2206%) hue-rotate(92deg) brightness(97%) contrast(106%)' },
  { id: 'paypal',     label: 'PayPal',         network: 'USD Transfer',        icon: LOGOS.PAYPAL, filter: 'invert(19%) sepia(90%) saturate(3015%) hue-rotate(195deg) brightness(94%) contrast(101%)' },
  { id: 'crypto',     label: 'Cryptocurrency', network: 'Blockchain Transfer', icon: LOGOS.BTC },
]

export default function WalletModal({ isOpen, onClose, onSuccess, defaultType = 'deposit' }) {
  const { user, refreshUser } = useAuth()
  const { addToast } = useToast()

  const [type, setType]         = useState(defaultType)
  const [step, setStep]         = useState(1)   // 1 = method, 2 = amount/address
  const [method, setMethod]     = useState(null)
  const [amount, setAmount]     = useState('')
  const [address, setAddress]   = useState('') // Cashtag/Email/Wallet
  const [txHash, setTxHash]     = useState('') // Transaction hash / proof for deposit
  const [adminWallets, setAdminWallets] = useState([])
  const [cryptoCoin, setCryptoCoin] = useState('BTC') // For generic crypto withdraw
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setType(defaultType)
      setStep(1)
      setMethod(null)
      setAmount('')
      setAddress('')
      setTxHash('')
      setCryptoCoin('BTC')

      // Fetch dynamic admin deposit wallets
      api.wallet.depositWallets()
        .then(d => {
          if (d.success && d.wallets) setAdminWallets(d.wallets)
        })
        .catch(console.error)
    }
  }, [isOpen, defaultType])

  if (!isOpen) return null

  const activeWallets = adminWallets.filter(w => w.active)

  const DEPOSIT_METHODS = [
    { id: 'crypto', label: 'Cryptocurrency', network: 'Blockchain Transfer', icon: LOGOS.BTC }
  ]

  const methods = type === 'deposit' ? DEPOSIT_METHODS : WITHDRAW_METHODS

  const resetAndClose = () => {
    setStep(1); setMethod(null); setAmount(''); setAddress('')
    onClose()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const val = parseFloat(amount)
    if (!val || val <= 0) { addToast('Please enter a valid amount', 'error'); return }
    if (type === 'withdrawal' && val > (user?.balance || 0)) {
      addToast('Insufficient balance', 'error'); return
    }
    if (type === 'withdrawal' && !address) {
      addToast('Please enter your details', 'error'); return
    }

    setSubmitting(true)
    let finalAsset = cryptoCoin
    let finalAddress = address
    let displayMethodLabel = method.label

    if (type === 'deposit' && method.id === 'crypto') {
      const selectedWallet = activeWallets.find(w => w.id === cryptoCoin) || activeWallets[0]
      if (!selectedWallet) { addToast('No active deposit wallets available', 'error'); setSubmitting(false); return }
      finalAsset = selectedWallet.asset
      finalAddress = selectedWallet.address
      displayMethodLabel = selectedWallet.name
    }

    const txLabel = type === 'withdrawal' && method.id === 'crypto' 
      ? `Withdrawal (${cryptoCoin})`
      : type === 'deposit' && method.id === 'crypto'
      ? `Deposit (${finalAsset})`
      : displayMethodLabel

    const res = await api.wallet.transact(
      user?.id,
      type,
      val,
      txLabel,
      method.asset || finalAsset,
      txHash,
      finalAddress
    )
    setSubmitting(false)

    if (res && res.success) {
      if (type === 'deposit') {
        addToast(`Deposit of ${formatCurrency(val)} submitted! Pending Admin Verification.`, 'info')
      } else {
        addToast(`Withdrawal of ${formatCurrency(val)} submitted! Pending Admin Approval.`, 'info')
      }
      if (refreshUser) await refreshUser()
      setAmount(''); setAddress(''); setTxHash(''); setStep(1); setMethod(null)
      if (onSuccess) onSuccess(res.transaction)
      onClose()
    } else {
      addToast('Transaction failed. Try again.', 'error')
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-sm animate-fade-in flex items-center justify-center p-4">
      <div className="bg-white text-slate-900 w-full sm:max-w-lg rounded-t-[36px] sm:rounded-[36px] shadow-2xl relative overflow-hidden max-h-full flex flex-col border border-slate-100">

        {/* Header */}
        <div className="bg-white border-b border-slate-100 px-6 py-5 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            {step === 2 && (
              <button onClick={() => setStep(1)} className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center hover:bg-slate-100 transition-colors border border-slate-100 mr-1">
                <ChevronRight className="w-4 h-4 text-slate-700 rotate-180" />
              </button>
            )}
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#005645] flex items-center justify-center shadow-sm border border-emerald-100">
              {type === 'deposit' ? <ArrowDownToLine className="w-5 h-5" /> : <ArrowUpFromLine className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base tracking-tight leading-tight">
                {step === 1 ? 'Select Crypto / Payment' : type === 'deposit' ? 'Deposit Funds' : 'Withdraw Funds'}
              </h3>
            </div>
          </div>
          <button onClick={resetAndClose} className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center hover:bg-slate-100 transition-colors border border-slate-100">
            <X className="w-4 h-4 text-slate-700" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5">
          {/* Type Toggle */}
          <div className="flex gap-2 p-1.5 bg-slate-50 border border-slate-100 rounded-lg">
            {['deposit', 'withdrawal'].map(t => (
              <button key={t} type="button" onClick={() => { setType(t); setStep(1); setMethod(null) }}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-extrabold tracking-wide uppercase transition-all ${
                  type === t ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50' : 'text-slate-700 hover:text-slate-600'
                }`}>
                {t === 'deposit' ? <ArrowDownToLine className="w-4 h-4" /> : <ArrowUpFromLine className="w-4 h-4" />}
                {t === 'deposit' ? 'Deposit' : 'Withdraw'}
              </button>
            ))}
          </div>

          {/* STEP 1: Method Selection */}
          {step === 1 && (
            <div className="space-y-3">
              <p className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">Select Asset or Wallet</p>
              <div className="space-y-2.5">
                {methods.map((m, idx) => {
                  return (
                    <button key={m.id} type="button"
                      onClick={() => { setMethod(m); setStep(2) }}
                      className="w-full flex items-center justify-between p-4 rounded-lg border border-slate-100 bg-white hover:bg-slate-50 hover:border-slate-200 transition-all group text-left shadow-sm">
                      <div className="flex items-center gap-3.5">
                        <div className="w-11 h-11 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
                          {m.filter ? (
                            <FilteredIcon src={m.icon} filter={m.filter} />
                          ) : (
                            <img src={m.icon} alt={m.label} className="w-7 h-7 object-contain" />
                          )}
                        </div>
                        <div>
                          <p className="font-extrabold text-slate-900 text-sm tracking-tight">{m.label}</p>
                          <p className="text-xs text-slate-700 font-semibold mt-0.5">{m.network}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-700 transition-colors" />
                      </div>
                    </button>
                  )
                })}
              </div>

              <p className="text-[11px] text-slate-700 text-center pt-3 leading-relaxed">
                A top-up or withdrawal request will be initiated. Once compliance checks are completed by admin, funds reflect instantly.
              </p>
            </div>
          )}

          {/* STEP 2: Amount + Address Form */}
          {step === 2 && method && (
            <form onSubmit={handleSubmit} className="space-y-5 pb-2">
              {/* Selected method display */}
              <div className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-100 rounded-lg">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-slate-100 shadow-sm">
                  {method.filter ? (
                    <FilteredIcon src={method.icon} filter={method.filter} />
                  ) : (
                    <img src={method.icon} alt={method.label} className="w-6 h-6 object-contain" />
                  )}
                </div>
                <div>
                  <p className="font-extrabold text-slate-900 text-sm">{method.label}</p>
                  <p className="text-xs text-slate-700 font-semibold">{method.network}</p>
                </div>
                <button type="button" onClick={() => setStep(1)} className="ml-auto text-xs font-bold text-[#005645] bg-emerald-50 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors">
                  Change
                </button>
              </div>

              {/* Deposit wallet address to send to */}
              {type === 'deposit' && (
                <div className="space-y-4">
                  {method.id === 'crypto' && (
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">Select Coin</label>
                      <select 
                        value={cryptoCoin} 
                        onChange={(e) => setCryptoCoin(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 text-sm font-bold focus:outline-none focus:border-emerald-500 transition-all cursor-pointer shadow-sm"
                      >
                        {activeWallets.length === 0 ? (
                           <option value="">No active wallets</option>
                        ) : (
                           activeWallets.map(w => (
                             <option key={w.id} value={w.id}>{w.name} ({w.asset})</option>
                           ))
                        )}
                      </select>
                    </div>
                  )}

                  {(() => {
                    const selectedWallet = method.id === 'crypto' 
                      ? activeWallets.find(w => w.id === cryptoCoin) || activeWallets[0]
                      : method
                    
                    if (!selectedWallet && method.id === 'crypto') return (
                      <p className="text-sm text-red-500 p-4">No deposit wallets configured.</p>
                    )

                    return (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">Send to Admin Address</label>
                          <div className="p-4 bg-slate-50 border border-slate-100 rounded-lg">
                            <p className="font-mono text-xs text-slate-700 font-bold break-all">
                              {selectedWallet.address}
                            </p>
                            <button type="button" onClick={() => { 
                              navigator.clipboard.writeText(selectedWallet.address); 
                              addToast('Address copied!', 'success') 
                            }}
                              className="mt-2 text-xs font-extrabold text-[#005645] hover:underline">
                              Copy Deposit Address
                            </button>
                          </div>
                          <p className="text-[11px] text-amber-700 font-medium bg-amber-50 border border-amber-100 rounded-xl p-3">
                            ⚠️ Send only {selectedWallet.name || selectedWallet.label} to this address. After sending, paste your TxHash below.
                          </p>
                        </div>
                      </div>
                    )
                  })()}

                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">TxHash / Proof</label>
                    <input type="text" value={txHash} onChange={e => setTxHash(e.target.value)}
                      placeholder="Paste 0x... or transaction hash here"
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 text-sm font-mono placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-all shadow-sm"
                      required />
                  </div>
                </div>
              )}

              {/* Withdrawal details */}
              {type === 'withdrawal' && (
                <div className="space-y-4">
                  {method.id === 'crypto' && (
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">Select Coin</label>
                      <select 
                        value={cryptoCoin} 
                        onChange={(e) => setCryptoCoin(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 text-sm font-bold focus:outline-none focus:border-emerald-500 transition-all cursor-pointer shadow-sm"
                      >
                        <option value="BTC">Bitcoin (BTC)</option>
                        <option value="ETH">Ethereum (ETH)</option>
                        <option value="USDT">Tether (USDT TRC-20)</option>
                        <option value="USDC">USD Coin (USDC)</option>
                      </select>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">
                      {method.id === 'cashapp' ? 'Your $Cashtag' : method.id === 'paypal' ? 'Your PayPal Email' : 'Your Wallet Address'}
                    </label>
                    <input type="text" value={address} onChange={e => setAddress(e.target.value)}
                      placeholder={method.id === 'cashapp' ? '$username' : method.id === 'paypal' ? 'email@example.com' : 'Paste address here...'}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 text-sm font-medium placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-all shadow-sm"
                      required />
                  </div>
                </div>
              )}

              {/* Amount */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">
                  {type === 'deposit' ? 'Amount to send (USD)' : 'Amount to withdraw (USD)'}
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700 text-lg font-extrabold">$</span>
                  <input type="number" value={amount} onChange={e => setAmount(e.target.value)}
                    placeholder="0.00" min="0" step="0.01" max={type === 'withdrawal' ? user?.balance : undefined}
                    className="w-full pl-8 pr-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 text-xl font-extrabold placeholder-slate-300 focus:outline-none focus:border-emerald-500 transition-all shadow-sm"
                    required />
                </div>
                {type === 'withdrawal' && (
                  <button type="button" onClick={() => setAmount(String(user?.balance || 0))}
                    className="text-xs font-bold text-[#005645] hover:underline">
                    Use max balance ({formatCurrency(user?.balance || 0)})
                  </button>
                )}
              </div>

              {/* Fee info */}
              <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 space-y-2 text-xs">
                <div className="flex justify-between font-semibold text-slate-700">
                  <span>Network Fee</span><span className="text-slate-900 font-bold">$0.00</span>
                </div>
                <div className="flex justify-between font-semibold text-slate-700">
                  <span>Platform Fee</span><span className="text-slate-900 font-bold">0%</span>
                </div>
                <div className="flex justify-between font-extrabold text-slate-900 border-t border-slate-200/50 pt-2">
                  <span>You {type === 'deposit' ? 'receive' : 'withdraw'}</span>
                  <span className="text-[#005645]">{amount ? formatCurrency(parseFloat(amount)) : '$0'}</span>
                </div>
              </div>

              <button type="submit" disabled={submitting}
                className="w-full py-3 rounded-lg btn-lime text-sm shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                {submitting ? 'Processing...' : `Continue`}
              </button>

              <p className="text-center text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 pt-2 pb-2">
                🔒 256-bit Encrypted · Funds are SAFU
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
