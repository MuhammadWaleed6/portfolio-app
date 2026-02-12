-- Create projects table
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

-- Create collaborators table
CREATE TABLE collaborators (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  social_links JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create skills table
CREATE TABLE skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('frontend', 'backend', 'tools')),
  percentage INTEGER NOT NULL CHECK (percentage >= 0 AND percentage <= 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create messages table
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create about_content table
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

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaborators ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public can read collaborators" ON collaborators FOR SELECT USING (true);
CREATE POLICY "Public can read skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Public can read about_content" ON about_content FOR SELECT USING (true);

-- Create policy for public to insert messages
CREATE POLICY "Public can insert messages" ON messages FOR INSERT WITH CHECK (true);

-- Create policies for authenticated users (admin)
CREATE POLICY "Authenticated can do all on projects" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can do all on collaborators" ON collaborators FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can do all on skills" ON skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can do all on messages" ON messages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can do all on about_content" ON about_content FOR ALL USING (auth.role() = 'authenticated');

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
