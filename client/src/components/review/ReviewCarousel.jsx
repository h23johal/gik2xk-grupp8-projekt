import { useState, useEffect, useRef } from "react";
import { Box, Typography, IconButton, CircularProgress } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CarouselReviewCard from "./CarouselReviewCard";
import { useReviews } from "../../utils/useReviews";
import { createCircularList } from "../../utils/circularList";
import { createFlowScroll } from "../../utils/flowScroll";
import { useSwipeScroll } from "../../utils/UseSwipeScroll";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

function ReviewCarousel({ onReviewClick }) {
  const { reviews, loading } = useReviews();
  const [circularList, setCircularList] = useState(null);
  const [currentNode, setCurrentNode] = useState(null);
  const [offset, setOffset] = useState(0);
  const flowScrollRef = useRef(null);
  const carouselRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(5);
  const [showFade, setShowFade] = useState(true);
  

  const GAP_SIZE = 16; 
  

  const cardWidth = useRef(280 + GAP_SIZE); 
  
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));


  useEffect(() => {
    const handleResize = () => {
      if (carouselRef.current) {
        recalculateVisibleCount();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (carouselRef.current && reviews.length > 0) {
      const firstCard = carouselRef.current.querySelector(".review-card");
      if (firstCard) {
        const measuredWidth = firstCard.offsetWidth;
        cardWidth.current = measuredWidth + GAP_SIZE;
        
        recalculateVisibleCount();
      }
    }
  }, [reviews]);

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

  const recalculateVisibleCount = () => {
    if (!carouselRef.current) return;
    
    const containerWidth = carouselRef.current.offsetWidth;
    const effectiveCardWidth = cardWidth.current;
    
    if (isXs) {
      const maxItems = Math.max(1, Math.floor(containerWidth / effectiveCardWidth));
      setVisibleCount(maxItems);
      setShowFade(false);
    } 
    else {
      const maxFullItems = Math.floor(containerWidth / effectiveCardWidth);
      
      if (maxFullItems === 1) {
        setVisibleCount(3); 
      } else {
        setVisibleCount(Math.max(3, maxFullItems + 1));
      }
      setShowFade(true);
    }
  };

  useEffect(() => {
    recalculateVisibleCount();
  }, [carouselRef.current, isXs, reviews, cardWidth.current]);

  useEffect(() => {
    const calculateAlignment = (currentOffset) => {
      const cardWidthValue = cardWidth.current;
      
      const nearestAligned = Math.round(currentOffset / cardWidthValue) * cardWidthValue;
      
      const distance = Math.abs(currentOffset - nearestAligned);
      
      const nextAligned = nearestAligned + cardWidthValue;
      const prevAligned = nearestAligned - cardWidthValue;
      
      if (isXs && visibleCount <= 1) {
        if (currentOffset < -20) {
          return {
            alignedOffset: nextAligned,
            distanceToAligned: 0,
            alignmentThreshold: 0, 
            nextAlignedOffset: nextAligned,
            prevAlignedOffset: prevAligned
          };
        }
        else if (currentOffset > 20) {
          return {
            alignedOffset: prevAligned,
            distanceToAligned: 0,
            alignmentThreshold: 0, 
            nextAlignedOffset: nextAligned,
            prevAlignedOffset: prevAligned
          };
        }
      }
      
      return {
        alignedOffset: nearestAligned,
        distanceToAligned: distance,
        alignmentThreshold: cardWidthValue * 0.3, 
        nextAlignedOffset: nextAligned,
        prevAlignedOffset: prevAligned
      };
    };

    flowScrollRef.current = createFlowScroll({
      initialOffset: 0,
      updateOffset: setOffset,
      deceleration: 0.0035,
      maxVelocity: 0.005,
      maxMomentumDuration: 600,
      alignmentCalculator: calculateAlignment
    });
    
    return () => flowScrollRef.current?.cancel();
  }, [reviews, isXs, visibleCount]);

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

    if (isXs || visibleCount <= 3) {
      setCurrentNode((prev) => {
        if (!prev || !circularList) return prev;
        let node = circularList;
        while (node.next !== prev) node = node.next;
        return node;
      });
    } 

    else {

      if (carouselRef.current) {
        const containerWidth = carouselRef.current.offsetWidth;
        const fullVisibleCards = Math.floor(containerWidth / cardWidth.current);
        

        let node = currentNode;
        for (let i = 0; i < Math.max(1, fullVisibleCards - 2); i++) {
          let prev = circularList;
          while (prev.next !== node) prev = prev.next;
          node = prev;
        }
        setCurrentNode(node);
      } else {

        setCurrentNode((prev) => {
          if (!prev || !circularList) return prev;
          let node = circularList;
          while (node.next !== prev) node = prev.next;
          return node;
        });
      }
    }
    setOffset(0);
  };

  const scrollNext = () => {

    if (isXs || visibleCount <= 3) {
      setCurrentNode((prev) => (prev ? prev.next : prev));
    } 

    else {

      if (carouselRef.current) {
        const containerWidth = carouselRef.current.offsetWidth;
        const fullVisibleCards = Math.floor(containerWidth / cardWidth.current);
        

        let node = currentNode;
        for (let i = 0; i < Math.max(1, fullVisibleCards - 2); i++) {
          node = node.next;
        }
        setCurrentNode(node);
      } else {
        setCurrentNode((prev) => (prev ? prev.next : prev));
      }
    }
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
      marginTop: "-24px",
      overflow: "hidden"
    }}>
      {showFade && (
        <>
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
        </>
      )}
      
      <Box
        ref={carouselRef}
        sx={{
          userSelect: "none",
          display: "flex",
          gap: 2,
          py: 2,
          px: 2,
          overflow: "visible",
          width: "100%",
          cursor: isDragging ? "grabbing" : "grab",
          transform: `translateX(${offset}px)`,
          transition: isDragging ? "none" : "transform 0.7s cubic-bezier(0.22, 0.0, 0.11, 1.0)",
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