# 3D Developer Portfolio

A minimalist, dark-first portfolio built with **React + Vite**, **Material UI**, **Three.js (React Three Fiber + Drei)**, **Framer Motion** and **Lucide** icons.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:5173
```

Production build: `npm run build`, then `npm run preview`.

Requires Node 18+ (Node 20+ recommended).

### Starting from scratch instead?

These are the exact commands that produce this dependency set:

```bash
npm create vite@latest 3d-portfolio -- --template react
cd 3d-portfolio
npm install @mui/material@^6 @emotion/react @emotion/styled \
  three@^0.169 @react-three/fiber@^8 @react-three/drei@^9 \
  framer-motion@^11 lucide-react@^0.454
```

Then copy the `src/` folder, `index.html`, and `vite.config.js` from this project. React 18 is required (React Three Fiber v8 / Drei v9 are not compatible with React 19).

## Make it yours

| What | Where |
| --- | --- |
| Name, title, tagline, email, GitHub, LinkedIn, About copy | `src/data/profile.js` |
| Projects (title, description, tags, GitHub, demo link) | `src/data/projects.js` |
| Skill groups | `src/data/skills.js` |
| Timeline entries | `src/data/journey.js` |
| Colours, fonts, component styling | `src/theme/theme.js` |
| Page title and meta description | `index.html` |

All projects and timeline entries are **placeholders**, labelled as such on the page. Replace them, then remove the "Sample project" / "Placeholder" chips in `Projects.jsx` and `Journey.jsx`.

## Contact form

With no backend configured, the form drafts an email in the visitor's mail app (a `mailto:` link) rather than pretending to submit. To send directly from the site:

1. Create a form endpoint with a service such as Formspree, Basin or Getform (it must accept a JSON `POST` of `{ name, email, message }`).
2. Copy `.env.example` to `.env` and set `VITE_FORM_ENDPOINT=https://...`.
3. Restart the dev server.

## 3D scene

`src/components/Scene3D.jsx` holds all Three.js code and is lazy-loaded from the hero.

- Pointer response and slow idle rotation; lighting is procedural (no HDR download).
- DPR is capped (1.75 desktop, 1.25 small screens).
- `prefers-reduced-motion`: no float/rotation/pointer motion and the render loop runs on demand.
- Small screens get a simplified scene. No WebGL, low-power devices (≤2 GB RAM or ≤2 cores) or a runtime error show a static CSS orb (`OrbFallback.jsx`).

## Structure

```
src/
  components/  Navbar, Hero, Scene3D, About, Projects, Skills, Journey, Contact, Footer
               + Reveal, Press, SectionHeader, OrbFallback, SceneBoundary
  data/        profile.js, projects.js, skills.js, journey.js
  hooks/       use3DMode.js
  theme/       theme.js
  App.jsx  main.jsx  index.css
```
