import { Link } from 'react-router-dom'
import { HeadphonesIcon, MessageSquare, Handshake, Lightbulb } from 'lucide-react'
import PublicNavbar from '../components/PublicNavbar.jsx'

export default function Contact() {
  return (
    <div className="bg-[#0A0D14] min-h-screen text-slate-300 font-sans selection:bg-[#C3F53C]/30 pt-24 pb-32">
      <PublicNavbar />

      {/* HEADER */}
      <div className="text-center pt-16 pb-20">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">Contact Us</h1>
        <div className="flex items-center justify-center gap-2 text-sm font-bold">
          <Link to="/" className="text-[#C3F53C] hover:text-white transition-colors">Home</Link>
          <span className="text-slate-500">/</span>
          <span className="text-slate-400">Contact</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* GET IN TOUCH SECTION (Centered without Map) */}
        <section className="max-w-2xl mx-auto">
          <div className="bg-[#131927] border border-white/5 rounded-3xl p-8 sm:p-12 shadow-2xl">
            <h2 className="text-2xl font-extrabold text-white mb-8">Get In Touch</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Your Name</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Enter you full name" 
                    className="w-full bg-[#0A0D14] border border-white/5 rounded-xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-[#C3F53C]/50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Your Email Address</label>
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="support@scalely.ai" 
                    className="w-full bg-[#0A0D14] border border-white/5 rounded-xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-[#C3F53C]/50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Enter Your Message</label>
                <div className="relative">
                  <textarea 
                    rows={4}
                    placeholder="Write here your details message" 
                    className="w-full bg-[#0A0D14] border border-white/5 rounded-xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-[#C3F53C]/50 transition-colors resize-none"
                  ></textarea>
                </div>
              </div>

              <button type="button" className="w-full btn-lime py-4 text-sm shadow-xl">
                Send Message
              </button>
            </form>
          </div>
        </section>

        {/* 4 SUPPORT CARDS */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#131927] border border-white/5 rounded-3xl p-8 text-center hover:-translate-y-1 transition-transform duration-300">
            <h3 className="text-lg font-bold text-white mb-4">Sales</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">Need help? Our support team is available to answer of 24x7</p>
            <Link to="#" className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-[#C3F53C] transition-colors">
              Talk To Us <span className="text-[#C3F53C]">&rarr;</span>
            </Link>
          </div>

          <div className="bg-[#131927] border border-white/5 rounded-3xl p-8 text-center hover:-translate-y-1 transition-transform duration-300">
            <h3 className="text-lg font-bold text-white mb-4">24X7 Support</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">Need help? Our support team is available to answer of 24x7<br/>support@scalely.ai<br/>info@scalely.ai</p>
            <Link to="#" className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-[#C3F53C] transition-colors">
              Talk To Us <span className="text-[#C3F53C]">&rarr;</span>
            </Link>
          </div>

          <div className="bg-[#131927] border border-white/5 rounded-3xl p-8 text-center hover:-translate-y-1 transition-transform duration-300">
            <h3 className="text-lg font-bold text-white mb-4">Partnership</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">Partner with us? Reach out and we'll explore all opportunities.</p>
            <Link to="#" className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-[#C3F53C] transition-colors">
              Talk To Us <span className="text-[#C3F53C]">&rarr;</span>
            </Link>
          </div>

          <div className="bg-[#131927] border border-white/5 rounded-3xl p-8 text-center hover:-translate-y-1 transition-transform duration-300">
            <h3 className="text-lg font-bold text-white mb-4">Request Demo</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">Have an out of the box idea for a new AI Demo to add.</p>
            <Link to="#" className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-[#C3F53C] transition-colors">
              Talk To Us <span className="text-[#C3F53C]">&rarr;</span>
            </Link>
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="bg-gradient-to-r from-[#004235] to-[#131927] border border-white/5 rounded-[40px] p-12 lg:p-20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <div className="relative z-10 space-y-8 max-w-sm text-center md:text-left">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">All set to be<br/>a partner?</h2>
            <Link to="/signup" className="btn-lime text-sm px-10 py-4 font-bold shadow-xl inline-block">
              Get Started Now
            </Link>
          </div>
          <div className="relative z-10 w-full max-w-md hidden md:block">
            {/* Abstract visual placeholder for the dashboard mockups in the screenshot */}
            <div className="relative">
              <div className="absolute -inset-4 bg-emerald-500/20 blur-3xl rounded-full" />
              <div className="bg-[#0A0D14] border border-white/10 rounded-2xl p-4 shadow-2xl relative">
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-rose-500/50" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-white/5 rounded-md w-3/4" />
                  <div className="h-4 bg-white/5 rounded-md w-full" />
                  <div className="h-4 bg-white/5 rounded-md w-5/6" />
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
      
      {/* FOOTER */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32 pt-16 border-t border-white/10 grid md:grid-cols-3 gap-12 text-sm text-slate-500">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-white">
            <div className="w-8 h-8 rounded-full bg-[#C3F53C] text-[#005645] flex items-center justify-center font-black text-sm">S</div>
            <span className="font-extrabold text-xl tracking-tight font-mono">scalely.ai</span>
          </div>
          <p className="leading-relaxed max-w-xs">
            Scalely.ai is a revolutionary platform that leverages Artificial Intelligence (AI) to simplify affiliate marketing. It offers AI-powered services for affiliate marketers to streamline marketing efforts.
          </p>
        </div>
        
        <div className="space-y-6">
          <h4 className="text-white font-bold tracking-wider uppercase text-xs">Company</h4>
          <div className="flex flex-col gap-4 font-medium text-slate-400">
            <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms and Condition</Link>
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
        
        <div className="space-y-6">
          <h4 className="text-white font-bold tracking-wider uppercase text-xs">News & Update</h4>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Enter Your Email" 
              className="bg-[#131927] border border-white/5 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none w-full"
            />
            <button className="btn-lime px-6 py-3 rounded-lg text-xs font-bold shadow-lg shrink-0">
              SUBSCRIBE
            </button>
          </div>
          <p className="text-xs leading-relaxed">
            Subscribe our newsletter for future updates, don't worry we don't spam your email address
          </p>
        </div>
        
        <div className="md:col-span-3 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium mt-8">
          <p>Scalely.ai © 2026. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-white transition-colors">Terms</Link>
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
