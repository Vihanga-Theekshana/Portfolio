import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPinIcon,
  EnvelopeIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const inputCls = 'w-full bg-white/70 border border-[#1C1714]/12 rounded-xl px-4 py-3 text-[#1C1714] text-sm placeholder-[#1C1714]/30 outline-none focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 transition-all duration-300';

const socials = [
  { icon: FaGithub,   label: 'GitHub',   href: '#' },
  { icon: FaLinkedin, label: 'LinkedIn', href: '#' },
  { icon: FaTwitter,  label: 'Twitter',  href: '#' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-32 px-6 bg-[#D9D9D9] scroll-mt-20">
      <div className="max-w-5xl mx-auto">

        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}>
          <p className="text-xs tracking-[0.2em] uppercase text-orange-500 mb-3">Get In Touch</p>
          <h2 className="font-['Lilita_One',sans-serif] text-4xl md:text-5xl font-normal text-[#1C1714]">Contact</h2>
          <div className="w-14 h-0.5 mt-2.5 mb-4 bg-gradient-to-r from-orange-500 to-transparent rounded" />
          <p className="text-[#1C1714]/45 text-sm mb-14 max-w-md">Have a project in mind or just want to say hello? I'll get back within 24 hours.</p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Form */}
          <motion.div className="md:col-span-3" initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}>
            <div className="bg-white/60 backdrop-blur-xl border border-[#1C1714]/10 rounded-2xl p-8 shadow-sm">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="text-5xl mb-4">🎉</div>
                  <h3 className="text-orange-500 font-normal text-lg mb-2">Message Sent!</h3>
                  <p className="text-[#1C1714]/40 text-sm">I'll be in touch very soon.</p>
                </div>
              ) : (
                <form onSubmit={submit} className="flex flex-col gap-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[0.7rem] uppercase tracking-widest text-[#1C1714]/40 mb-2">Your Name</label>
                      <input className={inputCls} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Vihanga Theekshana" required />
                    </div>
                    <div>
                      <label className="block text-[0.7rem] uppercase tracking-widest text-[#1C1714]/40 mb-2">Email</label>
                      <input className={inputCls} type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="vihanga@email.com" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[0.7rem] uppercase tracking-widest text-[#1C1714]/40 mb-2">Message</label>
                    <textarea className={`${inputCls} resize-y min-h-[140px]`} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell me about your project..." required />
                  </div>
                  <button type="submit"
                    className="w-full py-3 text-sm font-normal uppercase tracking-widest text-white rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 shadow-[0_4px_20px_rgba(255,106,28,0.3)] hover:shadow-[0_6px_30px_rgba(255,106,28,0.6)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer border-none flex items-center justify-center gap-2"
                  >
                    <PaperAirplaneIcon className="w-4 h-4" /> Send Message
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div className="md:col-span-2 flex flex-col gap-4" initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.2 }}>
            {[
              { icon: MapPinIcon,    label: 'Location', value: 'London, United Kingdom' },
              { icon: EnvelopeIcon,  label: 'Email',    value: 'vihanga@email.com' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-white/60 backdrop-blur-xl border border-[#1C1714]/10 rounded-2xl p-6 shadow-sm hover:border-orange-500/30 transition-all duration-300">
                <div className="flex items-center gap-2 mb-1.5">
                  <Icon className="w-4 h-4 text-orange-500" />
                  <span className="text-[0.65rem] uppercase tracking-widest text-[#1C1714]/38">{label}</span>
                </div>
                <p className="text-[#1C1714] font-normal text-sm">{value}</p>
              </div>
            ))}

            <div className="bg-white/60 backdrop-blur-xl border border-[#1C1714]/10 rounded-2xl p-6 shadow-sm hover:border-orange-500/30 transition-all duration-300">
              <p className="text-[0.65rem] uppercase tracking-widest text-[#1C1714]/38 mb-4">Socials</p>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, label, href }) => (
                  <a key={label} href={href} title={label}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-white/70 border border-[#1C1714]/12 text-[#1C1714]/55 hover:border-orange-500 hover:text-orange-500 hover:shadow-[0_0_20px_rgba(255,106,28,0.25)] transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
