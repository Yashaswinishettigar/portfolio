import { useEffect, useState } from 'react';
import { AppBar, Box, Button, Container, Drawer, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import { Menu as MenuIcon, X } from 'lucide-react';
import { profile } from '../data/profile.js';
import { tokens } from '../theme/theme.js';

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

function Availability() {
  return (
    <Stack direction="row" alignItems="center" spacing={1.25}>
      <Box
        aria-hidden="true"
        sx={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          bgcolor: '#5ee6a8',
          boxShadow: '0 0 0 0 rgba(94, 230, 168, 0.6)',
          animation: 'availabilityPulse 2.4s ease-out infinite',
          '@keyframes availabilityPulse': {
            '0%': { boxShadow: '0 0 0 0 rgba(94, 230, 168, 0.55)' },
            '70%': { boxShadow: '0 0 0 9px rgba(94, 230, 168, 0)' },
            '100%': { boxShadow: '0 0 0 0 rgba(94, 230, 168, 0)' },
          },
        }}
      />
      <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
        {profile.availability}
      </Typography>
    </Stack>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the link for the section currently in view.
  useEffect(() => {
    const sections = links.map((l) => document.getElementById(l.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <AppBar
        component="header"
        position="fixed"
        color="transparent"
        elevation={0}
        sx={{
          transition: 'background-color .3s ease, border-color .3s ease, backdrop-filter .3s ease',
          backgroundColor: scrolled ? 'rgba(11, 11, 13, 0.72)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px) saturate(140%)' : 'none',
          borderBottom: `1px solid ${scrolled ? tokens.border : 'transparent'}`,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 72 }, gap: 3 }}>
            <Box
              component="a"
              href="#home"
              aria-label={`${profile.name} — back to top`}
              sx={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 700,
                fontSize: '1.15rem',
                letterSpacing: '-0.02em',
                color: 'text.primary',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Box component="span" sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'primary.main' }} />
              {profile.initials}
            </Box>

            <Box component="nav" aria-label="Primary" sx={{ display: { xs: 'none', md: 'block' }, ml: 'auto' }}>
              <Stack component="ul" direction="row" spacing={0.5} sx={{ listStyle: 'none', m: 0, p: 0 }}>
                {links.map((link) => (
                  <li key={link.id}>
                    <Button
                      component="a"
                      href={`#${link.id}`}
                      size="small"
                      aria-current={active === link.id ? 'location' : undefined}
                      sx={{
                        color: active === link.id ? 'text.primary' : 'text.secondary',
                        '&:hover': { color: 'text.primary' },
                      }}
                    >
                      {link.label}
                    </Button>
                  </li>
                ))}
              </Stack>
            </Box>

            <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
              <Availability />
            </Box>

            <IconButton
              aria-label="Open navigation menu"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen(true)}
              sx={{ display: { xs: 'inline-flex', md: 'none' }, ml: 'auto' }}
            >
              <MenuIcon size={20} aria-hidden="true" />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)} id="mobile-nav">
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
            <Typography variant="overline" color="text.secondary">
              Menu
            </Typography>
            <IconButton aria-label="Close navigation menu" onClick={() => setOpen(false)}>
              <X size={20} aria-hidden="true" />
            </IconButton>
          </Stack>

          <Box component="nav" aria-label="Mobile">
            <Stack component="ul" spacing={0.5} sx={{ listStyle: 'none', m: 0, p: 0 }}>
              {links.map((link) => (
                <li key={link.id}>
                  <Box
                    component="a"
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === link.id ? 'location' : undefined}
                    sx={{
                      display: 'block',
                      py: 1.5,
                      fontFamily: '"Space Grotesk", sans-serif',
                      fontSize: '1.9rem',
                      fontWeight: 600,
                      letterSpacing: '-0.03em',
                      textDecoration: 'none',
                      color: active === link.id ? 'primary.main' : 'text.primary',
                    }}
                  >
                    {link.label}
                  </Box>
                </li>
              ))}
            </Stack>
          </Box>

          <Box sx={{ mt: 'auto', pt: 4 }}>
            <Availability />
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
