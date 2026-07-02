import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const socials = [
  { icon: FaGithub,   label: 'GitHub',   href: 'https://github.com/Vihanga-Theekshana' },
  { icon: FaLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/vihanga-theekshana-8ab242312/' },
  { icon: FaEnvelope, label: 'Email',    href: '#contact' },
];

export default function SocialSidebar({ variant = 'desktop' }) {
  if (variant === 'mobile') return null;

  return (
    <div
      className="flex fixed left-3 xl:left-8 top-1/2 -translate-y-1/2 flex-col items-center gap-4 xl:gap-5 z-40"
      style={{ willChange: 'transform', transform: 'translateZ(0)' }}
    >
      <div className="w-[1px] h-16 xl:h-24 bg-black/10 mb-1 xl:mb-2" />
      {socials.map(({ icon: Icon, label, href }) => (
        <a
          key={label}
          href={href}
          title={label}
          className="w-9 h-9 xl:w-12 xl:h-12 rounded-full flex items-center justify-center bg-white border border-black/5 text-[#1A1A1D]/70 hover:text-orange-500 hover:bg-white hover:shadow-[0_8px_30px_rgba(255,106,28,0.15)] hover:-translate-y-1 transition-all duration-300 shadow-sm active:scale-95"
        >
          <Icon className="w-4 h-4 xl:w-6 xl:h-6" />
        </a>
      ))}
      <div className="w-[1px] h-16 xl:h-24 bg-black/10 mt-1 xl:mt-2" />
    </div>
  );
}
