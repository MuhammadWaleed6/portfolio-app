import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';
import { toast } from 'react-toastify';
import type { Collaborator, CollaboratorProject } from '../types';
import AdminSidebar from './AdminSidebar';

const ManageCollaboratorPortfolio = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [collaborator, setCollaborator] = useState<Collaborator | null>(null);
  const [projects, setProjects] = useState<CollaboratorProject[]>([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState<CollaboratorProject | null>(null);
  const [formData, setFormData] = useState({
    bio: '',
    email: '',
    phone: '',
    portfolio_url: '',
    services: '',
    technologies: '',
    testimonials: ''
  });
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    technologies: '',
    image_url: '',
    live_url: ''
  });

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  const fetchData = async () => {
    const [collabRes, projectsRes] = await Promise.all([
      supabase.from('collaborators').select('*').eq('id', id).single(),
      supabase.from('collaborator_projects').select('*').eq('collaborator_id', id)
    ]);
    
    if (collabRes.data) {
      setCollaborator(collabRes.data);
      setFormData({
        bio: collabRes.data.bio || '',
        email: collabRes.data.email || '',
        phone: collabRes.data.phone || '',
        portfolio_url: collabRes.data.portfolio_url || '',
        services: JSON.stringify(collabRes.data.services || [], null, 2),
        technologies: (collabRes.data.technologies || []).join(', '),
        testimonials: JSON.stringify(collabRes.data.testimonials || [], null, 2)
      });
    }
    if (projectsRes.data) setProjects(projectsRes.data);
  };

  const handleUpdateCollaborator = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updateData = {
        bio: formData.bio,
        email: formData.email,
        phone: formData.phone,
        portfolio_url: formData.portfolio_url,
        services: formData.services ? JSON.parse(formData.services) : [],
        technologies: formData.technologies.split(',').map(t => t.trim()).filter(t => t),
        testimonials: formData.testimonials ? JSON.parse(formData.testimonials) : []
      };
      const { error } = await supabase.from('collaborators').update(updateData).eq('id', id);
      if (error) throw error;
      toast.success('Updated successfully');
      fetchData();
    } catch (err) {
      toast.error('Failed to update. Check JSON format.');
    }
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...projectForm,
      technologies: projectForm.technologies.split(',').map(t => t.trim()),
      collaborator_id: id
    };

    if (editingProject) {
      const { error } = await supabase.from('collaborator_projects').update(data).eq('id', editingProject.id);
      if (error) toast.error('Failed to update project');
      else toast.success('Project updated');
    } else {
      const { error } = await supabase.from('collaborator_projects').insert(data);
      if (error) toast.error('Failed to add project');
      else toast.success('Project added');
    }

    setShowProjectForm(false);
    setEditingProject(null);
    setProjectForm({ title: '', description: '', technologies: '', image_url: '', live_url: '' });
    fetchData();
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!window.confirm('Delete this project?')) return;
    const { error } = await supabase.from('collaborator_projects').delete().eq('id', projectId);
    if (error) toast.error('Failed to delete');
    else {
      toast.success('Project deleted');
      fetchData();
    }
  };

  const handleEditProject = (project: CollaboratorProject) => {
    setEditingProject(project);
    setProjectForm({
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(', '),
      image_url: project.image_url,
      live_url: project.live_url || ''
    });
    setShowProjectForm(true);
  };

  if (!collaborator) return <div>Loading...</div>;

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <div className="admin-header">
          <h1>Manage Portfolio: {collaborator.name}</h1>
          <button onClick={() => navigate('/admin/collaborators')} className="btn-secondary">Back</button>
        </div>

        <div className="card">
          <h2>Portfolio Information</h2>
          <form onSubmit={handleUpdateCollaborator}>
            <div className="form-group">
              <label>Bio</label>
              <textarea value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} rows={4} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Portfolio URL</label>
              <input type="text" value={formData.portfolio_url} onChange={(e) => setFormData({...formData, portfolio_url: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Services (JSON format)</label>
              <textarea value={formData.services} onChange={(e) => setFormData({...formData, services: e.target.value})} rows={4} style={{fontFamily: 'monospace'}} placeholder='[{"title": "Service Name", "description": "Service description"}]' />
            </div>
            <div className="form-group">
              <label>Technologies (comma-separated)</label>
              <input type="text" value={formData.technologies} onChange={(e) => setFormData({...formData, technologies: e.target.value})} placeholder="React, Node.js, MongoDB" />
            </div>
            <div className="form-group">
              <label>Testimonials (JSON format)</label>
              <textarea value={formData.testimonials} onChange={(e) => setFormData({...formData, testimonials: e.target.value})} rows={4} style={{fontFamily: 'monospace'}} placeholder='[{"client": "Client Name", "text": "Testimonial text", "rating": 5}]' />
            </div>
            <button type="submit" className="btn-primary">Update Info</button>
          </form>
        </div>

        <div className="card" style={{marginTop: '30px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
            <h2>Projects</h2>
            <button onClick={() => { setShowProjectForm(true); setEditingProject(null); setProjectForm({ title: '', description: '', technologies: '', image_url: '', live_url: '' }); }} className="btn-primary">Add Project</button>
          </div>

          {showProjectForm && (
            <form onSubmit={handleProjectSubmit} style={{marginBottom: '30px', padding: '20px', background: '#f5f5f5', borderRadius: '8px'}}>
              <h3>{editingProject ? 'Edit Project' : 'Add Project'}</h3>
              <div className="form-group">
                <label>Title</label>
                <input type="text" value={projectForm.title} onChange={(e) => setProjectForm({...projectForm, title: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea value={projectForm.description} onChange={(e) => setProjectForm({...projectForm, description: e.target.value})} required rows={3} />
              </div>
              <div className="form-group">
                <label>Technologies (comma-separated)</label>
                <input type="text" value={projectForm.technologies} onChange={(e) => setProjectForm({...projectForm, technologies: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input type="text" value={projectForm.image_url} onChange={(e) => setProjectForm({...projectForm, image_url: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Live URL</label>
                <input type="text" value={projectForm.live_url} onChange={(e) => setProjectForm({...projectForm, live_url: e.target.value})} />
              </div>
              <div style={{display: 'flex', gap: '10px'}}>
                <button type="submit" className="btn-primary">{editingProject ? 'Update' : 'Add'}</button>
                <button type="button" onClick={() => { setShowProjectForm(false); setEditingProject(null); }} className="btn-secondary">Cancel</button>
              </div>
            </form>
          )}

          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Technologies</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(project => (
                <tr key={project.id}>
                  <td>{project.title}</td>
                  <td>{project.technologies.join(', ')}</td>
                  <td>
                    <button onClick={() => handleEditProject(project)} className="btn-edit">Edit</button>
                    <button onClick={() => handleDeleteProject(project.id)} className="btn-delete">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {projects.length === 0 && <p style={{textAlign: 'center', color: '#888'}}>No projects yet</p>}
        </div>
      </div>
    </div>
  );
};

export default ManageCollaboratorPortfolio;
