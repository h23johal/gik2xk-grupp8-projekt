import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material";
import { Link } from "react-router-dom";
import ProductManagementForm from "./ProductManagementForm";

function ProductManagementCreate() {
  return (
    <Card
      sx={{
        bgcolor: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "12px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        maxWidth: "fit-content",
        marginTop: "1rem",
      }}
    >
      <CardContent>
        <Typography variant="h5" component="h1" gutterBottom>
          Add a new product
        </Typography>
        <ProductManagementForm />
      </CardContent>
    </Card>
  );
}

export default ProductManagementCreate;
