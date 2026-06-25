import { useState, useEffect } from 'react';
import axios from 'axios';
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


const resolveImageUrl = (img) => {
  if (!img) return '';
  if (img.startsWith('data:') || img.startsWith('blob:') || img.startsWith('http://') || img.startsWith('https://')) return img;
  return `/api/upload/${img}`;
};

const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

const fetchImageAsFile = async (url, filename) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type });
  } catch (err) {
    console.warn('CORS or fetch error for image, using fallback:', url, err);
    const fallbackBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
    return dataURLtoFile(fallbackBase64, filename);
  }
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

export default function AdminDashboard({ projects, onUpdateProjects, onBack }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
    github: '',
    live: '',
    images: ['', '', '', ''],
    features: '',
    details: ''
  };
  const [formData, setFormData] = useState(initialFormState);

  // Fetch projects list from backend on mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/projects/getprojects');
        const parsed = response.data.map(p => ({
          ...p,
          tags: parseArrayField(p.tags),
          features: parseArrayField(p.features),
          moreImages: parseArrayField(p.moreImages)
        }));
        onUpdateProjects(parsed);
      } catch (err) {
        console.error('Error fetching projects in dashboard:', err);
      }
    };
    fetchProjects();
  }, []);

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
  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`/api/projects/deleteproject/${id}`);
        const updated = projects.filter(p => p.id !== id);
        onUpdateProjects(updated);
        alert('Project deleted successfully!');
      } catch (err) {
        console.error('Error deleting project:', err);
        alert('Failed to delete project via backend API.');
      }
    }
  };

  // Open Add/Edit Form
  const openForm = (project = null) => {
    if (project) {
      setEditProject(project);

      const parsedMoreImages = parseArrayField(project.moreImages);
      const loadedImages = [
        project.image || '',
        ...parsedMoreImages
      ].slice(0, 4);
      while (loadedImages.length < 4) {
        loadedImages.push('');
      }

      const parsedTags = parseArrayField(project.tags);
      const parsedFeatures = parseArrayField(project.features);

      setFormData({
        id: project.id,
        title: project.title,
        desc: project.desc,
        tags: parsedTags.join(', '),
        github: project.github || '',
        live: project.live || '',
        images: loadedImages,
        features: parsedFeatures.join('\n'),
        details: project.details || ''
      });
    } else {
      setEditProject(null);
      setFormData(initialFormState);
    }
    setIsEditing(true);
  };

  // Handle Image Upload Slot
  const handleImageUpload = (index, file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const updatedImages = [...formData.images];
      updatedImages[index] = e.target.result;
      setFormData(prev => ({ ...prev, images: updatedImages }));
    };
    reader.readAsDataURL(file);
  };

  // Publish / Create project
  const handlePublish = async () => {
    if (!formData.title || !formData.desc) {
      alert('Title and description are required.');
      return;
    }

    const projectId = formData.id || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    // Check if duplicate exists
    if (projects.some(p => p.id === projectId)) {
      alert('A project with this ID or title already exists.');
      return;
    }

    try {
      const filesToUpload = [];
      const activeImages = formData.images.filter(Boolean);

      for (let i = 0; i < activeImages.length; i++) {
        const img = activeImages[i];
        if (img.startsWith('data:')) {
          filesToUpload.push(dataURLtoFile(img, `image-${i}.png`));
        } else {
          const fullUrl = resolveImageUrl(img);
          const filename = fullUrl.substring(fullUrl.lastIndexOf('/') + 1);
          const file = await fetchImageAsFile(fullUrl, filename);
          filesToUpload.push(file);
        }
      }

      if (filesToUpload.length === 0) {
        alert('Please upload at least one image.');
        return;
      }

      const formPayload = new FormData();
      formPayload.append('id', projectId);
      formPayload.append('title', formData.title);
      formPayload.append('desc', formData.desc);

      const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(Boolean);
      const featuresArray = formData.features.split('\n').map(f => f.trim()).filter(Boolean);

      formPayload.append('tags', JSON.stringify(tagsArray));
      formPayload.append('features', JSON.stringify(featuresArray));
      formPayload.append('github', formData.github || '');
      formPayload.append('live', formData.live || '');
      formPayload.append('details', formData.details || '');

      filesToUpload.forEach(file => {
        formPayload.append('images', file);
      });

      const response = await axios.post('/api/projects/addproject', formPayload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Project published successfully:', response.data);

      // Re-fetch to sync
      const refreshResponse = await axios.get('/api/projects/getprojects');
      const parsed = refreshResponse.data.map(p => ({
        ...p,
        tags: parseArrayField(p.tags),
        features: parseArrayField(p.features),
        moreImages: parseArrayField(p.moreImages)
      }));
      onUpdateProjects(parsed);

      alert('Project published successfully!');
      setIsEditing(false);
      setFormData(initialFormState);
    } catch (err) {
      console.error('Publish error:', err);
      alert('Failed to publish project via backend API.');
    }
  };

  // Update / Edit project
  const handleUpdate = async () => {
    if (!formData.title || !formData.desc) {
      alert('Title and description are required.');
      return;
    }

    const projectId = formData.id;
    const activeImages = formData.images.filter(Boolean);

    try {
      const filesToUpload = [];
      for (let i = 0; i < activeImages.length; i++) {
        const img = activeImages[i];
        if (img.startsWith('data:')) {
          filesToUpload.push(dataURLtoFile(img, `image-${i}.png`));
        } else {
          const fullUrl = resolveImageUrl(img);
          const filename = fullUrl.substring(fullUrl.lastIndexOf('/') + 1);
          const file = await fetchImageAsFile(fullUrl, filename);
          filesToUpload.push(file);
        }
      }

      if (filesToUpload.length === 0) {
        alert('Please upload at least one image.');
        return;
      }

      const formPayload = new FormData();
      formPayload.append('id', projectId);
      formPayload.append('title', formData.title);
      formPayload.append('desc', formData.desc);

      const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(Boolean);
      const featuresArray = formData.features.split('\n').map(f => f.trim()).filter(Boolean);

      formPayload.append('tags', JSON.stringify(tagsArray));
      formPayload.append('features', JSON.stringify(featuresArray));
      formPayload.append('github', formData.github || '');
      formPayload.append('live', formData.live || '');
      formPayload.append('details', formData.details || '');

      filesToUpload.forEach(file => {
        formPayload.append('images', file);
      });

      // Delete old entry first
      await axios.delete(`/api/projects/deleteproject/${editProject.id}`);

      // Add as new
      const response = await axios.post('/api/projects/addproject', formPayload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Project updated successfully:', response.data);

      // Re-fetch to sync
      const refreshResponse = await axios.get('/api/projects/getprojects');
      const parsed = refreshResponse.data.map(p => ({
        ...p,
        tags: parseArrayField(p.tags),
        features: parseArrayField(p.features),
        moreImages: parseArrayField(p.moreImages)
      }));
      onUpdateProjects(parsed);

      alert('Project updated successfully!');
      setIsEditing(false);
      setFormData(initialFormState);
    } catch (err) {
      console.error('Update error:', err);
      alert('Failed to update project via backend API.');
    }
  };

  // Submit form handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editProject) {
      handleUpdate();
    } else {
      handlePublish();
    }
  };

  // Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // --- LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] px-6 py-20 relative overflow-hidden">
        {/* Background glow orb */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,106,28,0.05),transparent_50%)]" />

        <div className="w-full max-w-md bg-[#FFFFFF] border border-black/5 rounded-3xl p-8 shadow-xl relative z-10">
          <button
            onClick={onBack}
            className="group mb-8 inline-flex items-center gap-2 text-xs font-semibold text-[#1A1A1D]/60 hover:text-orange-500 transition-colors bg-transparent border-none cursor-pointer"
          >
            <ArrowLeftIcon className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Back to Portfolio
          </button>

          <div className="text-center mb-8 relative">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mx-auto mb-4">
              <LockClosedIcon className="w-6 h-6 text-orange-500" />
            </div>
            <h1 className="font-['Lilita_One',sans-serif] text-3xl font-normal text-[#1A1A1D]">Admin Portal</h1>
            <p className="text-sm text-[#1A1A1D]/60 mt-1">Sign in to manage your projects</p>
          </div>

          {successMessage && (
            <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-medium rounded-xl text-center">
              {successMessage}
            </div>
          )}

          <SignIn onLoginSuccess={() => setIsAuthenticated(true)} />
        </div>
      </div>
    );
  }

  // --- DASHBOARD EDITING FORM VIEW ---
  if (isEditing) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] ambient-orange-glow py-20 px-6">
        <div className="max-w-3xl mx-auto bg-[#FFFFFF] border border-black/5 rounded-3xl p-8 shadow-xl">
          <div className="flex items-center justify-between mb-8 pb-5 border-b border-black/5">
            <div>
              <button
                onClick={() => setIsEditing(false)}
                className="group flex items-center gap-2 text-xs font-semibold text-[#1A1A1D]/60 hover:text-orange-500 transition-colors mb-2 bg-transparent border-none cursor-pointer"
              >
                <ArrowLeftIcon className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                Back to Dashboard
              </button>
              <h2 className="font-['Lilita_One',sans-serif] text-3xl font-normal text-[#1A1A1D]">
                {editProject ? `Edit Project: ${editProject.title}` : 'Add New Project'}
              </h2>
            </div>
            <div className="w-10 h-10 rounded-xl bg-orange-500/5 border border-orange-500/15 flex items-center justify-center">
              <SparklesIcon className="w-5 h-5 text-orange-500" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1D]/60 mb-2">Project Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Urban Commerce"
                className="w-full px-4 py-3 rounded-xl bg-[#FFFFFF] border border-black/10 focus:border-orange-500/40 outline-none text-[#1A1A1D] placeholder-black/35 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1D]/60 mb-2">Short Description *</label>
              <input
                type="text"
                value={formData.desc}
                onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                placeholder="A single sentence summary describing the project."
                className="w-full px-4 py-3 rounded-xl bg-[#FFFFFF] border border-black/10 focus:border-orange-500/40 outline-none text-[#1A1A1D] placeholder-black/35 transition-all"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1D]/60 mb-2">GitHub URL</label>
                <input
                  type="url"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  placeholder="https://github.com/..."
                  className="w-full px-4 py-3 rounded-xl bg-[#FFFFFF] border border-black/10 focus:border-orange-500/40 outline-none text-[#1A1A1D] placeholder-black/35 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1D]/60 mb-2">Live Demo URL</label>
                <input
                  type="url"
                  value={formData.live}
                  onChange={(e) => setFormData({ ...formData, live: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-4 py-3 rounded-xl bg-[#FFFFFF] border border-black/10 focus:border-orange-500/40 outline-none text-[#1A1A1D] placeholder-black/35 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1D]/60 mb-2">Tags / Technologies (comma separated)</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="React, Node.js, Tailwind"
                className="w-full px-4 py-3 rounded-xl bg-[#FFFFFF] border border-black/10 focus:border-orange-500/40 outline-none text-[#1A1A1D] placeholder-black/35 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1D]/60 mb-2">
                Project Gallery (Upload up to 4 pictures)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {formData.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative group aspect-video sm:aspect-square rounded-2xl border-2 border-dashed border-black/10 hover:border-orange-500/40 bg-black/[0.02] hover:bg-orange-500/[0.01] flex flex-col items-center justify-center overflow-hidden transition-all duration-300"
                  >
                    {img ? (
                      <>
                        <img
                          src={resolveImageUrl(img)}
                          alt={`Slot ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-[#1A1A1D]/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-all duration-200">
                          <label className="cursor-pointer px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-[10px] font-bold uppercase rounded-lg shadow-sm transition-colors">
                            Change
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(idx, e.target.files[0])}
                              className="hidden"
                            />
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              const newImages = [...formData.images];
                              newImages[idx] = '';
                              setFormData({ ...formData, images: newImages });
                            }}
                            className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold uppercase rounded-lg shadow-sm transition-colors border-none cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </>
                    ) : (
                      <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center gap-2 p-4 text-[#1A1A1D]/45 hover:text-orange-500 transition-colors text-center">
                        <PlusIcon className="w-6 h-6 stroke-[2]" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">
                          {idx === 0 ? 'Primary Image' : `Slot ${idx + 1}`}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(idx, e.target.files[0])}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1D]/60 mb-2">Features (one per line)</label>
              <textarea
                rows="3"
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                placeholder="Secure credit card payments with Stripe integration&#10;Real-time inventory sync"
                className="w-full px-4 py-3 rounded-xl bg-[#FFFFFF] border border-black/10 focus:border-orange-500/40 outline-none text-[#1A1A1D] placeholder-black/35 transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1D]/60 mb-2">Detailed Writeup / Technical Overview</label>
              <textarea
                rows="4"
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                placeholder="Provide a background context, technical stack detail, and overall implementation details."
                className="w-full px-4 py-3 rounded-xl bg-[#FFFFFF] border border-black/10 focus:border-orange-500/40 outline-none text-[#1A1A1D] placeholder-black/35 transition-all text-sm"
              />
            </div>

            <div className="flex gap-4 pt-4 border-t border-black/5">
              <button
                type="submit"
                className="flex-1 py-3.5 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20"
              >
                {editProject ? 'Update Project' : 'Publish Project'}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-3.5 border border-black/15 text-[#1A1A1D]/70 rounded-xl font-semibold hover:bg-[#F5F5F5] transition-colors"
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
    <div className="min-h-screen bg-[#F5F5F5] ambient-orange-glow py-24 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[10px] tracking-[0.25em] uppercase text-orange-500 font-bold">Admin Console</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <h1 className="font-['Lilita_One',sans-serif] text-4xl md:text-5xl font-normal text-[#1A1A1D]">Manage Projects</h1>
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
              className="inline-flex items-center gap-2 px-5 py-3 border border-black/15 text-[#1A1A1D]/70 hover:bg-[#FFFFFF] rounded-xl font-semibold transition-colors text-sm"
            >
              <ArrowLeftOnRectangleIcon className="w-4 h-4" />
              Sign Out
            </button>
            <button
              onClick={onBack}
              className="px-5 py-3 bg-[#1A1A1D] text-[#FFFFFF] hover:bg-[#1A1A1D]/90 rounded-xl font-semibold transition-colors text-sm"
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
              className="bg-[#FFFFFF] border border-black/5 rounded-2xl p-6 flex flex-col justify-between hover:shadow-[0_12px_36px_rgba(255,106,28,0.06)] transition-all duration-300 shadow-sm"
            >
              <div>
                <div className="flex items-center gap-3.5 mb-4">
                  {p.image ? (
                    <img
                      src={resolveImageUrl(p.image)}
                      alt={p.title}
                      className="w-12 h-12 rounded-xl object-cover border border-black/5"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-orange-500/5 border border-orange-500/15 flex items-center justify-center text-orange-500 text-xs font-bold">
                      Proj
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-base text-[#1A1A1D]">{p.title}</h3>
                    <p className="text-xs text-[#1A1A1D]/50 font-medium">ID: {p.id}</p>
                  </div>
                </div>
                <p className="text-sm text-[#4A4A4F]/85 leading-relaxed mb-4 line-clamp-2">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {p.tags.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded-full text-[10px] font-medium text-orange-500 bg-orange-500/5 border border-orange-500/20">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-black/5">
                <button
                  onClick={() => openForm(p)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-black/10 text-xs text-[#1A1A1D]/70 font-semibold hover:bg-[#F5F5F5] hover:text-[#1A1A1D] transition-colors"
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
            <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-dashed border-black/15 shadow-xs">
              <p className="text-sm text-[#1A1A1D]/50 font-medium">No projects added yet. Click "New Project" to add one.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
