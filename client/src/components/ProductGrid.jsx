import ProductCardSmall from "./ProductCardSmall";
import Grid from "@mui/material/Grid2";
import React, { useState, useEffect } from "react";
import { getAll } from "../services/ProductService";
import { Box, CircularProgress, Typography } from "@mui/material";

function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const data = await getAll();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2, textAlign: 'center', color: 'error.main' }}>
        <Typography>{error}</Typography>
      </Box>
    );
  }

  if (products.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography>No products found</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      {products.map(product => (
        <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
          <ProductCardSmall product={product} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductGrid;