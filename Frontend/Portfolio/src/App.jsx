import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SocialSidebar from './components/SocialSidebar';
import Hero from './components/Hero';
import About from './components/About';
import AcademicJourney from './components/AcademicJourney';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectOverview from './components/ProjectOverview';
import AdminDashboard from './components/AdminDashboard';
import { projects as initialProjects } from './data/projects';
import axios from 'axios';

export default function App() {
  const [projectsList, setProjectsList] = useState(() => {
    const stored = localStorage.getItem('portfolio_projects_v2');
    return stored ? JSON.parse(stored) : initialProjects;
  });

  const [page, setPage] = useState(window.location.pathname === '/admin' ? 'admin' : 'home');
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  // Fetch projects from backend API on mount
  useEffect(() => {
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

    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/projects/getprojects');
        const parsed = response.data.map(p => ({
          ...p,
          tags: parseArrayField(p.tags),
          features: parseArrayField(p.features),
          moreImages: parseArrayField(p.moreImages)
        }));
        setProjectsList(parsed);
      } catch (err) {
        console.error('Error fetching projects from backend API:', err);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    localStorage.setItem('portfolio_projects_v2', JSON.stringify(projectsList));
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
    <div className="relative bg-[#F5F5F5] text-[#1A1A1D] min-h-screen selection:bg-orange-500/20">
      <Navbar currentView={{ page }} onNavigate={handleNavigate} />
      <SocialSidebar />

      {page === 'home' ? (
        <>
          <Hero />
          <About />
          <AcademicJourney />
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
