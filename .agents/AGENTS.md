# Scalely.ai (Realize.affiliates) Design System & Architecture Rules

## 1. Strict Dark Mode Compliance
- **No `bg-white` cards or containers**. All dashboard, directory, dossier, modal, and inner layout surfaces must use sleek dark surfaces (`bg-neutral-900`, `bg-neutral-950`, `bg-slate-950`).
- **Subtle borders**: Use clean, 1px dark borders (`border border-neutral-800` or `border-slate-800`).

## 2. Color Palette Cohesion
- **Backgrounds**: Deep Charcoal & Pure Dark (`#0A0A0A`, `bg-neutral-900`, `bg-neutral-950`).
- **Primary Brand Accent**: Electric Lime (`#C3F53C`) and Deep Emerald (`#005645`) for active pills, positive yields, and main action buttons.
- **Typography Hierarchy**: Crisp white headers (`text-white font-extrabold`), light gray subheadings (`text-slate-300`), and muted monospace labels (`text-slate-400 uppercase font-mono text-xs`).
- **Zero Color Clashing**: No random magenta pills, erratic purple sliders, or raw un-themed red alerts without proper contrast context.

## 3. High Information Density & Hierarchy
- Group financial metrics into clear, distinct card containers.
- Standardized metric label format: `text-xs font-mono font-bold text-slate-400 uppercase tracking-wider`.
- Standardized primary figures: `text-2xl font-black font-mono text-white` (or `#C3F53C` / `text-emerald-400` for yields).

## 4. Execution Workflow
- Analyze visual hierarchy and layout requirements first.
- Write production-ready Tailwind CSS without shortcuts or generic templates.
