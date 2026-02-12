-- =====================================================
-- PORTFOLIO APP - COMPLETE DATABASE SETUP
-- =====================================================

-- Drop existing tables if they exist (for fresh setup)
DROP TABLE IF EXISTS collaborator_projects CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS collaborators CASCADE;
DROP TABLE IF EXISTS skills CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS about_content CASCADE;
DROP TABLE IF EXISTS home_sections CASCADE;

-- =====================================================
-- CREATE TABLES
-- =====================================================

-- Collaborators table
CREATE TABLE collaborators (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  social_links JSONB DEFAULT '[]'::jsonb,
  portfolio_url TEXT,
  bio TEXT,
  email TEXT,
  phone TEXT,
  services JSONB DEFAULT '[]'::jsonb,
  technologies TEXT[] DEFAULT '{}',
  testimonials JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects table (main portfolio projects)
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  technologies TEXT[] NOT NULL,
  team_size INTEGER NOT NULL,
  my_role TEXT NOT NULL,
  other_contributions JSONB DEFAULT '[]'::jsonb,
  image_url TEXT NOT NULL,
  live_url TEXT,
  case_study TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Collaborator projects table (for individual collaborator portfolios)
CREATE TABLE collaborator_projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  collaborator_id UUID REFERENCES collaborators(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  technologies TEXT[] NOT NULL,
  image_url TEXT NOT NULL,
  live_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Skills table
CREATE TABLE skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('frontend', 'backend', 'tools')),
  percentage INTEGER NOT NULL CHECK (percentage >= 0 AND percentage <= 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages table (contact form submissions)
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- About content table
CREATE TABLE about_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  hero_tagline TEXT NOT NULL,
  about_text TEXT NOT NULL,
  projects_completed INTEGER DEFAULT 0,
  clients_count INTEGER DEFAULT 0,
  years_experience INTEGER DEFAULT 0,
  profile_image_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Home sections table (dynamic home page management)
CREATE TABLE home_sections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section_name TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  content JSONB NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- ENABLE ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaborators ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaborator_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_sections ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- CREATE POLICIES
-- =====================================================

-- Public read access policies
CREATE POLICY "Public can read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public can read collaborators" ON collaborators FOR SELECT USING (true);
CREATE POLICY "Public can read collaborator_projects" ON collaborator_projects FOR SELECT USING (true);
CREATE POLICY "Public can read skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Public can read about_content" ON about_content FOR SELECT USING (true);
CREATE POLICY "Public can read home_sections" ON home_sections FOR SELECT USING (true);

-- Public insert policy for messages
CREATE POLICY "Public can insert messages" ON messages FOR INSERT WITH CHECK (true);

-- Admin (authenticated users) full access policies
CREATE POLICY "Authenticated can do all on projects" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can do all on collaborators" ON collaborators FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can do all on collaborator_projects" ON collaborator_projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can do all on skills" ON skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can do all on messages" ON messages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can do all on about_content" ON about_content FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can do all on home_sections" ON home_sections FOR ALL USING (auth.role() = 'authenticated');

-- =====================================================
-- INSERT DEFAULT DATA
-- =====================================================

-- Insert default about content
INSERT INTO about_content (hero_tagline, about_text, projects_completed, clients_count, years_experience)
VALUES (
  'Building modern, scalable websites and web applications — independently and in collaboration with a trusted development team.',
  'I''m Adnan Cheema, a Full Stack Web Developer specializing in building modern, scalable web applications. I work both independently and in collaboration with a trusted team of developers, designers, and specialists.

My approach combines technical expertise with clear communication and accountability. Whether working solo or with my team, I ensure every project meets the highest standards of quality and performance.

I believe in transparency and collaboration, which is why I''m open about the talented people I work with on various projects.',
  50,
  30,
  5
);

-- Insert default home sections
INSERT INTO home_sections (section_name, title, content, display_order) VALUES
('hero', 'Hero Section', '{
  "heading": "Adnan Cheema",
  "subheading": "Full Stack Web Developer",
  "description": "Building modern, scalable websites and web applications"
}'::jsonb, 1),

('services', 'What I Do', '[
  {"icon": "FaCode", "title": "Web Development", "description": "Building responsive and modern websites using latest technologies"},
  {"icon": "FaRocket", "title": "Full Stack Solutions", "description": "End-to-end development from frontend to backend and deployment"},
  {"icon": "FaUsers", "title": "Team Collaboration", "description": "Working with talented developers and designers for complex projects"}
]'::jsonb, 2),

('why', 'Why Work With Me', '[
  {"title": "Quality Code", "description": "Clean, maintainable, and scalable code following best practices"},
  {"title": "On-Time Delivery", "description": "Meeting deadlines and delivering projects as promised"},
  {"title": "Clear Communication", "description": "Regular updates and transparent communication throughout"},
  {"title": "Flexible Approach", "description": "Solo or team-based solutions depending on project needs"}
]'::jsonb, 3),

('process', 'My Work Process', '[
  {"step": "01", "title": "Discovery", "description": "Understanding your requirements and project goals"},
  {"step": "02", "title": "Planning", "description": "Creating detailed project roadmap and timeline"},
  {"step": "03", "title": "Development", "description": "Building your project with clean and efficient code"},
  {"step": "04", "title": "Delivery", "description": "Testing, deployment, and ongoing support"}
]'::jsonb, 4),

('technologies', 'Technologies I Use', '["React", "Node.js", "TypeScript", "MongoDB", "PostgreSQL", "Next.js", "Express", "Tailwind CSS"]'::jsonb, 5),

('testimonials', 'Client Feedback', '[
  {"stars": 5, "text": "Excellent work! Delivered on time and exceeded expectations. Highly recommended for web development projects.", "client": "Client Name"},
  {"stars": 5, "text": "Professional, skilled, and great communication. The project was completed perfectly and on schedule.", "client": "Client Name"},
  {"stars": 5, "text": "Amazing developer! Clean code, modern design, and excellent problem-solving skills. Will work again!", "client": "Client Name"}
]'::jsonb, 6),

('cta', 'Have a Project in Mind?', '{
  "description": "Let''s work together to bring your ideas to life",
  "buttonText": "Get In Touch"
}'::jsonb, 7);

-- =====================================================
-- SAMPLE DATA (Optional - Remove if not needed)
-- =====================================================

-- Sample Skills
INSERT INTO skills (name, category, percentage) VALUES
('React', 'frontend', 95),
('TypeScript', 'frontend', 90),
('Node.js', 'backend', 90),
('PostgreSQL', 'backend', 85),
('MongoDB', 'backend', 85),
('Git', 'tools', 95),
('Docker', 'tools', 80);

-- Sample Collaborator
INSERT INTO collaborators (name, role, description, image_url, bio, email, phone, social_links, services, technologies, testimonials) VALUES
('John Doe', 'Frontend Developer', 'Specialized in creating beautiful user interfaces', 'https://via.placeholder.com/400', 
'Passionate frontend developer with 5+ years of experience in building modern web applications. I focus on creating intuitive and performant user interfaces.',
'john@example.com', '+1234567890',
'[{"platform": "LinkedIn", "url": "https://linkedin.com"}, {"platform": "GitHub", "url": "https://github.com"}]'::jsonb,
'[{"title": "UI/UX Design", "description": "Creating beautiful and intuitive user interfaces"}, {"title": "Frontend Development", "description": "Building responsive web applications"}]'::jsonb,
ARRAY['React', 'Vue.js', 'CSS', 'JavaScript'],
'[{"client": "Client A", "text": "Excellent work on our project!", "rating": 5}, {"client": "Client B", "text": "Very professional and skilled developer.", "rating": 5}]'::jsonb
);

-- =====================================================
-- SETUP COMPLETE
-- =====================================================
-- Run this script in your Supabase SQL Editor
-- Make sure to create an admin user in Supabase Authentication
-- =====================================================
