import { Container, Typography } from '@mui/material';
import ProductGrid from '../components/productGrid';

function HomePage() {

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Our Products</Typography>
        <ProductGrid />
    </Container>
  );
}

export default HomePage;
