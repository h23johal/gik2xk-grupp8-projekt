import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getOne } from "../services/ProductService";
import { canUserRate } from "../services/RatingService";
import ProductCardLarge from "../components/product/ProductCardLarge";
import ReviewCarousel from "../components/review/ReviewCarousel";
import ReviewAccordion from "../components/review/ReviewAccordion";
import AddReviewForm from "../components/review/AddReviewForm";
import AddToCart from "../components/cart/AddToCart";
import Grid from "@mui/material/Grid2";
import { useAuth } from "../context/AuthContext";
import { Container, Box, Typography } from "@mui/material";
import PageWrapper from "../components/layout/PageWrapper";
import { ReviewProvider } from "../context/ReviewProvider";

function ProductDetailPage() {
  // Hämta produkt-ID från URL
  const { id } = useParams();
  // Hämta inloggad användare
  const { user } = useAuth();

  // State: produktdata, laddning, vald recension, och rätt att recensera
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [canRate, setCanRate] = useState(false);

  // Ref för att styra interaktion med recensionerna
  const reviewsAccordionRef = useRef(null);

  // Hämta produkt och kontrollera om användaren får recensera
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // Hämta produktinfo
        const prodData = await getOne(id);
        setProduct(prodData);
        // Kontrollera om användaren får recensera
        if (user) canUserRate(id, user.id).then(setCanRate);
      } catch (err) {
        console.error("Fel vid hämtning av produkt:", err);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id, user]);

  // Navigera till och markera specifik recension
  const handleReviewClick = (reviewId) => {
    const idStr = String(reviewId);
    setSelectedReviewId(idStr);
    if (reviewsAccordionRef.current) {
      reviewsAccordionRef.current.expandAccordion();
      setTimeout(() => reviewsAccordionRef.current.scrollToReview(idStr), 300);
    }
  };

  // Rensa markerad recension
  const clearSelectedReview = () => setSelectedReviewId(null);

  // Hantera laddning / produkt saknas
  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
   <PageWrapper>
    {/* Tillhandahåll kontext för recensioner */}
    <ReviewProvider productId={id}>
      <Container maxWidth={false}
        // Responsiv bredd för innehåll
        sx={{
          width: {
            xs: "100%", // Full bredd på små skärmar
            sm: "90%",
            md: "80%",
            lg: "70%",
            xl: "60%",
          },
          mx: "auto", // Centrera horisontellt
          my: 2,       // Vertikal marginal
        }}
      >
        {/* Gridlayout för sidans sektioner */}
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} sx={{ p: { xs: 2, md: 3 } }}>
          {/* Karusell för recensioner */}
          <Grid item xs={12}>
            <ReviewCarousel onReviewClick={handleReviewClick} />
          </Grid>
          
          {/* Produktinformation */}
          <Grid item xs={12}>
            <ProductCardLarge product={product} />
          </Grid>
          
          {/* Lägg till i varukorg */}
          <Grid item xs={12}>
            <AddToCart product={product} />
          </Grid>
          
          {/* Accordion med recensioner */}
          <Grid item xs={12}>
            <ReviewAccordion
              ref={reviewsAccordionRef}
              selectedReviewId={selectedReviewId}
              onReviewNavigated={clearSelectedReview}
            />
          </Grid>
          
          {/* Visa formulär om användaren får skriva recension */}
          {canRate && (
            <Grid item xs={12}>
              <AddReviewForm productId={id} userId={user.id} />
            </Grid>
          )}
        </Grid>
      </Container>
    </ReviewProvider>
    </PageWrapper>
  );
}

export default ProductDetailPage;
