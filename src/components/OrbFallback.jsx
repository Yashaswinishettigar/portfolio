import { Box } from '@mui/material';

// Pure-CSS stand-in for the 3D centrepiece (no WebGL, low-power devices, loading state).
export default function OrbFallback() {
  return (
    <Box aria-hidden="true" sx={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
      <Box
        sx={{
          position: 'relative',
          width: 'min(62%, 420px)',
          aspectRatio: '1',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 32% 28%, #3a3a46 0%, #17171d 38%, #0b0b0d 72%)',
          boxShadow:
            'inset -20px -30px 60px rgba(0,0,0,0.6), inset 10px 10px 40px rgba(124,140,255,0.25), 0 40px 120px -30px rgba(124,140,255,0.35)',
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: '-9%',
            borderRadius: '50%',
            border: '1px solid rgba(124,140,255,0.5)',
            transform: 'rotateX(70deg)',
          },
        }}
      />
    </Box>
  );
}
