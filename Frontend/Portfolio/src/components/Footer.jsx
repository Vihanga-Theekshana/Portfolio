import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const socials = [
  { icon: FaGithub,   label: 'GitHub',   href: '#' },
  { icon: FaLinkedin, label: 'LinkedIn', href: '#' },
  { icon: FaEnvelope, label: 'Email',    href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-[#C8C8C8] border-t border-[#1C1714]/8 py-8 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-['Lilita_One',sans-serif] text-xl font-normal text-orange-500">VT.</span>
          <span className="text-[#1C1714]/30 text-xs">© {new Date().getFullYear()} Vihanga Theekshana. All rights reserved.</span>
        </div>
        <div className="flex gap-4">
          {socials.map(({ icon: Icon, label, href }) => (
            <a key={label} href={href} title={label}
              className="text-[#1C1714]/30 hover:text-orange-500 transition-colors"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
