# Siphesihle B. Mthethwa | Portfolio Website

![Next.js](https://img.shields.io/badge/Next.js-13-black?style=for-the-badge&logo=next.js)  
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)  
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)  
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)  
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)  
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)  

A minimal, modern, and responsive **Personal Portfolio Website**
built with **Next.js (App Router)**, **TailwindCSS v4.1**, and
**Vanilla CSS**. This portfolio showcases my professional
profile, projects, skills, and contact information with a
focus on design tokens, dark/light theming, and performance.

---

## 🚀 Features

1. **Responsive Design**
   - Works seamlessly on mobile, tablet, and desktop.
   - Breakpoints aligned with Tailwind v4.1 defaults.

2. **Dark & Light Theme Support**
   - Managed with `next-themes`.
   - Separate background image slides for light/dark.

3. **Hero Section**
   - Full-screen animated background slider using Swiper.js.
   - Animated text and call-to-action buttons.
   - Theming-aware: lightSlides vs darkSlides.

4. **About Section**
   - Short professional bio with profile image.

5. **Skills Section**
   - Two viewing modes:
     • Standard grouped categories with icons.  
     • Carousel view (animated scrolling pills).
   - Data-driven: skills loaded from `skills.ts` + icons from `skillsdata.ts`.

6. **Services Section**
   - Highlights offerings: Full-Stack Development, UI/UX, Optimization.

7. **Projects Section**
   - Grid of project cards with images, tags, and external links.

8. **Contact Section**
   - Simple contact form placeholder.
   - Local time widget and "back-to-top" link.
   - Social media links (LinkedIn, GitHub, Instagram).

9. **Footer**
   - Recap navigation and social links.

10. **Design Tokens**
    - `tokens.css` defines reusable CSS variables for:
      • Colors  
      • Radii  
      • Shadows  
      • Spacing  

---

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: TailwindCSS v4.1 + Vanilla CSS
- **Theming**: next-themes (light/dark toggle)
- **Animations**: Swiper.js (hero background), CSS keyframes
- **Icons**: Local SVG/PNG icons (skills & social)
- **TypeScript**: Strong typing for skills, services, projects

---

---

## ⚙️ Installation & Setup

1. Clone the repository:
   git clone <https://github.com/Sihle-Thwa/portfolio.git>
   cd portfolio

2. Install dependencies:
   npm install

3. Run development server:
   npm run dev

   → Visit <http://localhost:3000>

4. Build for production:
   npm run build
   npm start

---

## 🎨 Theming

- Tokens (`tokens.css`) unify design across both modes.

---

## 📦 Data-driven Config

- **Skills**: Alphabetical by category (skills.ts).
- **Icons**: Defined in skillsdata.ts (skill name → icon path).
- **Projects/Services**: Easily extended by editing `projects.ts` / `services.ts`.

---

## 🌐 Deployment

Deployed via Vercel for optimal Next.js performance:

  <https://siphesihle-b-mthethwa.vercel.app>

---

## 📜 License

This project is open-source and free to use for inspiration
and educational purposes. Attribution is appreciated.

---

## 👤 Author

### Siphesihle B. Mthethwa

Full-Stack Developer | Web Engineer | IT Educator  

- Portfolio: [siphesihle-b-mthethwa.vercel.app](https://siphesihle-b-mthethwa.vercel.app)
- LinkedIn: [linkedin.com/in/siphesihle-mthethwa](https://linkedin.com/in/siphesihle-mthethwa)  
- GitHub: [@Sihle-Thwa](https://github.com/Sihle-Thwa)  
