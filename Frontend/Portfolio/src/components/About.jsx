import { motion } from 'framer-motion';
import GlassCard from './GlassCard';
import Character3D from './Character3D';

const tags = ['React', 'Node.js', 'Python', 'MongoDB', 'AWS', 'Docker'];



export default function About() {
  return (
    <section id="about" className="min-h-screen pt-32 pb-16 px-6 bg-[#D9D9D9] flex items-start justify-center">
      <div className="max-w-5xl w-full mx-auto">

        <div className="flex flex-col md:flex-row w-full gap-10 items-center">

          {/* ── Left: Heading & bio card ──────────────────────────── */}
          <div className="w-full md:w-1/2 flex flex-col">
            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs tracking-[0.2em] uppercase text-orange-500 mb-3">Who I Am</p>
              <h2 className="font-['Lilita_One',sans-serif] text-4xl md:text-5xl font-normal text-[#1C1714]">About Me</h2>
              <div className="w-14 h-0.5 mt-2.5 mb-8 bg-linear-to-r from-orange-500 to-transparent rounded" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
            <GlassCard className="p-8" hover={false}>
              <p className="text-[#1C1714]/65 leading-relaxed mb-4 text-sm">
                I'm a passionate{' '}
                <span className="text-orange-500 font-normal">Full Stack Developer</span>{' '}
                based in London, crafting digital experiences that blend performance
                with aesthetic excellence.
              </p>
              <p className="text-[#1C1714]/45 leading-relaxed mb-8 text-sm">
                With a keen eye for design and a love for clean, efficient code, I build
                web applications that not only work flawlessly but look stunning doing it.
                Inspired by London's urban sophistication.
              </p>
              <div className="flex flex-wrap gap-2">
                {tags.map(t => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full text-xs font-normal text-orange-500 bg-orange-500/10 border border-orange-500/30"
                  >{t}</span>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>

          {/* ── Right: interactive 3-D character ────────── */}
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ position: 'relative' }}
          >

            {/* Three.js 3-D viewer — transparent canvas */}
            <Character3D />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
