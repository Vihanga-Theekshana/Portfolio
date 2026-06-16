import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const categories = [
  { label: 'Frontend',      skills: [{ name:'React / Next.js', level:92 },{ name:'JavaScript / TypeScript', level:88 },{ name:'HTML & CSS / Tailwind', level:95 },{ name:'Framer Motion', level:80 }] },
  { label: 'Backend',       skills: [{ name:'Node.js / Express', level:85 },{ name:'Python / FastAPI', level:80 },{ name:'MongoDB / PostgreSQL', level:78 },{ name:'REST API / GraphQL', level:82 }] },
  { label: 'Tools & Cloud', skills: [{ name:'Git / GitHub', level:90 },{ name:'Docker / CI/CD', level:72 },{ name:'AWS / Firebase', level:70 },{ name:'Figma / Design', level:76 }] },
];

function Bar({ name, level, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between mb-1.5">
        <span className="text-sm text-[#1C1714]/75 font-normal">{name}</span>
        <span className="text-xs text-orange-500 font-normal">{level}%</span>
      </div>
      <div className="h-1.5 bg-[#1C1714]/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-400 shadow-[0_0_10px_rgba(255,106,28,0.5)]"
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-6 bg-[#D9D9D9] scroll-mt-20">
      <div className="max-w-5xl mx-auto">

        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}>
          <p className="text-xs tracking-[0.2em] uppercase text-orange-500 mb-3">Expertise</p>
          <h2 className="font-['Lilita_One',sans-serif] text-4xl md:text-5xl font-normal text-[#1C1714]">Skills</h2>
          <div className="w-14 h-0.5 mt-2.5 mb-14 bg-gradient-to-r from-orange-500 to-transparent rounded" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((cat, ci) => (
            <motion.div
              key={ci}
              initial={{ opacity:0, y:40 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.5, delay:ci*0.15 }}
              className="bg-white/60 backdrop-blur-xl border border-[#1C1714]/10 rounded-2xl p-7 shadow-sm hover:border-orange-500/35 hover:shadow-[0_8px_30px_rgba(255,106,28,0.10)] transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-7">
                <div className="w-0.5 h-5 bg-orange-500 rounded" />
                <h3 className="text-sm font-normal uppercase tracking-wider text-[#1C1714]">{cat.label}</h3>
              </div>
              {cat.skills.map((s, si) => (
                <Bar key={si} name={s.name} level={s.level} delay={ci * 0.15 + si * 0.1} />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
