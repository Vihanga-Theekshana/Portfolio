import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import GlassCard from './GlassCard';
import profileImg from '../assets/profile.jpg';
const Character3D = React.lazy(() => import('./Character3D'));

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error loading 3D Character:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default function About() {
  return (
    <section id="about" className="min-h-screen pt-32 pb-16 px-6 bg-[#0E0E10] flex items-start justify-center">
      <div className="max-w-5xl w-full mx-auto">

        <div className="flex flex-col md:flex-row w-full gap-10 items-center">

          {/* ── Left: Heading & bio card ──────────────────────────── */}
          <div className="w-full md:w-1/2 flex flex-col">
            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs tracking-[0.2em] uppercase text-orange-500 mb-3">Who I Am</p>
              <h2 className="font-['Lilita_One',sans-serif] text-4xl md:text-5xl font-normal text-[#E5E5E7]">About Me</h2>
              <div className="w-14 h-0.5 mt-2.5 mb-8 bg-linear-to-r from-orange-500 to-transparent rounded" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <GlassCard className="p-8" hover={false}>
                <p className="text-[#E5E5E7]/80 text-base md:text-lg leading-relaxed mb-4 font-normal">
                  Hi, I’m <span className="text-orange-500 font-medium">Vihanga Theekshana</span>, an undergraduate pursuing a Bachelor of Information and Communication Technology (BICT) at the <span className="text-white font-medium">University of Colombo, Faculty of Technology</span>.
                </p>
                <p className="text-[#E5E5E7]/60 text-sm md:text-base leading-relaxed font-normal mb-2">
                  I specialize in software engineering and the <span className="text-orange-500/90 font-medium">MERN stack</span>, and am currently learning <span className="text-orange-500/90 font-medium">Artificial Intelligence</span> and <span className="text-orange-500/90 font-medium">Machine Learning</span>, with a goal to become a skilled full-stack and AI engineer.
                </p>





              </GlassCard>
            </motion.div>
          </div>

          {/* ── Right: interactive 3-D character ────────── */}
          <motion.div
            className="w-full md:w-1/2 h-[380px] sm:h-[480px] md:h-[550px]"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ position: 'relative' }}
          >

            {/* Three.js 3-D viewer — transparent canvas */}
            <ErrorBoundary fallback={
              <div className="w-full h-full flex flex-col items-center justify-center relative">
                <div
                  className="relative p-[3px] rounded-full shadow-[0_0_0_4px_rgba(255,106,28,0.15),0_8px_40px_rgba(255,106,28,0.12)] w-56 h-56 sm:w-64 sm:h-64"
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
                <p className="mt-6 text-white/45 text-xs tracking-wider uppercase font-medium">WebGL Viewer Offline</p>
              </div>
            }>
              <Suspense fallback={
                <div className="w-full h-full flex flex-col items-center justify-center text-orange-500/60 text-sm gap-4">
                  <div className="w-10 h-10 border-2 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />
                  <span className="text-xs tracking-[0.12em] uppercase text-orange-500/60 font-medium">Initializing 3D Viewer...</span>
                </div>
              }>
                <Character3D />
              </Suspense>
            </ErrorBoundary>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

