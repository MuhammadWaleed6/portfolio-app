# ⚡ Quick Reference Card

## 🚀 Getting Started (First Time)

```bash
# 1. Install dependencies
npm install

# 2. Add Nunito font to src/assets/fonts/nunito.woff2

# 3. Setup Supabase (see SUPABASE-SETUP.md)

# 4. Configure .env file
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key

# 5. Run development server
npm run dev
```

## 📋 Common Commands

```bash
# Development
npm run dev              # Start dev server (http://localhost:5173)
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Check code quality

# Git
git add .
git commit -m "message"
git push
```

## 🔗 Important URLs

```
Homepage:        http://localhost:5173
Admin Login:     http://localhost:5173/admin/login
Admin Dashboard: http://localhost:5173/admin/dashboard
Supabase:        https://app.supabase.com
```

## 📁 Key Files to Edit

```
.env                     → Supabase credentials
src/index.css            → Colors & global styles
src/pages/Contact.tsx    → Email & LinkedIn links
index.html               → Page title & meta tags
```

## 🎨 Change Colors

Edit `src/index.css`:
```css
:root {
  --accent: #6366f1;        /* Your brand color */
  --accent-hover: #4f46e5;  /* Hover state */
}
```

## 📊 Admin Panel Quick Guide

### Login
```
URL: /admin/login
Use: Supabase user credentials
```

### Add Project
```
1. Admin → Projects → Add Project
2. Fill all fields
3. Technologies: "React, Node.js, MongoDB" (comma-separated)
4. Other Contributions: [{"name":"Ahmad","role":"Backend"}]
5. Click Create
```

### Add Collaborator
```
1. Admin → Collaborators → Add Collaborator
2. Fill all fields
3. Social Links: [{"platform":"LinkedIn","url":"https://..."}]
4. Click Create
```

### Add Skill
```
1. Admin → Skills → Add Skill
2. Name: "React"
3. Category: frontend/backend/tools
4. Percentage: 0-100
5. Click Create
```

### Update About
```
1. Admin → About
2. Edit all fields
3. Click Save Changes
```

## 🗄️ Database Quick Reference

### Tables
- `projects` - Portfolio projects
- `collaborators` - Team members
- `skills` - Technical skills
- `messages` - Contact form submissions
- `about_content` - About page content

### Access
```
Supabase Dashboard → Table Editor → Select table
```

## 🐛 Quick Troubleshooting

### Build Error
```bash
npm install
npm run build
```

### Supabase Connection Error
```
1. Check .env file
2. Verify URL and key are correct
3. Restart dev server
```

### Font Not Loading
```
1. Download nunito.woff2
2. Place in src/assets/fonts/
3. Restart dev server
```

### Admin Login Fails
```
1. Check user exists in Supabase → Authentication
2. Verify email/password
3. Check "Auto Confirm User" was enabled
```

### Page Not Found
```
1. Check route in App.tsx
2. Verify component import
3. Check React Router setup
```

## 📱 Test Checklist

```
□ Homepage loads
□ All navigation links work
□ Projects page shows data
□ Project filtering works
□ Contact form submits
□ Admin login works
□ Can add/edit/delete projects
□ Can add/edit/delete collaborators
□ Can add/edit/delete skills
□ Messages appear in admin
□ About content updates
□ Mobile responsive
□ All animations work
```

## 🚀 Deployment Quick Steps

### Vercel
```bash
1. npm run build
2. Push to GitHub
3. Import project in Vercel
4. Add environment variables
5. Deploy
```

### Netlify
```bash
1. npm run build
2. Drag dist folder to Netlify
3. Add environment variables
4. Done!
```

## 📝 JSON Format Examples

### Project Contributions
```json
[
  {"name": "Ahmad Raza", "role": "Backend Developer"},
  {"name": "Bilal Khan", "role": "UI/UX Designer"}
]
```

### Social Links
```json
[
  {"platform": "LinkedIn", "url": "https://linkedin.com/in/username"},
  {"platform": "GitHub", "url": "https://github.com/username"}
]
```

## 🎯 Content Guidelines

### Project Description
- 2-3 sentences
- Highlight key features
- Mention technologies

### Case Study
- Problem statement
- Your solution
- Results/impact
- 3-5 paragraphs

### Collaborator Description
- 1-2 sentences
- Mention specialization
- Years of experience

### About Text
- 3-4 paragraphs
- Professional tone
- Highlight collaboration
- Show personality

## 🔒 Security Reminders

```
✓ .env in .gitignore
✓ Never commit credentials
✓ Use environment variables
✓ Keep Supabase keys secure
✓ Regular password updates
```

## 📞 Help Resources

```
Documentation:    README.md
Setup Guide:      SETUP-GUIDE.md
Supabase Setup:   SUPABASE-SETUP.md
Checklist:        CHECKLIST.md
Sample Data:      SAMPLE-DATA.md
Project Summary:  PROJECT-SUMMARY.md
```

## 💡 Pro Tips

1. **Add Content First**: Don't deploy empty portfolio
2. **Use Real Images**: Professional screenshots matter
3. **Write Case Studies**: Detailed projects stand out
4. **Test Mobile**: Always check responsive design
5. **Update Regularly**: Keep projects current
6. **Backup Data**: Export Supabase data periodically
7. **Monitor Messages**: Check admin panel regularly
8. **SEO Matters**: Update meta tags in index.html

## 🎊 Launch Checklist

```
□ Nunito font added
□ Supabase configured
□ .env file set up
□ At least 3 projects added
□ At least 2 collaborators added
□ At least 10 skills added
□ About content updated
□ Contact info updated
□ All pages tested
□ Mobile tested
□ Build successful
□ Deployed to hosting
□ Custom domain (optional)
□ Analytics added (optional)
```

## 🌟 Success Metrics

Track these in admin:
- Total projects
- Total collaborators
- Total skills
- Contact messages received
- Page views (add analytics)

---

**Keep this card handy for quick reference! 📌**

**Need detailed help? Check the full documentation files! 📚**
