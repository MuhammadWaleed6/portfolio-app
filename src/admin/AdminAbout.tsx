import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { supabase } from '../config/supabase';
import type { AboutContent } from '../types';
import AdminSidebar from './AdminSidebar';
import './AdminProjects.css';

const AdminAbout = () => {
  const [content, setContent] = useState<AboutContent | null>(null);
  const [formData, setFormData] = useState({
    hero_tagline: '',
    about_text: '',
    projects_completed: 0,
    clients_count: 0,
    years_experience: 0,
    profile_image_url: '',
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    const { data } = await supabase.from('about_content').select('*').single();
    if (data) {
      setContent(data);
      setFormData({
        hero_tagline: data.hero_tagline,
        about_text: data.about_text,
        projects_completed: data.projects_completed,
        clients_count: data.clients_count,
        years_experience: data.years_experience,
        profile_image_url: data.profile_image_url || '',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (content) {
      const { error } = await supabase.from('about_content').update(formData).eq('id', content.id);
      if (error) toast.error('Failed to update');
      else {
        toast.success('Updated successfully');
        fetchContent();
      }
    } else {
      const { error } = await supabase.from('about_content').insert([formData]);
      if (error) toast.error('Failed to create');
      else {
        toast.success('Created successfully');
        fetchContent();
      }
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <div className="admin-header">
          <h1>Manage About Content</h1>
        </div>

        <div className="modal-content" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <form onSubmit={handleSubmit}>
            <label>Hero Tagline</label>
            <textarea
              placeholder="Hero Tagline"
              value={formData.hero_tagline}
              onChange={(e) => setFormData({ ...formData, hero_tagline: e.target.value })}
              required
            />

            <label>About Text</label>
            <textarea
              placeholder="About Text"
              value={formData.about_text}
              onChange={(e) => setFormData({ ...formData, about_text: e.target.value })}
              required
              rows={8}
            />

            <label>Projects Completed</label>
            <input
              type="number"
              placeholder="Projects Completed"
              value={formData.projects_completed}
              onChange={(e) => setFormData({ ...formData, projects_completed: parseInt(e.target.value) })}
              required
            />

            <label>Clients Count</label>
            <input
              type="number"
              placeholder="Clients Count"
              value={formData.clients_count}
              onChange={(e) => setFormData({ ...formData, clients_count: parseInt(e.target.value) })}
              required
            />

            <label>Years Experience</label>
            <input
              type="number"
              placeholder="Years Experience"
              value={formData.years_experience}
              onChange={(e) => setFormData({ ...formData, years_experience: parseInt(e.target.value) })}
              required
            />

            <label>Profile Image URL</label>
            <input
              type="text"
              placeholder="Profile Image URL"
              value={formData.profile_image_url}
              onChange={(e) => setFormData({ ...formData, profile_image_url: e.target.value })}
            />

            <button type="submit" className="btn-primary">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAbout;
