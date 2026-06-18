import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import ibmLogo from '../assets/ibm-logo.svg';
import redhatLogo from '../assets/redhat-logo.svg';


const certifications = [
  {
    title: 'IBM Node.js Developer Professional Certificate',
    issuer: 'IBM',
    verifyLink: '#',
    theme: {
      accentText: 'text-[#0F62FE]',
      hoverBorder: 'hover:border-[#0F62FE]/45',
      hoverShadow: 'hover:shadow-[0_12px_36px_rgba(15,98,254,0.12)]',
      bgGlow: 'bg-[#0F62FE]/4'
    },
    logo: (
      <img src={ibmLogo} className="w-12 h-12 flex-shrink-0 object-contain" alt="IBM Logo" />
    )
  },
  {
    title: 'Red Hat Certified System Administration (RH104)',
    issuer: 'Red Hat',
    verifyLink: '#',
    theme: {
      accentText: 'text-[#EE0000]',
      hoverBorder: 'hover:border-[#EE0000]/45',
      hoverShadow: 'hover:shadow-[0_12px_36px_rgba(238,0,0,0.12)]',
      bgGlow: 'bg-[#EE0000]/4'
    },
    logo: (
      <img src={redhatLogo} className="w-12 h-12 flex-shrink-0 object-contain" alt="Red Hat Logo" />
    )
  }
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-32 px-6 bg-[#C8C8C8] scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        
        {/* Title */}
        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-orange-500 mb-3">Qualifications</p>
          <h2 className="font-['Lilita_One',sans-serif] text-4xl md:text-5xl font-normal text-[#1C1714]">Licenses & Certifications</h2>
          <div className="w-14 h-0.5 mt-2.5 mb-14 bg-gradient-to-r from-orange-500 to-transparent rounded" />
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {certifications.map((cert) => (
            <div
              key={cert.title}
              className={`
                flex flex-col justify-between p-7 bg-white/60 backdrop-blur-xl border border-[#1C1714]/10 rounded-2xl shadow-sm transition-all duration-300 cursor-default
                ${cert.theme.hoverBorder} ${cert.theme.hoverShadow}
              `}
            >
              
              <div>


                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  {cert.logo}
                  <div>
                    <h3 className="text-base font-bold text-[#1C1714] leading-snug mb-1 group-hover:text-orange-500 transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-[#1C1714]/50 font-medium">
                      Official Credential by <span className="text-[#1C1714]/80">{cert.issuer}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Verify Link */}
              <div className="pt-4 mt-4 border-t border-[#1C1714]/8">
                <a
                  href={cert.verifyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold ${cert.theme.accentText} hover:opacity-80 transition-opacity uppercase tracking-wider`}
                >
                  Verify Credential
                  <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
