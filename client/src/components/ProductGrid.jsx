import ProductCardSmall from "./ProductCardSmall";
import Grid from "@mui/material/Grid2";
import React from "react";
import {getAll} from "../services/ProductService";

function ProductGrid() {
  const products = [];
  getAll().then((products) => console.log(products));
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