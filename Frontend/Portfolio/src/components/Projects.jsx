import { motion } from 'framer-motion';
import { CodeBracketIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

export default function Projects({ projects, onProjectClick }) {
  return (
    <section id="projects" className="py-32 px-6 bg-[#18181C] scroll-mt-20">
      <div className="max-w-6xl mx-auto">

        <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}>
          <p className="text-xs tracking-[0.2em] uppercase text-orange-500 mb-3">My Work</p>
          <h2 className="font-['Lilita_One',sans-serif] text-4xl md:text-5xl font-normal text-[#E5E5E7]">Featured Projects</h2>
          <div className="w-14 h-0.5 mt-2.5 mb-4 bg-gradient-to-r from-orange-500 to-transparent rounded" />
          <p className="text-white/45 text-sm mb-14 max-w-lg">A curated selection demonstrating my range across full-stack development, design, and problem-solving.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div key={p.id}
              onClick={() => onProjectClick(p.id)}
              className="group flex flex-col rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(255,106,28,0.15)] hover:border-orange-500/40 cursor-pointer"
            >
              <div className="h-36 flex items-center justify-center text-5xl relative overflow-hidden bg-gradient-to-br from-orange-500/8 to-[#0E0E10]/60 border-b border-white/5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,106,28,0.1),transparent_70%)]" />
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {p.emoji}
              </div>
              <div className="flex flex-col flex-1 p-6">
                <h3 className="text-base font-normal text-[#E5E5E7] mb-2">{p.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed flex-1 mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {p.tags.map(t => <span key={t} className="px-2.5 py-0.5 rounded-full text-[0.65rem] font-normal text-orange-500 bg-orange-500/10 border border-orange-500/30">{t}</span>)}
                </div>
                <div className="flex gap-4" onClick={(e) => e.stopPropagation()}>
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-white/45 hover:text-orange-500 transition-colors">
                    <CodeBracketIcon className="w-3.5 h-3.5" /> Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

