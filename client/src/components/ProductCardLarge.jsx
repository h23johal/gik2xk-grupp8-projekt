// foto
// description

import React, { useState, useEffect } from "react";
import { getById } from "../services/ProductService";

function ProductGrid() {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    getById()
      .then(data => setProduct(data))
      .catch(err => console.error("Error fetching products:", err));
  }, []);

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