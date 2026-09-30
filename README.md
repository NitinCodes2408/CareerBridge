# Nitin Bhandare — Personal Portfolio Website

An editorial, minimal, and typography-focused personal portfolio website for **Nitin Bhandare** (Software Engineer · AI Engineer · Full-Stack Developer).

Built with **React**, **Vite**, **Tailwind CSS**, **Lucide Icons**, and **Google Fonts (Newsreader & Inter)**, replicating the editorial design language of [ksaravindakashyap.in](https://ksaravindakashyap.in/).

---

## 🌟 Key Highlights & Design Architecture

- **Editorial Typography & Hierarchy**: Newsreader serif headings paired with clean, readable body typography and subtle orange/amber accents.
- **Hero & Profile**: Circular professional portrait with direct social & contact links (LinkedIn, GitHub, Email, Phone) and a grounded, personal biography.
- **Recent Updates Timeline**: Vertical timeline stream featuring colored category markers and real career milestones.
- **Education & Experience**: Dual-column timeline displaying B.Tech in AI (CGPA 8.12), Diploma in Computer Engineering (75.94%), HSC, SSC, and the CodeSoft Web Development internship with expandable *show more / show less* toggles.
- **Featured Projects (Only 3 Projects)**:
  1. **GymTrack AI** — AI-Powered Gym Management Platform with Biometric Attendance Integration
  2. **CareerBridge** — AI-Powered Placement & Career Platform with Automated Resume Workflows
  3. **Varsa** — AI-Powered Cultural Heritage Discovery & Preservation Platform (Gadchiroli & Chandrapur)
  *(TiffinWala omitted per instructions)*
- **Categorized Technical Skills**: Organized into Languages, Frontend, Backend, Databases, Tools, and Core Engineering Concepts with rounded pill badges.
- **Training & Certifications**: Full Stack Industrial Training, Code Battle 1.0 Hackathon, and Python Data Science Workshop.
- **Floating Bottom Navigation Bar**: Fixed rounded pill bar with active section highlight indicator and smooth viewport scrolling across mobile and desktop.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

---

## 📁 Project Structure

```
d:/My Portfolio/
├── public/
│   └── images/
│       └── nitin-bhandare.jpg      # Nitin's actual profile photo
├── src/
│   ├── assets/                     # Assets & images
│   ├── components/
│   │   ├── BottomNavbar.jsx        # Floating fixed pill navbar
│   │   ├── Certifications.jsx      # Training & Hackathons
│   │   ├── ContactFooter.jsx       # Contact links & copy actions
│   │   ├── Education.jsx           # Vertical academic timeline
│   │   ├── FeaturedProjects.jsx    # Editorial single-column project showcase
│   │   ├── Hero.jsx                # Circular portrait & bio introduction
│   │   ├── ProjectMockups.jsx      # Interactive UI mockups for 3 projects
│   │   ├── RecentUpdates.jsx       # Milestones vertical timeline
│   │   ├── TechnicalSkills.jsx     # Categorized skill badges
│   │   └── WorkExperience.jsx      # Expandable internship experience
│   ├── data/
│   │   └── portfolioData.js        # Authoritative resume data
│   ├── App.jsx                     # Main layout
│   ├── index.css                   # Custom scrollbars & typography styles
│   └── main.jsx                    # React DOM entry
├── index.html                      # HTML template with Google Fonts
├── package.json                    # Project dependencies
├── tailwind.config.js              # Tailwind editorial theme configuration
└── vite.config.js                  # Vite bundler configuration
```

---

## 🚢 Deployment

You can deploy this project in one click to **Vercel**, **Netlify**, or **GitHub Pages**:

- **Vercel**: Import the GitHub repository and click **Deploy** (framework preset: Vite).
- **Netlify**: Connect your repository and set build command to `npm run build` with publish directory `dist`.
- **GitHub Pages**: Run `npm run build` and deploy the `dist/` folder using `gh-pages`.
