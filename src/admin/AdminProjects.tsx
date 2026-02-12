import { useEffect, useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { supabase } from '../config/supabase';
import type { Project } from '../types';
import AdminSidebar from './AdminSidebar';
import './AdminProjects.css';

const AdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    team_size: 1,
    my_role: '',
    other_contributions: '',
    image_url: '',
    live_url: '',
    case_study: '',
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (data) setProjects(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const projectData = {
      ...formData,
      technologies: formData.technologies.split(',').map(t => t.trim()),
      other_contributions: formData.other_contributions
        ? JSON.parse(formData.other_contributions)
        : [],
    };

    if (editingProject) {
      const { error } = await supabase
        .from('projects')
        .update(projectData)
        .eq('id', editingProject.id);

      if (error) {
        toast.error('Failed to update project');
      } else {
        toast.success('Project updated successfully');
        resetForm();
        fetchProjects();
      }
    } else {
      const { error } = await supabase.from('projects').insert([projectData]);

      if (error) {
        toast.error('Failed to create project');
      } else {
        toast.success('Project created successfully');
        resetForm();
        fetchProjects();
      }
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(', '),
      team_size: project.team_size,
      my_role: project.my_role,
      other_contributions: JSON.stringify(project.other_contributions || []),
      image_url: project.image_url,
      live_url: project.live_url || '',
      case_study: project.case_study || '',
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const { error } = await supabase.from('projects').delete().eq('id', id);

      if (error) {
        toast.error('Failed to delete project');
      } else {
        toast.success('Project deleted successfully');
        fetchProjects();
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      technologies: '',
      team_size: 1,
      my_role: '',
      other_contributions: '',
      image_url: '',
      live_url: '',
      case_study: '',
    });
    setEditingProject(null);
    setShowModal(false);
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <div className="admin-header">
          <h1>Manage Projects</h1>
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            <FaPlus /> Add Project
          </button>
        </div>

        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Technologies</th>
                <th>Team Size</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>{project.title}</td>
                  <td>{project.technologies.join(', ')}</td>
                  <td>{project.team_size}</td>
                  <td>
                    <button className="btn-edit" onClick={() => handleEdit(project)}>
                      <FaEdit />
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(project.id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="modal-overlay" onClick={resetForm}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>{editingProject ? 'Edit Project' : 'Add Project'}</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
                <textarea
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Technologies (comma separated)"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  required
                />
                <input
                  type="number"
                  placeholder="Team Size"
                  value={formData.team_size}
                  onChange={(e) => setFormData({ ...formData, team_size: parseInt(e.target.value) })}
                  required
                />
                <input
                  type="text"
                  placeholder="My Role"
                  value={formData.my_role}
                  onChange={(e) => setFormData({ ...formData, my_role: e.target.value })}
                  required
                />
                <textarea
                  placeholder='Other Contributions (JSON: [{"name":"Ahmad","role":"Backend"}])'
                  value={formData.other_contributions}
                  onChange={(e) => setFormData({ ...formData, other_contributions: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Live URL (optional)"
                  value={formData.live_url}
                  onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                />
                <textarea
                  placeholder="Case Study (optional)"
                  value={formData.case_study}
                  onChange={(e) => setFormData({ ...formData, case_study: e.target.value })}
                />
                <div className="modal-buttons">
                  <button type="submit" className="btn-primary">
                    {editingProject ? 'Update' : 'Create'}
                  </button>
                  <button type="button" className="btn-secondary" onClick={resetForm}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProjects;
