import React, { useState, useEffect } from "react";
import { Rating, Typography, Box } from "@mui/material";
import { getProductRatings } from "../../services/RatingService";

// Storleksprofil för stjärnor + text
const sizeStyles = {
  small: {
    ratingSize: "small",
    fontSize: "0.75rem",
  },
  medium: {
    ratingSize: "medium",
    fontSize: "1rem",
  },
  large: {
    ratingSize: "large",
    fontSize: "1.25rem",
  },
};

function ProductRatingDisplay({
  productId,
  size = "medium",
  showLabel = false,
}) {
  const [avgRating, setAvgRating] = useState(null);

  useEffect(() => {
    async function fetchRating() {
      const res = await getProductRatings(productId);
      if (res?.avgScore !== undefined) {
        setAvgRating(parseFloat(res.avgScore));
      }
    }
    fetchRating();
  }, [productId]);

  const styles = sizeStyles[size] || sizeStyles.medium;

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Rating
        value={avgRating || 0}
        precision={0.1}
        readOnly
        size={styles.ratingSize}
        sx={{ opacity: avgRating === 0 ? 0.3 : 1 }}
      />
      {showLabel && (
        <Typography sx={{ fontSize: styles.fontSize }} color="text.secondary">
          {avgRating !== null ? `${avgRating.toFixed(1)} / 5` : "Inga betyg"}
        </Typography>
      )}
    </Box>
  );
}

export default ProductRatingDisplay;
