import { useState, useEffect, useRef } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { getProductReviews } from "../../services/RatingService";
import CarouselReviewCard from "./CarouselReviewCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function ReviewCarousel({ productId, onReviewClick }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);
  const carouselRef = useRef(null);
  const cardWidth = useRef(280); // Default width, will be updated

  useEffect(() => {
    getProductReviews(productId)
      .then((response) => {
        const reviewList = response.reviews || [];
        // Sort by newest first (most recent date)
        reviewList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setReviews(reviewList);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
        setReviews([]);
        setLoading(false);
      });
  }, [productId]);

  // Get actual card width after render
  useEffect(() => {
    if (carouselRef.current && reviews.length > 0) {
      const firstCard = carouselRef.current.querySelector(".review-card");
      if (firstCard) {
        cardWidth.current = firstCard.offsetWidth + 16; // card + gap
      }
    }
  }, [reviews]);

  // Scroll to previous card
  const scrollPrev = () => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({
      left: -cardWidth.current,
      behavior: "smooth"
    });
  };

  // Scroll to next card
  const scrollNext = () => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({
      left: cardWidth.current,
      behavior: "smooth"
    });
  };

  // Mouse handlers with drag detection
  const handleMouseDown = (e) => {
    if (!carouselRef.current) return;
    
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
    setDragDistance(0);
    carouselRef.current.style.cursor = 'grabbing';
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (carouselRef.current) {
      carouselRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !carouselRef.current) return;
    
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX);
    carouselRef.current.scrollLeft = scrollLeft - walk;
    setDragDistance(Math.abs(walk));
  };

  // Touch handlers
  const handleTouchStart = (e) => {
    if (!carouselRef.current) return;
    
    setIsDragging(true);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
    setDragDistance(0);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !carouselRef.current) return;
    
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX);
    carouselRef.current.scrollLeft = scrollLeft - walk;
    setDragDistance(Math.abs(walk));
    e.preventDefault();
  };

  if (loading) return <Typography>Loading reviews...</Typography>;
  if (reviews.length === 0) return <Typography>No reviews yet</Typography>;

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Box
        ref={carouselRef}
        sx={{
          display: "flex",
          gap: 2,
          py: 1,
          px: 0.5,
          overflow: "auto",
          width: "100%",
          scrollBehavior: "smooth", 
          "::-webkit-scrollbar": { display: "none" },
          cursor: "grab",
          overscrollBehavior: "none",
          msOverflowStyle: "none",
          scrollbarWidth: "none"
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleMouseUp}
        onTouchMove={handleTouchMove}
      >
        {reviews.map((review) => (
          <CarouselReviewCard
            key={review.id}
            review={review}
            onClick={(id) => {
              // Only trigger click if not dragging
              if (dragDistance < 5) {
                onReviewClick(id);
              }
            }}
            className="review-card"
          />
        ))}
      </Box>
      
      {/* Navigation arrows */}
      <IconButton 
        sx={{ 
          position: "absolute", 
          left: 4, 
          top: "50%", 
          transform: "translateY(-50%)",
          backgroundColor: "rgba(255,255,255,0.3)",
          "&:hover": { backgroundColor: "rgba(255,255,255,0.5)" }
        }}
        onClick={scrollPrev}
      >
        <ArrowBackIcon />
      </IconButton>
      
      <IconButton 
        sx={{ 
          position: "absolute", 
          right: 4, 
          top: "50%", 
          transform: "translateY(-50%)",
          backgroundColor: "rgba(255,255,255,0.3)",
          "&:hover": { backgroundColor: "rgba(255,255,255,0.5)" }
        }}
        onClick={scrollNext}
      >
        <ArrowForwardIcon />
      </IconButton>
    </Box>
  );
}

export default ReviewCarousel;