import { ArrowLeftIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
import GlassCard from './GlassCard';

const resolveImageUrl = (img) => {
  if (!img) return '';
  if (img.startsWith('data:') || img.startsWith('blob:') || img.startsWith('http://') || img.startsWith('https://')) return img;
  return `http://localhost:8080/upload/${img}`;
};

const parseArrayField = (val) => {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  if (typeof val === 'string') {
    const trimmed = val.trim();
    if (trimmed.startsWith('[')) {
      try {
        return JSON.parse(trimmed);
      } catch (e) {
        console.error('Error parsing JSON field:', val, e);
      }
    }
    return trimmed.split(/[,\n]/).map(item => item.trim()).filter(Boolean);
  }
  return [];
};

export default function ProjectOverview({ project, onBack }) {
  if (!project) return null;

  const projectFeatures = parseArrayField(project.features);
  const projectMoreImages = parseArrayField(project.moreImages);

  return (
    <section className="min-h-screen pt-32 pb-24 px-6 bg-[#F5F5F5] ambient-orange-glow">
      <div className="max-w-6xl mx-auto">
        
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-8 text-[#1A1A1D]/60 hover:text-orange-500 font-medium text-sm transition-colors cursor-pointer group border-none bg-transparent"
        >
          <ArrowLeftIcon className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </button>

        {/* Layout Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Details (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <GlassCard className="p-8" hover={false}>
              
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h1 className="font-['Lilita_One',sans-serif] text-4xl font-normal text-[#1A1A1D] mb-3">
                    {project.title}
                  </h1>
                </div>
              </div>

              {/* Description */}
              <h3 className="text-xs uppercase tracking-[0.15em] text-orange-500 font-semibold mb-3">Project Overview</h3>
              <p className="text-[#4A4A4F]/90 leading-relaxed text-sm mb-8">
                {project.details}
              </p>

              {/* Features List */}
              <h3 className="text-xs uppercase tracking-[0.15em] text-orange-500 font-semibold mb-4">Core Specifications & Features</h3>
              <ul className="flex flex-col gap-3.5 mb-8">
                {projectFeatures.map((feature, index) => (
                  <li key={index} className="flex gap-3 text-sm text-[#4A4A4F]/85 leading-relaxed">
                    <span className="text-orange-500 font-bold">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-6 border-t border-black/5">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 text-sm font-medium uppercase tracking-wider text-white rounded-lg bg-orange-500 hover:bg-orange-600 transition-colors shadow-sm"
                >
                  <CodeBracketIcon className="w-4 h-4" />
                  GitHub Repository
                </a>
              </div>

            </GlassCard>
          </div>

          {/* Right Column: Images (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <GlassCard className="p-4" hover={false}>
              
              {/* Main Image */}
              <div className="rounded-xl overflow-hidden mb-4 border border-black/5 shadow-sm aspect-video bg-white/20">
                <img
                  src={resolveImageUrl(project.image)}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Screenshots Gallery */}
              {projectMoreImages.length > 0 && (
                <>
                  <h3 className="text-xs uppercase tracking-[0.15em] text-[#1A1A1D]/50 font-semibold px-2 mb-3">Project Gallery</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {projectMoreImages.map((imgUrl, i) => (
                      <div
                        key={i}
                        className="rounded-lg overflow-hidden border border-black/5 shadow-sm aspect-video bg-white/20 transition-transform duration-300 hover:scale-[1.03]"
                      >
                        <img
                          src={resolveImageUrl(imgUrl)}
                          alt={`${project.title} screenshot ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}

            </GlassCard>
          </div>

        </div>

      </div>
    </section>
  );
}
