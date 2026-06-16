import { motion } from 'framer-motion';

const items = [
  { type:'work', title:'Senior Frontend Developer', org:'TechVision London',    period:'2023 – Present', desc:'Leading frontend architecture for SaaS platforms. Built a design system used by 5 teams, improved performance by 40%.' },
  { type:'work', title:'Full Stack Developer',      org:'Pixel & Code Agency',  period:'2021 – 2023',    desc:'Delivered 12+ client projects from concept to production. Specialized in React, Node.js, and real-time apps.' },
  { type:'edu',  title:'BSc Computer Science',      org:'University of London',  period:'2018 – 2021',    desc:'First Class Honours. Focused on software engineering, algorithms, and human-computer interaction.' },
  { type:'work', title:'Junior Developer (Intern)', org:'StartupHive',           period:'2020 – 2021',    desc:'Built RESTful APIs and dashboard UIs for an early-stage fintech startup. Launched MVP in 3 months.' },
];

export default function Timeline() {
  return (
    <section id="experience" className="py-32 px-6 bg-[#C8C8C8] scroll-mt-20">
      <div className="max-w-3xl mx-auto">

        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}>
          <p className="text-xs tracking-[0.2em] uppercase text-orange-500 mb-3">Journey</p>
          <h2 className="font-['Lilita_One',sans-serif] text-4xl md:text-5xl font-normal text-[#1C1714]">Experience & Education</h2>
          <div className="w-14 h-0.5 mt-2.5 mb-14 bg-gradient-to-r from-orange-500 to-transparent rounded" />
        </motion.div>

        <div className="relative pl-8">
          <div className="absolute left-1.5 top-0 bottom-0 w-0.5 rounded bg-gradient-to-b from-orange-500 via-orange-500/30 to-transparent" />

          {items.map((item, i) => (
            <motion.div key={i} initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.5, delay:i*0.15 }} className="relative mb-8">
              <div className={`absolute -left-[26px] top-1.5 w-3 h-3 rounded-full shadow-[0_0_12px_rgba(255,106,28,0.7)] ${item.type==='work' ? 'bg-orange-500' : 'border-2 border-orange-500 bg-transparent'}`} />
              <div className="bg-white/60 backdrop-blur-xl border border-[#1C1714]/10 rounded-2xl p-6 shadow-sm hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-[0_12px_30px_rgba(255,106,28,0.10)] transition-all duration-300">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-normal text-[#1C1714] text-base">{item.title}</h3>
                    <span className="text-orange-500 text-sm font-normal">{item.org}</span>
                  </div>
                  <span className="text-[0.7rem] text-[#1C1714]/40 bg-orange-500/[0.08] border border-orange-500/20 rounded-full px-3 py-1 whitespace-nowrap">{item.period}</span>
                </div>
                <p className="text-sm text-[#1C1714]/50 leading-relaxed mt-2">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
