/* import ProductCardManagementSmall from "./ProductCardManagementSmall";
import Grid from "@mui/material/Grid2";
import React, { useState, useEffect } from "react";
import { getAll } from "../../../services/ProductService";

function ProductGridManagement() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAll()
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <Grid container spacing={2} >
      {products.map((product) => (
        <Grid key={product.id}>
          <ProductCardManagementSmall product={product} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductGridManagement;
 */