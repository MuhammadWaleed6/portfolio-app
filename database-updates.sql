-- Add portfolio fields to collaborators table
ALTER TABLE collaborators ADD COLUMN IF NOT EXISTS portfolio_url TEXT;
ALTER TABLE collaborators ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE collaborators ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE collaborators ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE collaborators ADD COLUMN IF NOT EXISTS services JSONB DEFAULT '[]'::jsonb;
ALTER TABLE collaborators ADD COLUMN IF NOT EXISTS technologies TEXT[] DEFAULT '{}';
ALTER TABLE collaborators ADD COLUMN IF NOT EXISTS testimonials JSONB DEFAULT '[]'::jsonb;

-- Create collaborator_projects table
CREATE TABLE IF NOT EXISTS collaborator_projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  collaborator_id UUID REFERENCES collaborators(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  technologies TEXT[] NOT NULL,
  image_url TEXT NOT NULL,
  live_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create home_sections table
CREATE TABLE IF NOT EXISTS home_sections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section_name TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  content JSONB NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  display_order INTEGER NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE collaborator_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_sections ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public can read collaborator_projects" ON collaborator_projects FOR SELECT USING (true);
CREATE POLICY "Authenticated can do all on collaborator_projects" ON collaborator_projects FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public can read home_sections" ON home_sections FOR SELECT USING (true);
CREATE POLICY "Authenticated can do all on home_sections" ON home_sections FOR ALL USING (auth.role() = 'authenticated');

-- Insert default home sections
INSERT INTO home_sections (section_name, title, content, display_order) VALUES
('hero', 'Hero Section', '{"heading": "Hi, I''m Adnan Cheema", "subheading": "Full Stack Web Developer", "description": "Building modern, scalable websites and web applications"}', 1),
('about_preview', 'About Preview', '{"text": "I specialize in creating modern web applications with clean code and great user experience."}', 2),
('services', 'Services', '{"items": [{"title": "Web Development", "description": "Full-stack web applications"}, {"title": "UI/UX Design", "description": "Modern and responsive designs"}]}', 3)
ON CONFLICT (section_name) DO NOTHING;
