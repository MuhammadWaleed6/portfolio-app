import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaTwitter, FaGlobe, FaEnvelope, FaPhone, FaStar } from 'react-icons/fa';
import { supabase } from '../config/supabase';
import type { Collaborator, CollaboratorProject } from '../types';
import './CollaboratorPortfolio.css';

const CollaboratorPortfolio = () => {
  const { id } = useParams();
  const [collaborator, setCollaborator] = useState<Collaborator | null>(null);
  const [projects, setProjects] = useState<CollaboratorProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    const [collabRes, projectsRes] = await Promise.all([
      supabase.from('collaborators').select('*').eq('id', id).single(),
      supabase.from('collaborator_projects').select('*').eq('collaborator_id', id)
    ]);
    
    if (collabRes.data) setCollaborator(collabRes.data);
    if (projectsRes.data) setProjects(projectsRes.data);
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

  if (loading) return <div className="loading"><div className="spinner"></div></div>;
  if (!collaborator) return <div className="container"><h2>Collaborator not found</h2></div>;

  return (
    <section className="collaborator-portfolio">
      <div className="container">
        {/* Hero Section - Left Aligned */}
        <motion.div className="portfolio-hero" initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
          <div className="row align-items-center">
            <div className="col-md-6">
              <img src={collaborator.image_url} alt={collaborator.name} className="profile-img" />
            </div>
            <div className="col-md-6">
              <h1>{collaborator.name}</h1>
              <h3>{collaborator.role}</h3>
              <p className="bio">{collaborator.bio || collaborator.description}</p>
              
              <div className="contact-info">
                {collaborator.email && (
                  <a href={`mailto:${collaborator.email}`}><FaEnvelope /> {collaborator.email}</a>
                )}
                {collaborator.phone && (
                  <a href={`tel:${collaborator.phone}`}><FaPhone /> {collaborator.phone}</a>
                )}
              </div>

              {collaborator.social_links && collaborator.social_links.length > 0 && (
                <div className="social-links">
                  {collaborator.social_links.map((link, i) => (
                    <a key={i} href={link.url} target="_blank" rel="noopener noreferrer">
                      {getSocialIcon(link.platform)}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Projects Section */}
        <motion.div className="portfolio-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <h2>My Projects</h2>
          <div className="row">
            {projects.map((project, index) => (
              <div key={project.id} className="col-md-6 mb-4">
                <motion.div className="project-card card" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                  <img src={project.image_url} alt={project.title} />
                  <div className="card-body">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="tech-tags">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                    {project.live_url && (
                      <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="btn-primary">
                        View Project
                      </a>
                    )}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
          {projects.length === 0 && <p className="no-content">No projects yet</p>}
        </motion.div>

        {/* Services Section */}
        {collaborator.services && collaborator.services.length > 0 && (
          <motion.div className="portfolio-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <h2>Services I Provide</h2>
            <div className="row">
              {collaborator.services.map((service, i) => (
                <div key={i} className="col-md-6 mb-4">
                  <div className="service-card card">
                    <h4>{service.title}</h4>
                    <p>{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Technologies Section */}
        {collaborator.technologies && collaborator.technologies.length > 0 && (
          <motion.div className="portfolio-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <h2>Technologies I Use</h2>
            <div className="row align-items-center">
              <div className="col-md-6">
                <img src={collaborator.image_url} alt={collaborator.name} className="tech-section-img" />
              </div>
              <div className="col-md-6">
                <div className="tech-grid">
                  {collaborator.technologies.map((tech, i) => (
                    <span key={i} className="tech-badge">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Testimonials Section */}
        {collaborator.testimonials && collaborator.testimonials.length > 0 && (
          <motion.div className="portfolio-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <h2>Client Testimonials</h2>
            <div className="row">
              {collaborator.testimonials.map((testimonial, i) => (
                <div key={i} className="col-md-6 mb-4">
                  <div className="testimonial-card card">
                    <div className="stars">
                      {[...Array(testimonial.rating)].map((_, idx) => (
                        <FaStar key={idx} />
                      ))}
                    </div>
                    <p>"{testimonial.text}"</p>
                    <h5>- {testimonial.client}</h5>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CollaboratorPortfolio;
