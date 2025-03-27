import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from '@mui/material';
import { Link } from 'react-router-dom';
import ProductRatingDisplay from "../rating/ProductRatingDisplay";

function ProductCardSmall({ product }) {
  return (
    <Card
      sx={{
        width: 215, // Fast bredd
        height: 300, // Fast höjd
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        bgcolor: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "12px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 6px 30px rgba(0,0,0,0.3)",
        },
      }}
    >
      <CardActionArea component={Link} to={`/products/${product.id}`} sx={{ height: "100%" }}>
        {product.imageUrl && (
          <CardMedia
            component="img"
            height="160"
            image={product.imageUrl}
            alt={product.title}
            sx={{
              objectFit: "cover",
              opacity: 0.8,
              transition: "opacity 0.2s ease-in-out",
              "&:hover": { opacity: 1 },
            }}
          />
        )}
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            variant="h6"
            color="text.primary"
            noWrap
            sx={{ textOverflow: 'ellipsis' }}
          >
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${product.price}
          </Typography>
          <ProductRatingDisplay productId={product.id} size="small" />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProductCardSmall;
