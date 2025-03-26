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
import Container from "@mui/material/Container";
import { useAuth } from "../context/AuthContext";
import { ReviewProvider } from "../context/ReviewProvider";

function ProductDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [canRate, setCanRate] = useState(false);
  const reviewsAccordionRef = useRef(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const prodData = await getOne(id);
        setProduct(prodData);
        if (user) canUserRate(id, user.id).then(setCanRate);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id, user]);

  const handleReviewClick = (reviewId) => {
    const idStr = String(reviewId);
    setSelectedReviewId(idStr);
    if (reviewsAccordionRef.current) {
      reviewsAccordionRef.current.expandAccordion();
      setTimeout(() => reviewsAccordionRef.current.scrollToReview(idStr), 300);
    }
  };

  const clearSelectedReview = () => setSelectedReviewId(null);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <ReviewProvider productId={id}>
      <Container maxWidth={false}
        // Dynamically adjust width with breakpoints.
        sx={{
          width: {
            xs: "100%", // on extra-small screens, full width
            sm: "90%",
            md: "80%",
            lg: "70%",
            xl: "60%",
          },
          mx: "auto", // center horizontally
          my: 2, // vertical margin
        }}
      >
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} sx={{ p: { xs: 2, md: 3 } }}>
          <Grid item xs={12}>
            <ReviewCarousel onReviewClick={handleReviewClick} />
          </Grid>
          <Grid item xs={12}>
            <ProductCardLarge product={product} />
          </Grid>
          <Grid item xs={12}>
            <AddToCart product={product} />
          </Grid>
          <Grid item xs={12}>
            <ReviewAccordion
              ref={reviewsAccordionRef}
              selectedReviewId={selectedReviewId}
              onReviewNavigated={clearSelectedReview}
            />
          </Grid>
          {canRate && (
            <Grid item xs={12}>
              <AddReviewForm productId={id} userId={user.id} />
            </Grid>
          )}
        </Grid>
      </Container>
    </ReviewProvider>
  );
}

export default ProductDetailPage;
