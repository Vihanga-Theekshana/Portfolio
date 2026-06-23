import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CodeBracketIcon, LinkIcon, EnvelopeIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import profileImg from '../assets/profile.jpg';
import AnimatedBackground from './AnimatedBackground';

const roles = ['Full Stack Engineer', 'MERN Stack Developer', 'Problem Solver'];

const socials = [
  { icon: CodeBracketIcon, label: 'GitHub', href: '#' },
  { icon: LinkIcon, label: 'LinkedIn', href: '#' },
  { icon: EnvelopeIcon, label: 'Email', href: '#contact' },
];

/* ─── Animated dot grid ──────────────────────────────────── */
function DotGrid() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        zIndex: 0,
        backgroundImage: `radial-gradient(circle, rgba(255,106,28,0.06) 1px, transparent 1px)`,
        backgroundSize: '36px 36px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        opacity: 0.55,
      }}
    />
  );
}

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];
    let t;
    if (!deleting && text.length < current.length) t = setTimeout(() => setText(current.slice(0, text.length + 1)), 80);
    else if (!deleting && text.length === current.length) t = setTimeout(() => setDeleting(true), 2000);
    else if (deleting && text.length > 0) t = setTimeout(() => setText(text.slice(0, -1)), 40);
    else { setDeleting(false); setRoleIdx(i => (i + 1) % roles.length); }
    return () => clearTimeout(t);
  }, [text, deleting, roleIdx]);

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-[#F5F5F5] ambient-orange-glow pt-28 pb-4">

      {/* ── Layered background ── */}
      <AnimatedBackground />
      <DotGrid />

      {/* ── Content ── */}

      <div className="relative z-10 max-w-3xl w-full mx-auto px-6 flex flex-col items-center text-center">

        {/* Profile Picture */}
        <motion.div
          className="flex justify-center items-center relative mt-8 mb-5"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >

          <div
            className="relative p-[3px] rounded-full shadow-[0_0_0_4px_rgba(255,106,28,0.20),0_8px_40px_rgba(255,106,28,0.18)] w-60 h-60 sm:w-72 sm:h-72"
            style={{ background: 'linear-gradient(135deg, #FF6A1C, rgba(255,106,28,0.3), #FF6A1C)' }}
          >
            <div className="rounded-full overflow-hidden w-full h-full">
              <img
                src={profileImg}
                alt="Vihanga Theekshana"
                className="w-full h-full object-cover object-top block"
              />
            </div>
          </div>
        </motion.div>


        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
          className="font-['Lilita_One',sans-serif] text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight mb-2 text-[#1A1A1D]"
        >
          Vihanga{' '}
          <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">Theekshana</span>
        </motion.h1>

        {/* Typewriter */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}
          className="text-lg lg:text-xl text-[#1A1A1D]/60 font-light tracking-wide mb-3 min-h-[2rem]"
        >
          {text}
          <motion.span className="text-orange-500" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }}>|</motion.span>
        </motion.p>


        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
          className="flex flex-wrap gap-3 justify-center mb-6"
        >
          <button onClick={() => go('projects')}
            className="px-7 py-3 text-sm font-normal uppercase tracking-widest text-white rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 shadow-[0_2px_10px_rgba(255,106,28,0.2)] hover:shadow-[0_4px_15px_rgba(255,106,28,0.35)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer border-none"
          >View Work</button>
          <button onClick={() => go('contact')}
            className="px-7 py-3 text-sm font-normal uppercase tracking-widest text-[#1A1A1D]/75 rounded-lg border border-black/10 bg-white/50 backdrop-blur-sm hover:border-orange-500 hover:text-orange-500 transition-all duration-300 cursor-pointer"
          >Contact Me</button>
        </motion.div>



      </div>



    </section>
  );
}
