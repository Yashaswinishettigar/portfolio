import { Box, Chip, Container, Typography } from '@mui/material';
import { Flag, FolderGit2, GraduationCap, Presentation } from 'lucide-react';
import { journey } from '../data/journey.js';
import { tokens } from '../theme/theme.js';
import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';

const icons = {
  education: GraduationCap,
  project: FolderGit2,
  workshop: Presentation,
  milestone: Flag,
};

export default function Journey() {
  return (
    <Box
      component="section"
      id="journey"
      aria-labelledby="journey-title"
      sx={{ position: 'relative', zIndex: 1, py: { xs: 12, md: 20 } }}
    >
      <Container maxWidth="xl">
        <SectionHeader index="04" label="Journey" title="How I got here" id="journey-title" />

        <Box
          component="ol"
          sx={{
            listStyle: 'none',
            p: 0,
            m: 0,
            position: 'relative',
            maxWidth: 980,
            // Vertical timeline rail
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 8,
              bottom: 8,
              left: { xs: 20, md: 'calc(200px + 24px + 20px)' },
              width: 1,
              backgroundColor: tokens.border,
            },
          }}
        >
          {journey.map((entry, i) => {
            const Icon = icons[entry.type] ?? Flag;
            return (
              <Box component="li" key={`${entry.title}-${i}`} sx={{ pb: { xs: 5, md: 7 }, '&:last-of-type': { pb: 0 } }}>
                <Reveal delay={i * 0.05}>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { xs: '40px 1fr', md: '200px 40px 1fr' },
                      columnGap: { xs: 2.5, md: 3 },
                      alignItems: 'start',
                    }}
                  >
                    <Typography
                      variant="overline"
                      color="text.secondary"
                      sx={{ gridColumn: { xs: '2', md: '1' }, gridRow: { xs: 1, md: 'auto' }, pt: { md: 1.25 } }}
                    >
                      {entry.period}
                    </Typography>

                    <Box
                      aria-hidden="true"
                      sx={{
                        gridColumn: { xs: '1', md: '2' },
                        gridRow: { xs: '1 / span 2', md: 'auto' },
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        display: 'grid',
                        placeItems: 'center',
                        color: 'primary.main',
                        bgcolor: tokens.bg,
                        border: `1px solid ${tokens.borderStrong}`,
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      <Icon size={17} />
                    </Box>

                    <Box sx={{ gridColumn: { xs: '2', md: '3' } }}>
                      <Typography variant="h5" component="h3" sx={{ mb: 0.5 }}>
                        {entry.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                        {entry.place}
                      </Typography>
                      <Typography variant="body1" sx={{ maxWidth: 560, mb: 1.5 }}>
                        {entry.description}
                      </Typography>
                      <Chip label="Placeholder" size="small" />
                    </Box>
                  </Box>
                </Reveal>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
