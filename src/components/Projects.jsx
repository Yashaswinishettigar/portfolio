import { Box, Button, Chip, Container, Stack, Typography } from '@mui/material';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { projects } from '../data/projects.js';
import { tokens } from '../theme/theme.js';
import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';

const line = (width, opacity = 0.14, height = 8) => ({
  height,
  width,
  borderRadius: 99,
  bgcolor: `rgba(241, 239, 233, ${opacity})`,
});

// Abstract, image-free mockups so the section works with zero assets.
function Mock({ variant }) {
  if (variant === 0) {
    const bars = [38, 62, 48, 80, 58, 92, 70];
    return (
      <Box sx={{ display: 'grid', gridTemplateColumns: '54px 1fr', height: '100%' }}>
        <Stack spacing={1.25} sx={{ p: 1.75, borderRight: `1px solid ${tokens.border}` }}>
          {[0, 1, 2, 3].map((i) => (
            <Box key={i} sx={{ ...line('100%', i === 0 ? 0.35 : 0.12, 8), bgcolor: i === 0 ? tokens.accent : undefined }} />
          ))}
        </Stack>
        <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1.5 }}>
            {[0, 1, 2].map((i) => (
              <Box key={i} sx={{ p: 1.5, borderRadius: 2, border: `1px solid ${tokens.border}` }}>
                <Box sx={line('50%', 0.12, 6)} />
                <Box sx={{ ...line(`${60 + i * 12}%`, 0.3, 12), mt: 1.25 }} />
              </Box>
            ))}
          </Box>
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: 1.25, pt: 1 }}>
            {bars.map((h, i) => (
              <Box
                key={i}
                sx={{
                  flex: 1,
                  height: `${h}%`,
                  borderRadius: '6px 6px 2px 2px',
                  bgcolor: i === 5 ? tokens.accent : 'rgba(241, 239, 233, 0.12)',
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>
    );
  }

  if (variant === 1) {
    return (
      <Box sx={{ p: 2.5, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1.75, height: '100%' }}>
        <Box sx={{ ...line('100%', 0.9, 32), bgcolor: tokens.accent, alignSelf: 'center', borderRadius: 99 }} />
        <Box sx={{ border: `1px solid ${tokens.borderStrong}`, borderRadius: 99, height: 32, alignSelf: 'center' }} />
        <Box
          sx={{
            alignSelf: 'center',
            width: 52,
            height: 28,
            borderRadius: 99,
            bgcolor: tokens.accentSoft,
            border: `1px solid ${tokens.accent}`,
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 3,
              right: 3,
              width: 20,
              height: 20,
              borderRadius: '50%',
              bgcolor: tokens.accent,
            },
          }}
        />
        <Box sx={{ gridColumn: 'span 2', p: 1.75, borderRadius: 2, border: `1px solid ${tokens.border}` }}>
          <Box sx={line('40%', 0.3, 10)} />
          <Box sx={{ ...line('85%', 0.12), mt: 1.5 }} />
          <Box sx={{ ...line('65%', 0.12), mt: 1 }} />
        </Box>
        <Box sx={{ borderRadius: 2, border: `1px solid ${tokens.border}`, p: 1.75 }}>
          <Box sx={{ width: 28, height: 28, borderRadius: 2, bgcolor: tokens.accentSoft, border: `1px solid ${tokens.accent}` }} />
          <Box sx={{ ...line('70%', 0.12), mt: 1.5 }} />
        </Box>
        <Box sx={{ gridColumn: 'span 3', height: 40, borderRadius: 2, border: `1px solid ${tokens.border}`, display: 'flex', alignItems: 'center', px: 1.75 }}>
          <Box sx={line('30%', 0.14)} />
        </Box>
      </Box>
    );
  }

  if (variant === 2) {
    return (
      <Box sx={{ position: 'relative', height: '100%', display: 'grid', placeItems: 'center' }}>
        <Box
          sx={{
            width: '46%',
            maxWidth: 190,
            aspectRatio: '1',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 32% 28%, #4b4d66 0%, #1b1b24 45%, #0b0b0d 78%)',
            boxShadow: `0 30px 80px -24px ${tokens.accent}`,
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              inset: '-14%',
              borderRadius: '50%',
              border: `1px solid ${tokens.accent}`,
              opacity: 0.7,
              transform: 'rotateX(72deg)',
            },
          }}
        />
        <Stack direction="row" spacing={1} sx={{ position: 'absolute', bottom: 16 }}>
          {[0, 1, 2].map((i) => (
            <Box key={i} sx={{ width: 22, height: 22, borderRadius: '50%', border: `1px solid ${tokens.borderStrong}`, bgcolor: i === 0 ? tokens.accent : 'transparent' }} />
          ))}
        </Stack>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 1.75 }}>
      {[0, 1, 2, 3].map((i) => (
        <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.75, p: 1.5, borderRadius: 2, border: `1px solid ${tokens.border}` }}>
          <Box sx={{ width: 30, height: 40, borderRadius: 1, bgcolor: i === 1 ? tokens.accent : 'rgba(241, 239, 233, 0.12)' }} />
          <Box sx={{ flex: 1 }}>
            <Box sx={line(`${55 + i * 8}%`, 0.3, 9)} />
            <Box sx={{ ...line(`${30 + i * 6}%`, 0.12, 7), mt: 1 }} />
          </Box>
        </Box>
      ))}
    </Box>
  );
}

function Preview({ project }) {
  return (
    <Box
      role="img"
      className="project-preview"
      aria-label={`Abstract preview mockup of ${project.title}`}
      sx={{
        position: 'relative',
        aspectRatio: '16 / 10',
        borderRadius: 4,
        overflow: 'hidden',
        border: `1px solid ${tokens.border}`,
        backgroundColor: tokens.surface,
        backgroundImage: `radial-gradient(80% 90% at 85% 0%, ${tokens.accentSoft}, transparent 60%)`,
        boxShadow: '0 30px 80px -40px rgba(0, 0, 0, 0.9)',
        transition: 'border-color .35s ease, box-shadow .35s ease',
      }}
    >
      <Stack
        direction="row"
        spacing={0.75}
        sx={{ height: 34, px: 2, alignItems: 'center', borderBottom: `1px solid ${tokens.border}` }}
      >
        {[0, 1, 2].map((i) => (
          <Box key={i} sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'rgba(241, 239, 233, 0.18)' }} />
        ))}
      </Stack>
      <Box sx={{ position: 'absolute', top: 34, left: 0, right: 0, bottom: 0 }}>
        <Mock variant={project.variant} />
      </Box>
    </Box>
  );
}

function Project({ project, index }) {
  const reduce = useReducedMotion();
  const reversed = index % 2 === 1;
  const number = String(index + 1).padStart(2, '0');

  return (
    <Reveal>
      <Box
        component="article"
        aria-labelledby={`project-${project.id}`}
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: reversed ? '5fr 7fr' : '7fr 5fr' },
          gap: { xs: 3.5, md: 9 },
          alignItems: 'center',
          mt: { md: index % 2 === 1 ? 6 : 0 },
          '&:hover .project-preview': { borderColor: tokens.borderStrong },
          '&:hover .project-arrow': { transform: reduce ? 'none' : 'translate(3px, -3px)' },
        }}
      >
        <Box sx={{ order: { xs: 0, md: reversed ? 2 : 1 } }}>
          <motion.div
            whileHover={reduce ? undefined : { y: -6 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          >
            <Preview project={project} />
          </motion.div>
        </Box>

        <Box sx={{ order: { xs: 1, md: reversed ? 1 : 2 } }}>
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="overline" color="text.secondary">
              {number}
            </Typography>
            <Chip label="Sample project" size="small" />
          </Stack>

          <Typography variant="h3" component="h3" id={`project-${project.id}`} sx={{ mb: 2 }}>
            {project.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 480 }}>
            {project.description}
          </Typography>

          <Stack component="ul" direction="row" flexWrap="wrap" useFlexGap spacing={1} sx={{ listStyle: 'none', p: 0, m: 0, mb: 4 }}>
            {project.tags.map((t) => (
              <li key={t}>
                <Chip label={t} size="small" />
              </li>
            ))}
          </Stack>

          <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
            <Button
              component="a"
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              size="small"
              startIcon={<Github size={16} aria-hidden="true" />}
              aria-label={`${project.title} source code on GitHub (opens in a new tab)`}
            >
              GitHub
            </Button>
            <Button
              component="a"
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              color="primary"
              size="small"
              endIcon={
                <Box component="span" className="project-arrow" sx={{ display: 'inline-flex', transition: 'transform .3s ease' }}>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Box>
              }
              aria-label={`${project.title} live demo (opens in a new tab)`}
            >
              Live demo
            </Button>
          </Stack>
        </Box>
      </Box>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <Box
      component="section"
      id="projects"
      aria-labelledby="projects-title"
      sx={{ position: 'relative', zIndex: 1, py: { xs: 12, md: 20 } }}
    >
      <Container maxWidth="xl">
        <SectionHeader index="02" label="Selected projects" title="Selected work" id="projects-title" />
        <Stack spacing={{ xs: 10, md: 16 }}>
          {projects.map((project, i) => (
            <Project key={project.id} project={project} index={i} />
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
