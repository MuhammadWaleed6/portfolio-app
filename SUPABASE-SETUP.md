# 🗄️ Supabase Setup Instructions

## Step 1: Create Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with GitHub, Google, or Email
4. Verify your email if required

## Step 2: Create New Project

1. Click "New Project"
2. Fill in project details:
   - **Name**: portfolio-app (or your choice)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your location
   - **Pricing Plan**: Free tier is perfect for portfolio
3. Click "Create new project"
4. Wait 2-3 minutes for setup to complete

## Step 3: Get API Credentials

1. In your project dashboard, click "Settings" (gear icon)
2. Click "API" in the left sidebar
3. You'll see:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: Long string starting with `eyJ...`
4. Copy both values

## Step 4: Configure Environment Variables

1. Open `.env` file in your project root
2. Replace with your actual values:

```env
VITE_SUPABASE_URL=https://your-actual-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-actual-key
```

3. Save the file

## Step 5: Create Database Tables

1. In Supabase dashboard, click "SQL Editor" in left sidebar
2. Click "New query"
3. Open `database-setup.sql` from your project
4. Copy ALL the SQL code
5. Paste into Supabase SQL Editor
6. Click "Run" button (or press Ctrl+Enter)
7. You should see "Success. No rows returned"

## Step 6: Verify Tables Created

1. Click "Table Editor" in left sidebar
2. You should see 5 tables:
   - projects
   - collaborators
   - skills
   - messages
   - about_content
3. Click on "about_content" - should have 1 row with default data

## Step 7: Create Admin User

1. Click "Authentication" in left sidebar
2. Click "Users" tab
3. Click "Add user" button
4. Choose "Create new user"
5. Fill in:
   - **Email**: your-admin-email@example.com
   - **Password**: Create a strong password
   - **Auto Confirm User**: Toggle ON (important!)
6. Click "Create user"
7. Save these credentials - you'll use them to login!

## Step 8: Test Connection

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open browser to `http://localhost:5173`

3. If you see the hero section without errors, connection works!

4. Test admin login:
   - Go to `http://localhost:5173/admin/login`
   - Enter your admin email and password
   - Should redirect to dashboard

## Step 9: Add Initial Content

Now that you're logged in to admin:

### Add About Content
1. Go to "About" in admin sidebar
2. Update all fields
3. Click "Save Changes"

### Add First Project
1. Go to "Projects"
2. Click "Add Project"
3. Fill in all fields:
   - Title: "Sample Project"
   - Description: "A sample project description"
   - Technologies: "React, Node.js, MongoDB"
   - Team Size: 1
   - My Role: "Full Stack Developer"
   - Image URL: Use a placeholder like `https://via.placeholder.com/800x600`
4. Click "Create"

### Add First Collaborator
1. Go to "Collaborators"
2. Click "Add Collaborator"
3. Fill in:
   - Name: "John Doe"
   - Role: "Backend Developer"
   - Description: "Specialized in Node.js"
   - Image URL: `https://via.placeholder.com/300x300`
   - Social Links: `[{"platform":"LinkedIn","url":"https://linkedin.com"}]`
4. Click "Create"

### Add Skills
1. Go to "Skills"
2. Add multiple skills:
   - Name: "React", Category: "frontend", Percentage: 90
   - Name: "Node.js", Category: "backend", Percentage: 85
   - Name: "Git", Category: "tools", Percentage: 95
3. Add at least 5-10 skills

## Step 10: Test Contact Form

1. Go to homepage
2. Click "Contact Me"
3. Fill in the form
4. Submit
5. Go to admin → Messages
6. You should see your test message!

## 🎉 Setup Complete!

Your Supabase backend is now fully configured and connected!

## 🔒 Security Notes

### Row Level Security (RLS)
Your database has RLS enabled with these policies:
- **Public**: Can read all content (projects, skills, etc.)
- **Public**: Can insert messages (contact form)
- **Authenticated**: Can do everything (admin only)

### API Keys
- **anon key**: Safe to use in frontend (public)
- **service_role key**: NEVER use in frontend (admin only)

### Environment Variables
- Never commit `.env` to git
- `.env` is already in `.gitignore`
- Add environment variables to your hosting platform

## 🐛 Troubleshooting

### Error: "Failed to fetch"
**Solution**: Check if VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are correct in `.env`

### Error: "Invalid API key"
**Solution**: Make sure you copied the full anon key (it's very long)

### Error: "relation does not exist"
**Solution**: Run the database-setup.sql script again

### Admin login fails
**Solution**: 
1. Check if user exists in Authentication → Users
2. Make sure "Auto Confirm User" was enabled
3. Try resetting password in Supabase dashboard

### Tables not showing
**Solution**: 
1. Go to SQL Editor
2. Run: `SELECT * FROM projects;`
3. If error, re-run database-setup.sql

### RLS policy errors
**Solution**: The SQL script includes all policies. If issues persist:
1. Go to Table Editor
2. Click on table
3. Click "RLS" tab
4. Verify policies exist

## 📊 Database Schema Overview

### projects
- Stores portfolio projects
- Includes technologies, team info, images
- Public read, admin write

### collaborators
- Team members you work with
- Includes social links
- Public read, admin write

### skills
- Technical skills with categories
- Percentage-based proficiency
- Public read, admin write

### messages
- Contact form submissions
- Public can insert, admin can read/delete
- Includes read/unread status

### about_content
- Hero tagline, about text
- Counter values (projects, clients, experience)
- Profile image URL
- Public read, admin write

## 🚀 Next Steps

1. ✅ Supabase configured
2. ✅ Database created
3. ✅ Admin user created
4. ✅ Connection tested
5. ✅ Initial content added

Now you can:
- Add real projects
- Add real collaborators
- Customize about content
- Deploy to production!

## 📞 Supabase Resources

- **Dashboard**: https://app.supabase.com
- **Documentation**: https://supabase.com/docs
- **Community**: https://github.com/supabase/supabase/discussions
- **Status**: https://status.supabase.com

---

**Your backend is ready! Time to add content and deploy! 🎊**
