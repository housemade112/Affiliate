import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const DB_FILE = path.join(__dirname, 'data.json')

// Initial Seed Marketers with OHLC Candlestick History & Performance Vectors
const initialMarketers = [
  {
    id: 'm1',
    name: 'Sarah Chen',
    niche: 'Parenting & E-Commerce',
    revenue: 4850000,
    monthlyReturn: 22.4,
    followers: 142000,
    rating: 4.9,
    minDeposit: 500,
    winRate: 88,
    totalTrades: 3420,
    profitFactor: 2.85,
    sharpeRatio: 2.14,
    maxDrawdown: 6.2,
    yearsExperience: 7,
    verified: true,
    premium: true,
    location: 'Austin, TX',
    joinedDate: '2021-03-15',
    bio: 'Pioneer in mompreneur affiliate portfolios and digital guide sales. Earning 6-figures consistently for 5+ years.',
    strategy: 'Diversified high-converting affiliate funnels with email automation cycles.',
    growth: [
      { date: 'Jan', open: 120, high: 145, low: 115, close: 140, volume: 45000 },
      { date: 'Feb', open: 140, high: 168, low: 135, close: 165, volume: 52000 },
      { date: 'Mar', open: 165, high: 195, low: 160, close: 190, volume: 61000 },
      { date: 'Apr', open: 190, high: 235, low: 185, close: 225, volume: 74000 },
      { date: 'May', open: 225, high: 280, low: 220, close: 270, volume: 88000 },
      { date: 'Jun', open: 270, high: 340, low: 265, close: 330, volume: 105000 },
      { date: 'Jul', open: 330, high: 410, low: 320, close: 395, volume: 124000 },
      { date: 'Aug', open: 395, high: 485, low: 390, close: 485, volume: 142000 },
    ]
  },
  {
    id: 'm2',
    name: 'Marcus Johnson',
    niche: 'Tech & SaaS Subscriptions',
    revenue: 3200000,
    monthlyReturn: 18.2,
    followers: 98000,
    rating: 4.8,
    minDeposit: 1000,
    winRate: 84,
    totalTrades: 2150,
    profitFactor: 2.42,
    sharpeRatio: 1.95,
    maxDrawdown: 8.5,
    yearsExperience: 5,
    verified: true,
    premium: false,
    location: 'Seattle, WA',
    joinedDate: '2022-01-10',
    bio: 'Software engineer turned full-time affiliate marketer specializing in B2B SaaS tool recommendations.',
    strategy: 'SEO-driven comparative reviews and high-retention recurring commission models.',
    growth: [
      { date: 'Jan', open: 100, high: 125, low: 95, close: 120, volume: 32000 },
      { date: 'Feb', open: 120, high: 145, low: 115, close: 140, volume: 38000 },
      { date: 'Mar', open: 140, high: 170, low: 135, close: 165, volume: 44000 },
      { date: 'Apr', open: 165, high: 200, low: 160, close: 195, volume: 53000 },
      { date: 'May', open: 195, high: 240, low: 190, close: 235, volume: 64000 },
      { date: 'Jun', open: 235, high: 285, low: 230, close: 275, volume: 76000 },
      { date: 'Jul', open: 275, high: 310, low: 270, close: 305, volume: 88000 },
      { date: 'Aug', open: 305, high: 335, low: 300, close: 320, volume: 98000 },
    ]
  },
  {
    id: 'm3',
    name: 'Elena Rodriguez',
    niche: 'Fitness & Digital Wellness',
    revenue: 2950000,
    monthlyReturn: 20.8,
    followers: 210000,
    rating: 4.9,
    minDeposit: 500,
    winRate: 86,
    totalTrades: 4100,
    profitFactor: 2.65,
    sharpeRatio: 2.05,
    maxDrawdown: 7.1,
    yearsExperience: 6,
    verified: true,
    premium: true,
    location: 'Miami, FL',
    joinedDate: '2020-08-22',
    bio: 'Wellness creator scaling high-ticket supplement and digital training course affiliate offers.',
    strategy: 'Short-form video funnel matching with instant bonus digital downloads.',
    growth: [
      { date: 'Jan', open: 110, high: 130, low: 105, close: 125, volume: 40000 },
      { date: 'Feb', open: 125, high: 155, low: 120, close: 150, volume: 49000 },
      { date: 'Mar', open: 150, high: 185, low: 145, close: 180, volume: 58000 },
      { date: 'Apr', open: 180, high: 220, low: 175, close: 210, volume: 69000 },
      { date: 'May', open: 210, high: 255, low: 205, close: 245, volume: 82000 },
      { date: 'Jun', open: 245, high: 280, low: 240, close: 270, volume: 95000 },
      { date: 'Jul', open: 270, high: 295, low: 265, close: 288, volume: 108000 },
      { date: 'Aug', open: 288, high: 305, low: 285, close: 295, volume: 120000 },
    ]
  },
  {
    id: 'm4',
    name: 'David Kim',
    niche: 'Options Strategies & Finance',
    revenue: 5120000,
    monthlyReturn: 24.5,
    followers: 185000,
    rating: 5.0,
    minDeposit: 2000,
    winRate: 91,
    totalTrades: 1890,
    profitFactor: 3.12,
    sharpeRatio: 2.45,
    maxDrawdown: 5.4,
    yearsExperience: 9,
    verified: true,
    premium: true,
    location: 'Chicago, IL',
    joinedDate: '2019-11-04',
    bio: 'Former quant trader managing systematic covered call and cash-secured put option portfolios.',
    strategy: 'Delta-neutral option income generation with strict stop-loss rules.',
    growth: [
      { date: 'Jan', open: 150, high: 190, low: 145, close: 180, volume: 65000 },
      { date: 'Feb', open: 180, high: 230, low: 175, close: 220, volume: 78000 },
      { date: 'Mar', open: 220, high: 280, low: 215, close: 270, volume: 92000 },
      { date: 'Apr', open: 270, high: 350, low: 260, close: 340, volume: 110000 },
      { date: 'May', open: 340, high: 430, low: 330, close: 410, volume: 135000 },
      { date: 'Jun', open: 410, high: 480, low: 400, close: 460, volume: 160000 },
      { date: 'Jul', open: 460, high: 505, low: 450, close: 490, volume: 178000 },
      { date: 'Aug', open: 490, high: 525, low: 485, close: 512, volume: 195000 },
    ]
  },
  {
    id: 'm5',
    name: 'Patricia Williams',
    niche: 'Real Estate & Wealth Building',
    revenue: 1890000,
    monthlyReturn: 15.6,
    followers: 74000,
    rating: 4.7,
    minDeposit: 1500,
    winRate: 82,
    totalTrades: 950,
    profitFactor: 2.20,
    sharpeRatio: 1.80,
    maxDrawdown: 9.2,
    yearsExperience: 8,
    verified: true,
    premium: false,
    location: 'Atlanta, GA',
    joinedDate: '2021-06-18',
    bio: 'Real estate investor creating affiliate channels for property management and REIT platforms.',
    strategy: 'Long-term equity compounding and REIT dividend referral programs.',
    growth: [
      { date: 'Jan', open: 90, high: 110, low: 85, close: 105, volume: 22000 },
      { date: 'Feb', open: 105, high: 125, low: 100, close: 120, volume: 26000 },
      { date: 'Mar', open: 120, high: 140, low: 115, close: 135, volume: 31000 },
      { date: 'Apr', open: 135, high: 155, low: 130, close: 150, volume: 37000 },
      { date: 'May', open: 150, high: 172, low: 145, close: 168, volume: 42000 },
      { date: 'Jun', open: 168, high: 182, low: 165, close: 178, volume: 48000 },
      { date: 'Jul', open: 178, high: 188, low: 175, close: 184, volume: 54000 },
      { date: 'Aug', open: 184, high: 192, low: 182, close: 189, volume: 60000 },
    ]
  }
]

const defaultState = {
  users: [
    {
      id: 'usr_demo',
      name: 'Demo Operator',
      email: 'demo@mirrormarket.net',
      password: 'password123',
      balance: 12450.00,
      createdAt: new Date().toISOString()
    }
  ],
  marketers: initialMarketers,
  mirrored: [
    {
      id: 'mir_1',
      userId: 'usr_demo',
      marketerId: 'm1',
      multiplier: 1.5,
      stopLoss: 10,
      deposit: 1500,
      createdAt: new Date().toISOString()
    },
    {
      id: 'mir_2',
      userId: 'usr_demo',
      marketerId: 'm3',
      multiplier: 1.0,
      stopLoss: 15,
      deposit: 1000,
      createdAt: new Date().toISOString()
    }
  ],
  transactions: [
    {
      id: 'tx_101',
      userId: 'usr_demo',
      type: 'deposit',
      amount: 10000.00,
      status: 'approved',
      method: 'Bank Transfer (ACH)',
      createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
    },
    {
      id: 'tx_102',
      userId: 'usr_demo',
      type: 'deposit',
      amount: 4950.00,
      status: 'approved',
      method: 'Instant Card Deposit',
      createdAt: new Date(Date.now() - 86400000).toISOString()
    }
  ],
  tradeLogs: []
}

class Database {
  constructor() {
    this.data = defaultState
    this.load()
  }

  load() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const fileData = fs.readFileSync(DB_FILE, 'utf8')
        this.data = JSON.parse(fileData)
      } else {
        this.save()
      }
    } catch (err) {
      console.error('Error reading DB file:', err)
      this.data = defaultState
    }
  }

  save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf8')
    } catch (err) {
      console.error('Error saving DB file:', err)
    }
  }

  // Users
  getUserByEmail(email) {
    return this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase())
  }

  getUserById(id) {
    return this.data.users.find(u => u.id === id)
  }

  createUser(name, email, password) {
    const newUser = {
      id: 'usr_' + Date.now().toString(36),
      name,
      email,
      password,
      balance: 5000.00,
      createdAt: new Date().toISOString()
    }
    this.data.users.push(newUser)
    this.save()
    return newUser
  }

  updateUserBalance(userId, newBalance) {
    const user = this.getUserById(userId)
    if (user) {
      user.balance = Math.max(0, parseFloat(newBalance.toFixed(2)))
      this.save()
    }
    return user
  }

  // Marketers
  getMarketers() {
    return this.data.marketers
  }

  getMarketerById(id) {
    return this.data.marketers.find(m => m.id === id)
  }

  // Mirrored Allocations
  getMirroredByUser(userId) {
    return this.data.mirrored.filter(m => m.userId === userId)
  }

  addMirror(userId, marketerId, multiplier = 1.0, stopLoss = 10, deposit = 500) {
    const user = this.getUserById(userId)
    if (!user || user.balance < deposit) {
      return { success: false, error: 'Insufficient balance' }
    }

    const existing = this.data.mirrored.find(m => m.userId === userId && m.marketerId === marketerId)
    if (existing) {
      existing.multiplier = multiplier
      existing.stopLoss = stopLoss
      existing.deposit = deposit
    } else {
      // Deduct deposit amount from user balance
      user.balance -= deposit
      this.data.mirrored.push({
        id: 'mir_' + Date.now().toString(36),
        userId,
        marketerId,
        multiplier,
        stopLoss,
        deposit,
        createdAt: new Date().toISOString()
      })
      // Record transaction
      this.createTransaction(userId, 'mirror_deposit', deposit, 'approved', 'Mirror Allocation')
    }
    this.save()
    return { success: true, mirrored: this.getMirroredByUser(userId), balance: user.balance }
  }

  removeMirror(userId, marketerId) {
    const allocation = this.data.mirrored.find(m => m.userId === userId && m.marketerId === marketerId)
    const user = this.getUserById(userId)
    
    if (allocation && user) {
      // Refund deposit back to balance
      user.balance += allocation.deposit
      this.createTransaction(userId, 'mirror_refund', allocation.deposit, 'approved', 'Mirror Release')
    }

    this.data.mirrored = this.data.mirrored.filter(m => !(m.userId === userId && m.marketerId === marketerId))
    this.save()
    return { success: true, mirrored: this.getMirroredByUser(userId), balance: user ? user.balance : 0 }
  }

  // Transactions
  getTransactionsByUser(userId) {
    return this.data.transactions.filter(t => t.userId === userId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }

  createTransaction(userId, type, amount, status = 'approved', method = 'System Auto') {
    const tx = {
      id: 'tx_' + Date.now().toString(36),
      userId,
      type,
      amount: parseFloat(amount.toFixed(2)),
      status,
      method,
      createdAt: new Date().toISOString()
    }
    this.data.transactions.push(tx)

    if (status === 'approved') {
      const user = this.getUserById(userId)
      if (user) {
        if (type === 'deposit') user.balance += amount
        if (type === 'withdrawal') user.balance = Math.max(0, user.balance - amount)
        user.balance = parseFloat(user.balance.toFixed(2))
      }
    }

    this.save()
    return tx
  }

  // Trade Logs
  addTradeLog(log) {
    if (!Array.isArray(this.data.tradeLogs)) {
      this.data.tradeLogs = []
    }
    this.data.tradeLogs.unshift(log)
    if (this.data.tradeLogs.length > 50) this.data.tradeLogs.pop()
    this.save()
  }

  getTradeLogs() {
    if (!Array.isArray(this.data.tradeLogs)) {
      this.data.tradeLogs = []
    }
    return this.data.tradeLogs
  }
}

export const db = new Database()
