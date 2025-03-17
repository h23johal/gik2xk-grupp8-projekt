// import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from "./api";
import { useParams } from 'react-router-dom';
import { Container, Typography, Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [ratings, setRatings] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5002/products/${id}`)
      .then(response => setProduct(response.data.data))
      .catch(error => console.error('Error fetching product:', error));

    axios.get(`http://localhost:5002/ratings/${id}`)
      .then(response => setRatings(response.data.data))
      .catch(error => console.error('Error fetching ratings:', error));
  }, [id]);

  if (!product) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Paper style={{ padding: '1rem' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <img 
            src={product.imageUrl} 
            alt={product.title} 
            style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }} 
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4">{product.title}</Typography>
          <Typography variant="h6" color="text.secondary">
            ${product.price}
          </Typography>
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          {ratings && (
            <Typography variant="body2">
              Average Rating: {ratings.avgScore.toFixed(1)}
            </Typography>
          )}
        </Grid>
      </Grid>
      </Paper>
    </Container>
  );
}

export default ProductDetailPage;