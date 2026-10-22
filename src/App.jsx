import { useEffect } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme/theme.js';
import { profile } from './data/profile.js';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import Skills from './components/Skills.jsx';
import Journey from './components/Journey.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  // Keep the document title in sync with the profile data.
  useEffect(() => {
    document.title = `${profile.name} — ${profile.title}`;
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </ThemeProvider>
  );
}
