import ProductCardSmall from "./ProductCardSmall";
import Grid from "@mui/material/Grid2";
import React, { useState, useEffect } from "react";
import { getAll } from "../../services/ProductService";
import SortDropdown from "./SortDropdown";

function ProductGrid({ renderContent, includeDeleted = false }) {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("default");

  const loadProducts = () => {
    getAll()
      .then((data) => {
        const filteredProducts = includeDeleted
          ? data
          : data.filter((p) => !p.deletedAt);
        setProducts(filteredProducts);
      })
      .catch((err) => console.error("Error fetching products:", err));
  };

  useEffect(() => {
    loadProducts();
  }, [includeDeleted]);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const getSortedProducts = () => {
    const sortedProducts = [...products];
    switch (sortOption) {
      case "priceAsc":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "nameAsc":
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "nameDesc":
        sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }
    return sortedProducts;
  };

  return (
    <>
      <SortDropdown value={sortOption} onChange={handleSortChange} />
      <Grid container spacing={2}>
        {getSortedProducts().map((product) => (
          <Grid key={product.id}>
            {renderContent ? (
              renderContent(product, loadProducts) // 🧠 Skicka med loadProducts som refetch
            ) : (
              <ProductCardSmall product={product} />
            )}
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default ProductGrid;
