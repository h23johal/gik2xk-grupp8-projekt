import {
  Box,
  Container,
  Typography,
} from "@mui/material";

import ProductGrid from "../components/product/ProductGrid";
import ProductCardManagementSmall from "../components/product/management/ProductCardManagementSmall";
import ProductManagementCreate from "../components/product/management/ProductManagementCreate";
import PageWrapper from "../components/layout/PageWrapper";

function ProductManagementPage() {
  return (
    <PageWrapper>
      <Container maxWidth="lg" sx={{ py: 4 }}>
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
          variant="body1"
          sx={{
            color: "text.primary",
            fontWeight: 300,
            textAlign: "center",
            mb: 4,
            letterSpacing: "0.1em",
          }}
        >
          Select a product to manage its details.
        </Typography>

        {/* Layout: Grid + Sidebar */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
          }}
        >
          {/* Product Grid */}
          <Box sx={{ flex: 1 }}>
            <ProductGrid
              includeDeleted={true}
              renderContent={(product, refetch) => (
                <ProductCardManagementSmall
                  product={product}
                  refetch={refetch}
                />
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
              boxShadow: 1,
            }}
          >
            <ProductManagementCreate />
          </Box>
        </Box>
      </Container>
    </PageWrapper>
  );
}

export default ProductManagementPage;
