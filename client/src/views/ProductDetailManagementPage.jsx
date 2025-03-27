import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOne } from "../services/ProductService";
import ProductCardLarge from "../components/product/ProductCardLarge";
import ProductManagementForm from "../components/product/management/ProductManagementForm";
import Grid from "@mui/material/Grid2";
import { Container, Typography } from "@mui/material";
import PageWrapper from "../components/layout/PageWrapper"; // Lägg till

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
    <PageWrapper>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Produktinformation
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <ProductCardLarge product={product} />
          </Grid>
          <Grid item xs={12}>
            <ProductManagementForm />
          </Grid>
        </Grid>
      </Container>
    </PageWrapper>
  );
}

export default ProductDetailPage;
