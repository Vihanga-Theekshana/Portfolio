import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CodeBracketIcon, LinkIcon, EnvelopeIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import profileImg from '../assets/profile.jpg';

const roles = ['Software Developer', 'Full Stack Engineer', 'UI/UX Enthusiast', 'Problem Solver'];

const socials = [
  { icon: CodeBracketIcon, label: 'GitHub', href: '#' },
  { icon: LinkIcon, label: 'LinkedIn', href: '#' },
  { icon: EnvelopeIcon, label: 'Email', href: '#contact' },
];

/* ─── Animated canvas particles ──────────────────────────── */
function ParticleCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    let w = canvas.width = canvas.offsetWidth;
    let h = canvas.height = canvas.offsetHeight;
    let raf;

    const ORANGE = 'rgba(255,106,28,';
    const GREY = 'rgba(100,80,60,';

    const dots = Array.from({ length: 55 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.5 + 0.15,
      orange: Math.random() > 0.65,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Draw connecting lines between nearby dots
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const opacity = (1 - dist / 130) * 0.65;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255,106,28,${opacity})`;
            ctx.lineWidth = 0.7;
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw dots
      dots.forEach(d => {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = d.orange
          ? `${ORANGE}${d.alpha + 0.3})`
          : `rgba(255,140,50,${d.alpha * 0.8})`;
        ctx.fill();

        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0) d.x = w;
        if (d.x > w) d.x = 0;
        if (d.y < 0) d.y = h;
        if (d.y > h) d.y = 0;
      });

      raf = requestAnimationFrame(draw);
    };

    draw();

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <div className="absolute inset-0 z-[1] pointer-events-none bg-orange-500/5">
      <canvas
        ref={ref}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}

/* ─── Floating geometric shapes ──────────────────────────── */
const shapes = [
  { type: 'ring', size: 80, top: '8%', left: '5%', delay: 0, dur: 7, orange: true },
  { type: 'square', size: 28, top: '18%', left: '88%', delay: 1.5, dur: 9, orange: false },
  { type: 'ring', size: 48, top: '75%', left: '92%', delay: 0.8, dur: 8, orange: true },
  { type: 'tri', size: 36, top: '65%', left: '4%', delay: 2, dur: 10, orange: false },
  { type: 'ring', size: 120, top: '85%', left: '20%', delay: 0.3, dur: 12, orange: true },
  { type: 'square', size: 18, top: '35%', left: '94%', delay: 3, dur: 8, orange: true },
  { type: 'ring', size: 60, top: '12%', left: '72%', delay: 1, dur: 11, orange: false },
  { type: 'dot', size: 12, top: '50%', left: '2%', delay: 2.5, dur: 6, orange: true },
  { type: 'tri', size: 24, top: '90%', left: '70%', delay: 0.5, dur: 9, orange: true },
  { type: 'square', size: 40, top: '30%', left: '8%', delay: 4, dur: 14, orange: false },
];

function GeometricShapes() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
      {shapes.map((s, i) => {
        const color = s.orange ? 'rgba(255,106,28,' : 'rgba(120,90,60,';
        const style = {
          position: 'absolute',
          top: s.top,
          left: s.left,
          width: s.size,
          height: s.size,
        };

        let inner = null;
        if (s.type === 'ring') {
          inner = (
            <div style={{
              width: s.size, height: s.size, borderRadius: '50%',
              border: `${s.size > 70 ? 2 : 1.5}px solid ${color}0.25)`,
            }} />
          );
        } else if (s.type === 'square') {
          inner = (
            <div style={{
              width: s.size, height: s.size,
              border: `1.5px solid ${color}0.22)`,
              transform: 'rotate(30deg)',
            }} />
          );
        } else if (s.type === 'dot') {
          inner = (
            <div style={{
              width: s.size, height: s.size, borderRadius: '50%',
              background: `${color}0.35)`,
            }} />
          );
        } else if (s.type === 'tri') {
          inner = (
            <svg width={s.size} height={s.size} viewBox="0 0 32 32">
              <polygon points="16,2 30,28 2,28" fill="none"
                stroke={`${color}0.28)`} strokeWidth="1.5" />
            </svg>
          );
        }

        return (
          <motion.div
            key={i}
            style={style}
            animate={{ y: [0, -18, 0], rotate: [0, s.type === 'square' ? 75 : 8, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
          >
            {inner}
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─── Pulsing orb blobs ───────────────────────────────────── */
function OrbBlobs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* Large warm orb top-left */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 520, height: 520, top: '-120px', left: '-120px',
          background: 'radial-gradient(circle, rgba(255,106,28,0.10) 0%, rgba(255,106,28,0.04) 50%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Medium orb bottom-right */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 380, height: 380, bottom: '-80px', right: '-80px',
          background: 'radial-gradient(circle, rgba(255,140,50,0.09) 0%, rgba(255,106,28,0.03) 50%, transparent 70%)',
          filter: 'blur(35px)',
        }}
        animate={{ scale: [1, 1.18, 1], opacity: [0.6, 0.95, 0.6] }}
        transition={{ duration: 10, delay: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Small accent orb centre */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 200, height: 200, top: '40%', left: '50%', transform: 'translate(-50%,-50%)',
          background: 'radial-gradient(circle, rgba(255,106,28,0.07) 0%, transparent 65%)',
          filter: 'blur(24px)',
        }}
        animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 6, delay: 1, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

/* ─── Animated dot grid ──────────────────────────────────── */
function DotGrid() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        zIndex: 0,
        backgroundImage: `radial-gradient(circle, rgba(255,106,28,0.18) 1px, transparent 1px)`,
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
    <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-[#D9D9D9] pt-28 pb-4">

      {/* ── Layered animated background ── */}
      <OrbBlobs />
      <DotGrid />
      <GeometricShapes />
      <ParticleCanvas />

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
          className="font-['Lilita_One',sans-serif] text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight mb-2 text-[#1C1714]"
        >
          Vihanga{' '}
          <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">Theekshana</span>
        </motion.h1>

        {/* Typewriter */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}
          className="text-lg lg:text-xl text-[#1C1714]/55 font-light tracking-wide mb-3 min-h-[2rem]"
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
            className="px-7 py-3 text-sm font-normal uppercase tracking-widest text-[#1C1714]/75 rounded-lg border border-[#1C1714]/20 bg-white/40 backdrop-blur-sm hover:border-orange-500 hover:text-orange-500 transition-all duration-300 cursor-pointer"
          >Contact Me</button>
        </motion.div>



      </div>



    </section>
  );
}
