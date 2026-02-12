import { useEffect, useState } from 'react';
import { supabase } from '../config/supabase';
import { toast } from 'react-toastify';
import type { HomeSection } from '../types';
import AdminSidebar from './AdminSidebar';

const AdminHome = () => {
  const [sections, setSections] = useState<HomeSection[]>([]);
  const [editingSection, setEditingSection] = useState<HomeSection | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    const { data } = await supabase.from('home_sections').select('*').order('display_order');
    if (data) setSections(data);
  };

  const handleEdit = (section: HomeSection) => {
    setEditingSection(section);
    setFormData({
      title: section.title,
      content: JSON.stringify(section.content, null, 2)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSection) return;

    try {
      const content = JSON.parse(formData.content);
      const { error } = await supabase
        .from('home_sections')
        .update({ title: formData.title, content, updated_at: new Date().toISOString() })
        .eq('id', editingSection.id);

      if (error) throw error;
      toast.success('Section updated');
      setEditingSection(null);
      fetchSections();
    } catch (err) {
      toast.error('Invalid JSON or update failed');
    }
  };

  const toggleActive = async (section: HomeSection) => {
    const { error } = await supabase
      .from('home_sections')
      .update({ is_active: !section.is_active })
      .eq('id', section.id);

    if (error) toast.error('Failed to update');
    else {
      toast.success('Status updated');
      fetchSections();
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <div className="admin-header">
          <h1>Home Page Management</h1>
        </div>

        {editingSection && (
          <div className="card" style={{marginBottom: '30px'}}>
            <h2>Edit Section: {editingSection.section_name}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Content (JSON)</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  rows={10}
                  required
                  style={{fontFamily: 'monospace'}}
                />
                <small>Enter valid JSON format</small>
              </div>
              <div style={{display: 'flex', gap: '10px'}}>
                <button type="submit" className="btn-primary">Update</button>
                <button type="button" onClick={() => setEditingSection(null)} className="btn-secondary">Cancel</button>
              </div>
            </form>
          </div>
        )}

        <div className="card">
          <h2>Home Sections</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Section</th>
                <th>Title</th>
                <th>Status</th>
                <th>Order</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sections.map(section => (
                <tr key={section.id}>
                  <td><strong>{section.section_name}</strong></td>
                  <td>{section.title}</td>
                  <td>
                    <span className={`badge ${section.is_active ? 'badge-success' : 'badge-danger'}`}>
                      {section.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>{section.display_order}</td>
                  <td>
                    <button onClick={() => handleEdit(section)} className="btn-edit">Edit</button>
                    <button onClick={() => toggleActive(section)} className="btn-secondary">
                      {section.is_active ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
