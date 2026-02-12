import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCode, FaRocket, FaUsers, FaLightbulb, FaStar, FaCheckCircle } from 'react-icons/fa';
import { supabase } from '../config/supabase';
import type { AboutContent } from '../types';
import './Home.css';

const Home = () => {
  const [content, setContent] = useState<AboutContent | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    const { data } = await supabase.from('about_content').select('*').single();
    if (data) setContent(data);
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Adnan Cheema
            </motion.h1>
            
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Full Stack Web Developer
            </motion.h2>
            
            <motion.p
              className="hero-description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {content?.hero_tagline || 
                "Building modern, scalable websites and web applications — independently and in collaboration with a trusted development team."}
            </motion.p>
            
            <motion.div
              className="hero-buttons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Link to="/projects" className="btn-primary">View My Work</Link>
              <Link to="/contact" className="btn-secondary">Contact Me</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <motion.div
              className="stat-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3>{content?.projects_completed || 50}+</h3>
              <p>Projects Completed</p>
            </motion.div>
            <motion.div
              className="stat-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3>{content?.clients_count || 30}+</h3>
              <p>Happy Clients</p>
            </motion.div>
            <motion.div
              className="stat-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3>{content?.years_experience || 5}+</h3>
              <p>Years Experience</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <h2 className="section-title">What I Do</h2>
          <div className="services-grid">
            <motion.div
              className="service-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <FaCode className="service-icon" />
              <h3>Web Development</h3>
              <p>Building responsive and modern websites using latest technologies</p>
            </motion.div>
            <motion.div
              className="service-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <FaRocket className="service-icon" />
              <h3>Full Stack Solutions</h3>
              <p>End-to-end development from frontend to backend and deployment</p>
            </motion.div>
            <motion.div
              className="service-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <FaUsers className="service-icon" />
              <h3>Team Collaboration</h3>
              <p>Working with talented developers and designers for complex projects</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Me Section */}
      <section className="why-section">
        <div className="container">
          <h2 className="section-title">Why Work With Me</h2>
          <div className="why-grid">
            <motion.div
              className="why-item"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <FaCheckCircle className="why-icon" />
              <div>
                <h3>Quality Code</h3>
                <p>Clean, maintainable, and scalable code following best practices</p>
              </div>
            </motion.div>
            <motion.div
              className="why-item"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <FaCheckCircle className="why-icon" />
              <div>
                <h3>On-Time Delivery</h3>
                <p>Meeting deadlines and delivering projects as promised</p>
              </div>
            </motion.div>
            <motion.div
              className="why-item"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <FaCheckCircle className="why-icon" />
              <div>
                <h3>Clear Communication</h3>
                <p>Regular updates and transparent communication throughout</p>
              </div>
            </motion.div>
            <motion.div
              className="why-item"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <FaCheckCircle className="why-icon" />
              <div>
                <h3>Flexible Approach</h3>
                <p>Solo or team-based solutions depending on project needs</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section">
        <div className="container">
          <h2 className="section-title">My Work Process</h2>
          <div className="process-grid">
            <motion.div
              className="process-step"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="step-number">01</div>
              <h3>Discovery</h3>
              <p>Understanding your requirements and project goals</p>
            </motion.div>
            <motion.div
              className="process-step"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="step-number">02</div>
              <h3>Planning</h3>
              <p>Creating detailed project roadmap and timeline</p>
            </motion.div>
            <motion.div
              className="process-step"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="step-number">03</div>
              <h3>Development</h3>
              <p>Building your project with clean and efficient code</p>
            </motion.div>
            <motion.div
              className="process-step"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="step-number">04</div>
              <h3>Delivery</h3>
              <p>Testing, deployment, and ongoing support</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="tech-section">
        <div className="container">
          <h2 className="section-title">Technologies I Use</h2>
          <motion.div
            className="tech-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="tech-item">React</div>
            <div className="tech-item">Node.js</div>
            <div className="tech-item">TypeScript</div>
            <div className="tech-item">MongoDB</div>
            <div className="tech-item">PostgreSQL</div>
            <div className="tech-item">Next.js</div>
            <div className="tech-item">Express</div>
            <div className="tech-item">Tailwind CSS</div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">Client Feedback</h2>
          <div className="testimonials-grid">
            <motion.div
              className="testimonial-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="stars">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <p>"Excellent work! Delivered on time and exceeded expectations. Highly recommended for web development projects."</p>
              <h4>— Client Name</h4>
            </motion.div>
            <motion.div
              className="testimonial-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="stars">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <p>"Professional, skilled, and great communication. The project was completed perfectly and on schedule."</p>
              <h4>— Client Name</h4>
            </motion.div>
            <motion.div
              className="testimonial-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="stars">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <p>"Amazing developer! Clean code, modern design, and excellent problem-solving skills. Will work again!"</p>
              <h4>— Client Name</h4>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <FaLightbulb className="cta-icon" />
            <h2>Have a Project in Mind?</h2>
            <p>Let's work together to bring your ideas to life</p>
            <Link to="/contact" className="btn-danger">Get In Touch</Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
