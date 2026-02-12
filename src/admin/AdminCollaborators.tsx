import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaBriefcase } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { supabase } from '../config/supabase';
import type { Collaborator } from '../types';
import AdminSidebar from './AdminSidebar';
import './AdminProjects.css';

const AdminCollaborators = () => {
  const navigate = useNavigate();
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Collaborator | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    description: '',
    image_url: '',
    social_links: '',
  });

  useEffect(() => {
    fetchCollaborators();
  }, []);

  const fetchCollaborators = async () => {
    const { data } = await supabase.from('collaborators').select('*');
    if (data) setCollaborators(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const collabData = {
      ...formData,
      social_links: formData.social_links ? JSON.parse(formData.social_links) : [],
    };

    if (editing) {
      const { error } = await supabase.from('collaborators').update(collabData).eq('id', editing.id);
      if (error) toast.error('Failed to update');
      else {
        toast.success('Updated successfully');
        resetForm();
        fetchCollaborators();
      }
    } else {
      const { error } = await supabase.from('collaborators').insert([collabData]);
      if (error) toast.error('Failed to create');
      else {
        toast.success('Created successfully');
        resetForm();
        fetchCollaborators();
      }
    }
  };

  const handleEdit = (collab: Collaborator) => {
    setEditing(collab);
    setFormData({
      name: collab.name,
      role: collab.role,
      description: collab.description,
      image_url: collab.image_url,
      social_links: JSON.stringify(collab.social_links || []),
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure?')) {
      const { error } = await supabase.from('collaborators').delete().eq('id', id);
      if (error) toast.error('Failed to delete');
      else {
        toast.success('Deleted successfully');
        fetchCollaborators();
      }
    }
  };

  const resetForm = () => {
    setFormData({ name: '', role: '', description: '', image_url: '', social_links: '' });
    setEditing(null);
    setShowModal(false);
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <div className="admin-header">
          <h1>Manage Collaborators</h1>
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            <FaPlus /> Add Collaborator
          </button>
        </div>

        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {collaborators.map((collab) => (
                <tr key={collab.id}>
                  <td>{collab.name}</td>
                  <td>{collab.role}</td>
                  <td>{collab.description}</td>
                  <td>
                    <button className="btn-primary" onClick={() => navigate(`/admin/collaborators/${collab.id}/portfolio`)} title="Manage Portfolio">
                      <FaBriefcase />
                    </button>
                    <button className="btn-edit" onClick={() => handleEdit(collab)}>
                      <FaEdit />
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(collab.id)}>
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
              <h2>{editing ? 'Edit Collaborator' : 'Add Collaborator'}</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
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
                  placeholder="Image URL"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  required
                />
                <textarea
                  placeholder='Social Links (JSON: [{"platform":"LinkedIn","url":"..."}])'
                  value={formData.social_links}
                  onChange={(e) => setFormData({ ...formData, social_links: e.target.value })}
                />
                <div className="modal-buttons">
                  <button type="submit" className="btn-primary">
                    {editing ? 'Update' : 'Create'}
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

export default AdminCollaborators;
