import { Container, Typography, Box } from "@mui/material";
import ProductGrid from "../components/product/ProductGrid";
import ProductCardSmall from "../components/product/ProductCardSmall";
import StoreInfo from "./StoreInfo";
import PageWrapper from "../components/layout/PageWrapper";

function HomePage() {
  return (
    <PageWrapper>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Sidhuvud med tagline */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Engineered Beyond Limits
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Where technology transcends function, becoming an art form
          </Typography>
        </Box>

        {/* Produktgrid */}
        <ProductGrid
          renderContent={(product) => <ProductCardSmall product={product} />}
        />

        {/* Sektion: värdeerbjudande */}
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
          {/* Kvalitetsbeskrivning */}
          <Box sx={{ flex: "1 1 300px" }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: 300, mb: 2 }}
            >
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

          {/* Servicebeskrivning */}
          <Box sx={{ flex: "1 1 300px" }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: 300, mb: 2 }}
            >
              Lifetime Service
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", lineHeight: 1.8, mb: 2 }}
            >
              When you invest in our collection, you're not just acquiring a
              device—you’re gaining a lifelong relationship. Our dedicated
              support ensures your technology remains as exceptional as the day
              you first experienced it.
            </Typography>
          </Box>
        </Box>

        {/* Sektion: butikens egenskaper */}
        <Box sx={{ mt: 6 }}>
          <StoreInfo />
        </Box>
      </Container>
    </PageWrapper>
  );
}

export default HomePage;
