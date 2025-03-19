import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createProduct,
  getOne,
  removeProduct,
  updateProduct,
} from "../services/ProductService";
import { Box, Button, Container, Chip, TextField, Typography } from "@mui/material";
import ProductGridManagement from "../components/product/management/ProductGridManagement";
import ProductManagementCreate from "../components/product/management/ProductManagementCreate";
// import CategoryTag from '../components/CategoryTag';

function ProductManagement() {
  const [isFixed, setIsFixed] = useState(false);
  const [sidebarTop, setSidebarTop] = useState(0); // Track initial position

  useEffect(() => {
    const sidebar = document.getElementById("sidebar");
    if (sidebar) {
      setSidebarTop(sidebar.offsetTop - 20); // Adjust for spacing
    }

    const handleScroll = () => {
      if (window.scrollY > sidebarTop) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sidebarTop]);

  /* function onTagAdd(tagString) {
    //splitta arrayen vid kommatecken
    const tagArray = tagString.split(',');
    //trimma whitespace runt taggar
    const uniqueAndTrimmedTags = tagArray
      .map((tag) => tag.trim())
      .filter((tag) => !product.tags.includes(tag));

    //slå samman befintlig tag-array med de nya, unika taggarna
    const mergedArray = [...product.tags, ...uniqueAndTrimmedTags];

    //spara befintligt inlägg med nya tags-arrayen till state.
    setProduct({ ...product, tags: mergedArray });
  }

  function onTagDelete(tagToDelete) {
    const newTags = product.tags.filter((tag) => tag !== tagToDelete);

    setProduct({ ...product, tags: newTags });
  } */
  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        component="h1"
        sx={{
          color: "text.primary",
          fontWeight: 300,
          textAlign: "center",
          mb: 2,
          letterSpacing: "0.1em",
        }}
      >
        Product Management
      </Typography>
      <Typography
        variant="p"
        component="h1"
        sx={{
          color: "text.primary",
          fontWeight: 300,
          textAlign: "center",
          mb: 2,
          letterSpacing: "0.1em",
          fontSize: "1em",
        }}
      >
        Select a product to manage its details.
      </Typography>

      {/* Sidebar Layout */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // Stacks on small screens
          gap: 3,
          mt: 3,
        }}
      >
        {/* Main Content - Product Grid */}
        <Box sx={{ flex: 1 }}>
          <ProductGridManagement />
        </Box>

        {/* Sidebar - Product Form */}
        <Box
          sx={{
            width: { xs: "100%", md: "320px" }, // Full width on small screens, fixed width on medium+
            backgroundColor: "white",
            p: 2,
            borderRadius: 2,
            minHeight: "100%",
            position: { md: "sticky" },
            top: "80px", // Keeps it visible when scrolling (adjust based on navbar height)
          }}
        >
          <ProductManagementCreate />
        </Box>
      </Box>
    </Container>
  );
}

export default ProductManagement;
