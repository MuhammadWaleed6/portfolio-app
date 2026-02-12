# Quick Setup Guide

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Supabase Database

1. Create account at https://supabase.com
2. Create a new project
3. Go to SQL Editor
4. Copy and paste the entire content from `database-setup.sql`
5. Run the SQL script
6. Go to Authentication → Users → Add User (create admin account)

### 3. Get Supabase Credentials

1. Go to Project Settings → API
2. Copy:
   - Project URL
   - anon/public key

### 4. Configure Environment Variables

Edit `.env` file:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 5. Add Nunito Font

1. Download from: https://fonts.google.com/specimen/Nunito
2. Get the .woff2 file
3. Place in: `src/assets/fonts/nunito.woff2`

### 6. Run Development Server
```bash
npm run dev
```

### 7. Access Admin Panel

1. Open: http://localhost:5173/admin/login
2. Login with your Supabase admin credentials
3. Start managing content!

## 📝 Admin Features

### Projects Management
- Add/Edit/Delete projects
- Upload project images
- Assign technologies
- Add team contributions
- Write case studies

### Collaborators Management
- Add team members
- Upload profile images
- Add social links (LinkedIn, GitHub, etc.)

### Skills Management
- Add skills by category (Frontend/Backend/Tools)
- Set skill percentage

### Messages
- View contact form submissions
- Mark as read/unread
- Delete messages

### About Content
- Edit hero tagline
- Update about text
- Manage counters (projects, clients, experience)
- Upload profile image

## 🎨 Customization Tips

### Change Colors
Edit `src/index.css` CSS variables:
```css
:root {
  --accent: #6366f1;  /* Primary color */
  --accent-hover: #4f46e5;
  /* ... other colors */
}
```

### Update Contact Links
Edit `src/pages/Contact.tsx`:
- Change email address
- Update LinkedIn URL

### Modify Hero Section
Login to admin → About → Edit hero tagline

## 🐛 Troubleshooting

### "Failed to fetch" errors
- Check if Supabase URL and key are correct in `.env`
- Verify database tables are created
- Check Row Level Security policies

### Font not loading
- Ensure `nunito.woff2` is in `src/assets/fonts/`
- Check browser console for 404 errors

### Admin login not working
- Verify user exists in Supabase Authentication
- Check email/password are correct
- Ensure RLS policies are set up correctly

## 📦 Build for Production

```bash
npm run build
```

Deploy the `dist` folder to:
- Vercel
- Netlify
- Any static hosting service

Remember to add environment variables in your hosting platform!

## 🎯 Next Steps

1. Add your projects in admin panel
2. Add your collaborators
3. Add your skills
4. Update about content
5. Test contact form
6. Deploy to production!

Good luck with your portfolio! 🚀
