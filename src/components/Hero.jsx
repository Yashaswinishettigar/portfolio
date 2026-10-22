import { lazy, Suspense } from 'react';
import { Box, Button, Container, IconButton, Stack, Typography } from '@mui/material';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownRight, Github, Linkedin } from 'lucide-react';
import { profile } from '../data/profile.js';
import use3DMode from '../hooks/use3DMode.js';
import OrbFallback from './OrbFallback.jsx';
import SceneBoundary from './SceneBoundary.jsx';
import Press from './Press.jsx';

// The 3D bundle is loaded on demand so it never blocks first paint.
const Scene3D = lazy(() => import('./Scene3D.jsx'));

export default function Hero() {
  const reduce = useReducedMotion();
  const mode = use3DMode();
  const { scrollY } = useScroll();
  const sceneY = useTransform(scrollY, [0, 700], [0, reduce ? 0 : 90]);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.11, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 28 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <Box
      component="section"
      id="home"
      aria-label="Introduction"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        '@supports (min-height: 100svh)': { minHeight: '100svh' },
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        pt: { xs: 14, md: 10 },
        pb: { xs: 10, md: 8 },
        background:
          'radial-gradient(55% 60% at 75% 45%, rgba(124, 140, 255, 0.13), transparent 70%)',
      }}
    >
      {/* 3D centrepiece — decorative, sits behind/beside the copy */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          width: { xs: '100%', md: '62%' },
          opacity: { xs: 0.6, md: 1 },
          zIndex: 0,
        }}
      >
        <motion.div style={{ y: sceneY, position: 'absolute', inset: 0 }}>
          {mode === 'static' ? (
            <OrbFallback />
          ) : (
            <SceneBoundary fallback={<OrbFallback />}>
              <Suspense fallback={<OrbFallback />}>
                <Scene3D simple={mode === 'simple'} />
              </Suspense>
            </SceneBoundary>
          )}
        </motion.div>
      </Box>

      {/* Readability scrim over the scene */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background: {
            xs: 'linear-gradient(180deg, rgba(11,11,13,0.55) 0%, rgba(11,11,13,0.7) 100%)',
            md: 'linear-gradient(90deg, rgba(11,11,13,0.9) 0%, rgba(11,11,13,0.55) 38%, rgba(11,11,13,0) 68%)',
          },
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
        <Box
          component={motion.div}
          variants={container}
          initial="hidden"
          animate="show"
          sx={{ maxWidth: { xs: '100%', md: 640 } }}
        >
          <motion.div variants={item}>
            <Typography variant="overline" component="p" color="primary" sx={{ mb: 2.5 }}>
              HELLO, I’M
            </Typography>
          </motion.div>

          <motion.div variants={item}>
            <Typography variant="h1" component="h1" sx={{ mb: 3 }}>
              {profile.name}
            </Typography>
          </motion.div>

          <motion.div variants={item}>
            <Typography variant="h4" component="p" sx={{ mb: 2.5, color: 'text.primary' }}>
              {profile.title}
            </Typography>
          </motion.div>

          <motion.div variants={item}>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 520, mb: 5 }}>
              {profile.tagline}
            </Typography>
          </motion.div>

          <motion.div variants={item}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'stretch', sm: 'center' }}>
              <Press>
                <Button
                  component="a"
                  href="#projects"
                  variant="contained"
                  color="primary"
                  endIcon={<ArrowDownRight size={18} aria-hidden="true" />}
                  sx={{ width: { xs: '100%', sm: 'auto' } }}
                >
                  Explore My Work
                </Button>
              </Press>
              <Press>
                <Button
                  component="a"
                  href="#contact"
                  variant="outlined"
                  sx={{ width: { xs: '100%', sm: 'auto' } }}
                >
                  Contact Me
                </Button>
              </Press>

              <Stack direction="row" spacing={1.25} sx={{ pl: { sm: 1 } }}>
                <IconButton
                  component="a"
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile (opens in a new tab)"
                >
                  <Github size={19} aria-hidden="true" />
                </IconButton>
                <IconButton
                  component="a"
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile (opens in a new tab)"
                >
                  <Linkedin size={19} aria-hidden="true" />
                </IconButton>
              </Stack>
            </Stack>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}
