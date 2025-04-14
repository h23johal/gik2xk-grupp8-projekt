import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOne } from "../services/ProductService";
import ProductCardLarge from "../components/product/ProductCardLarge";
import ProductManagementForm from "../components/product/management/ProductManagementForm";
import Grid from "@mui/material/Grid2";
import { Container, Typography } from "@mui/material";
import PageWrapper from "../components/layout/PageWrapper";

function ProductDetailManagementPage() {
  // Hämta produkt-ID från URL
  const { id } = useParams();
  
  // State: produktdata och laddningsstatus
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hämta produktdata när komponenten laddas
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

  // Visa laddning eller felmeddelande
  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <PageWrapper>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Sidrubrik */}
        <Typography variant="h4" gutterBottom>
        Product Information
        </Typography>

        {/* Layout med produktvisning och redigeringsformulär */}
        <Grid container spacing={2}>
          {/* Produktkort */}
          <Grid item xs={12} md={8}>
            <ProductCardLarge product={product} />
          </Grid>
          
          {/* Formulär för redigering */}
          <Grid item xs={12}>
            <ProductManagementForm />
          </Grid>
        </Grid>
      </Container>
    </PageWrapper>
  );
}

export default ProductDetailManagementPage;
