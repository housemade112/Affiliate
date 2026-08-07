import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const DB_FILE = path.join(__dirname, 'data.json')

// Initial Seed Marketers with OHLC Candlestick History & Performance Vectors
const initialMarketers = [
  {
    id: 'm1', name: 'Pat Flynn', avatar: 'https://randomuser.me/api/portraits/women/95.jpg', niche: 'Passive Income & Affiliate', revenue: 15000000, monthlyReturn: 25.0, followers: 500000, rating: 4.9, minDeposit: 1000, winRate: 88, totalTrades: 5000, profitFactor: 3.0, sharpeRatio: 2.0, maxDrawdown: 5.0, yearsExperience: 15, verified: true, premium: true, location: 'USA', joinedDate: '2019-01-15',
    bio: 'Professional affiliate marketer and digital entrepreneur.', strategy: 'Advanced traffic generation and conversion optimization.', 
    growth: [
      { date: 'Jan', open: 120, high: 145, low: 115, close: 140, volume: 45000 },
      { date: 'Feb', open: 140, high: 168, low: 135, close: 165, volume: 52000 },
      { date: 'Mar', open: 165, high: 195, low: 160, close: 190, volume: 61000 },
      { date: 'Apr', open: 190, high: 235, low: 185, close: 225, volume: 74000 },
      { date: 'May', open: 225, high: 280, low: 220, close: 270, volume: 88000 },
      { date: 'Jun', open: 270, high: 340, low: 265, close: 330, volume: 105000 },
      { date: 'Jul', open: 330, high: 410, low: 320, close: 395, volume: 124000 },
      { date: 'Aug', open: 395, high: 485, low: 390, close: 485, volume: 142000 }
    ]
  },
  {
    id: 'm2', name: 'Charles Ngo', avatar: 'https://randomuser.me/api/portraits/women/90.jpg', niche: 'Performance Affiliate Marketing', revenue: 14500000, monthlyReturn: 24.8, followers: 480000, rating: 4.9, minDeposit: 1000, winRate: 88, totalTrades: 5000, profitFactor: 3.0, sharpeRatio: 2.0, maxDrawdown: 5.0, yearsExperience: 15, verified: true, premium: true, location: 'USA', joinedDate: '2019-01-15',
    bio: 'Professional affiliate marketer and digital entrepreneur.', strategy: 'Advanced traffic generation and conversion optimization.', 
    growth: [
      { date: 'Jan', open: 120, high: 145, low: 115, close: 140, volume: 45000 },
      { date: 'Feb', open: 140, high: 168, low: 135, close: 165, volume: 52000 },
      { date: 'Mar', open: 165, high: 195, low: 160, close: 190, volume: 61000 },
      { date: 'Apr', open: 190, high: 235, low: 185, close: 225, volume: 74000 },
      { date: 'May', open: 225, high: 280, low: 220, close: 270, volume: 88000 },
      { date: 'Jun', open: 270, high: 340, low: 265, close: 330, volume: 105000 },
      { date: 'Jul', open: 330, high: 410, low: 320, close: 395, volume: 124000 },
      { date: 'Aug', open: 395, high: 485, low: 390, close: 485, volume: 142000 }
    ]
  },
  {
    id: 'm3', name: 'Neil Patel', avatar: 'https://randomuser.me/api/portraits/women/51.jpg', niche: 'Digital Marketing & SEO', revenue: 14000000, monthlyReturn: 24.6, followers: 460000, rating: 4.9, minDeposit: 1000, winRate: 88, totalTrades: 5000, profitFactor: 3.0, sharpeRatio: 2.0, maxDrawdown: 5.0, yearsExperience: 15, verified: true, premium: true, location: 'USA', joinedDate: '2019-01-15',
    bio: 'Professional affiliate marketer and digital entrepreneur.', strategy: 'Advanced traffic generation and conversion optimization.', 
    growth: [
      { date: 'Jan', open: 120, high: 145, low: 115, close: 140, volume: 45000 },
      { date: 'Feb', open: 140, high: 168, low: 135, close: 165, volume: 52000 },
      { date: 'Mar', open: 165, high: 195, low: 160, close: 190, volume: 61000 },
      { date: 'Apr', open: 190, high: 235, low: 185, close: 225, volume: 74000 },
      { date: 'May', open: 225, high: 280, low: 220, close: 270, volume: 88000 },
      { date: 'Jun', open: 270, high: 340, low: 265, close: 330, volume: 105000 },
      { date: 'Jul', open: 330, high: 410, low: 320, close: 395, volume: 124000 },
      { date: 'Aug', open: 395, high: 485, low: 390, close: 485, volume: 142000 }
    ]
  },
  {
    id: 'm4', name: 'Ryan Deiss', avatar: 'https://randomuser.me/api/portraits/men/42.jpg', niche: 'Digital Marketing & Funnels', revenue: 13500000, monthlyReturn: 24.4, followers: 440000, rating: 4.9, minDeposit: 1000, winRate: 88, totalTrades: 5000, profitFactor: 3.0, sharpeRatio: 2.0, maxDrawdown: 5.0, yearsExperience: 15, verified: true, premium: true, location: 'USA', joinedDate: '2019-01-15',
    bio: 'Professional affiliate marketer and digital entrepreneur.', strategy: 'Advanced traffic generation and conversion optimization.', 
    growth: [
      { date: 'Jan', open: 120, high: 145, low: 115, close: 140, volume: 45000 },
      { date: 'Feb', open: 140, high: 168, low: 135, close: 165, volume: 52000 },
      { date: 'Mar', open: 165, high: 195, low: 160, close: 190, volume: 61000 },
      { date: 'Apr', open: 190, high: 235, low: 185, close: 225, volume: 74000 },
      { date: 'May', open: 225, high: 280, low: 220, close: 270, volume: 88000 },
      { date: 'Jun', open: 270, high: 340, low: 265, close: 330, volume: 105000 },
      { date: 'Jul', open: 330, high: 410, low: 320, close: 395, volume: 124000 },
      { date: 'Aug', open: 395, high: 485, low: 390, close: 485, volume: 142000 }
    ]
  },
  {
    id: 'm5', name: 'Missy Ward', avatar: 'https://randomuser.me/api/portraits/men/43.jpg', niche: 'Affiliate Marketing Events', revenue: 13000000, monthlyReturn: 24.2, followers: 420000, rating: 4.9, minDeposit: 1000, winRate: 88, totalTrades: 5000, profitFactor: 3.0, sharpeRatio: 2.0, maxDrawdown: 5.0, yearsExperience: 15, verified: true, premium: true, location: 'USA', joinedDate: '2019-01-15',
    bio: 'Professional affiliate marketer and digital entrepreneur.', strategy: 'Advanced traffic generation and conversion optimization.', 
    growth: [
      { date: 'Jan', open: 120, high: 145, low: 115, close: 140, volume: 45000 },
      { date: 'Feb', open: 140, high: 168, low: 135, close: 165, volume: 52000 },
      { date: 'Mar', open: 165, high: 195, low: 160, close: 190, volume: 61000 },
      { date: 'Apr', open: 190, high: 235, low: 185, close: 225, volume: 74000 },
      { date: 'May', open: 225, high: 280, low: 220, close: 270, volume: 88000 },
      { date: 'Jun', open: 270, high: 340, low: 265, close: 330, volume: 105000 },
      { date: 'Jul', open: 330, high: 410, low: 320, close: 395, volume: 124000 },
      { date: 'Aug', open: 395, high: 485, low: 390, close: 485, volume: 142000 }
    ]
  },
  {
    id: 'm6', name: 'Shawn Collins', avatar: 'https://randomuser.me/api/portraits/women/34.jpg', niche: 'Bot Traffic & Affiliate', revenue: 12500000, monthlyReturn: 24.0, followers: 400000, rating: 4.9, minDeposit: 1000, winRate: 88, totalTrades: 5000, profitFactor: 3.0, sharpeRatio: 2.0, maxDrawdown: 5.0, yearsExperience: 15, verified: true, premium: true, location: 'USA', joinedDate: '2019-01-15',
    bio: 'Professional affiliate marketer and digital entrepreneur.', strategy: 'Advanced traffic generation and conversion optimization.', 
    growth: [
      { date: 'Jan', open: 120, high: 145, low: 115, close: 140, volume: 45000 },
      { date: 'Feb', open: 140, high: 168, low: 135, close: 165, volume: 52000 },
      { date: 'Mar', open: 165, high: 195, low: 160, close: 190, volume: 61000 },
      { date: 'Apr', open: 190, high: 235, low: 185, close: 225, volume: 74000 },
      { date: 'May', open: 225, high: 280, low: 220, close: 270, volume: 88000 },
      { date: 'Jun', open: 270, high: 340, low: 265, close: 330, volume: 105000 },
      { date: 'Jul', open: 330, high: 410, low: 320, close: 395, volume: 124000 },
      { date: 'Aug', open: 395, high: 485, low: 390, close: 485, volume: 142000 }
    ]
  },
  {
    id: 'm7', name: 'Rae Hoffman', avatar: 'https://randomuser.me/api/portraits/men/89.jpg', niche: 'SEO Affiliate Marketing', revenue: 12000000, monthlyReturn: 23.8, followers: 380000, rating: 4.9, minDeposit: 1000, winRate: 88, totalTrades: 5000, profitFactor: 3.0, sharpeRatio: 2.0, maxDrawdown: 5.0, yearsExperience: 15, verified: true, premium: true, location: 'USA', joinedDate: '2019-01-15',
    bio: 'Professional affiliate marketer and digital entrepreneur.', strategy: 'Advanced traffic generation and conversion optimization.', 
    growth: [
      { date: 'Jan', open: 120, high: 145, low: 115, close: 140, volume: 45000 },
      { date: 'Feb', open: 140, high: 168, low: 135, close: 165, volume: 52000 },
      { date: 'Mar', open: 165, high: 195, low: 160, close: 190, volume: 61000 },
      { date: 'Apr', open: 190, high: 235, low: 185, close: 225, volume: 74000 },
      { date: 'May', open: 225, high: 280, low: 220, close: 270, volume: 88000 },
      { date: 'Jun', open: 270, high: 340, low: 265, close: 330, volume: 105000 },
      { date: 'Jul', open: 330, high: 410, low: 320, close: 395, volume: 124000 },
      { date: 'Aug', open: 395, high: 485, low: 390, close: 485, volume: 142000 }
    ]
  },
  {
    id: 'm8', name: 'John Chow', avatar: 'https://randomuser.me/api/portraits/women/72.jpg', niche: 'Blogging & Digital Marketing', revenue: 11500000, monthlyReturn: 23.6, followers: 360000, rating: 4.9, minDeposit: 1000, winRate: 88, totalTrades: 5000, profitFactor: 3.0, sharpeRatio: 2.0, maxDrawdown: 5.0, yearsExperience: 15, verified: true, premium: true, location: 'USA', joinedDate: '2019-01-15',
    bio: 'Professional affiliate marketer and digital entrepreneur.', strategy: 'Advanced traffic generation and conversion optimization.', 
    growth: [
      { date: 'Jan', open: 120, high: 145, low: 115, close: 140, volume: 45000 },
      { date: 'Feb', open: 140, high: 168, low: 135, close: 165, volume: 52000 },
      { date: 'Mar', open: 165, high: 195, low: 160, close: 190, volume: 61000 },
      { date: 'Apr', open: 190, high: 235, low: 185, close: 225, volume: 74000 },
      { date: 'May', open: 225, high: 280, low: 220, close: 270, volume: 88000 },
      { date: 'Jun', open: 270, high: 340, low: 265, close: 330, volume: 105000 },
      { date: 'Jul', open: 330, high: 410, low: 320, close: 395, volume: 124000 },
      { date: 'Aug', open: 395, high: 485, low: 390, close: 485, volume: 142000 }
    ]
  },
  {
    id: 'm9', name: 'Miles Beckler', avatar: 'https://randomuser.me/api/portraits/women/58.jpg', niche: 'Digital Marketing & Sales', revenue: 11000000, monthlyReturn: 23.4, followers: 340000, rating: 4.9, minDeposit: 1000, winRate: 88, totalTrades: 5000, profitFactor: 3.0, sharpeRatio: 2.0, maxDrawdown: 5.0, yearsExperience: 15, verified: true, premium: true, location: 'USA', joinedDate: '2019-01-15',
    bio: 'Professional affiliate marketer and digital entrepreneur.', strategy: 'Advanced traffic generation and conversion optimization.', 
    growth: [
      { date: 'Jan', open: 120, high: 145, low: 115, close: 140, volume: 45000 },
      { date: 'Feb', open: 140, high: 168, low: 135, close: 165, volume: 52000 },
      { date: 'Mar', open: 165, high: 195, low: 160, close: 190, volume: 61000 },
      { date: 'Apr', open: 190, high: 235, low: 185, close: 225, volume: 74000 },
      { date: 'May', open: 225, high: 280, low: 220, close: 270, volume: 88000 },
      { date: 'Jun', open: 270, high: 340, low: 265, close: 330, volume: 105000 },
      { date: 'Jul', open: 330, high: 410, low: 320, close: 395, volume: 124000 },
      { date: 'Aug', open: 395, high: 485, low: 390, close: 485, volume: 142000 }
    ]
  },
  {
    id: 'm10', name: 'Spencer Haws', avatar: 'https://randomuser.me/api/portraits/women/80.jpg', niche: 'Niche Sites & Affiliate', revenue: 10500000, monthlyReturn: 23.2, followers: 320000, rating: 4.9, minDeposit: 1000, winRate: 88, totalTrades: 5000, profitFactor: 3.0, sharpeRatio: 2.0, maxDrawdown: 5.0, yearsExperience: 15, verified: true, premium: true, location: 'USA', joinedDate: '2019-01-15',
    bio: 'Professional affiliate marketer and digital entrepreneur.', strategy: 'Advanced traffic generation and conversion optimization.', 
    growth: [
      { date: 'Jan', open: 120, high: 145, low: 115, close: 140, volume: 45000 },
      { date: 'Feb', open: 140, high: 168, low: 135, close: 165, volume: 52000 },
      { date: 'Mar', open: 165, high: 195, low: 160, close: 190, volume: 61000 },
      { date: 'Apr', open: 190, high: 235, low: 185, close: 225, volume: 74000 },
      { date: 'May', open: 225, high: 280, low: 220, close: 270, volume: 88000 },
      { date: 'Jun', open: 270, high: 340, low: 265, close: 330, volume: 105000 },
      { date: 'Jul', open: 330, high: 410, low: 320, close: 395, volume: 124000 },
      { date: 'Aug', open: 395, high: 485, low: 390, close: 485, volume: 142000 }
    ]
  },
  {
    id: 'm11', name: 'Gael Breton', avatar: 'https://randomuser.me/api/portraits/women/65.jpg', niche: 'Authority Sites & Affiliate', revenue: 10000000, monthlyReturn: 23.0, followers: 300000, rating: 4.9, minDeposit: 1000, winRate: 88, totalTrades: 5000, profitFactor: 3.0, sharpeRatio: 2.0, maxDrawdown: 5.0, yearsExperience: 15, verified: true, premium: true, location: 'USA', joinedDate: '2019-01-15',
    bio: 'Professional affiliate marketer and digital entrepreneur.', strategy: 'Advanced traffic generation and conversion optimization.', 
    growth: [
      { date: 'Jan', open: 120, high: 145, low: 115, close: 140, volume: 45000 },
      { date: 'Feb', open: 140, high: 168, low: 135, close: 165, volume: 52000 },
      { date: 'Mar', open: 165, high: 195, low: 160, close: 190, volume: 61000 },
      { date: 'Apr', open: 190, high: 235, low: 185, close: 225, volume: 74000 },
      { date: 'May', open: 225, high: 280, low: 220, close: 270, volume: 88000 },
      { date: 'Jun', open: 270, high: 340, low: 265, close: 330, volume: 105000 },
      { date: 'Jul', open: 330, high: 410, low: 320, close: 395, volume: 124000 },
      { date: 'Aug', open: 395, high: 485, low: 390, close: 485, volume: 142000 }
    ]
  },
  {
    id: 'm12', name: 'Mark Webster', avatar: 'https://randomuser.me/api/portraits/men/3.jpg', niche: 'Bot Affiliate Marketing', revenue: 9500000, monthlyReturn: 22.8, followers: 280000, rating: 4.9, minDeposit: 1000, winRate: 88, totalTrades: 5000, profitFactor: 3.0, sharpeRatio: 2.0, maxDrawdown: 5.0, yearsExperience: 15, verified: true, premium: true, location: 'USA', joinedDate: '2019-01-15',
    bio: 'Professional affiliate marketer and digital entrepreneur.', strategy: 'Advanced traffic generation and conversion optimization.', 
    growth: [
      { date: 'Jan', open: 120, high: 145, low: 115, close: 140, volume: 45000 },
      { date: 'Feb', open: 140, high: 168, low: 135, close: 165, volume: 52000 },
      { date: 'Mar', open: 165, high: 195, low: 160, close: 190, volume: 61000 },
      { date: 'Apr', open: 190, high: 235, low: 185, close: 225, volume: 74000 },
      { date: 'May', open: 225, high: 280, low: 220, close: 270, volume: 88000 },
      { date: 'Jun', open: 270, high: 340, low: 265, close: 330, volume: 105000 },
      { date: 'Jul', open: 330, high: 410, low: 320, close: 395, volume: 124000 },
      { date: 'Aug', open: 395, high: 485, low: 390, close: 485, volume: 142000 }
    ]
  },
  {
    id: 'm13', name: 'Matt Diggity', avatar: 'https://randomuser.me/api/portraits/men/84.jpg', niche: 'SEO & Bot Strategies', revenue: 9000000, monthlyReturn: 22.6, followers: 260000, rating: 4.9, minDeposit: 1000, winRate: 88, totalTrades: 5000, profitFactor: 3.0, sharpeRatio: 2.0, maxDrawdown: 5.0, yearsExperience: 15, verified: true, premium: true, location: 'USA', joinedDate: '2019-01-15',
    bio: 'Professional affiliate marketer and digital entrepreneur.', strategy: 'Advanced traffic generation and conversion optimization.', 
    growth: [
      { date: 'Jan', open: 120, high: 145, low: 115, close: 140, volume: 45000 },
      { date: 'Feb', open: 140, high: 168, low: 135, close: 165, volume: 52000 },
      { date: 'Mar', open: 165, high: 195, low: 160, close: 190, volume: 61000 },
      { date: 'Apr', open: 190, high: 235, low: 185, close: 225, volume: 74000 },
      { date: 'May', open: 225, high: 280, low: 220, close: 270, volume: 88000 },
      { date: 'Jun', open: 270, high: 340, low: 265, close: 330, volume: 105000 },
      { date: 'Jul', open: 330, high: 410, low: 320, close: 395, volume: 124000 },
      { date: 'Aug', open: 395, high: 485, low: 390, close: 485, volume: 142000 }
    ]
  },
  {
    id: 'm14', name: 'Craig Campbell', avatar: 'https://randomuser.me/api/portraits/women/33.jpg', niche: 'Blackhat SEO & Bot Traffic', revenue: 8500000, monthlyReturn: 22.4, followers: 240000, rating: 4.9, minDeposit: 1000, winRate: 88, totalTrades: 5000, profitFactor: 3.0, sharpeRatio: 2.0, maxDrawdown: 5.0, yearsExperience: 15, verified: true, premium: true, location: 'USA', joinedDate: '2019-01-15',
    bio: 'Professional affiliate marketer and digital entrepreneur.', strategy: 'Advanced traffic generation and conversion optimization.', 
    growth: [
      { date: 'Jan', open: 120, high: 145, low: 115, close: 140, volume: 45000 },
      { date: 'Feb', open: 140, high: 168, low: 135, close: 165, volume: 52000 },
      { date: 'Mar', open: 165, high: 195, low: 160, close: 190, volume: 61000 },
      { date: 'Apr', open: 190, high: 235, low: 185, close: 225, volume: 74000 },
      { date: 'May', open: 225, high: 280, low: 220, close: 270, volume: 88000 },
      { date: 'Jun', open: 270, high: 340, low: 265, close: 330, volume: 105000 },
      { date: 'Jul', open: 330, high: 410, low: 320, close: 395, volume: 124000 },
      { date: 'Aug', open: 395, high: 485, low: 390, close: 485, volume: 142000 }
    ]
  },
  {
    id: 'm15', name: 'Jon Dykstra', avatar: 'https://randomuser.me/api/portraits/women/80.jpg', niche: 'Display Ads & Affiliate', revenue: 8000000, monthlyReturn: 22.2, followers: 220000, rating: 4.9, minDeposit: 1000, winRate: 88, totalTrades: 5000, profitFactor: 3.0, sharpeRatio: 2.0, maxDrawdown: 5.0, yearsExperience: 15, verified: true, premium: true, location: 'USA', joinedDate: '2019-01-15',
    bio: 'Professional affiliate marketer and digital entrepreneur.', strategy: 'Advanced traffic generation and conversion optimization.', 
    growth: [
      { date: 'Jan', open: 120, high: 145, low: 115, close: 140, volume: 45000 },
      { date: 'Feb', open: 140, high: 168, low: 135, close: 165, volume: 52000 },
      { date: 'Mar', open: 165, high: 195, low: 160, close: 190, volume: 61000 },
      { date: 'Apr', open: 190, high: 235, low: 185, close: 225, volume: 74000 },
      { date: 'May', open: 225, high: 280, low: 220, close: 270, volume: 88000 },
      { date: 'Jun', open: 270, high: 340, low: 265, close: 330, volume: 105000 },
      { date: 'Jul', open: 330, high: 410, low: 320, close: 395, volume: 124000 },
      { date: 'Aug', open: 395, high: 485, low: 390, close: 485, volume: 142000 }
    ]
  },
  {
    id: 'm16', name: 'Doug Cunnington', avatar: 'https://randomuser.me/api/portraits/men/38.jpg', niche: 'Amazon Affiliate Marketing', revenue: 7500000, monthlyReturn: 22.0, followers: 200000, rating: 4.9, minDeposit: 1000, winRate: 88, totalTrades: 5000, profitFactor: 3.0, sharpeRatio: 2.0, maxDrawdown: 5.0, yearsExperience: 15, verified: true, premium: true, location: 'USA', joinedDate: '2019-01-15',
    bio: 'Professional affiliate marketer and digital entrepreneur.', strategy: 'Advanced traffic generation and conversion optimization.', 
    growth: [
      { date: 'Jan', open: 120, high: 145, low: 115, close: 140, volume: 45000 },
      { date: 'Feb', open: 140, high: 168, low: 135, close: 165, volume: 52000 },
      { date: 'Mar', open: 165, high: 195, low: 160, close: 190, volume: 61000 },
      { date: 'Apr', open: 190, high: 235, low: 185, close: 225, volume: 74000 },
      { date: 'May', open: 225, high: 280, low: 220, close: 270, volume: 88000 },
      { date: 'Jun', open: 270, high: 340, low: 265, close: 330, volume: 105000 },
      { date: 'Jul', open: 330, high: 410, low: 320, close: 395, volume: 124000 },
      { date: 'Aug', open: 395, high: 485, low: 390, close: 485, volume: 142000 }
    ]
  },
  {
    id: 'm17', name: 'Justin Cooke', avatar: 'https://randomuser.me/api/portraits/men/49.jpg', niche: 'Digital Asset Brokering', revenue: 7000000, monthlyReturn: 21.8, followers: 180000, rating: 4.9, minDeposit: 1000, winRate: 88, totalTrades: 5000, profitFactor: 3.0, sharpeRatio: 2.0, maxDrawdown: 5.0, yearsExperience: 15, verified: true, premium: true, location: 'USA', joinedDate: '2019-01-15',
    bio: 'Professional affiliate marketer and digital entrepreneur.', strategy: 'Advanced traffic generation and conversion optimization.', 
    growth: [
      { date: 'Jan', open: 120, high: 145, low: 115, close: 140, volume: 45000 },
      { date: 'Feb', open: 140, high: 168, low: 135, close: 165, volume: 52000 },
      { date: 'Mar', open: 165, high: 195, low: 160, close: 190, volume: 61000 },
      { date: 'Apr', open: 190, high: 235, low: 185, close: 225, volume: 74000 },
      { date: 'May', open: 225, high: 280, low: 220, close: 270, volume: 88000 },
      { date: 'Jun', open: 270, high: 340, low: 265, close: 330, volume: 105000 },
      { date: 'Jul', open: 330, high: 410, low: 320, close: 395, volume: 124000 },
      { date: 'Aug', open: 395, high: 485, low: 390, close: 485, volume: 142000 }
    ]
  },
  {
    id: 'm18', name: 'Joe Valley', avatar: 'https://randomuser.me/api/portraits/women/82.jpg', niche: 'Digital Asset Valuation', revenue: 6500000, monthlyReturn: 21.6, followers: 160000, rating: 4.9, minDeposit: 1000, winRate: 88, totalTrades: 5000, profitFactor: 3.0, sharpeRatio: 2.0, maxDrawdown: 5.0, yearsExperience: 15, verified: true, premium: true, location: 'USA', joinedDate: '2019-01-15',
    bio: 'Professional affiliate marketer and digital entrepreneur.', strategy: 'Advanced traffic generation and conversion optimization.', 
    growth: [
      { date: 'Jan', open: 120, high: 145, low: 115, close: 140, volume: 45000 },
      { date: 'Feb', open: 140, high: 168, low: 135, close: 165, volume: 52000 },
      { date: 'Mar', open: 165, high: 195, low: 160, close: 190, volume: 61000 },
      { date: 'Apr', open: 190, high: 235, low: 185, close: 225, volume: 74000 },
      { date: 'May', open: 225, high: 280, low: 220, close: 270, volume: 88000 },
      { date: 'Jun', open: 270, high: 340, low: 265, close: 330, volume: 105000 },
      { date: 'Jul', open: 330, high: 410, low: 320, close: 395, volume: 124000 },
      { date: 'Aug', open: 395, high: 485, low: 390, close: 485, volume: 142000 }
    ]
  },
  {
    id: 'm19', name: 'Ann Handley', avatar: 'https://randomuser.me/api/portraits/men/74.jpg', niche: 'Content & Affiliate Marketing', revenue: 6000000, monthlyReturn: 21.4, followers: 140000, rating: 4.9, minDeposit: 1000, winRate: 88, totalTrades: 5000, profitFactor: 3.0, sharpeRatio: 2.0, maxDrawdown: 5.0, yearsExperience: 15, verified: true, premium: true, location: 'USA', joinedDate: '2019-01-15',
    bio: 'Professional affiliate marketer and digital entrepreneur.', strategy: 'Advanced traffic generation and conversion optimization.', 
    growth: [
      { date: 'Jan', open: 120, high: 145, low: 115, close: 140, volume: 45000 },
      { date: 'Feb', open: 140, high: 168, low: 135, close: 165, volume: 52000 },
      { date: 'Mar', open: 165, high: 195, low: 160, close: 190, volume: 61000 },
      { date: 'Apr', open: 190, high: 235, low: 185, close: 225, volume: 74000 },
      { date: 'May', open: 225, high: 280, low: 220, close: 270, volume: 88000 },
      { date: 'Jun', open: 270, high: 340, low: 265, close: 330, volume: 105000 },
      { date: 'Jul', open: 330, high: 410, low: 320, close: 395, volume: 124000 },
      { date: 'Aug', open: 395, high: 485, low: 390, close: 485, volume: 142000 }
    ]
  },
  {
    id: 'm20', name: 'Rand Fishkin', avatar: 'https://randomuser.me/api/portraits/women/73.jpg', niche: 'Audience Intelligence', revenue: 5500000, monthlyReturn: 21.2, followers: 120000, rating: 4.9, minDeposit: 1000, winRate: 88, totalTrades: 5000, profitFactor: 3.0, sharpeRatio: 2.0, maxDrawdown: 5.0, yearsExperience: 15, verified: true, premium: true, location: 'USA', joinedDate: '2019-01-15',
    bio: 'Professional affiliate marketer and digital entrepreneur.', strategy: 'Advanced traffic generation and conversion optimization.', 
    growth: [
      { date: 'Jan', open: 120, high: 145, low: 115, close: 140, volume: 45000 },
      { date: 'Feb', open: 140, high: 168, low: 135, close: 165, volume: 52000 },
      { date: 'Mar', open: 165, high: 195, low: 160, close: 190, volume: 61000 },
      { date: 'Apr', open: 190, high: 235, low: 185, close: 225, volume: 74000 },
      { date: 'May', open: 225, high: 280, low: 220, close: 270, volume: 88000 },
      { date: 'Jun', open: 270, high: 340, low: 265, close: 330, volume: 105000 },
      { date: 'Jul', open: 330, high: 410, low: 320, close: 395, volume: 124000 },
      { date: 'Aug', open: 395, high: 485, low: 390, close: 485, volume: 142000 }
    ]
  }
];

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
      status: 'active',
      createdAt: new Date().toISOString()
    },
    {
      id: 'mir_2',
      userId: 'usr_demo',
      marketerId: 'm3',
      multiplier: 1.0,
      stopLoss: 15,
      deposit: 1000,
      status: 'active',
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
  tradeLogs: [],
  auditLogs: [] // For recording sensitive admin actions
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
        status: 'active',
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

  // Admin Mirror Controls
  getAllMirrors() {
    return this.data.mirrored
  }

  blockMirror(id) {
    const mirror = this.data.mirrored.find(m => m.id === id)
    if (mirror) {
      mirror.status = 'blocked'
      this.save()
      return { success: true, mirror }
    }
    return { success: false, error: 'Copy record not found' }
  }

  deleteMirror(id, adminEmail) {
    const index = this.data.mirrored.findIndex(m => m.id === id)
    if (index !== -1) {
      const mirror = this.data.mirrored[index]
      this.data.mirrored.splice(index, 1)
      
      // Log the deletion
      if (!this.data.auditLogs) this.data.auditLogs = []
      this.data.auditLogs.push({
        id: 'aud_' + Date.now().toString(36),
        action: 'DELETE_COPY',
        adminEmail,
        details: `Deleted copy allocation ${id} (User: ${mirror.userId}, Marketer: ${mirror.marketerId}, Deposit: $${mirror.deposit})`,
        timestamp: new Date().toISOString()
      })
      
      this.save()
      return { success: true }
    }
    return { success: false, error: 'Copy record not found' }
  }

  // Transactions & Approvals
  getTransactionsByUser(userId) {
    return (this.data.transactions || []).filter(t => t.userId === userId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }

  getAllTransactions() {
    return (this.data.transactions || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }

  createTransaction(userId, type, amount, status = 'pending', method = 'Standard Transfer', details = {}) {
    const tx = {
      id: 'tx_' + Date.now().toString(36),
      userId,
      type,
      amount: parseFloat(amount.toFixed(2)),
      status, // 'pending', 'approved', 'declined'
      method,
      asset: details.asset || 'USDT',
      txHash: details.txHash || '',
      walletAddress: details.walletAddress || '',
      createdAt: new Date().toISOString()
    }
    
    if (!Array.isArray(this.data.transactions)) {
      this.data.transactions = []
    }
    this.data.transactions.push(tx)

    // For instant approved system txs or withdrawals (where we hold the funds immediately)
    const user = this.getUserById(userId)
    if (user && type === 'withdrawal' && status === 'pending') {
      user.balance = Math.max(0, user.balance - amount)
      user.balance = parseFloat(user.balance.toFixed(2))
    }

    if (user && status === 'approved' && type === 'deposit') {
      user.balance += amount
      user.balance = parseFloat(user.balance.toFixed(2))
    }

    this.save()
    return tx
  }

  approveTransaction(txId) {
    const tx = (this.data.transactions || []).find(t => t.id === txId)
    if (!tx || tx.status !== 'pending') {
      return { success: false, error: 'Transaction not found or already processed' }
    }

    tx.status = 'approved'
    const user = this.getUserById(tx.userId)
    if (user && tx.type === 'deposit') {
      user.balance += tx.amount
      user.balance = parseFloat(user.balance.toFixed(2))
    }

    this.save()
    return { success: true, transaction: tx, user }
  }

  declineTransaction(txId, reason = 'Verification failed') {
    const tx = (this.data.transactions || []).find(t => t.id === txId)
    if (!tx || tx.status !== 'pending') {
      return { success: false, error: 'Transaction not found or already processed' }
    }

    tx.status = 'declined'
    tx.declineReason = reason

    // Refund withdrawal if declined
    const user = this.getUserById(tx.userId)
    if (user && tx.type === 'withdrawal') {
      user.balance += tx.amount
      user.balance = parseFloat(user.balance.toFixed(2))
    }

    this.save()
    return { success: true, transaction: tx, user }
  }

  // Admin Deposit Wallets Configurator
  getDepositWallets() {
    if (!Array.isArray(this.data.depositWallets) || this.data.depositWallets.length === 0) {
      this.data.depositWallets = [
        { id: 'w1', name: 'USDT (TRC20)', asset: 'USDT-TRC20', address: 'T9xQeK...3Xm8qV', network: 'TRON (TRC20)', active: true },
        { id: 'w2', name: 'Bitcoin (BTC)', asset: 'BTC', address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', network: 'Bitcoin', active: true },
        { id: 'w3', name: 'Ethereum (ETH)', asset: 'ETH', address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F', network: 'ERC20', active: true }
      ]
      this.save()
    }
    return this.data.depositWallets
  }

  saveDepositWallets(wallets) {
    this.data.depositWallets = wallets
    this.save()
    return this.data.depositWallets
  }

  // Full Admin User Control
  getAllUsers() {
    return (this.data.users || []).map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      balance: u.balance,
      status: u.status || 'active',
      createdAt: u.createdAt || new Date().toISOString()
    }))
  }

  updateUserBalance(userId, newBalance, reason = 'Admin Adjustment') {
    const user = this.getUserById(userId)
    if (!user) return { success: false, error: 'User not found' }
    
    const diff = newBalance - user.balance
    user.balance = parseFloat(parseFloat(newBalance).toFixed(2))
    
    // Log transaction
    this.createTransaction(userId, diff >= 0 ? 'deposit' : 'withdrawal', Math.abs(diff), 'approved', `Admin Override: ${reason}`)
    this.save()
    return { success: true, user }
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

  seedMarketers() {
    if (!Array.isArray(this.data.marketers)) {
      this.data.marketers = []
    }
    if (this.data.marketers.length >= 120) {
      return
    }

    const pool = [{"name":"Camille Kowalski","avatar":"https://randomuser.me/api/portraits/women/3.jpg"},{"name":"Jackie Price","avatar":"https://randomuser.me/api/portraits/women/88.jpg"},{"name":"Jeffrey Rhodes","avatar":"https://randomuser.me/api/portraits/men/17.jpg"},{"name":"Susan Robinson","avatar":"https://randomuser.me/api/portraits/women/78.jpg"},{"name":"Jayden Lambert","avatar":"https://randomuser.me/api/portraits/men/3.jpg"},{"name":"Angel Franklin","avatar":"https://randomuser.me/api/portraits/men/24.jpg"},{"name":"Elliot Williams","avatar":"https://randomuser.me/api/portraits/men/77.jpg"},{"name":"Russell Sanchez","avatar":"https://randomuser.me/api/portraits/men/17.jpg"},{"name":"Joanne Howard","avatar":"https://randomuser.me/api/portraits/women/53.jpg"},{"name":"Eliza Kelley","avatar":"https://randomuser.me/api/portraits/women/0.jpg"},{"name":"Adam Fletcher","avatar":"https://randomuser.me/api/portraits/men/69.jpg"},{"name":"Keith Green","avatar":"https://randomuser.me/api/portraits/men/11.jpg"},{"name":"Don Hill","avatar":"https://randomuser.me/api/portraits/men/61.jpg"},{"name":"Xander Crawford","avatar":"https://randomuser.me/api/portraits/men/63.jpg"},{"name":"Calvin Tucker","avatar":"https://randomuser.me/api/portraits/men/2.jpg"},{"name":"Louis Côté","avatar":"https://randomuser.me/api/portraits/men/68.jpg"},{"name":"Aubree Thompson","avatar":"https://randomuser.me/api/portraits/women/24.jpg"},{"name":"Julian Washington","avatar":"https://randomuser.me/api/portraits/men/15.jpg"},{"name":"Vernon Carr","avatar":"https://randomuser.me/api/portraits/men/86.jpg"},{"name":"Sergio Marshall","avatar":"https://randomuser.me/api/portraits/men/95.jpg"},{"name":"Adam Hudson","avatar":"https://randomuser.me/api/portraits/men/6.jpg"},{"name":"Aubree Lam","avatar":"https://randomuser.me/api/portraits/women/82.jpg"},{"name":"Simon Andersen","avatar":"https://randomuser.me/api/portraits/men/84.jpg"},{"name":"Brent Elliott","avatar":"https://randomuser.me/api/portraits/men/10.jpg"},{"name":"Julia Singh","avatar":"https://randomuser.me/api/portraits/women/31.jpg"},{"name":"Kristen Medina","avatar":"https://randomuser.me/api/portraits/women/71.jpg"},{"name":"Noémie Liu","avatar":"https://randomuser.me/api/portraits/women/87.jpg"},{"name":"Olivia Côté","avatar":"https://randomuser.me/api/portraits/women/33.jpg"},{"name":"Charlotte Ambrose","avatar":"https://randomuser.me/api/portraits/women/55.jpg"},{"name":"Ryder Ouellet","avatar":"https://randomuser.me/api/portraits/men/54.jpg"},{"name":"Steve Daniels","avatar":"https://randomuser.me/api/portraits/men/22.jpg"},{"name":"Eddie Larson","avatar":"https://randomuser.me/api/portraits/men/37.jpg"},{"name":"Rebecca Day","avatar":"https://randomuser.me/api/portraits/women/90.jpg"},{"name":"David Barnaby","avatar":"https://randomuser.me/api/portraits/men/67.jpg"},{"name":"Karen Hawkins","avatar":"https://randomuser.me/api/portraits/women/63.jpg"},{"name":"Mark Hale","avatar":"https://randomuser.me/api/portraits/men/27.jpg"},{"name":"Tracy Andrews","avatar":"https://randomuser.me/api/portraits/men/61.jpg"},{"name":"Neil Pierce","avatar":"https://randomuser.me/api/portraits/men/40.jpg"},{"name":"Amy Macdonald","avatar":"https://randomuser.me/api/portraits/women/31.jpg"},{"name":"Lori Vasquez","avatar":"https://randomuser.me/api/portraits/women/65.jpg"},{"name":"Aubree Patel","avatar":"https://randomuser.me/api/portraits/women/40.jpg"},{"name":"Gabriel Walker","avatar":"https://randomuser.me/api/portraits/men/37.jpg"},{"name":"Felix Jean-Baptiste","avatar":"https://randomuser.me/api/portraits/men/25.jpg"},{"name":"Mitchell Cooper","avatar":"https://randomuser.me/api/portraits/men/29.jpg"},{"name":"Elliot Ma","avatar":"https://randomuser.me/api/portraits/men/37.jpg"},{"name":"Phoebe Sullivan","avatar":"https://randomuser.me/api/portraits/women/34.jpg"},{"name":"Zander Craig","avatar":"https://randomuser.me/api/portraits/men/45.jpg"},{"name":"Allie Myers","avatar":"https://randomuser.me/api/portraits/women/28.jpg"},{"name":"Ethel Jacobs","avatar":"https://randomuser.me/api/portraits/women/56.jpg"},{"name":"Jean Pearson","avatar":"https://randomuser.me/api/portraits/women/70.jpg"},{"name":"Raymond Garcia","avatar":"https://randomuser.me/api/portraits/men/66.jpg"},{"name":"Gabriel Jones","avatar":"https://randomuser.me/api/portraits/men/12.jpg"},{"name":"Erin Mitchelle","avatar":"https://randomuser.me/api/portraits/women/24.jpg"},{"name":"Reginald Jacobs","avatar":"https://randomuser.me/api/portraits/men/7.jpg"},{"name":"Maurice Myers","avatar":"https://randomuser.me/api/portraits/men/16.jpg"},{"name":"Greg Garrett","avatar":"https://randomuser.me/api/portraits/men/2.jpg"},{"name":"Jeanne Lo","avatar":"https://randomuser.me/api/portraits/women/45.jpg"},{"name":"Linda Ford","avatar":"https://randomuser.me/api/portraits/women/35.jpg"},{"name":"Abigail Grewal","avatar":"https://randomuser.me/api/portraits/women/0.jpg"},{"name":"Albert Phillips","avatar":"https://randomuser.me/api/portraits/men/98.jpg"},{"name":"Eugene Romero","avatar":"https://randomuser.me/api/portraits/men/17.jpg"},{"name":"Jose Jones","avatar":"https://randomuser.me/api/portraits/men/65.jpg"},{"name":"Francis Murray","avatar":"https://randomuser.me/api/portraits/men/99.jpg"},{"name":"Terri Roberts","avatar":"https://randomuser.me/api/portraits/women/67.jpg"},{"name":"Jean Hicks","avatar":"https://randomuser.me/api/portraits/women/3.jpg"},{"name":"Kent Rice","avatar":"https://randomuser.me/api/portraits/men/1.jpg"},{"name":"Ellen Watts","avatar":"https://randomuser.me/api/portraits/women/30.jpg"},{"name":"Emily Jones","avatar":"https://randomuser.me/api/portraits/women/51.jpg"},{"name":"Elijah Wade","avatar":"https://randomuser.me/api/portraits/men/36.jpg"},{"name":"Todd Garrett","avatar":"https://randomuser.me/api/portraits/men/6.jpg"},{"name":"Elizabeth Ennis","avatar":"https://randomuser.me/api/portraits/women/92.jpg"},{"name":"Nathan Gauthier","avatar":"https://randomuser.me/api/portraits/men/93.jpg"},{"name":"Cory Hopkins","avatar":"https://randomuser.me/api/portraits/men/95.jpg"},{"name":"Landon Howell","avatar":"https://randomuser.me/api/portraits/men/42.jpg"},{"name":"Ella Payne","avatar":"https://randomuser.me/api/portraits/women/65.jpg"},{"name":"Janet Olson","avatar":"https://randomuser.me/api/portraits/women/88.jpg"},{"name":"Jeremy Hansen","avatar":"https://randomuser.me/api/portraits/men/97.jpg"},{"name":"Donna Lowe","avatar":"https://randomuser.me/api/portraits/women/84.jpg"},{"name":"Ethan Chow","avatar":"https://randomuser.me/api/portraits/men/76.jpg"},{"name":"Liam Walker","avatar":"https://randomuser.me/api/portraits/men/14.jpg"},{"name":"Juanita Green","avatar":"https://randomuser.me/api/portraits/women/76.jpg"},{"name":"Angela Carter","avatar":"https://randomuser.me/api/portraits/women/62.jpg"},{"name":"Melanie Davis","avatar":"https://randomuser.me/api/portraits/women/78.jpg"},{"name":"Zoe Fuller","avatar":"https://randomuser.me/api/portraits/women/64.jpg"},{"name":"Sean Franklin","avatar":"https://randomuser.me/api/portraits/men/14.jpg"},{"name":"William Scott","avatar":"https://randomuser.me/api/portraits/men/45.jpg"},{"name":"Hailey Côté","avatar":"https://randomuser.me/api/portraits/women/13.jpg"},{"name":"Pat Nguyen","avatar":"https://randomuser.me/api/portraits/men/5.jpg"},{"name":"Heidi Long","avatar":"https://randomuser.me/api/portraits/women/69.jpg"},{"name":"Arthur Campbell","avatar":"https://randomuser.me/api/portraits/men/67.jpg"},{"name":"Eleanor Johnson","avatar":"https://randomuser.me/api/portraits/women/60.jpg"},{"name":"Marilou Macdonald","avatar":"https://randomuser.me/api/portraits/women/40.jpg"},{"name":"Anita Perry","avatar":"https://randomuser.me/api/portraits/women/77.jpg"},{"name":"Isabella Harrison","avatar":"https://randomuser.me/api/portraits/women/64.jpg"},{"name":"Irma Warren","avatar":"https://randomuser.me/api/portraits/women/93.jpg"},{"name":"Susie Fleming","avatar":"https://randomuser.me/api/portraits/women/21.jpg"},{"name":"Zachary Campbell","avatar":"https://randomuser.me/api/portraits/men/53.jpg"},{"name":"Alison Lawrence","avatar":"https://randomuser.me/api/portraits/women/43.jpg"},{"name":"Alexis Gagné","avatar":"https://randomuser.me/api/portraits/men/27.jpg"},{"name":"Clifford Byrd","avatar":"https://randomuser.me/api/portraits/men/26.jpg"},{"name":"Nathan French","avatar":"https://randomuser.me/api/portraits/men/9.jpg"},{"name":"Louis Patel","avatar":"https://randomuser.me/api/portraits/men/59.jpg"},{"name":"Sherri Steeves ","avatar":"https://randomuser.me/api/portraits/women/33.jpg"},{"name":"Brielle Fortin","avatar":"https://randomuser.me/api/portraits/women/76.jpg"},{"name":"Arron Jensen","avatar":"https://randomuser.me/api/portraits/men/57.jpg"},{"name":"Stacy Lynch","avatar":"https://randomuser.me/api/portraits/women/50.jpg"},{"name":"Abby Austin","avatar":"https://randomuser.me/api/portraits/women/87.jpg"},{"name":"Olivia Wong","avatar":"https://randomuser.me/api/portraits/women/44.jpg"},{"name":"Ron Kelley","avatar":"https://randomuser.me/api/portraits/men/23.jpg"},{"name":"Victoria Abraham","avatar":"https://randomuser.me/api/portraits/women/8.jpg"},{"name":"Mathis White","avatar":"https://randomuser.me/api/portraits/men/88.jpg"},{"name":"Colin Smith","avatar":"https://randomuser.me/api/portraits/men/6.jpg"},{"name":"Addison Walker","avatar":"https://randomuser.me/api/portraits/women/84.jpg"},{"name":"Chloe Patterson","avatar":"https://randomuser.me/api/portraits/women/15.jpg"},{"name":"Matthew Ambrose","avatar":"https://randomuser.me/api/portraits/men/74.jpg"},{"name":"Danielle Shaw","avatar":"https://randomuser.me/api/portraits/women/6.jpg"},{"name":"Eva Graves","avatar":"https://randomuser.me/api/portraits/women/81.jpg"},{"name":"Emily Warren","avatar":"https://randomuser.me/api/portraits/women/45.jpg"},{"name":"Kristin Hughes","avatar":"https://randomuser.me/api/portraits/women/63.jpg"},{"name":"Lucas Gagné","avatar":"https://randomuser.me/api/portraits/men/67.jpg"},{"name":"Noah Addy","avatar":"https://randomuser.me/api/portraits/men/51.jpg"},{"name":"Bradley Elliott","avatar":"https://randomuser.me/api/portraits/men/60.jpg"},{"name":"Perry Shelton","avatar":"https://randomuser.me/api/portraits/men/21.jpg"},{"name":"Gregory Richardson","avatar":"https://randomuser.me/api/portraits/men/28.jpg"},{"name":"Elliot Pelletier","avatar":"https://randomuser.me/api/portraits/men/68.jpg"},{"name":"Abbie Lambert","avatar":"https://randomuser.me/api/portraits/women/56.jpg"},{"name":"Noah Park","avatar":"https://randomuser.me/api/portraits/men/13.jpg"},{"name":"Emma Hawkins","avatar":"https://randomuser.me/api/portraits/women/79.jpg"},{"name":"Liam Grewal","avatar":"https://randomuser.me/api/portraits/men/53.jpg"},{"name":"Nina Williams","avatar":"https://randomuser.me/api/portraits/women/18.jpg"},{"name":"Malik Patel","avatar":"https://randomuser.me/api/portraits/men/67.jpg"},{"name":"Theo Andersen","avatar":"https://randomuser.me/api/portraits/men/10.jpg"},{"name":"Jeremy Morin","avatar":"https://randomuser.me/api/portraits/men/6.jpg"},{"name":"Molly Freeman","avatar":"https://randomuser.me/api/portraits/women/22.jpg"},{"name":"Donna Elliott","avatar":"https://randomuser.me/api/portraits/women/86.jpg"},{"name":"Jar Mason","avatar":"https://randomuser.me/api/portraits/men/20.jpg"},{"name":"Leonard Reid","avatar":"https://randomuser.me/api/portraits/men/67.jpg"},{"name":"Alexandra Hamilton","avatar":"https://randomuser.me/api/portraits/women/6.jpg"},{"name":"Clara Campbell","avatar":"https://randomuser.me/api/portraits/women/1.jpg"},{"name":"Luke Hansen","avatar":"https://randomuser.me/api/portraits/men/82.jpg"},{"name":"Jared Patterson","avatar":"https://randomuser.me/api/portraits/men/65.jpg"},{"name":"Jasmine Ross","avatar":"https://randomuser.me/api/portraits/women/42.jpg"},{"name":"Kimberly Ferguson","avatar":"https://randomuser.me/api/portraits/women/5.jpg"},{"name":"Samuel Andersen","avatar":"https://randomuser.me/api/portraits/men/59.jpg"},{"name":"Adam Ross","avatar":"https://randomuser.me/api/portraits/men/55.jpg"},{"name":"Cecil Lawson","avatar":"https://randomuser.me/api/portraits/men/53.jpg"},{"name":"Kaitlin Armstrong","avatar":"https://randomuser.me/api/portraits/women/6.jpg"},{"name":"Alexandre Thompson","avatar":"https://randomuser.me/api/portraits/men/28.jpg"},{"name":"Vanessa Garrett","avatar":"https://randomuser.me/api/portraits/women/30.jpg"},{"name":"Barry Knight","avatar":"https://randomuser.me/api/portraits/men/4.jpg"},{"name":"Paige Richards","avatar":"https://randomuser.me/api/portraits/women/51.jpg"},{"name":"Dominic Mackay","avatar":"https://randomuser.me/api/portraits/men/85.jpg"},{"name":"Bessie Williams","avatar":"https://randomuser.me/api/portraits/women/55.jpg"},{"name":"Corey Brewer","avatar":"https://randomuser.me/api/portraits/men/94.jpg"},{"name":"Irene Sutton","avatar":"https://randomuser.me/api/portraits/women/5.jpg"},{"name":"Addison Chu","avatar":"https://randomuser.me/api/portraits/women/54.jpg"},{"name":"Rose Clark","avatar":"https://randomuser.me/api/portraits/women/47.jpg"},{"name":"Jeanne Thompson","avatar":"https://randomuser.me/api/portraits/women/93.jpg"},{"name":"Lucas Smith","avatar":"https://randomuser.me/api/portraits/men/49.jpg"},{"name":"Alice Rhodes","avatar":"https://randomuser.me/api/portraits/women/48.jpg"},{"name":"Ryan Sirko","avatar":"https://randomuser.me/api/portraits/men/26.jpg"},{"name":"Mason Porter","avatar":"https://randomuser.me/api/portraits/men/93.jpg"},{"name":"Zackary Johnson","avatar":"https://randomuser.me/api/portraits/men/98.jpg"},{"name":"David White","avatar":"https://randomuser.me/api/portraits/men/7.jpg"},{"name":"Frances Hawkins","avatar":"https://randomuser.me/api/portraits/women/84.jpg"},{"name":"Michelle Jimenez","avatar":"https://randomuser.me/api/portraits/women/51.jpg"},{"name":"Emma Claire","avatar":"https://randomuser.me/api/portraits/women/56.jpg"},{"name":"Lea Gill","avatar":"https://randomuser.me/api/portraits/women/87.jpg"},{"name":"Marc Owens","avatar":"https://randomuser.me/api/portraits/men/47.jpg"},{"name":"Edwin Ellis","avatar":"https://randomuser.me/api/portraits/men/36.jpg"},{"name":"Minnie Horton","avatar":"https://randomuser.me/api/portraits/women/28.jpg"},{"name":"Julia Douglas","avatar":"https://randomuser.me/api/portraits/women/91.jpg"},{"name":"Erin Gutierrez","avatar":"https://randomuser.me/api/portraits/women/2.jpg"},{"name":"Ronald Martin","avatar":"https://randomuser.me/api/portraits/men/91.jpg"},{"name":"Anthony Riley","avatar":"https://randomuser.me/api/portraits/men/63.jpg"},{"name":"Randy Caldwell","avatar":"https://randomuser.me/api/portraits/men/63.jpg"},{"name":"Alexis Chan","avatar":"https://randomuser.me/api/portraits/men/49.jpg"},{"name":"Carol Clark","avatar":"https://randomuser.me/api/portraits/women/76.jpg"},{"name":"Liam Ambrose","avatar":"https://randomuser.me/api/portraits/men/39.jpg"},{"name":"Martha Stevens","avatar":"https://randomuser.me/api/portraits/women/30.jpg"},{"name":"Timmothy Diaz","avatar":"https://randomuser.me/api/portraits/men/24.jpg"},{"name":"Vanessa Dixon","avatar":"https://randomuser.me/api/portraits/women/48.jpg"},{"name":"Alison May","avatar":"https://randomuser.me/api/portraits/women/0.jpg"},{"name":"Riley Ross","avatar":"https://randomuser.me/api/portraits/women/20.jpg"},{"name":"Miguel Crawford","avatar":"https://randomuser.me/api/portraits/men/89.jpg"},{"name":"Louis Wilson","avatar":"https://randomuser.me/api/portraits/men/7.jpg"},{"name":"Tracey Ortiz","avatar":"https://randomuser.me/api/portraits/women/60.jpg"},{"name":"Judy White","avatar":"https://randomuser.me/api/portraits/women/50.jpg"},{"name":"Franklin Perry","avatar":"https://randomuser.me/api/portraits/men/96.jpg"},{"name":"Charlotte Ross","avatar":"https://randomuser.me/api/portraits/women/10.jpg"},{"name":"Soham Bradley","avatar":"https://randomuser.me/api/portraits/men/6.jpg"},{"name":"Wayne Cruz","avatar":"https://randomuser.me/api/portraits/men/60.jpg"},{"name":"Juliette Bergeron","avatar":"https://randomuser.me/api/portraits/women/31.jpg"},{"name":"Megan Obrien","avatar":"https://randomuser.me/api/portraits/women/40.jpg"},{"name":"Jessie Hunter","avatar":"https://randomuser.me/api/portraits/women/25.jpg"},{"name":"Camille Bélanger","avatar":"https://randomuser.me/api/portraits/women/71.jpg"},{"name":"Rosalyn Fields","avatar":"https://randomuser.me/api/portraits/women/38.jpg"},{"name":"Crystal Banks","avatar":"https://randomuser.me/api/portraits/women/14.jpg"},{"name":"Michelle Medina","avatar":"https://randomuser.me/api/portraits/women/30.jpg"},{"name":"Andrew Rose","avatar":"https://randomuser.me/api/portraits/men/94.jpg"},{"name":"Javier Rice","avatar":"https://randomuser.me/api/portraits/men/44.jpg"},{"name":"Ryan Jones","avatar":"https://randomuser.me/api/portraits/men/89.jpg"},{"name":"Lily May","avatar":"https://randomuser.me/api/portraits/women/86.jpg"},{"name":"Hailey Slawa","avatar":"https://randomuser.me/api/portraits/women/79.jpg"},{"name":"Aubree Lavoie","avatar":"https://randomuser.me/api/portraits/women/14.jpg"},{"name":"Julie Fisher","avatar":"https://randomuser.me/api/portraits/women/43.jpg"},{"name":"William Macdonald","avatar":"https://randomuser.me/api/portraits/men/38.jpg"},{"name":"Matthew Addy","avatar":"https://randomuser.me/api/portraits/men/72.jpg"},{"name":"Kevin Turner","avatar":"https://randomuser.me/api/portraits/men/56.jpg"},{"name":"Mitchell Dean","avatar":"https://randomuser.me/api/portraits/men/33.jpg"},{"name":"Barbara Vasquez","avatar":"https://randomuser.me/api/portraits/women/69.jpg"},{"name":"Vickie Jordan","avatar":"https://randomuser.me/api/portraits/women/87.jpg"},{"name":"Ethan Henry","avatar":"https://randomuser.me/api/portraits/men/98.jpg"},{"name":"Leo Knight","avatar":"https://randomuser.me/api/portraits/men/40.jpg"},{"name":"Abigail Knight","avatar":"https://randomuser.me/api/portraits/women/18.jpg"},{"name":"Frederick Douglas","avatar":"https://randomuser.me/api/portraits/men/7.jpg"},{"name":"Dylan Byrd","avatar":"https://randomuser.me/api/portraits/men/86.jpg"},{"name":"Ashley Simmmons","avatar":"https://randomuser.me/api/portraits/women/77.jpg"},{"name":"Hailey White","avatar":"https://randomuser.me/api/portraits/women/6.jpg"},{"name":"Clara Peck","avatar":"https://randomuser.me/api/portraits/women/30.jpg"},{"name":"Aubree Li","avatar":"https://randomuser.me/api/portraits/women/63.jpg"},{"name":"Benjamin Walker","avatar":"https://randomuser.me/api/portraits/men/77.jpg"},{"name":"Freddie Holland","avatar":"https://randomuser.me/api/portraits/men/0.jpg"},{"name":"Terrence Garrett","avatar":"https://randomuser.me/api/portraits/men/90.jpg"},{"name":"Lucas Ross","avatar":"https://randomuser.me/api/portraits/men/70.jpg"},{"name":"Clarence Knight","avatar":"https://randomuser.me/api/portraits/men/25.jpg"},{"name":"Tammy Fowler","avatar":"https://randomuser.me/api/portraits/women/20.jpg"},{"name":"Sophia Sims","avatar":"https://randomuser.me/api/portraits/women/24.jpg"},{"name":"Howard Barrett","avatar":"https://randomuser.me/api/portraits/men/61.jpg"},{"name":"Ian Barnes","avatar":"https://randomuser.me/api/portraits/men/38.jpg"},{"name":"Heidi Fuller","avatar":"https://randomuser.me/api/portraits/women/9.jpg"},{"name":"Tracey White","avatar":"https://randomuser.me/api/portraits/women/39.jpg"},{"name":"Jordan Hudson","avatar":"https://randomuser.me/api/portraits/men/77.jpg"},{"name":"Donna Dixon","avatar":"https://randomuser.me/api/portraits/women/87.jpg"},{"name":"Delores Campbell","avatar":"https://randomuser.me/api/portraits/women/56.jpg"},{"name":"Christina Alexander","avatar":"https://randomuser.me/api/portraits/women/55.jpg"},{"name":"Suzanne Payne","avatar":"https://randomuser.me/api/portraits/women/44.jpg"},{"name":"Aaron Dunn","avatar":"https://randomuser.me/api/portraits/men/94.jpg"},{"name":"Elliot Gill","avatar":"https://randomuser.me/api/portraits/men/30.jpg"},{"name":"Sammy Herrera","avatar":"https://randomuser.me/api/portraits/men/28.jpg"},{"name":"Tyrone Burns","avatar":"https://randomuser.me/api/portraits/men/38.jpg"},{"name":"Owen Walker","avatar":"https://randomuser.me/api/portraits/men/53.jpg"},{"name":"Carmen Ferguson","avatar":"https://randomuser.me/api/portraits/women/7.jpg"},{"name":"Beatrice Barnaby","avatar":"https://randomuser.me/api/portraits/women/84.jpg"},{"name":"Colin Morales","avatar":"https://randomuser.me/api/portraits/men/67.jpg"},{"name":"Deanna Barnett","avatar":"https://randomuser.me/api/portraits/women/21.jpg"},{"name":"Florence Davidson","avatar":"https://randomuser.me/api/portraits/women/56.jpg"},{"name":"Mario Coleman","avatar":"https://randomuser.me/api/portraits/men/89.jpg"},{"name":"Hannah Chu","avatar":"https://randomuser.me/api/portraits/women/47.jpg"},{"name":"Juliette Margaret","avatar":"https://randomuser.me/api/portraits/women/86.jpg"},{"name":"Alex Simpson","avatar":"https://randomuser.me/api/portraits/women/30.jpg"},{"name":"Lillian Walters","avatar":"https://randomuser.me/api/portraits/women/11.jpg"},{"name":"Willie Bell","avatar":"https://randomuser.me/api/portraits/men/12.jpg"},{"name":"Hunter Willis","avatar":"https://randomuser.me/api/portraits/men/13.jpg"},{"name":"Alex Andrews","avatar":"https://randomuser.me/api/portraits/women/88.jpg"},{"name":"Mary Taylor","avatar":"https://randomuser.me/api/portraits/women/58.jpg"},{"name":"Earl Webb","avatar":"https://randomuser.me/api/portraits/men/55.jpg"},{"name":"Alexis Côté","avatar":"https://randomuser.me/api/portraits/women/23.jpg"},{"name":"Genesis Williams","avatar":"https://randomuser.me/api/portraits/women/8.jpg"},{"name":"Daniel Park","avatar":"https://randomuser.me/api/portraits/men/97.jpg"},{"name":"Alice Ross","avatar":"https://randomuser.me/api/portraits/women/46.jpg"},{"name":"Caleb Castillo","avatar":"https://randomuser.me/api/portraits/men/51.jpg"},{"name":"Nicole Garcia","avatar":"https://randomuser.me/api/portraits/women/94.jpg"},{"name":"Liam Lam","avatar":"https://randomuser.me/api/portraits/men/4.jpg"},{"name":"Louis Gregory","avatar":"https://randomuser.me/api/portraits/men/42.jpg"},{"name":"Xavier Gagnon","avatar":"https://randomuser.me/api/portraits/men/62.jpg"},{"name":"Hannah Thompson","avatar":"https://randomuser.me/api/portraits/women/58.jpg"},{"name":"Ella Newman","avatar":"https://randomuser.me/api/portraits/women/23.jpg"},{"name":"Carter Carr","avatar":"https://randomuser.me/api/portraits/men/32.jpg"},{"name":"Olivia Morin","avatar":"https://randomuser.me/api/portraits/women/41.jpg"},{"name":"Florence Foster","avatar":"https://randomuser.me/api/portraits/women/51.jpg"},{"name":"Owen Chan","avatar":"https://randomuser.me/api/portraits/men/34.jpg"},{"name":"Tim Taylor","avatar":"https://randomuser.me/api/portraits/men/34.jpg"},{"name":"Camila Gonzales","avatar":"https://randomuser.me/api/portraits/women/31.jpg"},{"name":"Rebecca Ramos","avatar":"https://randomuser.me/api/portraits/women/95.jpg"},{"name":"Jacqueline Peters","avatar":"https://randomuser.me/api/portraits/women/78.jpg"},{"name":"Morris Rice","avatar":"https://randomuser.me/api/portraits/men/1.jpg"},{"name":"Charles Clark","avatar":"https://randomuser.me/api/portraits/men/20.jpg"},{"name":"Ernest Sims","avatar":"https://randomuser.me/api/portraits/men/44.jpg"},{"name":"Joe Myers","avatar":"https://randomuser.me/api/portraits/men/55.jpg"},{"name":"Theresa Spencer","avatar":"https://randomuser.me/api/portraits/women/12.jpg"},{"name":"Nathan Martin","avatar":"https://randomuser.me/api/portraits/men/85.jpg"},{"name":"Salvador Myers","avatar":"https://randomuser.me/api/portraits/men/3.jpg"},{"name":"Sheryl Hunter","avatar":"https://randomuser.me/api/portraits/women/35.jpg"},{"name":"Carter Peterson","avatar":"https://randomuser.me/api/portraits/men/41.jpg"},{"name":"Anthony Johnson","avatar":"https://randomuser.me/api/portraits/men/15.jpg"},{"name":"Katie Diaz","avatar":"https://randomuser.me/api/portraits/women/72.jpg"},{"name":"Elliot Smith","avatar":"https://randomuser.me/api/portraits/men/64.jpg"},{"name":"Benjamin Slawa","avatar":"https://randomuser.me/api/portraits/men/91.jpg"},{"name":"Simon Jones","avatar":"https://randomuser.me/api/portraits/men/59.jpg"},{"name":"Herbert Steward","avatar":"https://randomuser.me/api/portraits/men/19.jpg"},{"name":"Heather Bailey","avatar":"https://randomuser.me/api/portraits/women/77.jpg"},{"name":"Chloe Roy","avatar":"https://randomuser.me/api/portraits/women/66.jpg"},{"name":"Albert Graham","avatar":"https://randomuser.me/api/portraits/men/54.jpg"},{"name":"Sandra Porter","avatar":"https://randomuser.me/api/portraits/women/61.jpg"},{"name":"Calvin Sanchez","avatar":"https://randomuser.me/api/portraits/men/92.jpg"},{"name":"Jeanne Bryant","avatar":"https://randomuser.me/api/portraits/women/50.jpg"},{"name":"David Kowalski","avatar":"https://randomuser.me/api/portraits/men/64.jpg"},{"name":"Katherine Price","avatar":"https://randomuser.me/api/portraits/women/23.jpg"},{"name":"Norman Woods","avatar":"https://randomuser.me/api/portraits/men/8.jpg"},{"name":"Gordon Wright","avatar":"https://randomuser.me/api/portraits/men/22.jpg"},{"name":"Lloyd Robertson","avatar":"https://randomuser.me/api/portraits/men/97.jpg"},{"name":"Adam Jones","avatar":"https://randomuser.me/api/portraits/men/42.jpg"},{"name":"Victor Torres","avatar":"https://randomuser.me/api/portraits/men/67.jpg"},{"name":"Ella Lam","avatar":"https://randomuser.me/api/portraits/women/30.jpg"},{"name":"Julia Perez","avatar":"https://randomuser.me/api/portraits/women/80.jpg"},{"name":"Zachary Brown","avatar":"https://randomuser.me/api/portraits/men/27.jpg"},{"name":"Elizabeth Lévesque","avatar":"https://randomuser.me/api/portraits/women/59.jpg"},{"name":"Craig Harvey","avatar":"https://randomuser.me/api/portraits/men/15.jpg"},{"name":"Alicia Barnaby","avatar":"https://randomuser.me/api/portraits/women/59.jpg"},{"name":"Bella Carlson","avatar":"https://randomuser.me/api/portraits/women/49.jpg"},{"name":"Leroy Powell","avatar":"https://randomuser.me/api/portraits/men/5.jpg"},{"name":"Anna Black","avatar":"https://randomuser.me/api/portraits/women/23.jpg"},{"name":"Miguel Barrett","avatar":"https://randomuser.me/api/portraits/men/25.jpg"},{"name":"Rose French","avatar":"https://randomuser.me/api/portraits/women/10.jpg"},{"name":"Liam Hernandez","avatar":"https://randomuser.me/api/portraits/men/78.jpg"},{"name":"Lisa Harper","avatar":"https://randomuser.me/api/portraits/women/38.jpg"},{"name":"Mary Peters","avatar":"https://randomuser.me/api/portraits/women/33.jpg"},{"name":"Chloe Howard","avatar":"https://randomuser.me/api/portraits/women/32.jpg"},{"name":"Irma Edwards","avatar":"https://randomuser.me/api/portraits/women/79.jpg"},{"name":"Hunter Jones","avatar":"https://randomuser.me/api/portraits/men/46.jpg"},{"name":"Jayden Slawa","avatar":"https://randomuser.me/api/portraits/men/50.jpg"},{"name":"Donna Fisher","avatar":"https://randomuser.me/api/portraits/women/4.jpg"},{"name":"Victor Gauthier","avatar":"https://randomuser.me/api/portraits/men/98.jpg"},{"name":"Gabriel Snyder","avatar":"https://randomuser.me/api/portraits/men/30.jpg"},{"name":"Aiden Lévesque","avatar":"https://randomuser.me/api/portraits/men/87.jpg"},{"name":"Catherine Wheeler","avatar":"https://randomuser.me/api/portraits/women/75.jpg"},{"name":"Arthur Jean-Baptiste","avatar":"https://randomuser.me/api/portraits/men/64.jpg"},{"name":"Sofia Addy","avatar":"https://randomuser.me/api/portraits/women/55.jpg"},{"name":"Harper Holland","avatar":"https://randomuser.me/api/portraits/women/59.jpg"},{"name":"Rose Chow","avatar":"https://randomuser.me/api/portraits/women/16.jpg"},{"name":"Daryl Dean","avatar":"https://randomuser.me/api/portraits/men/30.jpg"},{"name":"Jimmy Thompson","avatar":"https://randomuser.me/api/portraits/men/64.jpg"},{"name":"Diana Montgomery","avatar":"https://randomuser.me/api/portraits/women/95.jpg"},{"name":"Delphine Tremblay","avatar":"https://randomuser.me/api/portraits/women/36.jpg"},{"name":"Sarah Grewal","avatar":"https://randomuser.me/api/portraits/women/92.jpg"},{"name":"Ben Gonzales","avatar":"https://randomuser.me/api/portraits/men/45.jpg"},{"name":"Noah Chan","avatar":"https://randomuser.me/api/portraits/men/19.jpg"},{"name":"Bella Castro","avatar":"https://randomuser.me/api/portraits/women/75.jpg"},{"name":"Philippe Morin","avatar":"https://randomuser.me/api/portraits/men/68.jpg"},{"name":"Noémie Tremblay","avatar":"https://randomuser.me/api/portraits/women/55.jpg"},{"name":"Florence Simmmons","avatar":"https://randomuser.me/api/portraits/women/24.jpg"},{"name":"Anthony Liu","avatar":"https://randomuser.me/api/portraits/men/77.jpg"},{"name":"Jerry Hall","avatar":"https://randomuser.me/api/portraits/men/47.jpg"},{"name":"Deann Nguyen","avatar":"https://randomuser.me/api/portraits/women/2.jpg"},{"name":"Mia Chow","avatar":"https://randomuser.me/api/portraits/women/56.jpg"},{"name":"Sarah Gagné","avatar":"https://randomuser.me/api/portraits/women/37.jpg"},{"name":"Gregory Frazier","avatar":"https://randomuser.me/api/portraits/men/82.jpg"},{"name":"Willard Beck","avatar":"https://randomuser.me/api/portraits/men/29.jpg"},{"name":"Susie Horton","avatar":"https://randomuser.me/api/portraits/women/80.jpg"},{"name":"Mia Grewal","avatar":"https://randomuser.me/api/portraits/women/41.jpg"},{"name":"Malik Roy","avatar":"https://randomuser.me/api/portraits/men/72.jpg"},{"name":"Nicole Ford","avatar":"https://randomuser.me/api/portraits/women/68.jpg"},{"name":"Don Flores","avatar":"https://randomuser.me/api/portraits/men/17.jpg"},{"name":"Erin Harper","avatar":"https://randomuser.me/api/portraits/women/62.jpg"},{"name":"Jacob Singh","avatar":"https://randomuser.me/api/portraits/men/22.jpg"},{"name":"Isabella Howell","avatar":"https://randomuser.me/api/portraits/women/69.jpg"},{"name":"Addison Denys","avatar":"https://randomuser.me/api/portraits/women/44.jpg"},{"name":"Zoe Patel","avatar":"https://randomuser.me/api/portraits/women/36.jpg"},{"name":"Jessie Mccoy","avatar":"https://randomuser.me/api/portraits/men/81.jpg"},{"name":"Eva Martin","avatar":"https://randomuser.me/api/portraits/women/81.jpg"},{"name":"Andy Fox","avatar":"https://randomuser.me/api/portraits/men/10.jpg"},{"name":"Avery Novak","avatar":"https://randomuser.me/api/portraits/women/29.jpg"},{"name":"Heidi Williams","avatar":"https://randomuser.me/api/portraits/women/37.jpg"},{"name":"Gladys Freeman","avatar":"https://randomuser.me/api/portraits/women/30.jpg"},{"name":"Emma Bergeron","avatar":"https://randomuser.me/api/portraits/women/59.jpg"},{"name":"Oscar Olson","avatar":"https://randomuser.me/api/portraits/men/52.jpg"},{"name":"Frankie Reynolds","avatar":"https://randomuser.me/api/portraits/men/21.jpg"},{"name":"Christina Gilbert","avatar":"https://randomuser.me/api/portraits/women/36.jpg"},{"name":"Julia Cruz","avatar":"https://randomuser.me/api/portraits/women/17.jpg"},{"name":"Jeffrey Willis","avatar":"https://randomuser.me/api/portraits/men/92.jpg"},{"name":"Brielle Walker","avatar":"https://randomuser.me/api/portraits/women/12.jpg"},{"name":"Suzy Daniels","avatar":"https://randomuser.me/api/portraits/women/41.jpg"},{"name":"Tiffany Sanders","avatar":"https://randomuser.me/api/portraits/women/37.jpg"},{"name":"Bently Knight","avatar":"https://randomuser.me/api/portraits/men/69.jpg"},{"name":"Ritthy Craig","avatar":"https://randomuser.me/api/portraits/men/15.jpg"},{"name":"Oliver Ennis","avatar":"https://randomuser.me/api/portraits/men/99.jpg"},{"name":"Ryder Li","avatar":"https://randomuser.me/api/portraits/men/31.jpg"},{"name":"Eva Dean","avatar":"https://randomuser.me/api/portraits/women/71.jpg"},{"name":"Steve Dunn","avatar":"https://randomuser.me/api/portraits/men/39.jpg"},{"name":"Isabella Rice","avatar":"https://randomuser.me/api/portraits/women/6.jpg"},{"name":"Lillian Lopez","avatar":"https://randomuser.me/api/portraits/women/11.jpg"},{"name":"Terra Pearson","avatar":"https://randomuser.me/api/portraits/women/74.jpg"},{"name":"Leroy Barnes","avatar":"https://randomuser.me/api/portraits/men/33.jpg"},{"name":"Sofia Mackay","avatar":"https://randomuser.me/api/portraits/women/8.jpg"},{"name":"Erik Rodriquez","avatar":"https://randomuser.me/api/portraits/men/99.jpg"},{"name":"Charlotte Chu","avatar":"https://randomuser.me/api/portraits/women/57.jpg"},{"name":"Thomas Fowler","avatar":"https://randomuser.me/api/portraits/men/74.jpg"},{"name":"Lea Bélanger","avatar":"https://randomuser.me/api/portraits/women/43.jpg"},{"name":"Florence Claire","avatar":"https://randomuser.me/api/portraits/women/7.jpg"},{"name":"Sally Simpson","avatar":"https://randomuser.me/api/portraits/women/73.jpg"},{"name":"Brayden Reid","avatar":"https://randomuser.me/api/portraits/men/28.jpg"},{"name":"Allie Gardner","avatar":"https://randomuser.me/api/portraits/women/94.jpg"},{"name":"Lucy Washington","avatar":"https://randomuser.me/api/portraits/women/84.jpg"},{"name":"Aubrey Abraham","avatar":"https://randomuser.me/api/portraits/women/84.jpg"},{"name":"Billy Lowe","avatar":"https://randomuser.me/api/portraits/men/54.jpg"},{"name":"Jamie Franklin","avatar":"https://randomuser.me/api/portraits/men/57.jpg"},{"name":"Noah Côté","avatar":"https://randomuser.me/api/portraits/men/17.jpg"},{"name":"Maria Mckinney","avatar":"https://randomuser.me/api/portraits/women/6.jpg"},{"name":"Leo Ross","avatar":"https://randomuser.me/api/portraits/men/3.jpg"},{"name":"Liam Schmidt","avatar":"https://randomuser.me/api/portraits/men/10.jpg"},{"name":"Maya Ross","avatar":"https://randomuser.me/api/portraits/women/66.jpg"},{"name":"Donald Hill","avatar":"https://randomuser.me/api/portraits/men/32.jpg"},{"name":"Amy Lam","avatar":"https://randomuser.me/api/portraits/women/45.jpg"},{"name":"Gabe Meyer","avatar":"https://randomuser.me/api/portraits/men/83.jpg"},{"name":"Marie Diaz","avatar":"https://randomuser.me/api/portraits/women/87.jpg"},{"name":"Zoe Kowalski","avatar":"https://randomuser.me/api/portraits/women/15.jpg"}];
    const niches = ['Finance & Options', 'E-Commerce Arbitrage', 'Real Estate Wholesaling', 'Digital Wellness', 'B2B SaaS Subscriptions', 'Fitness Coaching', 'Web3 & Crypto', 'High-Ticket Sales', 'Personal Brand Monetization'];
    
    let currentIdIndex = this.data.marketers.length + 1;
    let poolIndex = 0;

    while (this.data.marketers.length < 120 && poolIndex < pool.length) {
      const p = pool[poolIndex++];
      const niche = niches[Math.floor(Math.random() * niches.length)];
      
      const revenue = Math.floor(Math.random() * 900000) + 100000;
      const monthlyReturn = (Math.random() * 20 + 5).toFixed(1);
      
      this.data.marketers.push({
        id: `m${currentIdIndex++}`,
        name: p.name,
        avatar: p.avatar,
        niche: niche,
        revenue: revenue,
        monthlyReturn: parseFloat(monthlyReturn),
        followers: Math.floor(Math.random() * 100000) + 5000,
        rating: (Math.random() * 1 + 4).toFixed(1),
        minDeposit: 500,
        winRate: Math.floor(Math.random() * 20) + 70,
        totalTrades: Math.floor(Math.random() * 2000) + 100,
        profitFactor: 2.0,
        sharpeRatio: 1.5,
        maxDrawdown: 10.0,
        yearsExperience: Math.floor(Math.random() * 10) + 5,
        verified: Math.random() > 0.3,
        premium: false,
        location: 'USA',
        joinedDate: '2021-01-01',
        bio: 'Experienced affiliate marketer.',
        strategy: 'Diversified traffic.',
        growth: []
      });
    }
    this.save();
  }

  simulatePayouts() {
    let changed = false;
    (this.data.mirrored || []).forEach(m => {
      if (m.status === 'active') {
        const marketer = this.getMarketerById(m.marketerId);
        const user = this.getUserById(m.userId);
        if (marketer && user) {
          // Add micro payout
          const dailyReturn = (marketer.monthlyReturn / 30 / 24 / 60 / 6) // micro tick
          const profit = m.deposit * (dailyReturn / 100) * m.multiplier
          user.balance += profit;
          changed = true;
        }
      }
    });
    if (changed) {
      this.save()
    }
  }

}

export const db = new Database()
