import React from 'react';

const categories = [
  {
    title: 'Programming Languages',
    skills: [
      {
        name: 'JavaScript',
        level: 'Advanced',
        icon: (
          <svg className="w-7 h-7 text-[#F7DF1E]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="12" fill="currentColor" />
            <text x="68" y="85" fill="#1C1714" fontSize="38" fontWeight="bold" fontFamily="sans-serif" textAnchor="end">JS</text>
          </svg>
        )
      },
      {
        name: 'Python',
        level: 'Proficient',
        icon: (
          <svg className="w-7 h-7" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 8C33 8 31 16 31 23V34H50V38H21C14 38 8 43 8 55C8 67 14 71 23 71H30V61C30 52 38 45 47 45H68V34H50V23C50 16 47 8 50 8Z" fill="#3776AB" />
            <path d="M50 92C67 92 69 84 69 77V66H50V62H79C86 62 92 57 92 45C92 33 86 29 77 29H70V39C70 48 62 55 53 55H32V66H50V77C50 84 53 92 50 92Z" fill="#FFE873" />
            <circle cx="39" cy="20" r="3" fill="white" />
            <circle cx="61" cy="80" r="3" fill="black" />
          </svg>
        )
      },
      {
        name: 'C',
        level: 'Intermediate',
        icon: (
          <svg className="w-7 h-7" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="44" fill="#00599C" />
            <path d="M72 32C66 22 51 22 42 30C32 40 32 60 42 70C51 78 66 78 72 68" stroke="white" strokeWidth="12" strokeLinecap="round" />
          </svg>
        )
      }
    ]
  },
  {
    title: 'Libraries & Frameworks',
    skills: [
      {
        name: 'React',
        level: 'Advanced',
        icon: (
          <svg className="w-7 h-7 text-[#61DAFB]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="50" cy="50" rx="12" ry="40" transform="rotate(30 50 50)" />
            <ellipse cx="50" cy="50" rx="12" ry="40" transform="rotate(90 50 50)" />
            <ellipse cx="50" cy="50" rx="12" ry="40" transform="rotate(150 50 50)" />
            <circle cx="50" cy="50" r="5" fill="currentColor" />
          </svg>
        )
      },
      {
        name: 'Node.js',
        level: 'Advanced',
        icon: (
          <svg className="w-7 h-7 text-[#339933]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 15L22 31V63L50 79L78 63V31L50 15Z" fill="none" />
            <path d="M50 15V79" />
            <path d="M22 31L50 47L78 31" />
          </svg>
        )
      },
      {
        name: 'Tailwind CSS',
        level: 'Proficient',
        icon: (
          <svg className="w-7 h-7 text-[#38bdf8]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
          </svg>
        )
      },
      {
        name: 'HTML5',
        level: 'Expert',
        icon: (
          <svg className="w-7 h-7 text-[#E34F26]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 10L23.5 85L50 92L76.5 85L85 10H15Z" fill="currentColor" />
            <path d="M50 18V84.5L70 79L76.5 18H50Z" fill="white" fillOpacity="0.12" />
            <path d="M50 30H32L33.5 45H50V30ZM50 53H34L35 63.5L50 67.5V53Z" fill="white" />
            <path d="M50 30V45H66.5L65 60L50 64V53.5M50 30H68L69.5 18H50V30Z" fill="white" />
          </svg>
        )
      },
      {
        name: 'CSS3',
        level: 'Expert',
        icon: (
          <svg className="w-7 h-7 text-[#1572B6]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 10L23.5 85L50 92L76.5 85L85 10H15Z" fill="currentColor" />
            <path d="M50 18V84.5L70 79L76.5 18H50Z" fill="white" fillOpacity="0.12" />
            <path d="M50 30H32.5L34 45H50V30ZM50 53H34.5L35.5 63.5L50 67.5V53Z" fill="white" />
            <path d="M50 30V45H66.5L65 60L50 64M50 30H68.2L69.7 18H50V30Z" fill="white" />
          </svg>
        )
      }
    ]
  },
  {
    title: 'Databases',
    skills: [
      {
        name: 'MongoDB',
        level: 'Proficient',
        icon: (
          <svg className="w-7 h-7 text-[#47A248]" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 5C45 15 32 38 32 55C32 68 40 78 50 82C60 78 68 68 68 55C68 38 55 15 50 5ZM50 18C52 28 60 48 60 55C60 62 55 68 50 72C45 68 40 62 40 55C40 48 48 28 50 18Z" />
          </svg>
        )
      },
      {
        name: 'MySQL',
        level: 'Proficient',
        icon: (
          <svg className="w-7 h-7 text-[#00758F]" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M80 32C71 30 57 34 48 42C38 34 20 30 10 37C20 42 29 49 37 59C29 65 18 70 12 75C24 72 38 68 46 62C52 68 66 72 78 75C74 70 65 65 57 59C65 49 74 42 80 32Z" />
            <path d="M46 35C48 27 52 20 59 14C57 20 52 27 48 32L46 35Z" />
          </svg>
        )
      }
    ]
  },
  {
    title: 'Tools & DevOps',
    skills: [
      {
        name: 'Git',
        level: 'Advanced',
        icon: (
          <svg className="w-7 h-7 text-[#F05032]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <path d="M45 10L10 45L45 80L80 45L45 10Z" fill="none" />
            <circle cx="45" cy="30" r="5" fill="currentColor" />
            <circle cx="45" cy="52" r="5" fill="currentColor" />
            <circle cx="58" cy="52" r="5" fill="currentColor" />
            <path d="M45 35V47" />
            <path d="M45 57V65" />
            <circle cx="45" cy="70" r="5" fill="currentColor" />
            <path d="M45 47C45 47 52 47 53 47" />
          </svg>
        )
      },
      {
        name: 'GitHub',
        level: 'Advanced',
        icon: (
          <svg className="w-7 h-7 text-[#181717]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.193 22 16.44 22 12.017 22 6.484 17.522 2 12 2z"/>
          </svg>
        )
      },
      {
        name: 'Docker',
        level: 'Proficient',
        icon: (
          <svg className="w-7 h-7 text-[#2496ED]" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 60C18 60 23 56 31 56C36 56 45 63 58 63C68 63 77 59 79 51C81 44 77 40 73 45C71 42 67 42 64 44C61 37 50 37 46 39C41 39 35 43 35 43C23 43 12 50 10 60Z" />
            <path d="M79 51C83 51 86 46 86 42C83 43 81 45 79 48V51Z" />
            <rect x="38" y="26" width="5" height="5" rx="1" />
            <rect x="45" y="26" width="5" height="5" rx="1" />
            <rect x="52" y="26" width="5" height="5" rx="1" />
            <rect x="38" y="19" width="5" height="5" rx="1" />
            <rect x="45" y="19" width="5" height="5" rx="1" />
            <rect x="52" y="19" width="5" height="5" rx="1" />
            <rect x="45" y="12" width="5" height="5" rx="1" />
          </svg>
        )
      },
      {
        name: 'Linux',
        level: 'Proficient',
        icon: (
          <svg className="w-7 h-7 text-[#FCC624]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 8C33 8 28 20 28 35C28 41 30 48 33 53C31 56 26 62 21 63C26 65 33 63 36 58C40 62 45 64 50 64C55 64 60 62 64 58C67 63 74 65 79 63C74 62 69 56 67 53C70 48 72 41 72 35C72 20 67 8 50 8Z" fill="#181717" />
            <path d="M50 14C39 14 36 22 36 35C36 45 42 54 50 54C58 54 64 45 64 35C64 22 61 14 50 14Z" fill="white" />
            <circle cx="44" cy="24" r="3" fill="#181717" />
            <circle cx="56" cy="24" r="3" fill="#181717" />
            <path d="M47 28L53 28L50 34Z" fill="#FCC624" />
            <path d="M30 72C24 72 18 78 24 82C34 84 42 79 46 76" fill="#FCC624" />
            <path d="M70 72C76 72 82 78 76 82C66 84 58 79 54 76" fill="#FCC624" />
          </svg>
        )
      }
    ]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-6 bg-[#0E0E10] scroll-mt-20">
      <div className="max-w-6xl mx-auto">

        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-orange-500 mb-3">Expertise</p>
          <h2 className="font-['Lilita_One',sans-serif] text-4xl md:text-5xl font-normal text-[#E5E5E7]">Skills</h2>
          <div className="w-14 h-0.5 mt-2.5 mb-14 bg-gradient-to-r from-orange-500 to-transparent rounded" />
        </div>

        {/* Categories Columns Layout */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <div key={cat.title} className="flex flex-col gap-4">
              
              {/* Category Header */}
              <div className="flex items-center justify-between mb-2 pb-1 border-b border-white/10">
                <h3 className="text-xs font-bold tracking-widest uppercase text-white/60">
                  {cat.title}
                </h3>
                <span className="text-[10px] font-bold text-orange-500 bg-orange-500/10 px-1.5 py-0.5 rounded">
                  {cat.skills.length}
                </span>
              </div>

              {/* Badges List */}
              <div className="flex flex-col gap-3">
                {cat.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="group flex items-center gap-3.5 p-3.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl hover:border-orange-500/40 hover:shadow-[0_8px_30px_rgba(255,106,28,0.06)] hover:translate-y-[-2px] transition-all duration-300 cursor-default"
                  >
                    {/* Logo Wrapper */}
                    <div className="flex-shrink-0 w-11 h-11 flex items-center justify-center bg-white/5 border border-white/5 rounded-lg transition-all duration-300 group-hover:bg-orange-500/5 group-hover:scale-105">
                      {skill.icon}
                    </div>
                    <div>
                      {/* Tech Name */}
                      <h4 className="text-sm font-semibold text-[#E5E5E7] group-hover:text-orange-500 transition-colors leading-none">
                        {skill.name}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
