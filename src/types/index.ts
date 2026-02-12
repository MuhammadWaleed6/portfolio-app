export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  team_size: number;
  my_role: string;
  other_contributions: { name: string; role: string }[];
  image_url: string;
  live_url?: string;
  case_study?: string;
  created_at: string;
}

export interface Collaborator {
  id: string;
  name: string;
  role: string;
  description: string;
  image_url: string;
  social_links?: { platform: string; url: string }[];
  portfolio_url?: string;
  bio?: string;
  email?: string;
  phone?: string;
  services?: { title: string; description: string }[];
  technologies?: string[];
  testimonials?: { client: string; text: string; rating: number }[];
  created_at: string;
}

export interface CollaboratorProject {
  id: string;
  collaborator_id: string;
  title: string;
  description: string;
  technologies: string[];
  image_url: string;
  live_url?: string;
  created_at: string;
}

export interface HomeSection {
  id: string;
  section_name: string;
  title: string;
  content: any;
  is_active: boolean;
  display_order: number;
  updated_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'tools';
  percentage: number;
  created_at: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface AboutContent {
  id: string;
  hero_tagline: string;
  about_text: string;
  projects_completed: number;
  clients_count: number;
  years_experience: number;
  profile_image_url?: string;
  updated_at: string;
}
