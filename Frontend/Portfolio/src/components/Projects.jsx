import { motion } from 'framer-motion';
import { CodeBracketIcon } from '@heroicons/react/24/outline';

const resolveImageUrl = (img) => {
  if (!img) return '';
  if (img.startsWith('data:') || img.startsWith('blob:') || img.startsWith('http://') || img.startsWith('https://')) return img;
  return `http://localhost:8080/upload/${img}`;
};

const parseArrayField = (val) => {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  if (typeof val === 'string') {
    const trimmed = val.trim();
    if (trimmed.startsWith('[')) {
      try {
        return JSON.parse(trimmed);
      } catch (e) {
        console.error('Error parsing JSON field:', val, e);
      }
    }
    return trimmed.split(/[,\n]/).map(item => item.trim()).filter(Boolean);
  }
  return [];
};

export default function Projects({ projects, onProjectClick }) {
  return (
    <section id="projects" className="py-32 px-6 bg-[#FFFFFF] scroll-mt-20">
      <div className="max-w-6xl mx-auto">

        <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}>
          <p className="text-xs tracking-[0.2em] uppercase text-orange-500 mb-3">My Work</p>
          <h2 className="font-['Lilita_One',sans-serif] text-4xl md:text-5xl font-normal text-[#1A1A1D]">Featured Projects</h2>
          <div className="w-14 h-0.5 mt-2.5 mb-4 bg-gradient-to-r from-orange-500 to-transparent rounded" />
          <p className="text-[#4A4A4F] text-sm mb-14 max-w-lg">A curated selection demonstrating my range across full-stack development, design, and problem-solving.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => {
            const projectTags = parseArrayField(p.tags);
            return (
              <div key={p.id}
                onClick={() => onProjectClick(p.id)}
                className="group flex flex-col rounded-2xl overflow-hidden bg-[#F5F5F5] border border-black/5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(255,106,28,0.08)] hover:border-orange-500/40 cursor-pointer"
              >
                <div className="h-44 relative overflow-hidden bg-[#F5F5F5] border-b border-black/5">
                  {p.image ? (
                    <img 
                      src={resolveImageUrl(p.image)} 
                      alt={p.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-500/5 to-[#F5F5F5]/60">
                      <span className="text-[#1A1A1D]/20 font-bold text-sm">No Image</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,106,28,0.02),transparent_70%)]" />
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <h3 className="text-base font-bold text-[#1A1A1D] mb-2">{p.title}</h3>
                  <p className="text-sm text-[#4A4A4F] leading-relaxed flex-1 mb-4">{p.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {projectTags.map(t => <span key={t} className="px-2.5 py-0.5 rounded-full text-[0.65rem] font-normal text-orange-500 bg-orange-500/10 border border-orange-500/30">{t}</span>)}
                  </div>
                  <div className="flex gap-4" onClick={(e) => e.stopPropagation()}>
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-[#1A1A1D]/60 hover:text-orange-500 transition-colors">
                      <CodeBracketIcon className="w-3.5 h-3.5" /> Code
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

