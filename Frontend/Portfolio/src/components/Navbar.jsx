import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const links = ['Home', 'About', 'Education', 'Projects', 'Skills', 'Certifications', 'Contact'];

export default function Navbar({ currentView, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const go = (id) => {
    const sectionId = id.toLowerCase();
    if (currentView?.page !== 'home') {
      onNavigate('home', sectionId);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
    setOpen(false);
  };


  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ${scrolled ? 'pt-2' : 'pt-5'}`}
      >
        <div className={`flex items-center justify-between px-6 md:px-8 py-3 rounded-full border transition-all duration-500 w-[92%] md:w-auto md:gap-12 backdrop-blur-2xl ${scrolled ? 'bg-[rgba(255,106,28,0.18)] border-[rgba(255,106,28,0.45)] shadow-[0_8px_32px_rgba(255,106,28,0.25)]' : 'bg-[rgba(255,106,28,0.10)] border-[rgba(255,106,28,0.25)]'}`}>

          <button onClick={() => go('Home')} className="font-['Lilita_One',sans-serif] font-normal text-xl tracking-widest text-orange-500 cursor-pointer bg-transparent border-none">
            Vihanga<span className="text-[#1A1A1D]">.</span>
          </button>

          <div className="hidden md:flex gap-8">
            {links.map(l => (
              <button key={l} onClick={() => go(l)}
                className="relative text-[#1A1A1D]/75 text-sm font-normal tracking-widest uppercase cursor-pointer bg-transparent border-none transition-colors duration-300 hover:text-orange-500 group"
              >
                {l}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 rounded transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          <button onClick={() => go('Contact')}
            className="hidden md:block px-5 py-2 text-sm font-normal uppercase tracking-widest text-white rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 shadow-[0_4px_20px_rgba(255,106,28,0.3)] hover:shadow-[0_6px_30px_rgba(255,106,28,0.6)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer border-none"
          >
            Hire Me
          </button>

          <button onClick={() => setOpen(o => !o)} className="md:hidden text-[#1A1A1D] bg-transparent border-none cursor-pointer">
            {open
              ? <XMarkIcon className="w-6 h-6" />
              : <Bars3Icon className="w-6 h-6" />
            }
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="fixed top-20 left-4 right-4 z-40 bg-[rgba(255,250,247,0.96)] backdrop-blur-3xl border border-[rgba(255,106,28,0.25)] rounded-2xl p-6 flex flex-col gap-4 shadow-lg shadow-orange-500/10"
          >
            {links.map(l => (
              <button key={l} onClick={() => go(l)}
                className="text-left text-[#1A1A1D]/75 text-base uppercase tracking-widest font-normal py-2 border-b border-black/5 hover:text-orange-500 transition-colors cursor-pointer bg-transparent border-l-0 border-r-0 border-t-0"
              >
                {l}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
