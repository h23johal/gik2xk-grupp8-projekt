import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

function ProductCardSmall({ product }) {
  return (
    <Card>
      <CardActionArea component={Link} to={`/products/${product.id}`}>
        {product.imageUrl && (
          <CardMedia
            component="img"
            height="140"
            image={product.imageUrl}
            alt={product.title}
          />
        )}
        <CardContent>
          <Typography variant="h6">{product.title}</Typography>
          <Typography variant="body2">${product.price}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProductCardSmall;
