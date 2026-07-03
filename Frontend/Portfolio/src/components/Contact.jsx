import { useState } from 'react';
import { createPortal } from 'react-dom';
import axios from "axios";
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPinIcon,
  EnvelopeIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const inputCls = 'w-full bg-[#FFFFFF] border border-black/10 rounded-xl px-4 py-3 text-[#1A1A1D] text-sm placeholder-black/30 outline-none focus:bg-[#FFFFFF] focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 transition-all duration-300';

const socials = [
  { icon: FaGithub,   label: 'GitHub',   href: 'https://github.com/Vihanga-Theekshana' },
  { icon: FaLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/vihanga-theekshana-8ab242312/' },
];

/* ── Toast Notification ─────────────────────────────── */
function Toast({ type, message, onClose }) {
  const isSuccess = type === 'success';
  return createPortal(
    <AnimatePresence>
      <motion.div
        key="toast"
        initial={{ opacity: 0, y: -70, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -70, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 340, damping: 28 }}
        style={{
          position: 'fixed',
          top: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 999999,
          minWidth: 320,
          maxWidth: 420,
        }}
      >
        <div
          style={{
            background: isSuccess
              ? 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(16,185,129,0.06))'
              : 'linear-gradient(135deg, rgba(239,68,68,0.12), rgba(239,68,68,0.06))',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: `1px solid ${isSuccess ? 'rgba(16,185,129,0.35)' : 'rgba(239,68,68,0.35)'}`,
            borderRadius: 16,
            boxShadow: isSuccess
              ? '0 20px 60px rgba(16,185,129,0.15), 0 4px 20px rgba(0,0,0,0.12)'
              : '0 20px 60px rgba(239,68,68,0.15), 0 4px 20px rgba(0,0,0,0.12)',
            overflow: 'hidden',
          }}
        >
          {/* Top accent line */}
          <div style={{
            height: 2,
            background: isSuccess
              ? 'linear-gradient(90deg, transparent, #10B981, transparent)'
              : 'linear-gradient(90deg, transparent, #EF4444, transparent)',
          }} />

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '16px 18px' }}>
            {/* Icon */}
            {isSuccess
              ? <CheckCircleIcon style={{ width: 22, height: 22, color: '#10B981', flexShrink: 0, marginTop: 1 }} />
              : <XCircleIcon     style={{ width: 22, height: 22, color: '#EF4444', flexShrink: 0, marginTop: 1 }} />
            }

            {/* Text */}
            <div style={{ flex: 1 }}>
              <p style={{
                fontWeight: 600,
                fontSize: 14,
                color: isSuccess ? '#065F46' : '#7F1D1D',
                marginBottom: 2,
              }}>
                {isSuccess ? 'Message Sent!' : 'Failed to Send'}
              </p>
              <p style={{ fontSize: 13, color: isSuccess ? '#047857' : '#B91C1C', lineHeight: 1.5 }}>
                {message}
              </p>
            </div>

            {/* Close */}
            <button
              onClick={onClose}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: 2,
                color: isSuccess ? '#6EE7B7' : '#FCA5A5', flexShrink: 0,
              }}
            >
              <XMarkIcon style={{ width: 16, height: 16 }} />
            </button>
          </div>

          {/* Progress drain bar */}
          <motion.div
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 4, ease: 'linear' }}
            style={{
              height: 3,
              transformOrigin: 'left',
              background: isSuccess ? '#10B981' : '#EF4444',
              opacity: 0.5,
            }}
          />
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

/* ── Main Contact Component ─────────────────────────── */
export default function Contact() {
  const [name,    setName]    = useState('');
  const [email,   setEmail]   = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [toast,   setToast]   = useState(null); // { type, message }

  const showToast = (type, msg) => {
    setToast({ type, message: msg });
    setTimeout(() => setToast(null), 4200);
  };

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const response = await axios.post('/api/message/sendmessage', { name, email, message });
      setName(''); setEmail(''); setMessage('');
      showToast('success', response.data.message || 'Your message was delivered successfully!');
    } catch (err) {
      console.log(err);
      showToast('error', 'Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}

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
                      <input className={inputCls} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="yourname@gmail.com" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[0.7rem] uppercase tracking-widest text-[#1A1A1D]/60 font-semibold mb-2">Message</label>
                    <textarea className={`${inputCls} resize-y min-h-[140px]`} value={message} onChange={e => setMessage(e.target.value)} placeholder="Tell me about your project..." required />
                  </div>
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full py-3 text-sm font-normal uppercase tracking-widest text-white rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 shadow-[0_4px_20px_rgba(255,106,28,0.3)] hover:shadow-[0_6px_30px_rgba(255,106,28,0.6)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer border-none flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {sending ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Sending…
                      </>
                    ) : (
                      <>
                        <PaperAirplaneIcon className="w-4 h-4" /> Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Info */}
            <div className="md:col-span-2 flex flex-col gap-4">
              {[
                { icon: MapPinIcon,   label: 'Location', value: 'Colombo, Sri Lanka' },
                { icon: EnvelopeIcon, label: 'Email',    value: 'theekshanavihanga2@gmail.com' },
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
    </>
  );
}
