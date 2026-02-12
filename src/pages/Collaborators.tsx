import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaTwitter, FaGlobe } from 'react-icons/fa';
import { supabase } from '../config/supabase';
import type { Collaborator } from '../types';
import './Collaborators.css';

const Collaborators = () => {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCollaborators();
  }, []);

  const fetchCollaborators = async () => {
    const { data } = await supabase
      .from('collaborators')
      .select('*')
      .order('created_at', { ascending: true });
    if (data) setCollaborators(data);
    setLoading(false);
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin': return <FaLinkedin />;
      case 'github': return <FaGithub />;
      case 'twitter': return <FaTwitter />;
      default: return <FaGlobe />;
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <section className="collaborators-page">
      <div className="container">
        <motion.h1
          className="section-title"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          People I Collaborate With
        </motion.h1>

        <div className="collaborators-grid">
          {collaborators.map((collab, index) => (
            <motion.div
              key={collab.id}
              className="collaborator-card card"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="collab-image">
                <img src={collab.image_url} alt={collab.name} />
              </div>
              <h3>{collab.name}</h3>
              <h4>{collab.role}</h4>
              <p>{collab.description}</p>
              
              {collab.social_links && collab.social_links.length > 0 && (
                <div className="social-links">
                  {collab.social_links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {getSocialIcon(link.platform)}
                    </a>
                  ))}
                </div>
              )}
              
              <Link to={`/collaborator/${collab.id}`} className="btn-primary portfolio-btn">
                View My Portfolio
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collaborators;
