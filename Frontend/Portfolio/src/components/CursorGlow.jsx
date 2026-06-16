import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glow = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    const move = (e) => {
      const x = e.clientX + 'px', y = e.clientY + 'px';
      if (glow.current) { glow.current.style.left = x; glow.current.style.top = y; }
      if (ring.current) { ring.current.style.left = x; ring.current.style.top = y; }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <>
      {/* Orange glow blob */}
      <div
        ref={glow}
        className="fixed w-5 h-5 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-screen bg-[radial-gradient(circle,rgba(255,106,28,0.9)_0%,rgba(255,106,28,0.3)_50%,transparent_70%)]"
      />
      {/* Hollow ring */}
      <div
        ref={ring}
        className="fixed w-10 h-10 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 border border-orange-500/50 transition-all duration-100"
      />
    </>
  );
}
