// import { createTheme } from '@mui/material/styles';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#E085A3', // Soft blush pink from the clouds
//       light: '#F3B5C9',
//       dark: '#C55F85',
//     },
//     secondary: {
//       main: '#1E2541', // Deep midnight blue from the background
//       light: '#2C3753',
//       dark: '#121829',
//     },
//     background: {
//       default: '#F7E1E8', // Soft pink with a hint of cloud texture
//       paper: 'rgba(255, 255, 255, 0.9)', // Translucent white with cloud-like softness
//     },
//     text: {
//       primary: '#1E2541', // Dark blue for contrast
//       secondary: '#5D6B88', // Muted blue-gray
//     },
//     error: {
//       main: '#D32F2F',
//     },
//     warning: {
//       main: '#ED6C02',
//     },
//     info: {
//       main: '#1976D2',
//     },
//     success: {
//       main: '#2E7D32',
//     },
//   },
//   typography: {
//     fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
//     h1: {
//       fontWeight: 200, // Ultra-light for ethereal feel
//       fontSize: '3.5rem',
//       letterSpacing: '-0.03em',
//       background: 'linear-gradient(45deg, #E085A3, #1E2541)',
//       WebkitBackgroundClip: 'text',
//       WebkitTextFillColor: 'transparent',
//     },
//     h2: {
//       fontWeight: 300,
//       fontSize: '2.8rem',
//       letterSpacing: '-0.02em',
//     },
//     body1: {
//       fontWeight: 300,
//       fontSize: '1rem',
//       lineHeight: 1.8,
//     },
//   },
//   shape: {
//     borderRadius: 24, // More pronounced cloud-like rounding
//   },
//   components: {
//     MuiPaper: {
//       styleOverrides: {
//         root: {
//           backgroundColor: 'rgba(255, 255, 255, 0.7)',
//           backdropFilter: 'blur(15px)',
//           boxShadow: '0 12px 35px rgba(224, 133, 163, 0.1)',
//           borderRadius: 24,
//           border: '1px solid rgba(224, 133, 163, 0.1)',
//           transition: 'all 0.4s ease',
//         },
//       },
//     },
//     MuiCard: {
//       styleOverrides: {
//         root: {
//           backgroundColor: 'rgba(255, 255, 255, 0.6)',
//           backdropFilter: 'blur(20px)',
//           borderRadius: 24,
//           boxShadow: '0 20px 40px rgba(224, 133, 163, 0.08)',
//           overflow: 'hidden',
//           '&:hover': {
//             transform: 'translateY(-8px)',
//             boxShadow: '0 25px 50px rgba(224, 133, 163, 0.12)',
//           },
//         },
//       },
//     },
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           borderRadius: 40, // Extra rounded for soft cloud-like appearance
//           textTransform: 'none',
//           background: 'linear-gradient(135deg, #F3B5C9, #E085A3)',
//           color: 'white',
//           boxShadow: '0 8px 20px rgba(224, 133, 163, 0.3)',
//           transition: 'all 0.3s ease',
//           '&:hover': {
//             transform: 'translateY(-3px)',
//             boxShadow: '0 10px 25px rgba(224, 133, 163, 0.4)',
//           },
//         },
//       },
//     },
//     MuiAppBar: {
//       styleOverrides: {
//         root: {
//           backgroundColor: 'rgba(255, 255, 255, 0.7)',
//           backdropFilter: 'blur(15px)',
//           boxShadow: '0 4px 15px rgba(224, 133, 163, 0.1)',
//         },
//       },
//     },
//   },
//   shadows: [
//     'none',
//     '0 2px 4px rgba(224, 133, 163, 0.1)',
//     '0 4px 8px rgba(224, 133, 163, 0.15)',
//     // ... customize more shadow levels with soft pink theme
//   ],
// });

// export default theme;

// import { createTheme } from '@mui/material/styles';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#E085A3', // Soft blush pink from the clouds
//       light: '#F3B5C9',
//       dark: '#C55F85',
//     },
//     secondary: {
//       main: '#1E2541', // Deep midnight blue from the background
//       light: '#2C3753',
//       dark: '#121829',
//     },
//     background: {
//       default: 'linear-gradient(135deg, #F7E1E8 0%, #E6EAF2 100%)', // Soft pink transitioning to blue-gray
//       paper: 'rgba(255, 255, 255, 0.9)', // Translucent white with cloud-like softness
//     },
//     text: {
//       primary: '#1E2541', // Dark blue for contrast
//       secondary: '#5D6B88', // Muted blue-gray
//     },
//     error: {
//       main: '#D32F2F',
//     },
//     warning: {
//       main: '#ED6C02',
//     },
//     info: {
//       main: '#1976D2',
//     },
//     success: {
//       main: '#2E7D32',
//     },
//   },
//   typography: {
//     fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
//     h1: {
//       fontWeight: 200, // Ultra-light for ethereal feel
//       fontSize: '3.5rem',
//       letterSpacing: '-0.03em',
//       background: 'linear-gradient(45deg, #E085A3, #1E2541)',
//       WebkitBackgroundClip: 'text',
//       WebkitTextFillColor: 'transparent',
//     },
//     h2: {
//       fontWeight: 300,
//       fontSize: '2.8rem',
//       letterSpacing: '-0.02em',
//     },
//     body1: {
//       fontWeight: 300,
//       fontSize: '1rem',
//       lineHeight: 1.8,
//     },
//   },
//   shape: {
//     borderRadius: 24, // More pronounced cloud-like rounding
//   },
//   components: {
//     MuiPaper: {
//       styleOverrides: {
//         root: {
//           background: 'linear-gradient(135deg, rgba(224, 133, 163, 0.1), rgba(30, 37, 65, 0.05))',
//           backdropFilter: 'blur(15px)',
//           boxShadow: '0 12px 35px rgba(224, 133, 163, 0.1)',
//           borderRadius: 24,
//           border: '1px solid rgba(224, 133, 163, 0.1)',
//           transition: 'all 0.4s ease',
//         },
//       },
//     },
//     MuiCard: {
//       styleOverrides: {
//         root: {
//           background: 'linear-gradient(to bottom right, rgba(255,255,255,0.7), rgba(224, 133, 163, 0.2))',
//           backdropFilter: 'blur(20px)',
//           borderRadius: 24,
//           boxShadow: '0 20px 40px rgba(30, 37, 65, 0.08)',
//           overflow: 'hidden',
//           '&:hover': {
//             transform: 'translateY(-8px)',
//             boxShadow: '0 25px 50px rgba(30, 37, 65, 0.12)',
//           },
//         },
//       },
//     },
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           borderRadius: 40, // Extra rounded for soft cloud-like appearance
//           textTransform: 'none',
//           background: 'linear-gradient(135deg, #F3B5C9, #1E2541)',
//           color: 'white',
//           boxShadow: '0 8px 20px rgba(224, 133, 163, 0.3)',
//           transition: 'all 0.3s ease',
//           '&:hover': {
//             transform: 'translateY(-3px)',
//             boxShadow: '0 10px 25px rgba(30, 37, 65, 0.2)',
//           },
//         },
//       },
//     },
//     MuiAppBar: {
//       styleOverrides: {
//         root: {
//           background: 'linear-gradient(to right, rgba(224, 133, 163, 0.2), rgba(30, 37, 65, 0.1))',
//           backdropFilter: 'blur(15px)',
//           boxShadow: '0 4px 15px rgba(30, 37, 65, 0.1)',
//         },
//       },
//     },
//   },
//   shadows: [
//     'none',
//     '0 2px 4px rgba(224, 133, 163, 0.1)',
//     '0 4px 8px rgba(30, 37, 65, 0.1)',
//     // ... customize more shadow levels with soft pink and blue theme
//   ],
// });

// export default theme;

// import { createTheme } from '@mui/material/styles';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#E085A3', // Soft blush pink from the clouds
//       light: '#F3B5C9',
//       dark: '#C55F85',
//     },
//     secondary: {
//       main: '#1E2541', // Deep midnight blue from the background
//       light: '#2C3753',
//       dark: '#121829',
//     },
//     background: {
//       default: 'linear-gradient(135deg, #1E2541 0%, #121829 50%, #E085A3 100%)', // Strong, deep gradient
//       paper: 'rgba(255, 255, 255, 0.85)', // More opaque, cloud-like paper
//     },
//     text: {
//       primary: '#1E2541', // Dark blue for contrast
//       secondary: '#5D6B88', // Muted blue-gray
//     },
//     error: {
//       main: '#D32F2F',
//     },
//     warning: {
//       main: '#ED6C02',
//     },
//     info: {
//       main: '#1976D2',
//     },
//     success: {
//       main: '#2E7D32',
//     },
//   },
//   typography: {
//     fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
//     h1: {
//       fontWeight: 200,
//       fontSize: '3.5rem',
//       letterSpacing: '-0.03em',
//       background: 'linear-gradient(45deg, #F3B5C9, #1E2541)',
//       WebkitBackgroundClip: 'text',
//       WebkitTextFillColor: 'transparent',
//     },
//     h2: {
//       fontWeight: 300,
//       fontSize: '2.8rem',
//       letterSpacing: '-0.02em',
//       color: '#1E2541',
//     },
//     body1: {
//       fontWeight: 300,
//       fontSize: '1rem',
//       lineHeight: 1.8,
//     },
//   },
//   shape: {
//     borderRadius: 32, // Even more pronounced cloud-like rounding
//   },
//   components: {
//     MuiPaper: {
//       styleOverrides: {
//         root: {
//           background: 'linear-gradient(135deg, rgba(255,255,255,0.7), rgba(224, 133, 163, 0.1))',
//           backdropFilter: 'blur(25px)',
//           boxShadow: '0 16px 45px rgba(30, 37, 65, 0.1), 0 8px 20px rgba(224, 133, 163, 0.05)',
//           borderRadius: 32,
//           border: '1px solid rgba(255,255,255,0.3)',
//           transition: 'all 0.4s ease',
//           overflow: 'hidden',
//           position: 'relative',
//           '&::before': {
//             content: '""',
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             background: 'radial-gradient(circle at top left, rgba(255,255,255,0.2), transparent 50%)',
//             pointerEvents: 'none',
//           },
//         },
//       },
//     },
//     MuiCard: {
//       styleOverrides: {
//         root: {
//           background: 'linear-gradient(to bottom right, rgba(255,255,255,0.8), rgba(224, 133, 163, 0.1))',
//           backdropFilter: 'blur(30px)',
//           borderRadius: 32,
//           boxShadow: '0 25px 50px rgba(30, 37, 65, 0.08), 0 15px 30px rgba(224, 133, 163, 0.05)',
//           overflow: 'hidden',
//           position: 'relative',
//           '&::after': {
//             content: '""',
//             position: 'absolute',
//             top: '-50%',
//             left: '-50%',
//             width: '200%',
//             height: '200%',
//             background: 'radial-gradient(circle at center, rgba(255,255,255,0.2), transparent 60%)',
//             opacity: 0.5,
//             pointerEvents: 'none',
//           },
//           '&:hover': {
//             transform: 'translateY(-10px)',
//             boxShadow: '0 30px 60px rgba(30, 37, 65, 0.12), 0 20px 40px rgba(224, 133, 163, 0.08)',
//           },
//         },
//       },
//     },
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           borderRadius: 48, // Ultra-rounded for cloud-like appearance
//           textTransform: 'none',
//           background: 'linear-gradient(135deg, #F3B5C9, #1E2541)',
//           color: 'white',
//           boxShadow: '0 10px 25px rgba(224, 133, 163, 0.3)',
//           transition: 'all 0.3s ease',
//           padding: '12px 28px',
//           '&:hover': {
//             transform: 'translateY(-4px)',
//             boxShadow: '0 12px 30px rgba(30, 37, 65, 0.3)',
//           },
//         },
//       },
//     },
//     MuiAppBar: {
//       styleOverrides: {
//         root: {
//           background: 'linear-gradient(to right, rgba(224, 133, 163, 0.2), rgba(30, 37, 65, 0.2))',
//           backdropFilter: 'blur(20px)',
//           boxShadow: '0 4px 20px rgba(30, 37, 65, 0.1)',
//         },
//       },
//     },
//   },
//   shadows: [
//     'none',
//     '0 2px 4px rgba(224, 133, 163, 0.1)',
//     '0 4px 8px rgba(30, 37, 65, 0.1)',
//     '0 8px 16px rgba(224, 133, 163, 0.15)',
//     '0 12px 24px rgba(30, 37, 65, 0.15)',
//   ],
// });

// export default theme;

// import { createTheme } from '@mui/material/styles';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#E085A3',
//       light: '#F3B5C9',
//       dark: '#C55F85',
//     },
//     secondary: {
//       main: '#1E2541',
//       light: '#2C3753',
//       dark: '#121829',
//     },
//     background: {
//       default: 'radial-gradient(ellipse at bottom right, #1E2541 0%, #0A0E1A 30%, #121829 60%, #E085A3 100%)',
//       paper: 'rgba(255, 255, 255, 0.9)',
//     },
//     text: {
//       primary: '#1E2541',
//       secondary: '#5D6B88',
//     },
//   },
//   typography: {
//     fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
//     h1: {
//       fontWeight: 200,
//       fontSize: '3.5rem',
//       letterSpacing: '-0.03em',
//       background: 'linear-gradient(45deg, #F3B5C9, #1E2541)',
//       WebkitBackgroundClip: 'text',
//       WebkitTextFillColor: 'transparent',
//     },
//   },
//   components: {
//     MuiCssBaseline: {
//       styleOverrides: `
//         body {
//           background: radial-gradient(ellipse at bottom right, #1E2541 0%, #0A0E1A 30%, #121829 60%, #E085A3 100%);
//           background-attachment: fixed;
//           min-height: 100vh;
//           overflow-x: hidden;
//         }
//         body::before {
//           content: "";
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background: 
//             radial-gradient(circle at top left, rgba(224, 133, 163, 0.1) 0%, transparent 20%),
//             radial-gradient(circle at bottom right, rgba(30, 37, 65, 0.2) 0%, transparent 50%);
//           pointer-events: none;
//           z-index: -1;
//         }
//         body::after {
//           content: "";
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background-image: 
//             radial-gradient(circle at 20% 80%, rgba(255,255,255,0.05) 0%, transparent 20%),
//             radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05) 0%, transparent 20%);
//           opacity: 0.5;
//           pointer-events: none;
//           z-index: -1;
//         }
//       `,
//     },
//     MuiPaper: {
//       styleOverrides: {
//         root: {
//           background: 'linear-gradient(135deg, rgba(255,255,255,0.7), rgba(224, 133, 163, 0.1))',
//           backdropFilter: 'blur(25px)',
//           boxShadow: '0 16px 45px rgba(30, 37, 65, 0.1), 0 8px 20px rgba(224, 133, 163, 0.05)',
//           borderRadius: 32,
//           border: '1px solid rgba(255,255,255,0.2)',
//         },
//       },
//     },
//     MuiCard: {
//       styleOverrides: {
//         root: {
//           background: 'linear-gradient(to bottom right, rgba(255,255,255,0.8), rgba(224, 133, 163, 0.1))',
//           backdropFilter: 'blur(30px)',
//           borderRadius: 32,
//           boxShadow: '0 25px 50px rgba(30, 37, 65, 0.08), 0 15px 30px rgba(224, 133, 163, 0.05)',
//           border: '1px solid rgba(255,255,255,0.1)',
//         },
//       },
//     },
//   },
// });

// export default theme;

// import { createTheme } from '@mui/material/styles';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#E091A9', // Soft rose pink
//       light: '#F5C0D0',
//       dark: '#C0697F',
//     },
//     secondary: {
//       main: '#5E6BAE', // Muted mid-century blue
//       light: '#8F9AD1',
//       dark: '#3C4485',
//     },
//     background: {
//       default: 'linear-gradient(135deg, #FFF0F5 0%, #E6E6FA 100%)', // Soft lavender to blush gradient
//       paper: 'rgba(255, 255, 255, 0.85)', // Slightly translucent white
//     },
//     text: {
//       primary: '#2F4F4F', // Deep slate gray
//       secondary: '#6E7B8B', // Muted bluish-gray
//     },
//     error: {
//       main: '#D8315B', // Soft rose red
//     },
//     warning: {
//       main: '#FFD700', // Golden yellow
//     },
//     info: {
//       main: '#5D8AA8', // Soft blue-gray
//     },
//     success: {
//       main: '#8FBC8F', // Soft sage green
//     },
//   },
//   typography: {
//     fontFamily: '"Helvetica Neue", "Arial", sans-serif',
//     h1: {
//       fontWeight: 300,
//       fontSize: '3.5rem',
//       letterSpacing: '-0.02em',
//       color: '#2F4F4F',
//     },
//     h2: {
//       fontWeight: 300,
//       fontSize: '2.8rem',
//       letterSpacing: '-0.01em',
//       color: '#5E6BAE',
//     },
//     body1: {
//       fontWeight: 300,
//       fontSize: '1rem',
//       lineHeight: 1.7,
//     },
//   },
//   shape: {
//     borderRadius: 20, // Soft, rounded corners
//   },
//   components: {
//     MuiPaper: {
//       styleOverrides: {
//         root: {
//           background: 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(230,230,250,0.3))',
//           backdropFilter: 'blur(15px)',
//           boxShadow: '0 10px 30px rgba(94, 107, 174, 0.1)',
//           border: '1px solid rgba(255,255,255,0.5)',
//           borderRadius: 20,
//         },
//       },
//     },
//     MuiCard: {
//       styleOverrides: {
//         root: {
//           background: 'linear-gradient(to bottom right, rgba(255,255,255,0.9), rgba(224, 145, 169, 0.1))',
//           backdropFilter: 'blur(20px)',
//           borderRadius: 20,
//           boxShadow: '0 15px 35px rgba(94, 107, 174, 0.08)',
//           transition: 'transform 0.3s ease',
//           '&:hover': {
//             transform: 'scale(1.02)',
//           },
//         },
//       },
//     },
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           borderRadius: 30,
//           textTransform: 'none',
//           padding: '10px 24px',
//           fontWeight: 500,
//           background: 'linear-gradient(135deg, #F5C0D0, #5E6BAE)',
//           color: 'white',
//           boxShadow: '0 6px 20px rgba(94, 107, 174, 0.2)',
//           transition: 'all 0.3s ease',
//           '&:hover': {
//             transform: 'translateY(-2px)',
//             boxShadow: '0 8px 25px rgba(94, 107, 174, 0.3)',
//           },
//         },
//       },
//     },
//     MuiAppBar: {
//       styleOverrides: {
//         root: {
//           background: 'linear-gradient(to right, rgba(224, 145, 169, 0.2), rgba(94, 107, 174, 0.2))',
//           backdropFilter: 'blur(15px)',
//           boxShadow: '0 4px 15px rgba(94, 107, 174, 0.1)',
//         },
//       },
//     },
//   },
//   shadows: [
//     'none',
//     '0 2px 4px rgba(94, 107, 174, 0.1)',
//     '0 4px 8px rgba(224, 145, 169, 0.1)',
//     '0 8px 16px rgba(94, 107, 174, 0.1)',
//   ],
// });

// export default theme;

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
  ],
});

export default theme;