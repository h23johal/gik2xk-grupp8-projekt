import { Container, Typography, Box } from "@mui/material";
import ProductGrid from "../components/product/ProductGrid";
import ProductCardSmall from "../components/product/ProductCardSmall";
import StoreInfo from "./StoreInfo"; // 👈 Justera om du lagt StoreInfo i en undermapp

function HomePage() {
  return (
    <Box
      sx={{
        pt: 6,
        pb: 0,
        background: "#F0F0F0",
        minHeight: "auto",
      }}
    >
      <Container maxWidth="lg">
        {/* ⭐ Introtext */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 6,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              color: "text.primary",
              fontWeight: 300,
              textAlign: "center",
              mb: 2,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Engineered Beyond Limits
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              textAlign: "center",
              maxWidth: 600,
              fontWeight: 300,
              mb: 3,
            }}
          >
            Where technology transcends function, becoming an art form
          </Typography>

          <Box
            sx={{
              width: 40,
              height: 2,
              backgroundColor: "primary.main",
              mb: 5,
            }}
          />
        </Box>

        {/* 🛍 Produktgrid */}
        <ProductGrid
          renderContent={(product) => <ProductCardSmall product={product} />}
        />

        {/* 📝 Info-texten (flyttad upp hit!) */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 4,
            mt: 6,
            mb: 4,
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
              We curate only the finest technological innovations that offer
              both superior performance and exceptional design. Each product
              represents our unwavering commitment to excellence.
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
              When you invest in our collection, you're not just acquiring a
              device—you're gaining a lifelong relationship. Our dedicated
              support ensures your technology remains as exceptional as the day
              you first experienced it.
            </Typography>
          </Box>
        </Box>
      </Container>

      {/* 🧊 StoreInfo-sektionen – nu smälter den in i bakgrunden */}
      <StoreInfo />
    </Box>
  );
}

export default HomePage;
