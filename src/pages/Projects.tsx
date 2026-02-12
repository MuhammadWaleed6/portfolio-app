import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaFileAlt } from 'react-icons/fa';
import { supabase } from '../config/supabase';
import type { Project } from '../types';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedTech, setSelectedTech] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedTech === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((p) => p.technologies.includes(selectedTech))
      );
    }
  }, [selectedTech, projects]);

  const fetchProjects = async () => {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) {
      setProjects(data);
      setFilteredProjects(data);
    }
    setLoading(false);
  };

  const allTechnologies = ['All', ...new Set(projects.flatMap((p) => p.technologies))];

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <section className="projects-page">
      <div className="container">
        <motion.h1
          className="section-title"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          My Projects
        </motion.h1>

        <div className="filter-buttons">
          {allTechnologies.map((tech) => (
            <button
              key={tech}
              className={`filter-btn ${selectedTech === tech ? 'active' : ''}`}
              onClick={() => setSelectedTech(tech)}
            >
              {tech}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card card"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="project-image">
                <img src={project.image_url} alt={project.title} />
              </div>
              
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                
                <div className="project-tech">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>

                <div className="project-info">
                  <div className="info-item">
                    <strong>Team Size:</strong> {project.team_size}
                  </div>
                  <div className="info-item">
                    <strong>My Role:</strong> {project.my_role}
                  </div>
                </div>

                {project.other_contributions && project.other_contributions.length > 0 && (
                  <div className="contributions">
                    <strong>Other Contributions:</strong>
                    <ul>
                      {project.other_contributions.map((contrib, i) => (
                        <li key={i}>{contrib.role} – {contrib.name}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="project-buttons">
                  {project.live_url && (
                    <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="btn-primary">
                      <FaExternalLinkAlt /> Live Preview
                    </a>
                  )}
                  <Link to={`/projects/${project.id}`} className="btn-secondary">
                    <FaFileAlt /> Case Study
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
