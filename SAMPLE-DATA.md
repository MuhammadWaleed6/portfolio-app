# Sample Data Examples

## Project - Other Contributions Format

When adding a project in the admin panel, use this JSON format for "Other Contributions":

```json
[
  {
    "name": "Ahmad Raza",
    "role": "Backend Developer"
  },
  {
    "name": "Bilal Khan",
    "role": "UI/UX Designer"
  },
  {
    "name": "Usman Tariq",
    "role": "SEO Specialist"
  }
]
```

## Collaborator - Social Links Format

When adding a collaborator, use this JSON format for "Social Links":

```json
[
  {
    "platform": "LinkedIn",
    "url": "https://linkedin.com/in/username"
  },
  {
    "platform": "GitHub",
    "url": "https://github.com/username"
  },
  {
    "platform": "Twitter",
    "url": "https://twitter.com/username"
  },
  {
    "platform": "Website",
    "url": "https://example.com"
  }
]
```

## Sample Project Data

```json
{
  "title": "E-Commerce Platform",
  "description": "A full-featured e-commerce platform with payment integration, inventory management, and admin dashboard.",
  "technologies": "React, Node.js, MongoDB, Stripe, AWS",
  "team_size": 4,
  "my_role": "Full Stack Developer - Led frontend development and API integration",
  "other_contributions": [
    {
      "name": "Ahmad Raza",
      "role": "Backend Architecture"
    },
    {
      "name": "Bilal Khan",
      "role": "UI/UX Design"
    }
  ],
  "image_url": "https://images.unsplash.com/photo-1557821552-17105176677c",
  "live_url": "https://example.com",
  "case_study": "This project involved building a scalable e-commerce solution from scratch. We implemented modern best practices including microservices architecture, real-time inventory updates, and secure payment processing. The platform handles 10,000+ daily transactions with 99.9% uptime."
}
```

## Sample Collaborator Data

```json
{
  "name": "Ahmad Raza",
  "role": "Backend Developer",
  "description": "Specialized in Node.js, Python, and cloud architecture. 5+ years experience.",
  "image_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
  "social_links": [
    {
      "platform": "LinkedIn",
      "url": "https://linkedin.com/in/ahmadraza"
    },
    {
      "platform": "GitHub",
      "url": "https://github.com/ahmadraza"
    }
  ]
}
```

## Sample Skills Data

### Frontend Skills
- HTML (95%)
- CSS (90%)
- JavaScript (90%)
- React (85%)
- Next.js (80%)
- TypeScript (85%)

### Backend Skills
- Node.js (85%)
- PHP (75%)
- REST APIs (90%)
- GraphQL (70%)
- MongoDB (80%)
- PostgreSQL (75%)

### Tools
- Git (90%)
- Figma (70%)
- Firebase (80%)
- AWS (75%)
- Docker (70%)
- VS Code (95%)

## Sample About Content

```json
{
  "hero_tagline": "Building modern, scalable websites and web applications — independently and in collaboration with a trusted development team.",
  "about_text": "I'm Adnan Cheema, a Full Stack Web Developer specializing in building modern, scalable web applications. I work both independently and in collaboration with a trusted team of developers, designers, and specialists.\n\nMy approach combines technical expertise with clear communication and accountability. Whether working solo or with my team, I ensure every project meets the highest standards of quality and performance.\n\nI believe in transparency and collaboration, which is why I'm open about the talented people I work with on various projects.",
  "projects_completed": 50,
  "clients_count": 30,
  "years_experience": 5,
  "profile_image_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
}
```

## Image URL Sources

You can use images from:
- Unsplash: https://unsplash.com
- Pexels: https://pexels.com
- Your own hosted images
- Supabase Storage (upload in Supabase dashboard)

## Tips

1. Always validate JSON before submitting (use jsonlint.com)
2. Use double quotes for JSON properties
3. Escape special characters in strings
4. Keep descriptions concise and professional
5. Use high-quality images (minimum 1200px width for projects)
6. Test all URLs before adding them
