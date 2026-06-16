export default function GlassCard({ children, className = '', hover = true }) {
  return (
    <div
      className={`
        bg-white/60 backdrop-blur-xl border border-[#1C1714]/10 rounded-2xl shadow-sm
        ${hover ? 'transition-all duration-300 hover:-translate-y-2 hover:border-orange-500/40 hover:shadow-[0_8px_30px_rgba(255,106,28,0.12)]' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
