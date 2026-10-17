<div align="center">

  <img src="public/favicon.svg" alt="Otabek Haydarov Logo" width="100" height="100" />

  # Otabek Haydarov — Developer Portfolio & Admin Suite

  <p align="center">
    <strong>Software Engineer & Data Analyst</strong><br />
    <em>"I turn messy data into clean insights and clean code into great products."</em>
  </p>

  <p align="center">
    <a href="https://github.com/otabek11haydarov/Portfolio/stargazers"><img src="https://img.shields.io/github/stars/otabek11haydarov/Portfolio?color=38bdf8&style=for-the-badge" alt="Stars" /></a>
    <a href="https://github.com/otabek11haydarov/Portfolio/network/members"><img src="https://img.shields.io/github/forks/otabek11haydarov/Portfolio?color=0ea5e9&style=for-the-badge" alt="Forks" /></a>
    <a href="https://github.com/otabek11haydarov/Portfolio/issues"><img src="https://img.shields.io/github/issues/otabek11haydarov/Portfolio?color=0284c7&style=for-the-badge" alt="Issues" /></a>
    <a href="https://github.com/otabek11haydarov/Portfolio/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-teal.svg?style=for-the-badge" alt="License" /></a>
  </p>

  <p align="center">
    <a href="#-about-the-project">About</a> •
    <a href="#-features">Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#-admin-control-center">Admin Suite</a> •
    <a href="#-project-structure">Structure</a> •
    <a href="#-author--contact">Contact</a>
  </p>

</div>

---

## 🌟 About The Project

A high-performance, dark-themed personal portfolio built with **React 18**, **TypeScript**, **Tailwind CSS**, and **Vite**, accompanied by an integrated **Node.js / Express** backend and custom **Admin Control Center**.

The website is engineered for both software engineering showcases and data analytics workflows — featuring dynamic content management, glassmorphic UI, responsive layouts, and interactive components.

---

## ✨ Features

- **Futuristic Dark Aesthetic:** Deep navy canvas (`#0a0f1a`), glowing gradient text, backdrop blur cards, and ambient animations.
- **Dynamic Content & State:** All data (Profile, Bio, Skills, Projects, Work Experience) is fully dynamic and synchronized with the backend.
- **Integrated Admin Control Center (`/#admin`):**
  - Protected by admin password authentication.
  - **Full CRUD:** Create, update, or remove projects, skills, profile information, and experiences in real-time.
  - Dual-mode sync: Automatically saves to local JSON database (`server/data/portfolio.json`) with seamless `localStorage` offline fallback.
- **Interactive Visualizations:**
  - Animated tech stack marquee.
  - Category-based skill bars with animated progress levels.
  - Interactive project cards with tags, live preview, and source code links.
  - Career timeline showing professional experience and milestones.
- **Working Contact Section:** Integrated AJAX email dispatch with instant status feedback.
- **Custom Branding:** Bespoke vector SVG branding (`</> OH.`) optimized as high-DPI browser favicon.
- **100% Responsive:** Optimized across mobile, tablet, and ultra-wide screens.

---

## 🛠 Tech Stack

### Frontend
- **Framework:** [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite 5](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

### Backend & Storage
- **Runtime:** [Node.js](https://nodejs.org/)
- **Server:** [Express.js](https://expressjs.com/)
- **Database:** Local JSON Data Store with Atomic Disk Writes
- **Dev Runner:** [Concurrently](https://github.com/open-cli-tools/concurrently) for running client + server simultaneously

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

2. **Install all dependencies:**
   ```bash
   npm install
   ```

3. **Start the development environment:**
   ```bash
   npm run dev
   ```
   > 💡 **Tip:** This starts both the **Vite Frontend** (`http://localhost:5173`) and the **Express Backend** (`http://localhost:5000`) concurrently in a single terminal.

4. Open your browser and visit:
   ```text
   http://localhost:5173
   ```

---

## 🛡️ Admin Control Center

The portfolio includes an integrated Admin Panel to manage all contents without touching raw code:

1. Click the **Shield Icon (🛡️)** in the footer, or open:
   ```text
   http://localhost:5173/#admin
   ```
2. **Default Password:** `admin123` *(Can be changed directly inside the admin panel).*
3. **Capabilities:**
   - **Projects:** Add new projects with titles, emojis, tech tags, descriptions, and URLs.
   - **Skills:** Add or edit proficiency levels (0-100%) and categorise under *Languages*, *Data & Analytics*, *Frameworks*, or *Tools*.
   - **Profile & Bio:** Edit full name, tagline, email, location, GitHub/LinkedIn links, and the About Me bio.
   - **Experience:** Add, modify, or delete career positions and company achievements.

---

## 📁 Project Structure

```text
Portfolio/
├── public/
│   ├── favicon.svg          # Custom </> OH. vector favicon
│   └── vite.svg             # App branding asset
├── server/
│   ├── data/
│   │   └── portfolio.json   # Persistent JSON database for live data
│   └── index.js             # Express CRUD API backend
├── src/
│   ├── components/
│   │   ├── admin/
│   │   │   └── AdminDashboard.tsx # Complete Admin control panel
│   │   ├── About.tsx        # Bio & stats section
│   │   ├── Contact.tsx      # Contact form with email integration
│   │   ├── Experience.tsx   # Work history timeline
│   │   ├── Footer.tsx       # Page footer with Admin trigger
│   │   ├── Hero.tsx         # Headline, socials, & dynamic bio
│   │   ├── Navbar.tsx       # Navigation bar with backdrop blur
│   │   ├── Projects.tsx     # Featured work cards
│   │   ├── ScrollProgress.tsx # Top reading progress indicator
│   │   ├── Skills.tsx       # Categorized skill progress bars
│   │   └── TechMarquee.tsx  # Infinite scrolling technologies strip
│   ├── context/
│   │   └── PortfolioContext.tsx # Global state with API sync & local fallback
│   ├── data/
│   │   └── portfolio.ts     # Initial seed data definitions & TypeScript types
│   ├── hooks/
│   │   └── useReveal.ts     # IntersectionObserver animation hook
│   ├── App.tsx              # Main application root
│   ├── index.css            # Custom CSS & Tailwind directives
│   └── main.tsx             # React DOM entry point
├── index.html               # Main HTML entry with updated meta tags
├── package.json             # Scripts and package dependencies
├── tailwind.config.js       # Custom theme extensions & colors
└── vite.config.ts           # Vite bundler & API proxy configuration
```

---

## 📦 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs both the Vite dev server and Express backend concurrently |
| `npm run dev:client` | Runs only the Vite frontend development server |
| `npm run server` | Runs only the Node.js Express backend server |
| `npm run build` | Builds the production bundle to the `dist/` directory |
| `npm run preview` | Previews the production build locally |
| `npm run typecheck` | Validates TypeScript types across the project |

---

## 📬 Author & Contact

**Otabek Haydarov**  
- **Email:** [otabek11haydarov@gmail.com](mailto:otabek11haydarov@gmail.com)  
- **GitHub:** [@otabek11haydarov](https://github.com/otabek11haydarov)  
- **LinkedIn:** [Otabek Haydarov](https://www.linkedin.com/in/otabek-haydarov-910789386)  
- **Location:** Tashkent, Uzbekistan  

---

<div align="center">
  <sub>Built with ❤️ using React, TypeScript & Tailwind CSS. © 2026 Otabek Haydarov.</sub>
</div>
