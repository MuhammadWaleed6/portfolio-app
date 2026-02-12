import { useEffect, useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { supabase } from '../config/supabase';
import type { Skill } from '../types';
import AdminSidebar from './AdminSidebar';
import './AdminProjects.css';

const AdminSkills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'frontend' as 'frontend' | 'backend' | 'tools',
    percentage: 50,
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    const { data } = await supabase.from('skills').select('*');
    if (data) setSkills(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editing) {
      const { error } = await supabase.from('skills').update(formData).eq('id', editing.id);
      if (error) toast.error('Failed to update');
      else {
        toast.success('Updated successfully');
        resetForm();
        fetchSkills();
      }
    } else {
      const { error } = await supabase.from('skills').insert([formData]);
      if (error) toast.error('Failed to create');
      else {
        toast.success('Created successfully');
        resetForm();
        fetchSkills();
      }
    }
  };

  const handleEdit = (skill: Skill) => {
    setEditing(skill);
    setFormData({
      name: skill.name,
      category: skill.category,
      percentage: skill.percentage,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure?')) {
      const { error } = await supabase.from('skills').delete().eq('id', id);
      if (error) toast.error('Failed to delete');
      else {
        toast.success('Deleted successfully');
        fetchSkills();
      }
    }
  };

  const resetForm = () => {
    setFormData({ name: '', category: 'frontend', percentage: 50 });
    setEditing(null);
    setShowModal(false);
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <div className="admin-header">
          <h1>Manage Skills</h1>
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            <FaPlus /> Add Skill
          </button>
        </div>

        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Percentage</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill) => (
                <tr key={skill.id}>
                  <td>{skill.name}</td>
                  <td>{skill.category}</td>
                  <td>{skill.percentage}%</td>
                  <td>
                    <button className="btn-edit" onClick={() => handleEdit(skill)}>
                      <FaEdit />
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(skill.id)}>
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
              <h2>{editing ? 'Edit Skill' : 'Add Skill'}</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Skill Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  required
                >
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="tools">Tools</option>
                </select>
                <input
                  type="number"
                  placeholder="Percentage"
                  min="0"
                  max="100"
                  value={formData.percentage}
                  onChange={(e) => setFormData({ ...formData, percentage: parseInt(e.target.value) })}
                  required
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

export default AdminSkills;
