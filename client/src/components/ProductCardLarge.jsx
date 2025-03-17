// foto
// description

// import { Card, CardContent, CardMedia, Typography } from '@mui/material';

// function ProductCardLarge({ product }) {
//   return (
//     <Card>
//       <CardMedia
//         component="img"
//         height="400"
//         image={product.imageUrl}
//         alt={product.title}
//       />
//       <CardContent>
//         <Typography variant="h4">{product.title}</Typography>
//         <Typography variant="body1">{product.description}</Typography>
//       </CardContent>
//     </Card>
//   );
// }

// export default ProductCardLarge;

import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

function ProductCardLarge({ product }) {
  return (
    <Card sx={{
      maxWidth: '100%',
      m: { xs: 1, sm: 2 },
      borderRadius: 2,
      bgcolor: 'background.paper',
      boxShadow: 3
    }}>
      <CardMedia
        component="img"
        sx={{ 
          height: { xs: '20vh', sm: '30vh', md: '40vh' },
          objectFit: 'contain'
        }}
        image={product.imageUrl}
        alt={product.title}
      />
      <CardContent>
        <Typography variant="h5" component="h1" gutterBottom>
          {product.title}
        </Typography>
        <Typography variant="body1">
          {product.description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ProductCardLarge;