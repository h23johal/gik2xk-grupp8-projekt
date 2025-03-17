// import { Container, Typography } from '@mui/material';
// import ProductGrid from '../components/productGrid';

// function HomePage() {

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>Our Products</Typography>
//         <ProductGrid />
//     </Container>
//   );
// }

// export default HomePage;

import { Container, Typography, Box } from '@mui/material';
import ProductGrid from '../components/productGrid';

function HomePage() {
  return (
    <Container maxWidth="lg" sx={{ py: 8, position: 'relative', overflow: 'hidden' }}>
      <Box sx={{ 
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.05), transparent 60%)',
          pointerEvents: 'none',
          zIndex: -1
        }} />
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 200 }}>
        Explore the Ethereal
      </Typography>
      <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 5 }}>
        Contemporary tech with airy depth—like wisps of smoke.
      </Typography>
      <ProductGrid />
    </Container>
  );
}

export default HomePage;
