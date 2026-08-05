# PROJECT STATE

## Project Overview
**Name**: Scalely.ai / AI Automated Affiliate Marketing Platform  
**Domain**: Performance Advertising & AI Affiliate Automation Platform  
**Tech Stack**: React 18, Vite, React Router v6, Tailwind CSS, Lucide React, Express (Node.js)

## 21st.dev Design System & Dashboard Overhaul
1. **21st.dev / Magic UI Dashboard Redesign (`Dashboard.jsx`)**:
   - High-density dark terminal header (`bg-gradient-to-br from-[#005645] via-[#004235] to-[#002821] rounded-3xl p-8 shadow-2xl`).
   - 21st.dev glassmorphic stat widgets (`bg-neutral-900/90 backdrop-blur-xl border border-neutral-800 rounded-3xl`).
   - Interactive capital allocation ratio progress bar and active copied partners feed.
   - Top revenue earners leaderboard sidebar widget with rank badges (`#1`, `#2`, `#3`) and instant copy triggers.
2. **User Navbar Cleanup (`Navbar.jsx`)**:
   - Removed `Admin Panel` from the public user navbar menu to keep user UI clean.
   - Admin Console remains restricted to direct URL route `/admin`.
3. **Diverse Real Photo Avatars (`affiliates.js`)**:
   - Expanded avatar dataset to 60+ high-resolution portrait URLs across 120+ profiles for maximum visual variety and real photo representation.

## Active Architecture
```
copytrade-platform/
├── .agents/
│   └── AGENTS.md        # Workspace Design System & Architecture Guidelines
├── PROJECT_STATE.md      # State & Context Tracking File
├── package.json
├── vite.config.js
├── tailwind.config.js
├── server/
│   ├── index.js          # Express server backend (Port 3001)
│   ├── db.js             # DB helper / storage
│   └── data.json         # Mock database
├── src/
│   ├── App.jsx           # App routes & provider wraps
│   ├── index.css         # Scalely.ai CSS design system & tokens
│   ├── components/
│   │   ├── Navbar.jsx    # Clean user header (Admin link restricted to /admin route)
│   │   ├── Layout.jsx    # Pure dark background container (#0A0A0A)
│   │   ├── ProtectedRoute.jsx
│   │   ├── StatCard.jsx
│   │   ├── CandlestickChart.jsx # Performance chart with timeframe filters & metrics strip
│   │   ├── MirrorModal.jsx  # Institutional-Grade Copy Allocation Modal
│   │   └── WalletModal.jsx
│   ├── context/
│   │   ├── AuthContext.jsx # Instant demo user session & one-click auth
│   │   └── ToastContext.jsx
│   ├── data/
│   │   └── affiliates.js # Generator for 120+ profiles with 60+ diverse real photo URLs
│   ├── lib/
│   │   ├── api.js        # API utilities
│   │   └── utils.js      # Formatter helpers
│   └── pages/
│       ├── Landing.jsx   # Scalely.ai Brand Copy & High-Contrast Mission Terminal Section
│       ├── Login.jsx     # Dark Terminal Sign In page with Instant Demo Access
│       ├── Signup.jsx    # Dark Terminal Registration page with Instant Demo Access
│       ├── Dashboard.jsx # 21st.dev / Magic UI Ultra-Modern Terminal Dashboard
│       ├── Marketers.jsx # Dark-mode partner directory with real photos & product tags
│       ├── MarketerDetail.jsx # Dossier with photo avatar, 10%/15% revenue split, and charts
│       ├── Leaderboard.jsx # Enterprise rankings
│       ├── Wallet.jsx    # Funds & transaction ledger
│       └── Admin.jsx     # Administrative Console (Restricted to /admin)
```

## Immediate Status
- Overhauled `Dashboard.jsx` to 21st.dev / Magic UI standards.
- Removed Admin link from user navbar (accessible at `/admin`).
- Production build verified with 0 errors.
- Dev server running on `http://localhost:5173/` and Express API on `http://localhost:3001`.
