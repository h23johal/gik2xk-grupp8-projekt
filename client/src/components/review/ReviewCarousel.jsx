import { useState, useEffect, useRef } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import CarouselReviewCard from "./CarouselReviewCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

class ReviewNode {
  constructor(review) {
    this.review = review;
    this.next = null;
  }
}

function createCircularList(reviews) {
  if (!reviews.length) return null;
  const sorted = [...reviews].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const head = new ReviewNode(sorted[0]);
  let curr = head;
  for (let i = 1; i < sorted.length; i++) {
    curr.next = new ReviewNode(sorted[i]);
    curr = curr.next;
  }
  curr.next = head;
  return head;
}

function ReviewCarousel({ reviews, onReviewClick }) {
  const [circularList, setCircularList] = useState(null);
  const [currentNode, setCurrentNode] = useState(null);
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const startXRef = useRef(0);
  const velocityRef = useRef(0);
  const lastTimeRef = useRef(0);
  const animFrameRef = useRef(null);

  const carouselRef = useRef(null);
  const cardWidth = useRef(280);
  const visibleCount = 5;

  useEffect(() => {
    if (reviews && reviews.length) {
      const circHead = createCircularList(reviews);
      setCircularList(circHead);
      setCurrentNode(circHead);
    }
  }, [reviews]);

  useEffect(() => {
    if (carouselRef.current) {
      const firstCard = carouselRef.current.querySelector(".review-card");
      if (firstCard) cardWidth.current = firstCard.offsetWidth + 16;
    }
  }, [reviews]);

  const computeVisibleReviews = () => {
    const visible = [];
    let node = currentNode;
    for (let i = 0; i < visibleCount; i++) {
      visible.push(node.review);
      node = node.next;
    }
    return visible;
  };

  const adjustOffset = (newOff) => {
    let off = newOff;
    while (off >= cardWidth.current / 2) {
      off -= cardWidth.current;
      setCurrentNode(prev => prev.next);
    }
    while (off <= -cardWidth.current / 2) {
      setCurrentNode(prev => {
        let node = circularList;
        while (node.next !== prev) node = node.next;
        return node;
      });
      off += cardWidth.current;
    }
    return off;
  };

  const momentum = () => {
    const now = performance.now();
    const dt = now - lastTimeRef.current;
    lastTimeRef.current = now;
    const deceleration = 0.002;
    if (velocityRef.current > 0) {
      velocityRef.current = Math.max(velocityRef.current - deceleration * dt, 0);
    } else if (velocityRef.current < 0) {
      velocityRef.current = Math.min(velocityRef.current + deceleration * dt, 0);
    }
    const delta = velocityRef.current * dt;
    if (Math.abs(delta) < 0.5) {
      velocityRef.current = 0;
      setOffset(0);
      return;
    }
    setOffset(prev => adjustOffset(prev + delta));
    animFrameRef.current = requestAnimationFrame(momentum);
  };

  const handleMouseDown = (e) => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setIsDragging(true);
    startXRef.current = e.pageX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const now = performance.now();
    const dx = e.pageX - startXRef.current;
    const dt = now - lastTimeRef.current;
    velocityRef.current = dx / dt;
    lastTimeRef.current = now;
    startXRef.current = e.pageX;
    setOffset(prev => adjustOffset(prev + dx));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    lastTimeRef.current = performance.now();
    animFrameRef.current = requestAnimationFrame(momentum);
  };

  const handleMouseLeave = () => {
    if (isDragging) handleMouseUp();
  };

  const handleTouchStart = (e) => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setIsDragging(true);
    startXRef.current = e.touches[0].pageX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const now = performance.now();
    const dx = e.touches[0].pageX - startXRef.current;
    const dt = now - lastTimeRef.current;
    velocityRef.current = dx / dt;
    lastTimeRef.current = now;
    startXRef.current = e.touches[0].pageX;
    setOffset(prev => adjustOffset(prev + dx));
    e.preventDefault();
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    lastTimeRef.current = performance.now();
    animFrameRef.current = requestAnimationFrame(momentum);
  };

  const scrollPrev = () => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setCurrentNode(prev => {
      let node = circularList;
      while (node.next !== prev) node = node.next;
      return node;
    });
    setOffset(0);
  };

  const scrollNext = () => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setCurrentNode(prev => prev.next);
    setOffset(0);
  };

  if (!reviews || !reviews.length)
    return <Typography>No reviews yet</Typography>;

  const visibleReviews = currentNode ? computeVisibleReviews() : [];

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Box
        ref={carouselRef}
        sx={{
          display: "flex",
          gap: 2,
          py: 1,
          px: 0.5,
          overflow: "hidden",
          width: "100%",
          cursor: "grab",
          transform: `translateX(${offset}px)`,
          transition: isDragging ? "none" : "transform 0.05s ease-out"
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {visibleReviews.map((review, idx) => (
          <CarouselReviewCard
            key={`${review.id}-${idx}`}
            review={review}
            onClick={() => { if (!isDragging) onReviewClick(review.id); }}
            className="review-card"
          />
        ))}
      </Box>
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
