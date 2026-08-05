import express from 'express'
import cors from 'cors'
import { db } from './db.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// ── Auth Endpoints ──
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, error: 'Name, email, and password are required' })
  }

  const existing = db.getUserByEmail(email)
  if (existing) {
    return res.status(400).json({ success: false, error: 'User with this email already exists' })
  }

  const newUser = db.createUser(name, email, password)
  const mirrored = db.getMirroredByUser(newUser.id)
  
  return res.json({
    success: true,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      balance: newUser.balance,
      mirroredAffiliates: mirrored.map(m => m.marketerId)
    }
  })
})

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Email and password are required' })
  }

  const user = db.getUserByEmail(email)
  if (!user || user.password !== password) {
    return res.status(401).json({ success: false, error: 'Invalid email or password' })
  }

  const mirrored = db.getMirroredByUser(user.id)
  return res.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      balance: user.balance,
      mirroredAffiliates: mirrored.map(m => m.marketerId)
    }
  })
})

app.get('/api/auth/me/:userId', (req, res) => {
  const user = db.getUserById(req.params.userId)
  if (!user) {
    return res.status(404).json({ success: false, error: 'User not found' })
  }

  const mirrored = db.getMirroredByUser(user.id)
  return res.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      balance: user.balance,
      mirroredAffiliates: mirrored.map(m => m.marketerId)
    }
  })
})

// ── Marketers & OHLC Candlestick History ──
app.get('/api/marketers', (req, res) => {
  const marketers = db.getMarketers()
  return res.json({ success: true, marketers })
})

app.get('/api/marketers/:id', (req, res) => {
  const marketer = db.getMarketerById(req.params.id)
  if (!marketer) {
    return res.status(404).json({ success: false, error: 'Marketer not found' })
  }
  return res.json({ success: true, marketer })
})

app.get('/api/marketers/:id/history', (req, res) => {
  const marketer = db.getMarketerById(req.params.id)
  if (!marketer) {
    return res.status(404).json({ success: false, error: 'Marketer not found' })
  }
  return res.json({
    success: true,
    history: marketer.growth,
    metrics: {
      winRate: marketer.winRate,
      profitFactor: marketer.profitFactor,
      sharpeRatio: marketer.sharpeRatio,
      maxDrawdown: marketer.maxDrawdown
    }
  })
})

// ── Interactive Mirror Engine ──
app.get('/api/mirror/:userId', (req, res) => {
  const mirrored = db.getMirroredByUser(req.params.userId)
  return res.json({ success: true, mirrored })
})

app.post('/api/mirror', (req, res) => {
  const { userId, marketerId, multiplier, stopLoss, deposit } = req.body
  if (!userId || !marketerId) {
    return res.status(400).json({ success: false, error: 'userId and marketerId are required' })
  }

  const marketer = db.getMarketerById(marketerId)
  if (!marketer) {
    return res.status(404).json({ success: false, error: 'Marketer not found' })
  }

  const result = db.addMirror(userId, marketerId, multiplier || 1.0, stopLoss || 10, deposit || marketer.minDeposit)
  if (!result.success) {
    return res.status(400).json({ success: false, error: result.error })
  }

  return res.json({
    success: true,
    mirroredAffiliates: result.mirrored.map(m => m.marketerId),
    mirroredAllocations: result.mirrored,
    balance: result.balance
  })
})

app.delete('/api/mirror/:userId/:marketerId', (req, res) => {
  const { userId, marketerId } = req.params
  const result = db.removeMirror(userId, marketerId)

  return res.json({
    success: true,
    mirroredAffiliates: result.mirrored.map(m => m.marketerId),
    mirroredAllocations: result.mirrored,
    balance: result.balance
  })
})

// ── Wallet & Transaction Endpoints ──
app.get('/api/wallet/transactions/:userId', (req, res) => {
  const transactions = db.getTransactionsByUser(req.params.userId)
  return res.json({ success: true, transactions })
})

app.post('/api/wallet/transaction', (req, res) => {
  const { userId, type, amount, method } = req.body
  if (!userId || !type || !amount) {
    return res.status(400).json({ success: false, error: 'userId, type, and amount are required' })
  }

  const tx = db.createTransaction(userId, type, parseFloat(amount), 'approved', method || 'Standard Transfer')
  const user = db.getUserById(userId)

  return res.json({
    success: true,
    transaction: tx,
    balance: user?.balance || 0
  })
})

// ── Live Copy Trade Signal Simulator Engine ──
const sampleNames = ['Alex P.', 'Sarah M.', 'Marcus K.', 'Elena R.', 'David T.', 'Jessica W.']

setInterval(() => {
  const marketers = db.getMarketers()
  const randomMarketer = marketers[Math.floor(Math.random() * marketers.length)]
  const randomUser = sampleNames[Math.floor(Math.random() * sampleNames.length)]
  const tradeSize = (Math.floor(Math.random() * 45) + 5) * 100
  const returnVal = (Math.random() * 8 + 12).toFixed(1)

  const log = {
    id: 'trd_' + Date.now().toString(36),
    trader: randomMarketer.name,
    copier: randomUser,
    amount: `$${tradeSize.toLocaleString()}`,
    returnVal: `+${returnVal}%`,
    niche: randomMarketer.niche,
    timestamp: new Date().toISOString()
  }

  db.addTradeLog(log)
}, 5000)

app.get('/api/feed/trades', (req, res) => {
  const logs = db.getTradeLogs()
  return res.json({ success: true, trades: logs })
})

app.listen(PORT, () => {
  console.log(`Backend Express REST API Server running on http://localhost:${PORT}`)
})
