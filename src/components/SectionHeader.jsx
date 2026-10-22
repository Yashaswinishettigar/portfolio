import { Box, Typography } from '@mui/material';
import Reveal from './Reveal.jsx';

export default function SectionHeader({ index, label, title, id, sx }) {
  return (
    <Box sx={{ mb: { xs: 6, md: 9 }, ...sx }}>
      <Reveal>
        <Typography variant="overline" component="p" color="primary" sx={{ mb: 2 }}>
          {index} — {label}
        </Typography>
      </Reveal>
      <Reveal delay={0.08}>
        <Typography variant="h2" component="h2" id={id}>
          {title}
        </Typography>
      </Reveal>
    </Box>
  );
}
