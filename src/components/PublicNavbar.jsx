import { Link } from 'react-router-dom'

export default function PublicNavbar() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-white hover:opacity-90 transition-opacity">
          <div className="w-8 h-8 rounded-full bg-[#C3F53C] text-[#005645] flex items-center justify-center font-black text-sm">S</div>
          <span className="font-extrabold text-xl tracking-tight font-mono">scalely.ai</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-bold text-white/70">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
          <Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link>
          <Link to="/login" className="hover:text-white transition-colors">Platform</Link>
        </div>
        <Link to="/login" className="text-sm font-bold text-[#C3F53C] hover:text-white transition-colors">Sign In</Link>
      </div>
    </nav>
  )
}
