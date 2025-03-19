import ProductCardSmall from "./ProductCardSmall";
import Grid from "@mui/material/Grid2";
import React, { useState, useEffect } from "react";
import { getAll } from "../../services/ProductService";

function ProductGrid() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAll()
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid key={product.id}>
          <ProductCardSmall product={product} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductGrid;
