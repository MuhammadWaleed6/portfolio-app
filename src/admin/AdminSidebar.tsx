import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaProjectDiagram, FaUsers, FaTools, FaEnvelope, FaInfoCircle, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import './AdminSidebar.css';

const AdminSidebar = () => {
  const location = useLocation();
  const { signOut } = useAuth();

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: <FaHome /> },
    { path: '/admin/home', label: 'Home Page', icon: <FaHome /> },
    { path: '/admin/projects', label: 'Projects', icon: <FaProjectDiagram /> },
    { path: '/admin/collaborators', label: 'Collaborators', icon: <FaUsers /> },
    { path: '/admin/skills', label: 'Skills', icon: <FaTools /> },
    { path: '/admin/messages', label: 'Messages', icon: <FaEnvelope /> },
    { path: '/admin/about', label: 'About', icon: <FaInfoCircle /> },
  ];

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <h2>Admin Panel</h2>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={location.pathname === item.path ? 'active' : ''}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <button className="logout-btn" onClick={signOut}>
        <FaSignOutAlt />
        <span>Logout</span>
      </button>
    </aside>
  );
};

export default AdminSidebar;
