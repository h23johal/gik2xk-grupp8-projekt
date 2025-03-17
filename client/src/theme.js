import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#647DEE', // Ethereal blue/purple
      light: '#99A8FF',
      dark: '#3D56B2',
    },
    secondary: {
      main: '#302E41', // Deep slate
      light: '#484660',
      dark: '#1F1D2C',
    },
    background: {
      default: '#FAFAFA', // Almost white
      paper: '#FFFFFF',   // Pure white
    },
    text: {
      primary: '#232136', // Deep slate text
      secondary: '#6E6A8F', // Muted purple-gray
    },
    error: {
      main: '#E53935',
    },
    warning: {
      main: '#FB8C00',
    },
    info: {
      main: '#2196F3',
    },
    success: {
      main: '#43A047',
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 300, // Lighter weight for ethereal feel
      fontSize: '3.5rem',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 300,
      fontSize: '2.8rem',
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 300,
      fontSize: '2.2rem',
      letterSpacing: '0em',
    },
    h4: {
      fontWeight: 300,
      fontSize: '1.8rem',
      letterSpacing: '0em',
    },
    h5: {
      fontWeight: 300,
      fontSize: '1.5rem',
      letterSpacing: '0em',
    },
    h6: {
      fontWeight: 400,
      fontSize: '1.2rem',
      letterSpacing: '0em',
    },
    body1: {
      fontWeight: 300, // Lighter for ethereal feel
      fontSize: '1rem',
      letterSpacing: '0.01em',
      lineHeight: 1.8,
    },
    body2: {
      fontWeight: 300,
      fontSize: '0.9rem',
      letterSpacing: '0.01em',
      lineHeight: 1.7,
    },
    button: {
      fontWeight: 400,
      letterSpacing: '0.05em',
    },
    subtitle1: {
      fontSize: '1.1rem',
      fontWeight: 300,
      letterSpacing: '0.01em',
    },
    subtitle2: {
      fontSize: '0.9rem',
      fontWeight: 300,
      letterSpacing: '0.01em',
    },
  },
  shape: {
    borderRadius: 16, // Soft, cloud-like rounded corners
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#d0d0d0 #fafafa",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#fafafa",
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            backgroundColor: "#d0d0d0",
            borderRadius: 16,
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
            backgroundColor: "#bdbdbd",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
          borderRadius: 16,
          transition: 'all 0.3s ease',
        },
        elevation1: {
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
        },
        elevation2: {
          boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(10px)',
          borderRadius: 16,
          border: '1px solid rgba(255, 255, 255, 0.8)',
          overflow: 'hidden',
          boxShadow: '0 15px 35px rgba(0,0,0,0.05), 0 5px 15px rgba(0,0,0,0.03)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-10px)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.08), 0 10px 20px rgba(0,0,0,0.05)',
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '24px',
          '&:last-child': {
            paddingBottom: '24px',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 30, // Very rounded for smoky feel
          padding: '10px 24px',
          fontWeight: 400,
          boxShadow: 'none',
          position: 'relative',
          transition: 'all 0.3s ease',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))',
            borderRadius: 30,
            opacity: 0,
            transition: 'opacity 0.3s ease',
          },
          '&:hover': {
            boxShadow: '0 6px 15px rgba(100,125,238,0.2)',
            transform: 'translateY(-3px)',
            '&::before': {
              opacity: 1,
            },
          },
        },
        contained: {
          backgroundColor: '#647DEE',
          '&:hover': {
            backgroundColor: '#5170EE',
          },
        },
        outlined: {
          borderWidth: '1px',
          '&:hover': {
            borderWidth: '1px',
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: '24px',
          paddingRight: '24px',
          '@media (min-width:600px)': {
            paddingLeft: '32px',
            paddingRight: '32px',
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(100,125,238,0.1)',
          height: '1px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          backgroundColor: 'rgba(255,255,255,0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(100,125,238,0.1)',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: '70px',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(100,125,238,0.2)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(100,125,238,0.3)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#647DEE',
          },
        },
      },
    },
  },
});

export default theme;