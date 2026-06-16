import Navbar from './components/Navbar';
import SocialSidebar from './components/SocialSidebar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';

import Contact from './components/Contact';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';

export default function App() {
  return (
    <div className="relative bg-[#D9D9D9] text-[#1C1714] min-h-screen selection:bg-orange-500/20">
      <AnimatedBackground />
      <Navbar />
      <SocialSidebar />
      <Hero />
      <About />
      <Projects />
      <Skills />

      <Contact />
      <Footer />
    </div>
  );
}
