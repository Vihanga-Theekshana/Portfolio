import { useState } from 'react';
import { 
  ArrowLeftIcon, 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  LockClosedIcon, 
  ArrowLeftOnRectangleIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import SignIn from './SignIn';
import SignUp from './SignUp';

export default function AdminDashboard({ projects, onUpdateProjects, onBack }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Editing/Adding states
  const [isEditing, setIsEditing] = useState(false);
  const [editProject, setEditProject] = useState(null);

  // Form State
  const initialFormState = {
    id: '',
    title: '',
    desc: '',
    tags: '',
    emoji: '🚀',
    github: '',
    live: '',
    image: '',
    moreImages: '',
    features: '',
    details: ''
  };
  const [formData, setFormData] = useState(initialFormState);

  // Get registered admin user
  const getAdminUser = () => {
    try {
      const stored = localStorage.getItem('admin_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  };

  // Delete handler
  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      const updated = projects.filter(p => p.id !== id);
      onUpdateProjects(updated);
    }
  };

  // Open Add/Edit Form
  const openForm = (project = null) => {
    if (project) {
      setEditProject(project);
      setFormData({
        id: project.id,
        title: project.title,
        desc: project.desc,
        tags: project.tags.join(', '),
        emoji: project.emoji || '🚀',
        github: project.github || '',
        live: project.live || '',
        image: project.image || '',
        moreImages: project.moreImages ? project.moreImages.join('\n') : '',
        features: project.features ? project.features.join('\n') : '',
        details: project.details || ''
      });
    } else {
      setEditProject(null);
      setFormData(initialFormState);
    }
    setIsEditing(true);
  };

  // Submit form handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.desc) {
      alert('Title and description are required.');
      return;
    }

    const projectId = formData.id || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    const projectPayload = {
      id: projectId,
      title: formData.title,
      desc: formData.desc,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      emoji: formData.emoji,
      github: formData.github,
      live: formData.live,
      image: formData.image || 'https://images.unsplash.com/photo-1557821552-17105176677c?w=1000&auto=format&fit=crop&q=80',
      moreImages: formData.moreImages.split('\n').map(img => img.trim()).filter(Boolean),
      features: formData.features.split('\n').map(f => f.trim()).filter(Boolean),
      details: formData.details
    };

    let updatedList;
    if (editProject) {
      // Edit existing
      updatedList = projects.map(p => p.id === editProject.id ? projectPayload : p);
    } else {
      // Add new
      if (projects.some(p => p.id === projectPayload.id)) {
        alert('A project with this ID or title already exists.');
        return;
      }
      updatedList = [projectPayload, ...projects];
    }

    onUpdateProjects(updatedList);
    setIsEditing(false);
    setFormData(initialFormState);
  };

  // Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // --- LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#18181C] px-6 py-20">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,106,28,0.08),transparent_50%)]" />
          
          <button 
            onClick={onBack}
            className="group mb-8 inline-flex items-center gap-2 text-xs font-semibold text-white/60 hover:text-orange-500 transition-colors"
          >
            <ArrowLeftIcon className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Back to Portfolio
          </button>

          <div className="text-center mb-6 relative">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mx-auto mb-4">
              <LockClosedIcon className="w-6 h-6 text-orange-500" />
            </div>
            <h1 className="font-['Lilita_One',sans-serif] text-3xl font-normal text-[#E5E5E7]">Admin Portal</h1>
            <p className="text-sm text-white/50 mt-1">
              {isSignUpMode ? 'Register admin credentials' : 'Sign in to manage your projects'}
            </p>
          </div>

          {/* Toggle Tabs */}
          <div className="flex bg-white/5 p-1 rounded-xl mb-6 relative z-10">
            <button 
              onClick={() => { setIsSignUpMode(false); setSuccessMessage(''); }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${!isSignUpMode ? 'bg-white/10 text-white shadow-sm' : 'text-white/55 hover:text-white'}`}
            >
              Sign In
            </button>
            <button 
              onClick={() => { setIsSignUpMode(true); setSuccessMessage(''); }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${isSignUpMode ? 'bg-white/10 text-white shadow-sm' : 'text-white/55 hover:text-white'}`}
            >
              Sign Up
            </button>
          </div>

          {successMessage && (
            <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-medium rounded-xl text-center">
              {successMessage}
            </div>
          )}

          {isSignUpMode ? (
            <SignUp 
              onSignUpSuccess={() => {
                setSuccessMessage('Account registered successfully! You can now sign in.');
                setIsSignUpMode(false);
              }} 
            />
          ) : (
            <SignIn 
              onLoginSuccess={() => setIsAuthenticated(true)} 
            />
          )}
        </div>
      </div>
    );
  }

  // --- DASHBOARD EDITING FORM VIEW ---
  if (isEditing) {
    return (
      <div className="min-h-screen bg-[#18181C] py-20 px-6">
        <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl">
          <div className="flex items-center justify-between mb-8 pb-5 border-b border-white/10">
            <div>
              <button 
                onClick={() => setIsEditing(false)}
                className="group flex items-center gap-2 text-xs font-semibold text-white/60 hover:text-orange-500 transition-colors mb-2"
              >
                <ArrowLeftIcon className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                Back to Dashboard
              </button>
              <h2 className="font-['Lilita_One',sans-serif] text-3xl font-normal text-[#E5E5E7]">
                {editProject ? `Edit Project: ${editProject.title}` : 'Add New Project'}
              </h2>
            </div>
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
              <SparklesIcon className="w-5 h-5 text-orange-500" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">Project Title *</label>
                <input 
                  type="text" 
                  value={formData.title} 
                  onChange={(e) => setFormData({...formData, title: e.target.value})} 
                  placeholder="e.g. Urban Commerce"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-orange-500/40 outline-none text-[#E5E5E7] transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">Emoji Identifier *</label>
                <input 
                  type="text" 
                  value={formData.emoji} 
                  onChange={(e) => setFormData({...formData, emoji: e.target.value})} 
                  placeholder="e.g. 🛍️"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-orange-500/40 outline-none text-[#E5E5E7] transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">Short Description *</label>
              <input 
                type="text" 
                value={formData.desc} 
                onChange={(e) => setFormData({...formData, desc: e.target.value})} 
                placeholder="A single sentence summary describing the project."
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-orange-500/40 outline-none text-[#E5E5E7] transition-all"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">GitHub URL</label>
                <input 
                  type="url" 
                  value={formData.github} 
                  onChange={(e) => setFormData({...formData, github: e.target.value})} 
                  placeholder="https://github.com/..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-orange-500/40 outline-none text-[#E5E5E7] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">Live Demo URL</label>
                <input 
                  type="url" 
                  value={formData.live} 
                  onChange={(e) => setFormData({...formData, live: e.target.value})} 
                  placeholder="https://..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-orange-500/40 outline-none text-[#E5E5E7] transition-all"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">Tags / Technologies (comma separated)</label>
                <input 
                  type="text" 
                  value={formData.tags} 
                  onChange={(e) => setFormData({...formData, tags: e.target.value})} 
                  placeholder="React, Node.js, Tailwind"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-orange-500/40 outline-none text-[#E5E5E7] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">Primary Image URL</label>
                <input 
                  type="url" 
                  value={formData.image} 
                  onChange={(e) => setFormData({...formData, image: e.target.value})} 
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-orange-500/40 outline-none text-[#E5E5E7] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">Additional Image URLs (one URL per line)</label>
              <textarea 
                rows="2"
                value={formData.moreImages} 
                onChange={(e) => setFormData({...formData, moreImages: e.target.value})} 
                placeholder="https://images.unsplash.com/..."
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-orange-500/40 outline-none text-[#E5E5E7] transition-all font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">Features (one per line)</label>
              <textarea 
                rows="3"
                value={formData.features} 
                onChange={(e) => setFormData({...formData, features: e.target.value})} 
                placeholder="Secure credit card payments with Stripe integration&#10;Real-time inventory sync"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-orange-500/40 outline-none text-[#E5E5E7] transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">Detailed Writeup / Technical Overview</label>
              <textarea 
                rows="4"
                value={formData.details} 
                onChange={(e) => setFormData({...formData, details: e.target.value})} 
                placeholder="Provide a background context, technical stack detail, and overall implementation details."
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-orange-500/40 outline-none text-[#E5E5E7] transition-all text-sm"
              />
            </div>

            <div className="flex gap-4 pt-4 border-t border-white/10">
              <button 
                type="submit"
                className="flex-1 py-3.5 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20"
              >
                {editProject ? 'Update Project' : 'Publish Project'}
              </button>
              <button 
                type="button" 
                onClick={() => setIsEditing(false)}
                className="px-6 py-3.5 border border-white/20 text-[#E5E5E7]/70 rounded-xl font-semibold hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // --- LIST VIEW ---
  return (
    <div className="min-h-screen bg-[#18181C] py-24 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[10px] tracking-[0.25em] uppercase text-orange-500 font-bold">Admin Console</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <h1 className="font-['Lilita_One',sans-serif] text-4xl md:text-5xl font-normal text-[#E5E5E7]">Manage Projects</h1>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => openForm()}
              className="inline-flex items-center gap-2 px-5 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/10 text-sm"
            >
              <PlusIcon className="w-4 h-4 stroke-[2.5]" />
              New Project
            </button>
            <button 
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-5 py-3 border border-white/20 text-[#E5E5E7]/70 hover:bg-white/5 rounded-xl font-semibold transition-colors text-sm"
            >
              <ArrowLeftOnRectangleIcon className="w-4 h-4" />
              Sign Out
            </button>
            <button 
              onClick={onBack}
              className="px-5 py-3 bg-[#E5E5E7] text-[#0E0E10] hover:bg-[#E5E5E7]/90 rounded-xl font-semibold transition-colors text-sm"
            >
              View Portfolio
            </button>
          </div>
        </div>

        {/* Project Cards List */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <div 
              key={p.id}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:shadow-[0_12px_36px_rgba(0,0,0,0.2)] transition-all duration-300"
            >
              <div>
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/5 border border-orange-500/15 flex items-center justify-center text-2xl">
                    {p.emoji}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#E5E5E7]">{p.title}</h3>
                    <p className="text-xs text-white/40 font-medium">ID: {p.id}</p>
                  </div>
                </div>
                <p className="text-sm text-white/60 leading-relaxed mb-4 line-clamp-2">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {p.tags.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded-full text-[10px] font-medium text-orange-500 bg-orange-500/5 border border-orange-500/20">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                <button 
                  onClick={() => openForm(p)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-white/10 text-xs text-white/70 font-semibold hover:bg-white/5 hover:text-white transition-colors"
                >
                  <PencilIcon className="w-3.5 h-3.5" />
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(p.id)}
                  className="px-4 py-2.5 rounded-lg border border-red-500/10 text-red-600 font-semibold hover:bg-red-500/5 hover:border-red-500/30 transition-colors"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          
          {projects.length === 0 && (
            <div className="col-span-full py-16 text-center bg-white/5 rounded-2xl border border-dashed border-white/15">
              <p className="text-sm text-white/40 font-medium">No projects added yet. Click "New Project" to add one.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
