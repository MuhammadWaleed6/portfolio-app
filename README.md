# Adnan Cheema - Portfolio Website

A modern, full-stack portfolio website built with React, TypeScript, Vite, and Supabase.

## Features

### Frontend
- ✨ Modern dark theme with Nunito font
- 🎨 Smooth animations with Framer Motion
- 📱 Fully responsive design
- 🚀 Fast performance with Vite
- 🎯 Clean, professional UI

### Pages
- **Home**: Hero section with animated background
- **About**: Professional description with animated counters
- **Collaborators**: Team members showcase
- **Projects**: Dynamic project gallery with filtering
- **Skills**: Categorized skills with progress bars
- **Contact**: Contact form with Supabase integration

### Admin Panel
- 🔐 Secure authentication with Supabase Auth
- 📊 Dashboard with statistics
- ✏️ Full CRUD operations for:
  - Projects
  - Collaborators
  - Skills
  - Messages
  - About content
- 🎨 Modern admin UI with sidebar navigation
- 🔔 Toast notifications
- ✅ Confirmation modals

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: CSS, Bootstrap 5
- **Animations**: Framer Motion, AOS
- **Icons**: React Icons
- **Routing**: React Router DOM
- **Backend**: Supabase (Database + Auth + Storage)
- **Notifications**: React Toastify

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd portfolio-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Copy your project URL and anon key
3. In Supabase SQL Editor, run the SQL from `database-setup.sql`
4. Create an admin user in Supabase Authentication

### 4. Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 5. Add Nunito Font

Place your `nunito.woff2` font file in:
```
src/assets/fonts/nunito.woff2
```

You can download Nunito from [Google Fonts](https://fonts.google.com/specimen/Nunito).

### 6. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:5173`

### 7. Build for Production
```bash
npm run build
```

## Admin Access

1. Navigate to `/admin/login`
2. Login with your Supabase admin credentials
3. Access the admin dashboard at `/admin/dashboard`

## Project Structure

```
portfolio-app/
├── src/
│   ├── admin/              # Admin panel components
│   ├── assets/             # Static assets (fonts, images)
│   ├── components/         # Reusable components
│   ├── config/             # Configuration files
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Page components
│   ├── types/              # TypeScript types
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── database-setup.sql      # Supabase database schema
├── .env.example            # Environment variables template
└── package.json            # Dependencies
```

## Database Tables

- **projects**: Project portfolio items
- **collaborators**: Team members/collaborators
- **skills**: Technical skills with categories
- **messages**: Contact form submissions
- **about_content**: About page content and counters

## Customization

### Update Personal Information

1. Login to admin panel
2. Go to "About" section
3. Update hero tagline, about text, and counters

### Add Projects

1. Login to admin panel
2. Go to "Projects"
3. Click "Add Project"
4. Fill in project details including:
   - Title, description
   - Technologies (comma-separated)
   - Team size and your role
   - Other contributions (JSON format)
   - Image URL, live URL, case study

### Add Collaborators

1. Go to "Collaborators" in admin
2. Add team member details
3. Include social links in JSON format:
```json
[
  {"platform": "LinkedIn", "url": "https://linkedin.com/in/username"},
  {"platform": "GitHub", "url": "https://github.com/username"}
]
```

### Add Skills

1. Go to "Skills" in admin
2. Add skill name, category (frontend/backend/tools), and percentage

## Deployment

### Vercel
```bash
npm run build
# Deploy the dist folder to Vercel
```

### Netlify
```bash
npm run build
# Deploy the dist folder to Netlify
```

Don't forget to add environment variables in your deployment platform!

## Support

For issues or questions, please open an issue in the repository.

## License

MIT License - feel free to use this for your own portfolio!
