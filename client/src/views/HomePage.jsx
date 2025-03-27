import { Container, Typography, Box } from "@mui/material";
import ProductGrid from "../components/product/ProductGrid";
import ProductCardSmall from "../components/product/ProductCardSmall";
import StoreInfo from "./StoreInfo";
import PageWrapper from "../components/layout/PageWrapper";

function HomePage() {
  return (
    <PageWrapper>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Intro */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Engineered Beyond Limits
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Where technology transcends function, becoming an art form
          </Typography>
        </Box>

        {/* Produktkort */}
        <ProductGrid
          renderContent={(product) => <ProductCardSmall product={product} />}
        />

        {/* Info-sektion */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 4,
            mt: 5,
          }}
        >
          <Box sx={{ flex: "1 1 300px" }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 300, mb: 2 }}>
              Exceptional Quality
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", lineHeight: 1.8, mb: 2 }}
            >
              We curate only the finest technological innovations that offer both
              superior performance and exceptional design.
            </Typography>
          </Box>

          <Box sx={{ flex: "1 1 300px" }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 300, mb: 2 }}>
              Lifetime Service
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", lineHeight: 1.8, mb: 2 }}
            >
              You're not just acquiring a device—you’re gaining a lifelong relationship.
            </Typography>
          </Box>
        </Box>

        {/* Store info längst ner i sidan */}
        <Box sx={{ mt: 6 }}>
          <StoreInfo />
        </Box>
      </Container>
    </PageWrapper>
  );
}

export default HomePage;
