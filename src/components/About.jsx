import { Box, Container, Typography } from '@mui/material';
import { about } from '../data/profile.js';
import { tokens } from '../theme/theme.js';
import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';

export default function About() {
  return (
    <Box
      component="section"
      id="about"
      aria-labelledby="about-title"
      sx={{ position: 'relative', zIndex: 1, py: { xs: 12, md: 20 } }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '4fr 8fr' },
            columnGap: { md: 10 },
          }}
        >
          <Box sx={{ alignSelf: 'start', position: { md: 'sticky' }, top: { md: 120 } }}>
            <SectionHeader index="01" label="About" title="A little about me" id="about-title" />
          </Box>

          <Box>
            <Reveal>
              <Typography variant="h4" component="p" sx={{ mb: { xs: 6, md: 8 }, maxWidth: 760 }}>
                {about.lead}
              </Typography>
            </Reveal>

            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, borderBottom: `1px solid ${tokens.border}` }}>
              {about.details.map((d, i) => (
                <Box component="li" key={d.term}>
                  <Reveal delay={i * 0.05}>
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: '200px 1fr' },
                        gap: { xs: 1, sm: 4 },
                        py: 3.5,
                        borderTop: `1px solid ${tokens.border}`,
                      }}
                    >
                      <Typography component="h3" variant="overline" color="text.secondary">
                        {d.term}
                      </Typography>
                      <Typography component="p" variant="body1" sx={{ m: 0, maxWidth: 560 }}>
                        {d.text}
                      </Typography>
                    </Box>
                  </Reveal>
                </Box>
              ))}
            </Box>

            <Reveal delay={0.1}>
              <Box
                component="ul"
                sx={{
                  listStyle: 'none',
                  p: 0,
                  mt: { xs: 6, md: 8 },
                  mb: 0,
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' },
                  gap: { xs: 3, md: 4 },
                }}
              >
                {about.highlights.map((h) => (
                  <Box component="li" key={h.label}>
                    <Typography variant="overline" color="text.secondary" component="p">
                      {h.label}
                    </Typography>
                    <Typography variant="h5" component="p" sx={{ mt: 0.5 }}>
                      {h.value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Reveal>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
