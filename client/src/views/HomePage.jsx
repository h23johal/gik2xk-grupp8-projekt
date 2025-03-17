import { Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

function HomePage() {

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Our Products</Typography>
      <Grid container spacing={2}>
      </Grid>
    </Container>
  );
}

export default HomePage;
