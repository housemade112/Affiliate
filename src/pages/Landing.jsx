import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { getAllAffiliates } from '../data/affiliates.js'
import { 
  ArrowRight, Users, TrendingUp, ShieldCheck, 
  CheckCircle2, BarChart3, Wallet, Activity, ArrowUpRight, Award, Zap, Globe, Layers, Cpu,
  Sparkles, Target, LineChart, PlayCircle, ArrowDown, Sliders, Check, Lock, ChevronRight
} from 'lucide-react'
import { useEffect, useState } from 'react'

// Real brand logos with authentic brand colors
const BRAND_LOGOS = [
  { name: 'Shopify',   logo: 'https://cdn.simpleicons.org/shopify/95BF47' },
  { name: 'HubSpot',  logo: 'https://cdn.simpleicons.org/hubspot/FF7A59' },
  { name: 'Stripe',   logo: 'https://cdn.simpleicons.org/stripe/635BFF' },
  { name: 'Notion',   logo: 'https://cdn.simpleicons.org/notion/000000' },
  { name: 'Airbnb',   logo: 'https://cdn.simpleicons.org/airbnb/FF5A5F' },
  { name: 'Slack',    logo: 'https://cdn.simpleicons.org/slack/4A154B' },
  { name: 'Nike',     logo: 'https://cdn.simpleicons.org/nike/111111' },
  { name: 'Amazon',   logo: 'https://cdn.simpleicons.org/amazon/FF9900' },
  { name: 'Figma',    logo: 'https://cdn.simpleicons.org/figma/F24E1E' },
  { name: 'Atlassian',logo: 'https://cdn.simpleicons.org/atlassian/0052CC' },
  { name: 'Canva',    logo: 'https://cdn.simpleicons.org/canva/00C4CC' },
]

const WHY_CARDS = [
  {
    icon: Users,
    title: 'We connect real buyers to real earners',
    body: "We built Scalely.ai after watching too many talented affiliates burn out chasing cold traffic. We fixed that by putting your strategy in front of audiences that actually convert.",
  },
  {
    icon: BarChart3,
    title: 'Performance you can actually see',
    body: "Every click, conversion, and dollar is tracked transparently in your personal dashboard. No black-box algorithms. No hidden fees. Just honest numbers.",
  },
  {
    icon: Sparkles,
    title: 'AI that does the heavy lifting',
    body: "Our AI was trained on millions of affiliate campaigns. It knows which creatives work, which audiences buy, and when to push harder so you never have to guess.",
  },
  {
    icon: Sliders,
    title: 'Built for scale, not just starters',
    body: "Whether you're earning your first $1,000 a month or managing a seven-figure portfolio, Scalely.ai grows with you. One platform, unlimited ceiling.",
  },
]

const STEPS = [
  {
    step: '01',
    icon: Layers,
    headline: 'Create your free account',
    body: 'Sign up in under two minutes. No credit card required. Select your niche and goals, and we handle the rest.',
  },
  {
    step: '02',
    icon: Globe,
    headline: 'Copy a top-performing partner',
    body: 'Browse our verified directory of high-Profit affiliates. Pick one you like, allocate your capital, and let their strategy run on autopilot for you.',
  },
  {
    step: '03',
    icon: TrendingUp,
    headline: 'Watch your revenue grow',
    body: 'Track live performance, adjust allocations any time, and withdraw earnings whenever you want. It really is that simple.',
  },
]

export default function Landing() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById('why-scalely-section')
      if (el) {
        const rect = el.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height * 0.5)))
        setScrollProgress(progress)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const leftTranslate  = (1 - scrollProgress) * -80
  const rightTranslate = (1 - scrollProgress) * 80

  // Duplicate logos for seamless loop
  const loopLogos = [...BRAND_LOGOS, ...BRAND_LOGOS]

  return (
    <div className="min-h-screen bg-[#EFF2F0] text-slate-900 font-sans">

      {/* ── HERO: DARK EMERALD ARCH ── */}
      <section className="realize-hero pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-7">

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
            Performance Advertising Built for<br className="hidden sm:block" />
            <span className="badge-pink-pill mt-2 inline-block">Affiliates</span>
          </h1>

          <p className="mx-auto text-base sm:text-lg text-[#D1F0E6] max-w-2xl font-normal leading-relaxed">
            Drive affiliate sales through performance marketing built to scale. Stop wasting thousands on manual courses. Our AI handles offer selection, ad creatives, and daily payouts.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/signup"
              className="btn-lime text-base px-10 py-4 font-extrabold shadow-xl w-full sm:w-auto text-center"
            >
              Create Account
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full border-2 border-white/30 text-white font-bold text-base hover:bg-white/10 transition-all w-full sm:w-auto"
            >
              Sign In <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <p className="text-xs text-emerald-300/70 pt-2">
            No credit card required · Join 14,000+ affiliates already earning
          </p>

        </div>
      </section>

      {/* ── BRAND TRUST TICKER (FULL COLOR LOGOS) ── */}
      <section className="py-12 bg-white border-y border-slate-200/80 overflow-hidden">
        <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-8 font-mono">
          Trusted by brands scaling on Scalely.ai
        </p>
        <div className="relative flex w-full overflow-hidden" aria-hidden="true">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

          <div className="flex gap-16 items-center animate-marquee whitespace-nowrap">
            {loopLogos.map((brand, i) => (
              <div
                key={`${brand.name}-${i}`}
                className="flex items-center gap-3 flex-shrink-0 hover:scale-105 transition-all duration-300"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-8 w-8 rounded-lg object-contain shadow-sm"
                  loading="lazy"
                  onError={(e) => { e.target.style.display = 'none' }}
                />
                <span className="text-base font-black text-slate-800 tracking-tight">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            From zero to earning<br />
            <span className="text-[#005645]">in three steps</span>
          </h2>
          <p className="text-slate-500 text-base leading-relaxed">
            We stripped out the complexity so you can focus on what matters: growing your income.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {STEPS.map((step) => (
            <div
              key={step.step}
              className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col gap-6"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#005645] text-[#C3F53C] font-black text-lg flex items-center justify-center shadow-md">
                  {step.step}
                </div>
                <step.icon className="w-8 h-8 text-slate-300" />
              </div>
              <div className="space-y-2 text-left">
                <h3 className="text-xl font-extrabold text-slate-900 leading-snug">{step.headline}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/signup" className="btn-lime inline-flex text-sm px-10 py-4 font-extrabold shadow-xl gap-2">
            Get Started Free <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── SOCIAL PROOF STATS BAR ── */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#005645] rounded-[40px] p-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-white text-center">
          {[
            { value: '$214M+', label: 'Paid out to affiliates' },
            { value: '14,000+', label: 'Active earners on platform' },
            { value: '91%',    label: 'Average partner win rate' },
            { value: '< 48h',  label: 'Time to first payout' },
          ].map((stat) => (
            <div key={stat.label} className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-[#C3F53C] font-mono">{stat.value}</p>
              <p className="text-sm text-emerald-200/80 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY SCALELY? REALIZE.COM EXACT RADIAL GLOW CIRCLE CARDS ── */}
      <section id="why-scalely-section" className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="text-center mb-12 space-y-3">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Why Scalely?
          </h2>
          <p className="text-slate-500 text-base max-w-xl mx-auto leading-relaxed">
            We're not another ad platform. We built Scalely.ai to solve the exact problems we saw real affiliates struggling with every day.
          </p>
        </div>

        {/* 2x2 Clustered Radial Glowing Circles */}
        <div className="grid md:grid-cols-2 gap-6 items-center justify-center">
          {WHY_CARDS.map((card, idx) => {
            const isLeft = idx % 2 === 0
            return (
              <div
                key={card.title}
                className="realize-circle-animated"
                style={{
                  transform: `translateX(${isLeft ? leftTranslate * 0.4 : rightTranslate * 0.4}px)`,
                  transition: 'transform 0.4s ease-out',
                }}
              >
                <div className="w-12 h-12 rounded-full bg-[#005645] text-white flex items-center justify-center mb-4 shadow-sm">
                  <card.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-2 max-w-[260px] leading-snug">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed max-w-[280px]">
                  {card.body}
                </p>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Link to="/signup" className="btn-pink inline-flex text-sm px-10 py-4 font-extrabold shadow-xl">
            Create Account
          </Link>
        </div>
      </section>

      {/* ── WHO WE ARE / MISSION (REDESIGNED INSTITUTIONAL DARK TEAL CARD) ── */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#005645] rounded-[48px] p-8 sm:p-14 border border-emerald-800/60 shadow-2xl relative overflow-hidden text-white grid lg:grid-cols-12 gap-10 items-center">
          
          {/* Subtle Glow Orb */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#C3F53C]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Left Column: Mission Story */}
          <div className="lg:col-span-7 space-y-6 text-left relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C3F53C]/15 border border-[#C3F53C]/30 text-[#C3F53C] text-xs font-bold font-mono">
              <Sparkles className="w-3.5 h-3.5 text-[#C3F53C]" />
              OUR MISSION & PURPOSE
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              We built this because<br />
              <span className="text-[#C3F53C]">affiliates deserved better.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#D1F0E6] leading-relaxed">
              The affiliate industry was broken with opaque earnings, inconsistent payouts, and a market dominated by whoever had the biggest ad budget. We built Scalely.ai to flip that script.
            </p>

            <p className="text-sm sm:text-base text-[#D1F0E6] leading-relaxed">
              Our platform gives every affiliate, from first-timers to seasoned pros, direct access to copy proven strategies from verified top earners, backed by audited data and real-time execution tracking.
            </p>

            <div className="pt-2">
              <Link to="/signup" className="btn-lime inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold px-8 py-4 shadow-xl">
                Start Earning With Us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: High-Density Metric Terminal Cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 relative z-10">
            <div className="bg-[#004235] border border-emerald-700/60 p-6 rounded-2xl space-y-2 text-left shadow-md hover:border-[#C3F53C]/50 transition-all">
              <span className="text-[11px] font-bold font-mono text-emerald-300/70 uppercase tracking-wider block">FOUNDED</span>
              <p className="text-2xl font-black text-white font-mono">2022</p>
              <p className="text-xs text-emerald-200/80 font-medium">Born from frustration</p>
            </div>

            <div className="bg-[#004235] border border-emerald-700/60 p-6 rounded-2xl space-y-2 text-left shadow-md hover:border-[#C3F53C]/50 transition-all">
              <span className="text-[11px] font-bold font-mono text-emerald-300/70 uppercase tracking-wider block">AFFILIATES</span>
              <p className="text-2xl font-black text-[#C3F53C] font-mono">14K+</p>
              <p className="text-xs text-emerald-200/80 font-medium">↑ Verified active earners</p>
            </div>

            <div className="bg-[#004235] border border-emerald-700/60 p-6 rounded-2xl space-y-2 text-left shadow-md hover:border-[#C3F53C]/50 transition-all">
              <span className="text-[11px] font-bold font-mono text-emerald-300/70 uppercase tracking-wider block">AVG MONTHLY RETURN</span>
              <p className="text-2xl font-black text-[#C3F53C] font-mono">22.4%</p>
              <p className="text-xs text-emerald-200/80 font-medium">Audited partner Profit</p>
            </div>

            <div className="bg-[#004235] border border-emerald-700/60 p-6 rounded-2xl space-y-2 text-left shadow-md hover:border-[#C3F53C]/50 transition-all">
              <span className="text-[11px] font-bold font-mono text-emerald-300/70 uppercase tracking-wider block">TOTAL PAID OUT</span>
              <p className="text-2xl font-black text-white font-mono">$214M+</p>
              <p className="text-xs text-emerald-200/80 font-medium">100% On-time payouts</p>
            </div>
          </div>

        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section className="bg-[#005645] rounded-t-[48px] sm:rounded-t-[64px] text-white pt-20 pb-12 mt-16 shadow-2xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">

          <div className="space-y-6">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-tight">
              Your best-performing affiliate quarter starts right now.
            </h2>
            <p className="text-emerald-200/80 text-base max-w-xl mx-auto">
              Join thousands of affiliates already using Scalely.ai to copy elite strategies and earn on autopilot.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup" className="btn-lime text-sm px-10 py-4 font-bold shadow-xl w-full sm:w-auto text-center">
                Create Free Account
              </Link>
              <Link to="/login" className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full border-2 border-white/30 text-white font-bold text-sm hover:bg-white/10 transition-all w-full sm:w-auto">
                Sign In <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="border-t border-emerald-800/80 pt-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-emerald-200">

              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#C3F53C] text-[#005645] flex items-center justify-center font-bold text-sm">
                  S
                </div>
                <span className="font-extrabold text-xl tracking-tight text-white font-mono">scalely.ai</span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 font-medium text-emerald-100/80">
                <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#cookie"  className="hover:text-white transition-colors">Cookie Policy</a>
                <a href="#terms"   className="hover:text-white transition-colors">Terms of Use</a>
                <a href="#optout"  className="hover:text-white transition-colors">Opt Out</a>
              </div>

              <span className="text-emerald-300/60 font-mono text-xs">© 2025 Scalely.ai · All rights reserved</span>

            </div>
          </div>

        </div>
      </section>

    </div>
  )
}
