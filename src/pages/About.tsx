import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../config/supabase';
import type { AboutContent } from '../types';
import './About.css';

const About = () => {
  const [content, setContent] = useState<AboutContent | null>(null);
  const [counters, setCounters] = useState({ projects: 0, clients: 0, experience: 0 });

  useEffect(() => {
    fetchContent();
  }, []);

  useEffect(() => {
    if (content) {
      animateCounters();
    }
  }, [content]);

  const fetchContent = async () => {
    const { data } = await supabase.from('about_content').select('*').single();
    if (data) setContent(data);
  };

  const animateCounters = () => {
    if (!content) return;
    
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setCounters({
        projects: Math.floor(content.projects_completed * progress),
        clients: Math.floor(content.clients_count * progress),
        experience: Math.floor(content.years_experience * progress),
      });

      if (step >= steps) clearInterval(timer);
    }, interval);
  };

  return (
    <section className="about-page">
      <div className="container">
        <motion.h1
          className="section-title"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h1>

        <div className="about-content-wrapper">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p>
              {content?.about_text || 
                `I'm Adnan Cheema, a Full Stack Web Developer specializing in building modern, 
                scalable web applications. I work both independently and in collaboration with 
                a trusted team of developers, designers, and specialists.
                
                My approach combines technical expertise with clear communication and accountability. 
                Whether working solo or with my team, I ensure every project meets the highest 
                standards of quality and performance.
                
                I believe in transparency and collaboration, which is why I'm open about the 
                talented people I work with on various projects.`}
            </p>
          </motion.div>

          {content?.profile_image_url && (
            <motion.div
              className="about-image"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <img src={content.profile_image_url} alt="Adnan Cheema" />
            </motion.div>
          )}
        </div>

        <motion.div
          className="counters"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="counter-item">
            <h3>{counters.projects}+</h3>
            <p>Projects Completed</p>
          </div>
          <div className="counter-item">
            <h3>{counters.clients}+</h3>
            <p>Happy Clients</p>
          </div>
          <div className="counter-item">
            <h3>{counters.experience}+</h3>
            <p>Years Experience</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
