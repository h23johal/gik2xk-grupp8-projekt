import { useState, useEffect, useRef } from "react";
import { Box, Typography, IconButton, CircularProgress } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CarouselReviewCard from "./CarouselReviewCard";
import { useReviews } from "../../utils/useReviews";
import { createCircularList } from "../../utils/circularList";
import { createFlowScroll } from "../../utils/flowScroll";
import { useSwipeScroll } from "../../utils/UseSwipeScroll";

function ReviewCarousel({ onReviewClick }) {
  const { reviews, loading } = useReviews();
  const [circularList, setCircularList] = useState(null);
  const [currentNode, setCurrentNode] = useState(null);
  const [offset, setOffset] = useState(0);
  const flowScrollRef = useRef(null);
  const carouselRef = useRef(null);
  const cardWidth = useRef(280);
  const visibleCount = 5;

  useEffect(() => {
    if (!reviews.length) {
      setCircularList(null);
      setCurrentNode(null);
      return;
    }
    const newCircularList = createCircularList(reviews);
    setCircularList(newCircularList);
    setCurrentNode(newCircularList);
  }, [reviews]);

  useEffect(() => {
    if (carouselRef.current && reviews.length > 0) {
      const firstCard = carouselRef.current.querySelector(".review-card");
      if (firstCard) cardWidth.current = firstCard.offsetWidth + 16;
    }
  }, [reviews]);

useEffect(() => {
  const calculateAlignment = (currentOffset) => {
    const cardWidthValue = cardWidth.current;
    
    // Calculate nearest aligned position
    const nearestAligned = Math.round(currentOffset / cardWidthValue) * cardWidthValue;
    
    // Calculate distance to nearest aligned position
    const distance = Math.abs(currentOffset - nearestAligned);
    
    // Calculate next and previous aligned positions
    const nextAligned = nearestAligned + cardWidthValue;
    const prevAligned = nearestAligned - cardWidthValue;
    
    return {
      alignedOffset: nearestAligned,
      distanceToAligned: distance,
      alignmentThreshold: cardWidthValue * 0.05, // 5% of card width
      nextAlignedOffset: nextAligned,
      prevAlignedOffset: prevAligned
    };
  };

  // Create flowScroll instance with the alignment calculator
  flowScrollRef.current = createFlowScroll({
    initialOffset: 0,
    updateOffset: setOffset,
    deceleration: 0.002,
    maxVelocity: 0.008,
    maxMomentumDuration: 600,
    alignmentCalculator: calculateAlignment
  });
  
  return () => flowScrollRef.current.cancel();
}, [reviews]);

  useEffect(() => {
    if (!circularList || !currentNode) return;
  
    let off = offset;
    let node = currentNode;
  
    while (off >= cardWidth.current / 2) {
      node = node.next;
      off -= cardWidth.current;
    }
  
    while (off <= -cardWidth.current / 2) {
      let prev = circularList;
      while (prev.next !== node) prev = prev.next;
      node = prev;
      off += cardWidth.current;
    }
  
    if (node !== currentNode) {
      setCurrentNode(node);
      setOffset(off);
    }
  }, [offset, circularList, currentNode]);
  
  const { isDragging, swipeProps } = useSwipeScroll({ flowScroll: flowScrollRef.current, direction: "x" });

  const computeVisibleReviews = () => {
    if (!currentNode) return [];
    const visible = [];
    let node = currentNode;
    for (let i = 0; i < visibleCount; i++) {
      visible.push(node.review);
      node = node.next;
    }
    return visible;
  };

  const scrollPrev = () => {
    setCurrentNode((prev) => {
      if (!prev || !circularList) return prev;
      let node = circularList;
      while (node.next !== prev) node = node.next;
      return node;
    });
    setOffset(0);
  };

  const scrollNext = () => {
    setCurrentNode((prev) => (prev ? prev.next : prev));
    setOffset(0);
  };

  const handleReviewCardClick = (reviewId) => {
    if (onReviewClick) onReviewClick(reviewId);
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <CircularProgress size={30} />
      </Box>
    );

  if (!reviews.length) return <Typography>No reviews yet</Typography>;

  const visibleReviews = computeVisibleReviews();

  return (
    <Box sx={{ 
      position: "relative", 
      width: "100%",
      overflow: "hidden" // Add overflow hidden to contain carousel items
    }}>
      {/* Fade overlay at left edge (1/4 card width) */}
      <Box sx={{
        position: "absolute",
        left: 0,
        top: 0,
        height: "100%",
        width: Math.floor(cardWidth.current * 0.25) + "px",
        background: "linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)",
        zIndex: 2,
        pointerEvents: "none"
      }} />
      
      {/* Fade overlay at right edge (1/4 card width) */}
      <Box sx={{
        position: "absolute",
        right: 0,
        top: 0,
        height: "100%",
        width: Math.floor(cardWidth.current * 0.25) + "px",
        background: "linear-gradient(to left, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)",
        zIndex: 2,
        pointerEvents: "none"
      }} />
      
      <Box
        ref={carouselRef}
        sx={{
          userSelect: "none",
          display: "flex",
          gap: 2,
          py: 1,
          px: 0.5,
          overflow: "visible",
          width: "100%",
          cursor: isDragging ? "grabbing" : "grab",
          transform: `translateX(${offset}px)`,
          transition: isDragging ? "none" : "transform 0.15s ease-out",
        }}
        {...swipeProps}
      >
        {visibleReviews.map((review, idx) => (
          <CarouselReviewCard
            key={`${review.id}-${idx}`}
            review={review}
            onClick={handleReviewCardClick}
            className="review-card"
          />
        ))}
      </Box>
      {reviews.length > 1 && (
        <>
          <IconButton
            sx={{ position: "absolute", left: 4, top: "50%", transform: "translateY(-50%)", zIndex: 3 }}
            onClick={scrollPrev}
          >
            <ArrowBackIcon />
          </IconButton>
          <IconButton
            sx={{ position: "absolute", right: 4, top: "50%", transform: "translateY(-50%)", zIndex: 3 }}
            onClick={scrollNext}
          >
            <ArrowForwardIcon />
          </IconButton>
        </>
      )}
    </Box>
  );
}

export default ReviewCarousel;