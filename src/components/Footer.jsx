import { Box, Container, Stack, Typography } from '@mui/material';
import { profile } from '../data/profile.js';
import { tokens } from '../theme/theme.js';

export default function Footer() {
  return (
    <Box component="footer" sx={{ position: 'relative', zIndex: 1, py: 5, borderTop: `1px solid ${tokens.border}` }}>
      <Container maxWidth="xl">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          spacing={1.5}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Designed &amp; built with React, Material UI and Three.js.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
