import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa';
import { supabase } from '../config/supabase';
import type { Project } from '../types';
import './ProjectDetail.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();
    if (data) setProject(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="project-detail-page">
        <div className="container">
          <h2>Project not found</h2>
          <Link to="/projects" className="btn-primary">
            <FaArrowLeft /> Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="project-detail-page">
      <div className="container">
        <Link to="/projects" className="back-btn">
          <FaArrowLeft /> Back to Projects
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="project-title">{project.title}</h1>
          
          <div className="project-detail-image">
            <img src={project.image_url} alt={project.title} />
          </div>

          <div className="project-detail-content">
            <div className="detail-section">
              <h2>Overview</h2>
              <p>{project.description}</p>
            </div>

            <div className="detail-section">
              <h2>Technologies Used</h2>
              <div className="tech-list">
                {project.technologies.map((tech) => (
                  <span key={tech} className="tech-badge">{tech}</span>
                ))}
              </div>
            </div>

            <div className="detail-grid">
              <div className="detail-section">
                <h2>Team Size</h2>
                <p className="highlight">{project.team_size} members</p>
              </div>

              <div className="detail-section">
                <h2>My Role</h2>
                <p className="highlight">{project.my_role}</p>
              </div>
            </div>

            {project.other_contributions && project.other_contributions.length > 0 && (
              <div className="detail-section">
                <h2>Team Contributions</h2>
                <div className="contributions-list">
                  {project.other_contributions.map((contrib, i) => (
                    <div key={i} className="contribution-item">
                      <strong>{contrib.role}</strong>
                      <span>{contrib.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.case_study && (
              <div className="detail-section">
                <h2>Case Study</h2>
                <div className="case-study-content">
                  {project.case_study}
                </div>
              </div>
            )}

            {project.live_url && (
              <div className="detail-section">
                <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  <FaExternalLinkAlt /> View Live Project
                </a>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectDetail;
