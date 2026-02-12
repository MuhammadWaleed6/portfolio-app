import { useEffect, useState } from 'react';
import { FaProjectDiagram, FaUsers, FaTools, FaEnvelope } from 'react-icons/fa';
import { supabase } from '../config/supabase';
import AdminSidebar from './AdminSidebar';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    collaborators: 0,
    skills: 0,
    messages: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const [projects, collaborators, skills, messages] = await Promise.all([
      supabase.from('projects').select('id', { count: 'exact', head: true }),
      supabase.from('collaborators').select('id', { count: 'exact', head: true }),
      supabase.from('skills').select('id', { count: 'exact', head: true }),
      supabase.from('messages').select('id', { count: 'exact', head: true }),
    ]);

    setStats({
      projects: projects.count || 0,
      collaborators: collaborators.count || 0,
      skills: skills.count || 0,
      messages: messages.count || 0,
    });
  };

  const statCards = [
    { label: 'Total Projects', value: stats.projects, icon: <FaProjectDiagram />, color: '#6366f1' },
    { label: 'Collaborators', value: stats.collaborators, icon: <FaUsers />, color: '#8b5cf6' },
    { label: 'Skills', value: stats.skills, icon: <FaTools />, color: '#ec4899' },
    { label: 'Messages', value: stats.messages, icon: <FaEnvelope />, color: '#10b981' },
  ];

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <div className="admin-header">
          <h1>Dashboard</h1>
        </div>

        <div className="stats-grid">
          {statCards.map((stat) => (
            <div key={stat.label} className="stat-card" style={{ borderColor: stat.color }}>
              <div className="stat-icon" style={{ color: stat.color }}>
                {stat.icon}
              </div>
              <div className="stat-info">
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
