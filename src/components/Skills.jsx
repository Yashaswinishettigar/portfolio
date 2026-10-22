import { Box, Container, Stack, Typography } from '@mui/material';
import { Box as CubeIcon, Code2, LayoutTemplate, Wrench } from 'lucide-react';
import { skillGroups } from '../data/skills.js';
import { tokens } from '../theme/theme.js';
import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';

const icons = { code: Code2, ui: LayoutTemplate, creative: CubeIcon, tools: Wrench };

export default function Skills() {
  return (
    <Box
      component="section"
      id="skills"
      aria-labelledby="skills-title"
      sx={{ position: 'relative', zIndex: 1, py: { xs: 12, md: 20 } }}
    >
      <Container maxWidth="xl">
        <SectionHeader index="03" label="Skills & technologies" title="Tools of the craft" id="skills-title" />

        <Box
          component="ul"
          sx={{
            listStyle: 'none',
            p: 0,
            m: 0,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            columnGap: { md: 10 },
          }}
        >
          {skillGroups.map((group, i) => {
            const Icon = icons[group.icon];
            return (
              <Box component="li" key={group.category}>
                <Reveal delay={(i % 2) * 0.08}>
                  <Box sx={{ py: { xs: 4, md: 5 }, borderTop: `1px solid ${tokens.border}` }}>
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1.5 }}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: 2.5,
                          display: 'grid',
                          placeItems: 'center',
                          color: 'primary.main',
                          bgcolor: tokens.accentSoft,
                        }}
                      >
                        <Icon size={19} aria-hidden="true" />
                      </Box>
                      <Typography variant="h4" component="h3">
                        {group.category}
                      </Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      {group.blurb}
                    </Typography>

                    <Stack component="ul" direction="row" flexWrap="wrap" useFlexGap spacing={1.25} sx={{ listStyle: 'none', p: 0, m: 0 }}>
                      {group.items.map((item) => (
                        <Box
                          component="li"
                          key={item}
                          sx={{
                            px: 2,
                            py: 0.9,
                            borderRadius: 999,
                            border: `1px solid ${tokens.border}`,
                            fontSize: '0.9rem',
                            color: 'text.primary',
                            transition: 'border-color .25s ease, background-color .25s ease',
                            '&:hover': { borderColor: tokens.accent, backgroundColor: tokens.accentSoft },
                          }}
                        >
                          {item}
                        </Box>
                      ))}
                    </Stack>
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
