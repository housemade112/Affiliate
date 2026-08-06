import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
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

// Payment Methods
const DEPOSIT_METHODS = [
  { id: 'usdt_trc20', label: 'USDT (TRC-20)', network: 'Tron Network', icon: LOGOS.USDT, address: 'TQnGxxx...USDT_ADDRESS' },
  { id: 'usdt_erc20', label: 'USDT (ERC-20)', network: 'Ethereum Network', icon: LOGOS.USDT, address: '0xSample...ERC20_ADDRESS' },
  { id: 'bitcoin',    label: 'Bitcoin (BTC)',  network: 'Bitcoin Network',  icon: LOGOS.BTC, address: 'bc1qSample...BTC_ADDRESS' },
  { id: 'ethereum',   label: 'Ethereum (ETH)', network: 'Ethereum Mainnet', icon: LOGOS.ETH, address: '0xSample...ETH_ADDRESS' },
  { id: 'usdc',       label: 'USDC',           network: 'Ethereum Network', icon: LOGOS.USDC, address: '0xSample...USDC_ADDRESS' },
]

const WITHDRAW_METHODS = [
  { id: 'cashapp',    label: 'Cash App',       network: 'USD Transfer',        icon: LOGOS.CASHAPP, filter: 'invert(58%) sepia(86%) saturate(2206%) hue-rotate(92deg) brightness(97%) contrast(106%)' },
  { id: 'paypal',     label: 'PayPal',         network: 'USD Transfer',        icon: LOGOS.PAYPAL, filter: 'invert(19%) sepia(90%) saturate(3015%) hue-rotate(195deg) brightness(94%) contrast(101%)' },
  { id: 'crypto',     label: 'Cryptocurrency', network: 'Blockchain Transfer', icon: LOGOS.BTC },
]

export default function WalletModal({ isOpen, onClose, onSuccess, defaultType = 'deposit' }) {
  const { user, addTransaction } = useAuth()
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
    const txLabel = type === 'withdrawal' && method.id === 'crypto' 
      ? `Withdrawal (${cryptoCoin})`
      : method.label

    const res = await api.wallet.transact(
      user?.id,
      type,
      val,
      txLabel,
      method.asset || cryptoCoin,
      txHash,
      address
    )
    setSubmitting(false)

    if (res && res.success) {
      if (type === 'deposit') {
        addToast(`Deposit of ${formatCurrency(val)} submitted! Pending Admin Verification.`, 'info')
      } else {
        addToast(`Withdrawal of ${formatCurrency(val)} submitted! Pending Admin Approval.`, 'info')
      }
      setAmount(''); setAddress(''); setTxHash(''); setStep(1); setMethod(null)
      if (onSuccess) onSuccess(res.transaction)
      onClose()
    } else {
      addToast('Transaction failed. Try again.', 'error')
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm animate-fade-in flex items-center justify-center p-4">
      <div className="bg-white w-full sm:max-w-lg rounded-t-[32px] sm:rounded-[32px] shadow-2xl relative overflow-hidden max-h-full flex flex-col">

        {/* Header */}
        <div className="bg-white border-b border-slate-100 px-6 py-5 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            {step === 2 && (
              <button onClick={() => setStep(1)} className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors mr-1">
                <ChevronRight className="w-4 h-4 text-slate-600 rotate-180" />
              </button>
            )}
            <div className="w-10 h-10 rounded-xl bg-[#005645] flex items-center justify-center text-[#C3F53C] shadow-md">
              {type === 'deposit' ? <ArrowDownToLine className="w-5 h-5" /> : <ArrowUpFromLine className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg leading-tight">
                {step === 1 ? 'Select Method' : type === 'deposit' ? 'Deposit Funds' : 'Withdraw Funds'}
              </h3>
            </div>
          </div>
          <button onClick={resetAndClose} className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
            <X className="w-4 h-4 text-slate-600" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5">
          {/* Type Toggle */}
          <div className="flex gap-2 p-1.5 bg-slate-100 border border-slate-200 rounded-2xl">
            {['deposit', 'withdrawal'].map(t => (
              <button key={t} type="button" onClick={() => { setType(t); setStep(1); setMethod(null) }}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-extrabold transition-all ${
                  type === t ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60' : 'text-slate-500 hover:text-slate-900'
                }`}>
                {t === 'deposit' ? <ArrowDownToLine className="w-4 h-4" /> : <ArrowUpFromLine className="w-4 h-4" />}
                {t === 'deposit' ? 'Deposit' : 'Withdraw'}
              </button>
            ))}
          </div>

          {/* STEP 1: Method Selection */}
          {step === 1 && (
            <div className="space-y-3">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Choose payment method</p>
              <div className="space-y-2">
                {methods.map(m => (
                  <button key={m.id} type="button"
                    onClick={() => { setMethod(m); setStep(2) }}
                    className="w-full flex items-center justify-between p-4 rounded-2xl border-2 border-slate-100 bg-white hover:border-[#005645] hover:bg-emerald-50/50 transition-all group text-left">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 bg-white group-hover:border-[#005645]/20 transition-colors">
                        {m.filter ? (
                          <FilteredIcon src={m.icon} filter={m.filter} />
                        ) : (
                          <img src={m.icon} alt={m.label} className="w-7 h-7 object-contain" />
                        )}
                      </div>
                      <div>
                        <p className="font-extrabold text-slate-900 text-sm">{m.label}</p>
                        <p className="text-xs text-slate-400 font-semibold mt-0.5">{m.network}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-[#005645] transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Amount + Address */}
          {step === 2 && method && (
            <form onSubmit={handleSubmit} className="space-y-5 pb-2">
              {/* Selected method display */}
              <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm border border-emerald-100">
                  {method.filter ? (
                    <FilteredIcon src={method.icon} filter={method.filter} />
                  ) : (
                    <img src={method.icon} alt={method.label} className="w-6 h-6 object-contain" />
                  )}
                </div>
                <div>
                  <p className="font-extrabold text-slate-900 text-sm">{method.label}</p>
                  <p className="text-xs text-slate-500 font-semibold">{method.network}</p>
                </div>
                <button type="button" onClick={() => setStep(1)} className="ml-auto text-xs font-bold text-[#005645] bg-[#005645]/10 px-3 py-1.5 rounded-lg hover:bg-[#005645]/20 transition-colors">
                  Change
                </button>
              </div>

              {/* Deposit wallet address to send to */}
              {type === 'deposit' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Send to this Admin Address</label>
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                      <p className="font-mono text-xs text-slate-900 font-bold break-all">
                        {adminWallets.find(w => w.asset === method.asset)?.address || method.address}
                      </p>
                      <button type="button" onClick={() => { 
                        const addr = adminWallets.find(w => w.asset === method.asset)?.address || method.address
                        navigator.clipboard.writeText(addr); 
                        addToast('Address copied!', 'success') 
                      }}
                        className="mt-2 text-xs font-bold text-[#005645] hover:underline">
                        Copy Deposit Address
                      </button>
                    </div>
                    <p className="text-[11px] text-amber-700 font-semibold bg-amber-50 border border-amber-200/60 rounded-xl p-3">
                      ⚠️ Send only {method.label} to this address. After sending, paste your Transaction Hash below for Admin verification.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Transaction Hash / Proof (TxHash)</label>
                    <input type="text" value={txHash} onChange={e => setTxHash(e.target.value)}
                      placeholder="Paste your 0x... or transaction hash here"
                      className="w-full px-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-900 text-sm font-mono placeholder-slate-400 focus:outline-none focus:border-[#005645] transition-all"
                      required />
                  </div>
                </div>
              )}

              {/* Withdrawal details */}
              {type === 'withdrawal' && (
                <div className="space-y-4">
                  {method.id === 'crypto' && (
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Coin</label>
                      <select 
                        value={cryptoCoin} 
                        onChange={(e) => setCryptoCoin(e.target.value)}
                        className="w-full px-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-900 text-sm font-bold focus:outline-none focus:border-[#005645] transition-all cursor-pointer"
                      >
                        <option value="BTC">Bitcoin (BTC)</option>
                        <option value="ETH">Ethereum (ETH)</option>
                        <option value="USDT">Tether (USDT TRC-20)</option>
                        <option value="USDC">USD Coin (USDC)</option>
                      </select>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {method.id === 'cashapp' ? 'Your $Cashtag' : method.id === 'paypal' ? 'Your PayPal Email' : 'Your Wallet Address'}
                    </label>
                    <input type="text" value={address} onChange={e => setAddress(e.target.value)}
                      placeholder={method.id === 'cashapp' ? '$username' : method.id === 'paypal' ? 'email@example.com' : 'Paste address here...'}
                      className="w-full px-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-900 text-sm font-medium placeholder-slate-400 focus:outline-none focus:border-[#005645] transition-all"
                      required />
                  </div>
                </div>
              )}

              {/* Amount */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {type === 'deposit' ? 'Amount you are sending (USD)' : 'Amount to withdraw (USD)'}
                </label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-xl font-extrabold">$</span>
                  <input type="number" value={amount} onChange={e => setAmount(e.target.value)}
                    placeholder="0.00" min="0" step="0.01" max={type === 'withdrawal' ? user?.balance : undefined}
                    className="w-full pl-9 pr-5 py-5 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-900 text-2xl font-extrabold placeholder-slate-300 focus:outline-none focus:border-[#005645] transition-all"
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
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-2 text-xs">
                <div className="flex justify-between font-semibold text-slate-600">
                  <span>Network Fee</span><span className="text-slate-900 font-bold">$0.00</span>
                </div>
                <div className="flex justify-between font-semibold text-slate-600">
                  <span>Platform Fee</span><span className="text-slate-900 font-bold">0%</span>
                </div>
                <div className="flex justify-between font-extrabold text-slate-900 border-t border-slate-200 pt-2">
                  <span>You {type === 'deposit' ? 'receive' : 'withdraw'}</span>
                  <span className="text-[#005645]">{amount ? formatCurrency(parseFloat(amount)) : '$0'}</span>
                </div>
              </div>

              <button type="submit" disabled={submitting}
                className="w-full py-4 rounded-2xl bg-[#005645] text-[#C3F53C] font-extrabold text-base shadow-lg hover:bg-[#004235] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                {submitting ? 'Processing...' : `Confirm ${type === 'deposit' ? 'Deposit' : 'Withdrawal'}`}
              </button>

              <p className="text-center text-xs font-bold text-slate-400 flex items-center justify-center gap-1.5 pt-2 pb-4">
                🔒 256-bit Encrypted · Funds are SAFU
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
