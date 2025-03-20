import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { getProductReviews } from "../../services/RatingService";
import ReviewCardSmall from "./ReviewCardSmall";

function ReviewCarousel({ productId, onReviewClick }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductReviews(productId)
      .then((response) => {
        const reviewList = response.reviews || [];
        setReviews(reviewList);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
        setReviews([]);
        setLoading(false);
      });
  }, [productId]);

  if (loading) return <Typography>Loading reviews...</Typography>;
  if (reviews.length === 0) return <Typography>No reviews yet</Typography>;

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        py: 1,
        overflow: "auto",
        width: "100%",
        scrollSnapType: "x mandatory",
        "& > *": {
          scrollSnapAlign: "center",
        },
        "::-webkit-scrollbar": { display: "scrollbar" },
      }}
    >
      {reviews.map((review) => (
        <ReviewCardSmall
          key={review.id}
          review={review}
          onClick={onReviewClick}
        />
      ))}
    </Box>
  );
}

export default ReviewCarousel;
