import { motion } from 'framer-motion';
import GlassCard from './GlassCard';

const stats = [
  { value: '3+', label: 'Years Experience' },
  { value: '20+', label: 'Projects Built' },
  { value: '10+', label: 'Happy Clients' },
  { value: '5+', label: 'Open Source' },
];
const tags = ['React', 'Node.js', 'Python', 'MongoDB', 'AWS', 'Docker'];

export default function About() {
  return (
    <section id="about" className="py-32 px-6 bg-[#D9D9D9] scroll-mt-20">
      <div className="max-w-5xl mx-auto">

        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}>
          <p className="text-xs tracking-[0.2em] uppercase text-orange-500 mb-3">Who I Am</p>
          <h2 className="font-['Lilita_One',sans-serif] text-4xl md:text-5xl font-normal text-[#1C1714]">About Me</h2>
          <div className="w-14 h-0.5 mt-2.5 mb-12 bg-gradient-to-r from-orange-500 to-transparent rounded" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.2 }}>
            <GlassCard className="p-8" hover={false}>
              <p className="text-[#1C1714]/65 leading-relaxed mb-4 text-sm">
                I'm a passionate <span className="text-orange-500 font-normal">Full Stack Developer</span> based in London,
                crafting digital experiences that blend performance with aesthetic excellence.
              </p>
              <p className="text-[#1C1714]/45 leading-relaxed mb-8 text-sm">
                With a keen eye for design and a love for clean, efficient code, I build web applications
                that not only work flawlessly but look stunning doing it. Inspired by London's urban sophistication.
              </p>
              <div className="flex flex-wrap gap-2">
                {tags.map(t => (
                  <span key={t} className="px-3 py-1 rounded-full text-xs font-normal text-orange-500 bg-orange-500/10 border border-orange-500/30">{t}</span>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5, delay:0.3 + i*0.1 }}>
                <GlassCard className="p-6 text-center">
                  <div className="text-4xl font-normal bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent mb-2">{s.value}</div>
                  <div className="text-xs text-[#1C1714]/40 tracking-wide">{s.label}</div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
