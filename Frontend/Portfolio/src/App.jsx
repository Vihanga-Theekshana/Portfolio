import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SocialSidebar from './components/SocialSidebar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectOverview from './components/ProjectOverview';
import AdminDashboard from './components/AdminDashboard';
import { projects as initialProjects } from './data/projects';

export default function App() {
  const [projectsList, setProjectsList] = useState(() => {
    const stored = localStorage.getItem('portfolio_projects');
    return stored ? JSON.parse(stored) : initialProjects;
  });

  const [page, setPage] = useState(window.location.pathname === '/admin' ? 'admin' : 'home');
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  useEffect(() => {
    localStorage.setItem('portfolio_projects', JSON.stringify(projectsList));
  }, [projectsList]);

  const handleNavigate = (pageName, sectionId = null) => {
    setPage(pageName);
    if (sectionId) {
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  };

  if (page === 'admin') {
    return (
      <AdminDashboard 
        projects={projectsList} 
        onUpdateProjects={setProjectsList}
        onBack={() => handleNavigate('home')} 
      />
    );
  }

  return (
    <div className="relative bg-[#D9D9D9] text-[#1C1714] min-h-screen selection:bg-orange-500/20">
      <Navbar currentView={{ page }} onNavigate={handleNavigate} />
      <SocialSidebar />

      {page === 'home' ? (
        <>
          <Hero />
          <About />
          <Projects 
            projects={projectsList} 
            onProjectClick={(id) => { setSelectedProjectId(id); setPage('project'); }} 
          />
          <Skills />
          <Certifications />
          <Contact />
        </>
      ) : (
        <ProjectOverview 
          project={projectsList.find(p => p.id === selectedProjectId)} 
          onBack={() => handleNavigate('home', 'projects')} 
        />
      )}

      <Footer />
    </div>
  );
}
