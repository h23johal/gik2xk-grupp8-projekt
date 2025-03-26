import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getOne } from "../services/ProductService";
import ProductCardLarge from "../components/product/ProductCardLarge";
import ProductManagementForm from "../components/product/management/ProductManagementForm";
import Grid from "@mui/material/Grid2";

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOne(id)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <Grid container spacing={2} sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      <Grid item xs={12} md={8}>
        <ProductCardLarge product={product} />
      </Grid>
      <Grid item xs={12}>
        <ProductManagementForm />
      </Grid>
    </Grid>
  );
}

export default ProductDetailPage;
