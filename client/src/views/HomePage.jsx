import { useState, useEffect } from 'react';
import axios from "./api";
import { Container, Typography } from '@mui/material';
import ProductCardSmall from '../components/Product/ProductCardSmall';
import Grid from '@mui/material/Grid2';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5002/products')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
        setLoading(false);
      });
  }, []);

  if (loading) return <Typography>Loading products...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Our Products</Typography>
      <Grid container spacing={2}>
        {products.map(product => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
            <ProductCardSmall product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default HomePage;
