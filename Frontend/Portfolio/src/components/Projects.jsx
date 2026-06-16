import { motion } from 'framer-motion';
import { CodeBracketIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

const projects = [
  { title:'Urban Commerce',  desc:'Full-stack e-commerce with real-time inventory, Stripe payments, and a luxury dark UI.', tags:['React','Node.js','MongoDB','Stripe'],         emoji:'🛍️' },
  { title:'City Analytics',  desc:'Data visualization dashboard for urban transport — real-time charts, heatmaps, live feeds.',  tags:['Python','FastAPI','D3.js','Redis'],          emoji:'📊' },
  { title:'NightOwl App',    desc:'Social nightlife discovery for London. Venues, event booking, crowd prediction with ML.',     tags:['React Native','Firebase','TensorFlow'],     emoji:'🦉' },
  { title:'GlassUI Library', desc:'Open-source React component library with glassmorphism tokens and Framer Motion.',           tags:['React','TypeScript','Storybook'],           emoji:'🎨' },
  { title:'DevCollab',       desc:'Real-time collaborative code editor with video chat and AI pair-programming hints.',         tags:['Socket.io','WebRTC','OpenAI','Next.js'],    emoji:'💻' },
  { title:'SmartLease',      desc:'AI-powered lease analyser that flags risky clauses and summarises legal docs for renters.',  tags:['OpenAI','LangChain','FastAPI','React'],     emoji:'🏠' },
];

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-6 bg-[#C8C8C8] scroll-mt-20">
      <div className="max-w-6xl mx-auto">

        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}>
          <p className="text-xs tracking-[0.2em] uppercase text-orange-500 mb-3">My Work</p>
          <h2 className="font-['Lilita_One',sans-serif] text-4xl md:text-5xl font-normal text-[#1C1714]">Featured Projects</h2>
          <div className="w-14 h-0.5 mt-2.5 mb-4 bg-gradient-to-r from-orange-500 to-transparent rounded" />
          <p className="text-[#1C1714]/45 text-sm mb-14 max-w-lg">A curated selection demonstrating my range across full-stack development, design, and problem-solving.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.div key={i}
              initial={{ opacity:0, y:40 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.5, delay:i*0.1 }}
              whileHover={{ y:-8, boxShadow:'0 20px 50px rgba(255,106,28,0.15)' }}
              className="group flex flex-col rounded-2xl overflow-hidden bg-white/70 backdrop-blur-xl border border-[#1C1714]/10 shadow-sm transition-all duration-300 hover:border-orange-500/40 hover:shadow-[0_8px_30px_rgba(255,106,28,0.12)]"
            >
              <div className="h-36 flex items-center justify-center text-5xl relative overflow-hidden bg-gradient-to-br from-orange-500/8 to-[#C8C8C8]/60 border-b border-[#1C1714]/6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,106,28,0.1),transparent_70%)]" />
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {p.emoji}
              </div>
              <div className="flex flex-col flex-1 p-6">
                <h3 className="text-base font-normal text-[#1C1714] mb-2">{p.title}</h3>
                <p className="text-sm text-[#1C1714]/50 leading-relaxed flex-1 mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {p.tags.map(t => <span key={t} className="px-2.5 py-0.5 rounded-full text-[0.65rem] font-normal text-orange-500 bg-orange-500/10 border border-orange-500/30">{t}</span>)}
                </div>
                <div className="flex gap-4">
                  <a href="#" className="flex items-center gap-1 text-xs text-[#1C1714]/45 hover:text-orange-500 transition-colors">
                    <CodeBracketIcon className="w-3.5 h-3.5" /> Code
                  </a>
                  <a href="#" className="flex items-center gap-1 text-xs text-[#1C1714]/45 hover:text-orange-500 transition-colors">
                    <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" /> Live
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
