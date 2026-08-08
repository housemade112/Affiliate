import { Link } from 'react-router-dom'
import { Star, CheckCircle2, Layout, Zap, Users, ArrowRight } from 'lucide-react'
import PublicNavbar from '../components/PublicNavbar.jsx'

const PARTNERS = [
  { name: 'ClickBank', domain: 'clickbank.com' },
  { name: 'ShareASale', domain: 'shareasale.com' },
  { name: 'CJ Affiliate', domain: 'cj.com' },
  { name: 'Amazon', domain: 'amazon.com' },
  { name: 'Rakuten', domain: 'rakuten.com' },
  { name: 'Awin', domain: 'awin.com' },
  { name: 'Impact', domain: 'impact.com' },
  { name: 'MaxBounty', domain: 'maxbounty.com' },
  { name: 'Shopify', domain: 'shopify.com' },
  { name: 'HubSpot', domain: 'hubspot.com' },
  { name: 'Fiverr', domain: 'fiverr.com' },
  { name: 'Semrush', domain: 'semrush.com' }
]

export default function About() {
  return (
    <div className="bg-[#0A0D14] min-h-screen text-slate-300 font-sans selection:bg-[#C3F53C]/30 pt-24 pb-32">
      <PublicNavbar />
      
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
          <div className="absolute inset-0 bg-emerald-500/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <img 
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1000" 
            alt="Team Meeting" 
            className="w-full h-[400px] object-cover"
          />
        </div>
        
        <div className="space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-[#C3F53C]">
            <Star className="w-3.5 h-3.5 fill-[#C3F53C]" /> About Us
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
            Innovative<br />Empowering<br />Profitable
          </h1>
          <p className="text-lg text-slate-400 font-medium max-w-lg leading-relaxed">
            Scalely.ai was built by affiliates, for affiliates. We provide the infrastructure, data, and verified strategies you need to scale your commissions without the guesswork.
          </p>
          
          <div className="flex items-center gap-4 pt-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-slate-800 border-2 border-[#0A0D14] overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center text-amber-400 gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-sm font-bold text-white mt-0.5">4,800+ Trust Reviews</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. AI COPYWRITING / TOOLS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-32 text-left">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-8 tracking-tight">Generate AI Copywriting<br />Favorite Tools</h2>
        
        <div className="space-y-8 text-slate-400 font-medium leading-relaxed">
          <p>
            In the fast-paced world of digital marketing, content is king, but context is queen. At Scalely.ai, we don't just give you raw data; we equip you with proprietary AI copywriting models trained specifically on high-converting affiliate campaigns. 
          </p>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#C3F53C]" /> The Scalely Advantage
            </h3>
            <p>
              Our platform analyzes thousands of successful ad creatives, landing pages, and email sequences across top networks. It then generates personalized, compliance-checked copy that resonates with your specific target audience. Stop staring at a blank page and start deploying campaigns that convert.
            </p>
          </div>
          <p>
            Whether you are running native ads, pushing offers via organic social, or building automated email funnels, our toolset provides the heavy lifting. From angle generation to final hook-and-CTA optimization, Scalely's AI ensures your messaging hits the mark every single time.
          </p>
        </div>
      </section>

      {/* 3. AFFILIATE PARTNERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32 text-left">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-8 tracking-tight">Our Affiliate Partners</h2>
        <p className="text-slate-400 mb-10 max-w-3xl leading-relaxed">
          We integrate seamlessly with the world's largest and most lucrative affiliate networks. Our tracking engine pulls in real-time data from these partners so you can manage your entire portfolio from a single dashboard.
        </p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {PARTNERS.map(partner => (
            <div key={partner.name} className="flex flex-col items-center justify-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center p-1.5 shadow-lg">
                <img src={`https://logo.clearbit.com/${partner.domain}`} alt={partner.name} className="w-full h-full object-contain" onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=' + partner.name + '&background=random' }} />
              </div>
              <span className="text-sm font-bold text-slate-300 text-center">{partner.name}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-10 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-200 text-sm font-medium">
          Note: All trademarks, logos and brand names are the property of their respective owners. We are an independent tracking and analytics platform.
        </div>
      </section>

      {/* 4. REFERRAL PROGRAM */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-32 text-left">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-8 tracking-tight">Referral Program</h2>
        
        <div className="space-y-12">
          <div>
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#C3F53C]" /> Earn While You Network
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Invite other marketers to Scalely.ai and earn a recurring percentage of their platform fees. Our referral program is designed to reward you for bringing high-quality traffic and dedicated affiliates into our ecosystem.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#C3F53C]" /> Lifetime Revenue Share
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Unlike standard CPA models, our referral program pays out a 15% lifetime revenue share. As long as your referred partner remains active and profitable on the platform, you continue to receive monthly deposits directly to your Scalely wallet.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#C3F53C]" /> Automated Tracking & Payouts
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Every referral click is cookied for 90 days. Once they sign up, they are hardcoded to your account. Payouts are calculated automatically and distributed via smart contracts on the 1st of every month without any manual invoicing required.
            </p>
          </div>
        </div>
      </section>

      {/* 5. SOCIAL PROOF & CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-slate-300 mb-6">
          <Users className="w-3.5 h-3.5" /> Community
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
          Trusted by 5,000+ affiliate companies<br />agencies 1500+ <span className="text-[#C3F53C]">5-star ratings.</span>
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mb-16">
          <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
            <img src="https://logo.clearbit.com/trustpilot.com" className="w-8 h-8 rounded-full" alt="Trustpilot" />
            <span className="text-white font-bold text-lg">Trustpilot</span>
          </div>
          <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
            <img src="https://logo.clearbit.com/g2.com" className="w-8 h-8 rounded-lg" alt="G2" />
            <span className="text-white font-bold text-lg">G2</span>
          </div>
          <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
            <img src="https://logo.clearbit.com/capterra.com" className="w-8 h-8 rounded-lg" alt="Capterra" />
            <span className="text-white font-bold text-lg">Capterra</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 text-left">
          <div className="bg-[#131927] border border-white/5 p-8 rounded-3xl hover:-translate-y-1 transition-transform duration-300">
            <h3 className="text-lg font-bold text-white mb-3">Real-Time Sync</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Connect your network APIs once. Our system ingests postbacks and pixel fires instantly, ensuring your dashboard is never out of date. Stop refreshing ten different tabs.
            </p>
            <div className="bg-[#0A0D14] rounded-xl p-4 border border-white/5 flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-400">STATUS: 200 OK</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </div>
          
          <div className="bg-[#131927] border border-white/5 p-8 rounded-3xl hover:-translate-y-1 transition-transform duration-300">
            <h3 className="text-lg font-bold text-white mb-3">Audience Insights</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Discover exactly who is buying. We aggregate demographic, geographic, and device data across all your campaigns to build the perfect buyer persona.
            </p>
            <div className="bg-[#0A0D14] rounded-xl p-4 border border-white/5 flex items-end gap-2 h-16">
              <div className="w-full bg-emerald-500/20 rounded-t-sm h-[40%]" />
              <div className="w-full bg-emerald-500/50 rounded-t-sm h-[70%]" />
              <div className="w-full bg-[#C3F53C] rounded-t-sm h-[100%]" />
            </div>
          </div>

          <div className="bg-[#131927] border border-white/5 p-8 rounded-3xl hover:-translate-y-1 transition-transform duration-300 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-3">Smart Alerts</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Set custom rules. Get notified via Slack, SMS, or Email the second an offer drops in EPC or a campaign hits your target ROI.
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <Link to="/signup" className="inline-flex items-center gap-2 text-sm font-bold text-[#C3F53C] hover:text-white transition-colors">
                Start Free Trial <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium text-slate-500">
        <div className="flex items-center gap-2 text-white">
          <div className="w-6 h-6 rounded bg-[#C3F53C] text-[#005645] flex items-center justify-center font-black text-xs">S</div>
          <span className="font-bold tracking-tight">Scalely.ai</span>
        </div>
        <div className="flex gap-6">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <Link to="/about" className="hover:text-white transition-colors text-white">About</Link>
          <Link to="/login" className="hover:text-white transition-colors">Platform</Link>
        </div>
        <p>© 2026 Scalely.ai. All rights reserved.</p>
      </footer>
    </div>
  )
}
