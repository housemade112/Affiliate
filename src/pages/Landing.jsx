import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { getAllAffiliates } from '../data/affiliates.js'
import { formatCurrency, formatNumber } from '../lib/utils.js'
import { 
  Zap, ArrowRight, Users, TrendingUp, Shield, Sparkles, 
  Copy, Star, CheckCircle2, BarChart3, Wallet, Globe,
  Heart, MessageCircle, Share2, ShoppingBag
} from 'lucide-react'
import { useEffect, useState } from 'react'

function AnimatedCounter({ end, duration = 2000, prefix = '', suffix = '' }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = 0
    const step = end / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= end) { setCount(end); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [end, duration])
  return <span>{prefix}{count.toLocaleString()}{suffix}</span>
}

export default function Landing() {
  const { user } = useAuth()
  const affiliates = getAllAffiliates()
  const top3 = [...affiliates].sort((a, b) => b.revenue - a.revenue).slice(0, 3)
  const totalRevenue = affiliates.reduce((s, a) => s + a.revenue, 0)

  return (
    <div className="min-h-screen bg-slate-950">
      {/* HERO */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>AI-Powered Affiliate Mirroring</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
                Mirror Top<br />
                <span className="gradient-text font-display">Affiliate</span><br />
                Marketers
              </h1>

              <p className="text-xl text-slate-400 max-w-lg leading-relaxed">
                Discover proven mompreneurs and creators earning 6-figures. Our AI matches you with their winning product portfolios and content strategies.
              </p>

              <div className="flex flex-wrap gap-4">
                {user ? (
                  <Link to="/dashboard" className="btn-amber flex items-center gap-2 text-lg px-8 py-4">
                    Go to Dashboard <ArrowRight className="w-5 h-5" />
                  </Link>
                ) : (
                  <>
                    <Link to="/signup" className="btn-amber flex items-center gap-2 text-lg px-8 py-4">
                      Start Mirroring Free <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link to="/marketers" className="btn-secondary flex items-center gap-2 text-lg px-8 py-4">
                      Browse Marketers
                    </Link>
                  </>
                )}
              </div>

              <div className="flex items-center gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>No hidden fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Cancel anytime</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Instant setup</span>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative z-10 space-y-4 animate-float">
                {top3.map((aff, i) => (
                  <div key={aff.id} className={`glass-card p-5 flex items-center gap-4 ${i === 1 ? 'ml-8' : ''} ${i === 2 ? 'ml-4' : ''}`}>
                    <div className={`w-12 h-12 rounded-xl ${aff.avatarColor} flex items-center justify-center text-white font-bold`}>
                      {aff.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">{aff.name}</span>
                        {aff.verified && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                      </div>
                      <p className="text-xs text-slate-400">{aff.niche}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-emerald-400">+{aff.monthlyReturn}%</p>
                      <p className="text-xs text-slate-500">{formatCurrency(aff.revenue)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-violet-500/20 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white"><AnimatedCounter end={120} suffix="+" /></p>
              <p className="text-sm text-slate-400 mt-1">Top Marketers</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white"><AnimatedCounter end={50000} suffix="+" /></p>
              <p className="text-sm text-slate-400 mt-1">Active Users</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white">$<AnimatedCounter end={294} suffix="M+" /></p>
              <p className="text-sm text-slate-400 mt-1">Revenue Mirrored</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white"><AnimatedCounter end={99} suffix="%" /></p>
              <p className="text-sm text-slate-400 mt-1">Uptime</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">How MirrorMarket Works</h2>
            <p className="section-subtitle mx-auto">Start earning like top affiliates in three simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Users, title: 'Discover', desc: 'Browse our curated directory of 120+ verified affiliate marketers across every niche from parenting to tech.', color: 'bg-violet-500' },
              { icon: Copy, title: 'Mirror', desc: 'Select marketers whose strategy matches your goals. Our AI clones their product lineup and content cadence to your account.', color: 'bg-rose-500' },
              { icon: TrendingUp, title: 'Earn', desc: 'Watch your earnings grow. You keep 75% of profits. 10% goes to the original marketer, 15% to platform fees.', color: 'bg-amber-500' },
            ].map((step, i) => (
              <div key={i} className="glass-card-hover p-8 text-center group">
                <div className={`w-14 h-14 ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  <step.icon className="w-7 h-7 text-white" />
                </div>
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 text-sm font-bold text-white">
                  {i + 1}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI FEATURES */}
      <section className="py-24 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 text-violet-400 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" /> AI-Powered
              </div>
              <h2 className="section-title">Built for Serious<br />Affiliate Earners</h2>
              <p className="section-subtitle mt-4">Every feature designed to give you an edge in the creator economy.</p>

              <div className="mt-10 space-y-6">
                {[
                  { icon: Sparkles, title: 'Smart Matching Engine', desc: 'Our AI analyzes your niche, budget, and goals to recommend the perfect marketers to mirror.' },
                  { icon: Shield, title: 'Verified Performance', desc: 'Every marketer is vetted. Revenue figures are verified. No fake gurus allowed.' },
                  { icon: BarChart3, title: 'Real-Time Analytics', desc: 'Track clicks, conversions, and earnings as they happen. See exactly what is working.' },
                  { icon: Wallet, title: 'Transparent Splits', desc: '75% to you, 10% to the marketer, 15% platform fee. No surprises. Ever.' },
                ].map((feat, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                      <feat.icon className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{feat.title}</h4>
                      <p className="text-sm text-slate-400 mt-1">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="glass-card p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-400">Your Earnings This Month</span>
                  <span className="text-sm font-bold text-emerald-400">+$3,247.50</span>
                </div>
                <div className="h-48 bg-slate-900/50 rounded-xl flex items-end justify-around px-4 pb-4">
                  {[30, 45, 35, 60, 50, 80, 65, 95, 75, 100].map((h, i) => (
                    <div key={i} className="w-6 bg-gradient-to-t from-violet-500 to-violet-400 rounded-t" style={{ height: `${h}%`, opacity: 0.3 + (i * 0.07) }} />
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-white/5 rounded-lg text-center">
                    <p className="text-lg font-bold text-white">$12,450</p>
                    <p className="text-xs text-slate-400">Invested</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg text-center">
                    <p className="text-lg font-bold text-emerald-400">+$3,080</p>
                    <p className="text-xs text-slate-400">Profit</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg text-center">
                    <p className="text-lg font-bold text-white">8</p>
                    <p className="text-xs text-slate-400">Mirrored</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-500/20 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* TOP MARKETERS */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="section-title">Top Performing Marketers</h2>
              <p className="section-subtitle mt-2">Verified professionals with proven track records</p>
            </div>
            <Link to="/marketers" className="hidden md:flex items-center gap-2 text-violet-400 hover:text-violet-300 font-medium transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {top3.map((aff, i) => (
              <div key={aff.id} className="glass-card-hover p-6 group cursor-pointer">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-2xl ${aff.avatarColor} flex items-center justify-center text-white font-bold text-xl`}>
                    {aff.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white text-lg">{aff.name}</span>
                      {aff.verified && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    </div>
                    <p className="text-sm text-slate-400">{aff.niche}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-3 bg-white/5 rounded-lg">
                    <p className="text-lg font-bold text-white">{formatCurrency(aff.revenue)}</p>
                    <p className="text-xs text-slate-400">Revenue</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <p className="text-lg font-bold text-emerald-400">+{aff.monthlyReturn}%</p>
                    <p className="text-xs text-slate-400">Monthly</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="font-medium">{aff.rating}</span>
                  </div>
                  <span className="text-sm text-slate-400">{formatNumber(aff.followers)} followers</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link to="/marketers" className="btn-secondary inline-flex items-center gap-2">
              View All Marketers <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* NICHE SHOWCASE */}
      <section className="py-24 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Every Niche. Every Strategy.</h2>
            <p className="section-subtitle mx-auto mt-3">From mom bloggers to tech reviewers — find your perfect match</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Heart, label: 'Parenting & Family', count: '28 marketers' },
              { icon: ShoppingBag, label: 'Fashion & Beauty', count: '24 marketers' },
              { icon: Zap, label: 'Tech & Gadgets', count: '19 marketers' },
              { icon: BarChart3, label: 'Finance & Investing', count: '15 marketers' },
              { icon: Globe, label: 'Travel & Lifestyle', count: '12 marketers' },
              { icon: MessageCircle, label: 'Health & Wellness', count: '11 marketers' },
              { icon: Share2, label: 'Social Media', count: '9 marketers' },
              { icon: TrendingUp, label: 'Real Estate', count: '4 marketers' },
            ].map((niche, i) => (
              <div key={i} className="glass-card p-5 text-center hover:border-violet-500/20 transition-all cursor-pointer group">
                <niche.icon className="w-8 h-8 text-violet-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <p className="font-medium text-white text-sm">{niche.label}</p>
                <p className="text-xs text-slate-400 mt-1">{niche.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Trusted by Affiliate Earners Worldwide</h2>
            <p className="section-subtitle mx-auto mt-3">Join a community of creators who found their edge</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Chen', role: 'Mom Blogger', text: 'I went from $200/month to $4,500 in 90 days mirroring just 3 parenting marketers. The AI matching is scary accurate.' },
              { name: 'Marcus Johnson', role: 'Side Hustler', text: 'Finally a platform that treats affiliate marketing seriously. The revenue splits are transparent and the marketers are legit.' },
              { name: 'Elena Rodriguez', role: 'Fitness Creator', desc: 'I mirrored a wellness marketer and within a month I had my first $1K week. The content cadence cloning is genius.' },
            ].map((t, i) => (
              <div key={i} className="glass-card p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-slate-300 leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400 font-bold text-sm">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium text-white text-sm">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVENUE SPLIT */}
      <section className="py-24 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="section-title">Fair & Transparent Revenue Split</h2>
          <p className="section-subtitle mx-auto mt-3">You do the work, you keep the majority. Simple.</p>

          <div className="mt-12 grid grid-cols-3 gap-6">
            <div className="glass-card p-8">
              <p className="text-5xl font-bold text-emerald-400">75%</p>
              <p className="text-white font-medium mt-2">You Keep</p>
              <p className="text-sm text-slate-400 mt-1">Direct to your wallet</p>
            </div>
            <div className="glass-card p-8">
              <p className="text-5xl font-bold text-violet-400">10%</p>
              <p className="text-white font-medium mt-2">To Marketer</p>
              <p className="text-sm text-slate-400 mt-1">Their mirroring fee</p>
            </div>
            <div className="glass-card p-8">
              <p className="text-5xl font-bold text-rose-400">15%</p>
              <p className="text-white font-medium mt-2">Platform Fee</p>
              <p className="text-sm text-slate-400 mt-1">Operational costs</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Mirror<br />
            <span className="gradient-text">Top Marketers?</span>
          </h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Create your free account in 30 seconds. No credit card required.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {user ? (
              <Link to="/dashboard" className="btn-amber text-lg px-10 py-4">
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/signup" className="btn-amber text-lg px-10 py-4">
                  Create Free Account
                </Link>
                <Link to="/marketers" className="btn-secondary text-lg px-10 py-4">
                  Browse Marketers
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-rose-500 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold text-white">MirrorMarket</span>
              </div>
              <p className="text-sm text-slate-400 max-w-sm">
                The AI-powered affiliate mirroring platform. Connect with top marketers, clone their strategies, and grow your earnings.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/marketers" className="hover:text-white transition-colors">Browse Marketers</Link></li>
                <li><Link to="/leaderboard" className="hover:text-white transition-colors">Leaderboard</Link></li>
                <li><Link to="/wallet" className="hover:text-white transition-colors">Wallet</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><span className="hover:text-white transition-colors cursor-pointer">About</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Support</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Terms</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Privacy</span></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 text-center text-xs text-slate-500">
            <p>MirrorMarket. All rights reserved. All affiliate marketing involves risk. Past performance does not guarantee future results.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
