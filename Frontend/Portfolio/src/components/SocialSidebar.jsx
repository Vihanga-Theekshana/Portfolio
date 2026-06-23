import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const socials = [
  { icon: FaGithub,   label: 'GitHub',   href: '#' },
  { icon: FaLinkedin, label: 'LinkedIn', href: '#' },
  { icon: FaEnvelope, label: 'Email',    href: '#contact' },
];

export default function SocialSidebar() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      className="hidden xl:flex fixed left-8 top-1/2 -translate-y-1/2 flex-col items-center gap-5 z-40"
    >
      <div className="w-[1px] h-24 bg-black/10 mb-2" />
      {socials.map(({ icon: Icon, label, href }) => (
        <a 
          key={label} 
          href={href} 
          title={label}
          className="w-12 h-12 rounded-full flex items-center justify-center bg-white border border-black/5 text-[#1A1A1D]/70 hover:text-orange-500 hover:bg-[#FFFFFF] hover:shadow-[0_8px_30px_rgba(255,106,28,0.15)] hover:-translate-y-1 transition-all duration-300 shadow-sm"
        >
          <Icon className="w-6 h-6" />
        </a>
      ))}
      <div className="w-[1px] h-24 bg-black/10 mt-2" />
    </motion.div>
  );
}
