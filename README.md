<div align="center">

  <img src="public/favicon.svg" alt="Otabek Haydarov Logo" width="96" height="96" />

  # Otabek Haydarov — Portfolio

  <p align="center">
    <strong>Software Engineer & Data Analyst</strong><br />
    <em>"I turn messy data into clean insights and clean code into great products."</em>
  </p>

  <p align="center">
    <a href="https://github.com/otabek11haydarov/Portfolio/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-teal.svg?style=flat-square" alt="License" /></a>
    <img src="https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react" alt="React 18" />
    <img src="https://img.shields.io/badge/TypeScript-5.5-blue?style=flat-square&logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=flat-square&logo=tailwind-css" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Vite-5.4-purple?style=flat-square&logo=vite" alt="Vite" />
  </p>

  <p align="center">
    <a href="#-overview">Overview</a> •
    <a href="#-key-features">Key Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#-project-structure">Structure</a> •
    <a href="#-contact">Contact</a>
  </p>

</div>

---

## 🌟 Overview

A modern, high-performance, responsive personal portfolio built with **React 18**, **TypeScript**, **Tailwind CSS**, and **Vite**.

Designed to showcase practical experience in both data analytics and full-stack software engineering — featuring dynamic data structures, clean glassmorphic UI, responsive layouts, 3D card tilt effects, and an interactive contact dispatch.

---

## ✨ Key Features

- **Futuristic Dark Aesthetic:** Deep navy canvas (`#0a0f1a`), glowing gradient typography, backdrop blur cards, and ambient animations.
- **Mobile-First Responsive Design:** Smooth cross-device compatibility from small smartphones to ultra-wide displays without horizontal scroll stutter.
- **Interactive Visualizations:**
  - Animated tech stack marquee.
  - Category-based skill bars with animated progress levels.
  - Interactive project cards with tags, live preview, and source code links.
  - Career timeline showing professional experience, education, and milestones.
- **Working Contact Section:** Integrated AJAX email dispatch with instant status feedback.
- **Custom Branding:** Bespoke vector SVG branding (`</> OH.`) optimized as high-DPI browser favicon.
- **Production-Ready Performance:** Pre-configured for instantaneous static generation and edge CDN deployment on Vercel.

---

## 🛠 Tech Stack

- **Framework:** [React 18](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite 5](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Deployment:** [Vercel](https://vercel.com/)

---

## 🚀 Getting Started

Follow these steps to run the portfolio locally on your machine:

### Prerequisites
Make sure you have **Node.js** (v18.0.0 or later) and **npm** installed:
```bash
node -v
npm -v
```

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/otabek11haydarov/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📁 Project Structure

```
Portfolio/
├── public/                # Static assets, favicon, resume PDF
├── src/
│   ├── components/        # Modular UI components (Hero, About, Skills, Projects, etc.)
│   ├── config/            # API and environment configuration
│   ├── context/           # Portfolio data context provider
│   ├── data/              # Typed portfolio content data (skills, projects, bio)
│   ├── hooks/             # Custom interaction hooks (reveal, interactive cards, buttons)
│   ├── App.tsx            # Main layout wrapper
│   ├── index.css          # Tailwind and global styles
│   └── main.tsx           # Application entrypoint
├── index.html             # HTML entry with Open Graph meta tags
├── package.json           # Dependencies and build scripts
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite bundler configuration
```

---

## 📬 Contact

- **Name:** Otabek Haydarov
- **Email:** [otabek11haydarov@gmail.com](mailto:otabek11haydarov@gmail.com)
- **LinkedIn:** [linkedin.com/in/otabek-haydarov](https://www.linkedin.com/in/otabek-haydarov)
- **GitHub:** [github.com/otabek11haydarov](https://github.com/otabek11haydarov)
- **Live Website:** [haydarov-portfolio.vercel.app](https://haydarov-portfolio.vercel.app)
