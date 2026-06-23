import { motion } from 'framer-motion';
import { AcademicCapIcon, CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';
import GlassCard from './GlassCard';

const educationData = [
  {
    degree: 'Bachelor of Information and Communication Technology (BICT) (Hons)',
    institution: 'University of Colombo, Faculty of Technology',
    period: '2023 - Present',
    location: 'Colombo, Sri Lanka',
    grade: 'Undergraduate'
  },
  {
    degree: 'Certified AI & ML Engineer (CAME)',
    institution: 'Institute of Software Engineering (IJSE)',
    period: 'Currently learning',
    location: 'Panadura, Sri Lanka',
    grade: 'Professional Training'
  },
  {
    degree: 'G.C.E. Advanced Level (A/L) - Technology Stream',
    institution: 'C.W.W. Kannangara Central College',
    period: 'Completed',
    location: 'Hunumulla, Sri Lanka',
    grade: 'SFT: A | ICT: A | ET: B'
  }
];

export default function AcademicJourney() {
  return (
    <section id="education" className="py-32 px-6 bg-[#F5F5F5] ambient-orange-glow scroll-mt-20">
      <div className="max-w-4xl mx-auto">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs tracking-[0.2em] uppercase text-orange-500 mb-3">Milestones</p>
          <h2 className="font-['Lilita_One',sans-serif] text-4xl md:text-5xl font-normal text-[#1A1A1D]">Academic Journey</h2>
          <div className="w-14 h-0.5 mt-2.5 mb-14 bg-gradient-to-r from-orange-500 to-transparent rounded" />
        </motion.div>

        {/* Timeline Container */}
        <div className="relative border-l border-orange-500/25 ml-4 md:ml-8 space-y-12">
          {educationData.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative pl-8 md:pl-12 group"
            >
              {/* Indicator Circle */}
              <div className="absolute -left-[13px] top-1.5 w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border-4 border-[#F5F5F5] flex items-center justify-center shadow-md shadow-orange-500/10 group-hover:scale-110 transition-transform duration-300">
                <AcademicCapIcon className="w-3 h-3 text-white" />
              </div>

              <GlassCard className="p-6 md:p-8" hover={true}>
                {/* Meta details */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <span className="px-3 py-1 text-[10px] font-bold text-orange-600 bg-orange-500/10 border border-orange-500/30 rounded-full uppercase tracking-wider">
                    {edu.grade}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-[#1A1A1D]/60">
                    <CalendarIcon className="w-4 h-4 text-orange-500" />
                    <span>{edu.period}</span>
                  </div>
                </div>

                {/* Degree & Inst */}
                <h3 className="text-lg md:text-xl font-bold text-[#1A1A1D] mb-1 group-hover:text-orange-500 transition-colors leading-snug">
                  {edu.degree}
                </h3>
                <p className="text-sm font-semibold text-[#1A1A1D]/80 mb-3 flex items-center gap-1">
                  {edu.institution}
                </p>

                {/* Location */}
                <div className="flex items-center gap-1 text-xs text-[#1A1A1D]/50">
                  <MapPinIcon className="w-3.5 h-3.5 text-orange-500" />
                  <span>{edu.location}</span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
