import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#E091A9', // Soft rose pink
      light: '#F5C0D0',
      dark: '#C0697F',
    },
    secondary: {
      main: '#5E6BAE', // Muted mid-century blue
      light: '#8F9AD1',
      dark: '#3C4485',
    },
    background: {
      default: 'linear-gradient(135deg, #FFF0F5 0%, #E6E6FA 100%)', // Soft lavender to blush gradient
      paper: 'rgba(255, 255, 255, 0.85)', // Slightly translucent white
    },
    text: {
      primary: '#2F4F4F', // Deep slate gray
      secondary: '#6E7B8B', // Muted bluish-gray
    },
    error: {
      main: '#D8315B', // Soft rose red
    },
    warning: {
      main: '#FFD700', // Golden yellow
    },
    info: {
      main: '#5D8AA8', // Soft blue-gray
    },
    success: {
      main: '#8FBC8F', // Soft sage green
    },
  },
  typography: {
    fontFamily: '"Helvetica Neue", "Arial", sans-serif',
    h1: {
      fontWeight: 300,
      fontSize: '3.5rem',
      letterSpacing: '-0.02em',
      color: '#2F4F4F',
    },
    h2: {
      fontWeight: 300,
      fontSize: '2.8rem',
      letterSpacing: '-0.01em',
      color: '#5E6BAE',
    },
    body1: {
      fontWeight: 300,
      fontSize: '1rem',
      lineHeight: 1.7,
    },
  },
  shape: {
    borderRadius: 20, // Soft, rounded corners
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(230,230,250,0.3))',
          backdropFilter: 'blur(15px)',
          boxShadow: '0 10px 30px rgba(94, 107, 174, 0.1)',
          border: '1px solid rgba(255,255,255,0.5)',
          borderRadius: 20,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(to bottom right, rgba(255,255,255,0.9), rgba(224, 145, 169, 0.1))',
          backdropFilter: 'blur(20px)',
          borderRadius: 20,
          boxShadow: '0 15px 35px rgba(94, 107, 174, 0.08)',
          transition: 'none', // Remove any transition
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          textTransform: 'none',
          padding: '10px 24px',
          fontWeight: 500,
          background: 'linear-gradient(135deg, #F5C0D0, #5E6BAE)',
          color: 'white',
          boxShadow: '0 6px 20px rgba(94, 107, 174, 0.2)',
          transition: 'none', // Remove any transition
          '&:hover': {
            background: 'linear-gradient(135deg, #F5C0D0, #5E6BAE)', // Maintain original background
            boxShadow: '0 6px 20px rgba(94, 107, 174, 0.2)', // Maintain original shadow
            transform: 'none', // Remove any movement
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(to right, rgba(224, 145, 169, 0.2), rgba(94, 107, 174, 0.2))',
          backdropFilter: 'blur(15px)',
          boxShadow: '0 4px 15px rgba(94, 107, 174, 0.1)',
        },
      },
    },
  },
  shadows: [
    'none',
    '0 2px 4px rgba(94, 107, 174, 0.1)',
    '0 4px 8px rgba(224, 145, 169, 0.1)',
    '0 8px 16px rgba(94, 107, 174, 0.1)',
    '0 10px 20px rgba(94, 107, 174, 0.15)',
  ],
});

export default theme;