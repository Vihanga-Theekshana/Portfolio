export default function GlassCard({ children, className = '', hover = true }) {
  return (
    <div
      className={`
        bg-white/80 backdrop-blur-xl border border-black/5 rounded-2xl shadow-sm
        ${hover ? 'transition-all duration-300 hover:-translate-y-2 hover:border-orange-500/35 hover:shadow-[0_8px_30px_rgba(255,106,28,0.12)]' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
