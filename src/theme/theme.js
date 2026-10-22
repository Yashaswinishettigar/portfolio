import { createTheme } from '@mui/material/styles';

// Single source of truth for the visual language.
export const tokens = {
  bg: '#0b0b0d',
  surface: '#121216',
  surfaceRaised: '#17171c',
  border: 'rgba(241, 239, 233, 0.1)',
  borderStrong: 'rgba(241, 239, 233, 0.22)',
  text: '#f1efe9',
  muted: '#a4a4ad',
  accent: '#7c8cff',
  accentHover: '#9aa7ff',
  accentSoft: 'rgba(124, 140, 255, 0.14)',
};

const display = '"Space Grotesk", "Inter", system-ui, sans-serif';
const body = '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: tokens.accent, contrastText: tokens.bg },
    background: { default: tokens.bg, paper: tokens.surface },
    text: { primary: tokens.text, secondary: tokens.muted },
    divider: tokens.border,
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: body,
    h1: {
      fontFamily: display,
      fontWeight: 700,
      fontSize: 'clamp(2.9rem, 8.5vw, 7rem)',
      lineHeight: 0.96,
      letterSpacing: '-0.045em',
    },
    h2: {
      fontFamily: display,
      fontWeight: 600,
      fontSize: 'clamp(2.1rem, 5vw, 3.9rem)',
      lineHeight: 1.04,
      letterSpacing: '-0.035em',
    },
    h3: {
      fontFamily: display,
      fontWeight: 600,
      fontSize: 'clamp(1.6rem, 3vw, 2.3rem)',
      lineHeight: 1.1,
      letterSpacing: '-0.025em',
    },
    h4: {
      fontFamily: display,
      fontWeight: 500,
      fontSize: 'clamp(1.35rem, 2.4vw, 1.9rem)',
      lineHeight: 1.3,
      letterSpacing: '-0.015em',
    },
    h5: { fontFamily: display, fontWeight: 600, fontSize: '1.1rem', letterSpacing: '-0.01em' },
    body1: { fontSize: '1.02rem', lineHeight: 1.7 },
    body2: { fontSize: '0.92rem', lineHeight: 1.65 },
    overline: {
      fontFamily: display,
      fontWeight: 500,
      fontSize: '0.75rem',
      letterSpacing: '0.22em',
      lineHeight: 1.6,
    },
    button: { textTransform: 'none', fontWeight: 500 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: tokens.bg,
          color: tokens.text,
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
        ':focus-visible': {
          outline: `2px solid ${tokens.accent}`,
          outlineOffset: 3,
        },
      },
    },
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
    MuiAppBar: { styleOverrides: { root: { backgroundImage: 'none' } } },
    MuiLink: { defaultProps: { underline: 'none', color: 'inherit' } },
    MuiButton: {
      defaultProps: { disableElevation: true, disableRipple: true },
      styleOverrides: {
        root: {
          borderRadius: 999,
          padding: '12px 26px',
          minHeight: 48,
          fontSize: '0.95rem',
          letterSpacing: '-0.005em',
          transition: 'background-color .25s ease, border-color .25s ease, color .25s ease, box-shadow .25s ease',
        },
        containedPrimary: {
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: tokens.accentHover,
            boxShadow: '0 10px 34px -10px rgba(124, 140, 255, 0.6)',
          },
        },
        outlined: {
          borderColor: tokens.borderStrong,
          color: tokens.text,
          '&:hover': { borderColor: tokens.text, backgroundColor: 'rgba(241, 239, 233, 0.05)' },
        },
        text: {
          color: tokens.text,
          '&:hover': { backgroundColor: 'rgba(241, 239, 233, 0.06)' },
        },
        sizeSmall: { minHeight: 44, padding: '8px 18px', fontSize: '0.88rem' },
      },
    },
    MuiIconButton: {
      defaultProps: { disableRipple: true },
      styleOverrides: {
        root: {
          width: 46,
          height: 46,
          borderRadius: 14,
          color: tokens.text,
          border: `1px solid ${tokens.border}`,
          transition: 'border-color .25s ease, background-color .25s ease, color .25s ease',
          '&:hover': { borderColor: tokens.borderStrong, backgroundColor: 'rgba(241, 239, 233, 0.05)' },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          backgroundColor: 'transparent',
          border: `1px solid ${tokens.border}`,
          color: tokens.muted,
          fontWeight: 500,
          fontSize: '0.78rem',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: 'rgba(241, 239, 233, 0.03)',
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: tokens.borderStrong },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: tokens.accent, borderWidth: 1 },
        },
        notchedOutline: { borderColor: tokens.border },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: 'min(86vw, 360px)',
          backgroundColor: 'rgba(11, 11, 13, 0.94)',
          backdropFilter: 'blur(18px)',
          borderLeft: `1px solid ${tokens.border}`,
        },
      },
    },
  },
});

export default theme;
