import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import Overlay from "../../Overlay"; // Import reusable Overlay

function ProductCardManagementSmall({ product }) {
  return (
    <Card
      onClick={(e) => e.stopPropagation()}
      sx={{
        bgcolor: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "12px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        overflow: "hidden",
      }}
    >
      {/* Wrap everything in Overlay */}
      <Overlay
        overlayContent={
          <IconButton
            component={Link} // Uses Link for navigation
            to={`/admin/${product.id}`}
            sx={{
              color: "white",
              fontSize: 40,
              transform: "translateY(5px)", // Default position
              transition: "transform 0.2s ease-in-out",
              "&:hover": { transform: "translateY(0px)" }, // Moves up on hover
            }}
          >
            <EditIcon sx={{ fontSize: 50 }} />
          </IconButton>
        }
      >
        {/* Product Image */}
        {product.imageUrl && (
          <CardMedia
            component="img"
            height="160"
            image={product.imageUrl}
            alt={product.title}
            sx={{ objectFit: "cover" }}
          />
        )}

        {/* Card Content */}
        <CardContent>
          <Typography variant="h6" color="text.primary">
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${product.price}
          </Typography>
        </CardContent>
      </Overlay>
    </Card>
  );
}

export default ProductCardManagementSmall;
