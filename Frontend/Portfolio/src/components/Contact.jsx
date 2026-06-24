import { useState } from 'react';
import axios from "axios";


import {
  MapPinIcon,
  EnvelopeIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const inputCls = 'w-full bg-[#FFFFFF] border border-black/10 rounded-xl px-4 py-3 text-[#1A1A1D] text-sm placeholder-black/30 outline-none focus:bg-[#FFFFFF] focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 transition-all duration-300';

const socials = [
  { icon: FaGithub,   label: 'GitHub',   href: '#' },
  { icon: FaLinkedin, label: 'LinkedIn', href: '#' },
  { icon: FaTwitter,  label: 'Twitter',  href: '#' },
];

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/message/sendmessage", {
        name,
        email,
        message
      });

      setName("");
      setEmail("");
      setMessage("");
    
      alert(response.data.message);
    } catch (err) {
      console.log(err);
      alert("Message failed to send");
    }
  };

  return (
    <section id="contact" className="py-32 px-6 bg-[#F5F5F5] ambient-orange-glow scroll-mt-20">
      <div className="max-w-5xl mx-auto">

        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-orange-500 mb-3">Get In Touch</p>
          <h2 className="font-['Lilita_One',sans-serif] text-4xl md:text-5xl font-normal text-[#1A1A1D]">Contact</h2>
          <div className="w-14 h-0.5 mt-2.5 mb-4 bg-gradient-to-r from-orange-500 to-transparent rounded" />
          <p className="text-[#4A4A4F] text-sm mb-14 max-w-md">Have a project in mind or just want to say hello? I'll get back within 24 hours.</p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Form */}
          <div className="md:col-span-3">
            <div className="bg-white border border-black/5 rounded-2xl p-8 shadow-sm">
              <form onSubmit={submit} className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[0.7rem] uppercase tracking-widest text-[#1A1A1D]/60 font-semibold mb-2">Your Name</label>
                    <input className={inputCls} value={name} onChange={e => setName(e.target.value)} placeholder="Vihanga Theekshana" required />
                  </div>
                  <div>
                    <label className="block text-[0.7rem] uppercase tracking-widest text-[#1A1A1D]/60 font-semibold mb-2">Email</label>
                    <input className={inputCls} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="vihanga@email.com" required />
                  </div>
                </div>
                <div>
                  <label className="block text-[0.7rem] uppercase tracking-widest text-[#1A1A1D]/60 font-semibold mb-2">Message</label>
                  <textarea className={`${inputCls} resize-y min-h-[140px]`} value={message} onChange={e => setMessage(e.target.value)} placeholder="Tell me about your project..." required />
                </div>
                <button type="submit"
                  className="w-full py-3 text-sm font-normal uppercase tracking-widest text-white rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 shadow-[0_4px_20px_rgba(255,106,28,0.3)] hover:shadow-[0_6px_30px_rgba(255,106,28,0.6)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer border-none flex items-center justify-center gap-2"
                >
                  <PaperAirplaneIcon className="w-4 h-4" /> Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Info */}
          <div className="md:col-span-2 flex flex-col gap-4">
            {[
              { icon: MapPinIcon,    label: 'Location', value: 'London, United Kingdom' },
              { icon: EnvelopeIcon,  label: 'Email',    value: 'vihanga@email.com' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-[#FFFFFF] border border-black/5 rounded-2xl p-6 shadow-sm hover:border-orange-500/30 transition-all duration-300">
                <div className="flex items-center gap-2 mb-1.5">
                  <Icon className="w-4 h-4 text-orange-500" />
                  <span className="text-[0.65rem] uppercase tracking-widest text-[#1A1A1D]/50">{label}</span>
                </div>
                <p className="text-[#1A1A1D] font-normal text-sm">{value}</p>
              </div>
            ))}

            <div className="bg-[#FFFFFF] border border-black/5 rounded-2xl p-6 shadow-sm hover:border-orange-500/30 transition-all duration-300">
              <p className="text-[0.65rem] uppercase tracking-widest text-[#1A1A1D]/50 mb-4">Socials</p>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, label, href }) => (
                  <a key={label} href={href} title={label}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-[#F5F5F5] border border-black/10 text-[#1A1A1D]/70 hover:border-orange-500 hover:text-orange-500 hover:shadow-[0_0_20px_rgba(255,106,28,0.12)] transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
