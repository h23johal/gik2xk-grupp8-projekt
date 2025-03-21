
import {
  Box,
  Container,
  Typography,
} from "@mui/material";

import ProductGrid from "../components/product/ProductGrid";
import ProductCardManagementSmall from "../components/product/management/ProductCardManagementSmall";
import ProductManagementCreate from "../components/product/management/ProductManagementCreate";
// import CategoryTag from '../components/CategoryTag';

function ProductManagement() {

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
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
          mt: 3,
        }}
      >
        {/* Main Content - Product Grid */}
        <Box sx={{ flex: 1 }}>
          <ProductGrid
            renderContent={(product) => (
              <ProductCardManagementSmall product={product} />
            )}
          />
        </Box>

        {/* Sidebar - Product Form */}
        <Box
          sx={{
            width: { xs: "100%", md: "320px" },
            backgroundColor: "white",
            p: 2,
            borderRadius: 2,
            minHeight: "100%",
            position: { md: "sticky" },
            top: "80px",
          }}
        >
          <ProductManagementCreate />
        </Box>
      </Box>
    </Container>
  );
}

export default ProductManagement;
