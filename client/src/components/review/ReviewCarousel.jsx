// // import { useState, useEffect, useRef } from "react";
// // import { Box, Typography, IconButton, CircularProgress } from "@mui/material";
// // import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// // import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// // import CarouselReviewCard from "./CarouselReviewCard";
// // import { useReviews } from "../../utils/useReviews";
// // import { createCircularList } from "../../utils/circularList";

// // // class ReviewNode {
// // //   constructor(review) {
// // //     this.review = review;
// // //     this.next = null;
// // //   }
// // // }

// // // function createCircularList(reviews) {
// // //   if (!reviews.length) return null;
// // //   const sorted = [...reviews].sort(
// // //     (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
// // //   );
// // //   const head = new ReviewNode(sorted[0]);
// // //   let current = head;
// // //   for (let i = 1; i < sorted.length; i++) {
// // //     current.next = new ReviewNode(sorted[i]);
// // //     current = current.next;
// // //   }
// // //   current.next = head;
// // //   return head;
// // // }

// // function ReviewCarousel({ onReviewClick }) {
// //   const { reviews, loading } = useReviews();
  
// //   const [circularList, setCircularList] = useState(null); //infinityScroll
// //   const [currentNode, setCurrentNode] = useState(null); //infinityScroll
// //   const [offset, setOffset] = useState(0); //flowScroll
// //   const [isDragging, setIsDragging] = useState(false);//flowScroll

// //   //flowScroll
// //   const startXRef = useRef(0); 
// //   const velocityRef = useRef(0);
// //   const lastTimeRef = useRef(0);
// //   const animFrameRef = useRef(null);

// //   const carouselRef = useRef(null);
// //   const cardWidth = useRef(280);
// //   const visibleCount = 5;

// //   // Create circular list when reviews change
// //   useEffect(() => {
// //     if (reviews.length === 0) {
// //       setCircularList(null);
// //       setCurrentNode(null);
// //       return;
// //     }
    
// //     // If we already have a list, try to maintain position
// //     if (circularList && currentNode && reviews.length > 0) {
// //       const currentReviewId = currentNode.review.id;
      
// //       // Create new circular list
// //       const sorted = [...reviews].sort(
// //         (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
// //       );
      
// //       // Build new list
// //       const head = new ReviewNode(sorted[0]);
// //       let current = head;
// //       for (let i = 1; i < sorted.length; i++) {
// //         current.next = new ReviewNode(sorted[i]);
// //         current = current.next;
// //       }
// //       current.next = head;
      
// //       // Try to find the same position in the new list
// //       let newCurrentNode = head;
// //       let foundMatch = false;
      
// //       // Try to find a matching node in the new list
// //       for (let i = 0; i < sorted.length; i++) {
// //         if (newCurrentNode.review.id === currentReviewId) {
// //           foundMatch = true;
// //           break;
// //         }
// //         newCurrentNode = newCurrentNode.next;
// //       }
      
// //       setCircularList(head);
// //       setCurrentNode(foundMatch ? newCurrentNode : head);
// //     } else {
// //       // Initial load
// //       const circHead = createCircularList(reviews);
// //       setCircularList(circHead);
// //       setCurrentNode(circHead);
// //     }
// //   }, [reviews]);

// //   // Update card width after reviews load
// //   useEffect(() => {
// //     if (carouselRef.current && reviews.length > 0) {
// //       const firstCard = carouselRef.current.querySelector(".review-card");
// //       if (firstCard) cardWidth.current = firstCard.offsetWidth + 16;
// //     }
// //   }, [reviews]);

// //   // Clean up animation frame on unmount
// //   useEffect(() => {
// //     return () => {
// //       if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
// //     };
// //   }, []);

// //   const sortedReviews = [...reviews].sort(
// //     (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
// //   );
// //   const circList = createCircularList(sortedReviews);

// //   const adjustOffset = (newOff) => {
// //     let off = newOff;
    
// //     // Batch node updates to improve performance
// //     let nodeChanges = 0;
// //     let newNode = currentNode;
    
// //     while (off >= cardWidth.current / 2) {
// //       off -= cardWidth.current;
// //       newNode = newNode.next;
// //       nodeChanges++;
// //     }
    
// //     while (off <= -cardWidth.current / 2) {
// //       // Find previous node
// //       let prev = circularList;
// //       while (prev.next !== newNode) prev = prev.next;
// //       newNode = prev;
// //       off += cardWidth.current;
// //       nodeChanges--;
// //     }
    
// //     // Apply node changes if needed
// //     if (nodeChanges !== 0) {
// //       setCurrentNode(newNode);
// //     }
    
// //     return off;
// //   };

// //   const snapToCard = () => {
// //     if (Math.abs(offset) < cardWidth.current * 0.2) {
// //       setOffset(0);
// //       return;
// //     }
    
// //     // Snap to previous or next card
// //     if (offset > 0) {
// //       scrollPrev();
// //     } else {
// //       scrollNext();
// //     }
// //   };

// //   const momentum = () => {
// //     const now = performance.now();
// //     const dt = now - lastTimeRef.current;
// //     lastTimeRef.current = now;
// //     const deceleration = 0.002;
    
// //     if (velocityRef.current > 0) {
// //       velocityRef.current = Math.max(velocityRef.current - deceleration * dt, 0);
// //     } else if (velocityRef.current < 0) {
// //       velocityRef.current = Math.min(velocityRef.current + deceleration * dt, 0);
// //     }
    
// //     const delta = velocityRef.current * dt;
// //     if (Math.abs(delta) < 0.5) {
// //       velocityRef.current = 0;
// //       snapToCard();
// //       return;
// //     }
    
// //     setOffset(prev => adjustOffset(prev + delta));
// //     animFrameRef.current = requestAnimationFrame(momentum);
// //   };

// //   const handleMouseDown = (e) => {
// //     if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
// //     setIsDragging(true);
// //     startXRef.current = e.pageX;
// //     lastTimeRef.current = performance.now();
// //     velocityRef.current = 0;
// //   };

// //   const handleMouseMove = (e) => {
// //     if (!isDragging) return;
// //     const now = performance.now();
// //     const dx = e.pageX - startXRef.current;
// //     const dt = now - lastTimeRef.current;
// //     velocityRef.current = dx / dt;
// //     lastTimeRef.current = now;
// //     startXRef.current = e.pageX;
// //     setOffset(prev => adjustOffset(prev + dx));
// //   };

// //   const handleMouseUp = () => {
// //     setIsDragging(false);
// //     lastTimeRef.current = performance.now();
// //     animFrameRef.current = requestAnimationFrame(momentum);
// //   };

// //   const handleMouseLeave = () => {
// //     if (isDragging) handleMouseUp();
// //   };

// //   const handleTouchStart = (e) => {
// //     if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
// //     setIsDragging(true);
// //     startXRef.current = e.touches[0].pageX;
// //     lastTimeRef.current = performance.now();
// //     velocityRef.current = 0;
// //   };

// //   const handleTouchMove = (e) => {
// //     if (!isDragging) return;
// //     const now = performance.now();
// //     const dx = e.touches[0].pageX - startXRef.current;
// //     const dt = now - lastTimeRef.current;
// //     velocityRef.current = dx / dt;
// //     lastTimeRef.current = now;
// //     startXRef.current = e.touches[0].pageX;
// //     setOffset(prev => adjustOffset(prev + dx));
// //     e.preventDefault();
// //   };

// //   const handleTouchEnd = () => {
// //     setIsDragging(false);
// //     lastTimeRef.current = performance.now();
// //     animFrameRef.current = requestAnimationFrame(momentum);
// //   };

// //   const scrollPrev = () => {
// //     if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
// //     setCurrentNode(prev => {
// //       if (!prev || !circularList) return prev;
// //       let node = circularList;
// //       while (node.next !== prev) node = node.next;
// //       return node;
// //     });
// //     setOffset(0);
// //   };

// //   const scrollNext = () => {
// //     if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
// //     setCurrentNode(prev => prev?.next || prev);
// //     setOffset(0);
// //   };

// //   const handleReviewCardClick = (reviewId) => {
// //     // Direct passthrough to parent component
// //     if (typeof onReviewClick === 'function') {
// //       onReviewClick(reviewId);
// //     }
// //   };
  
// //   if (loading) return (
// //     <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
// //       <CircularProgress size={30} />
// //     </Box>
// //   );

// //   if (!reviews.length) return <Typography>No reviews yet</Typography>;

// //   const visibleReviews = computeVisibleReviews();

// //   return (
// //     <Box sx={{ position: "relative", width: "100%" }}>
// //       <Box
// //         ref={carouselRef}
// //         sx={{
// //           display: "flex",
// //           gap: 2,
// //           py: 1,
// //           px: 0.5,
// //           overflow: "hidden",
// //           width: "100%",
// //           cursor: isDragging ? "grabbing" : "grab",
// //           transform: `translateX(${offset}px)`,
// //           transition: isDragging ? "none" : "transform 0.05s ease-out"
// //         }}
// //         onMouseDown={handleMouseDown}
// //         onMouseMove={handleMouseMove}
// //         onMouseUp={handleMouseUp}
// //         onMouseLeave={handleMouseLeave}
// //         onTouchStart={handleTouchStart}
// //         onTouchMove={handleTouchMove}
// //         onTouchEnd={handleTouchEnd}
// //       >
// //         {visibleReviews.map((review, idx) => (
// //           <CarouselReviewCard
// //             key={`${review.id}-${idx}`}
// //             review={review}
// //             onClick={handleReviewCardClick}
// //             className="review-card"
// //           />
// //         ))}
// //       </Box>
      
// //       {/* Only show navigation buttons if there are multiple reviews */}
// //       {reviews.length > 1 && (
// //         <>
// //           <IconButton
// //             sx={{
// //               position: "absolute",
// //               left: 4,
// //               top: "50%",
// //               transform: "translateY(-50%)",
// //               backgroundColor: "rgba(255,255,255,0.3)",
// //               "&:hover": { backgroundColor: "rgba(255,255,255,0.5)" }
// //             }}
// //             onClick={scrollPrev}
// //           >
// //             <ArrowBackIcon />
// //           </IconButton>
// //           <IconButton
// //             sx={{
// //               position: "absolute",
// //               right: 4,
// //               top: "50%",
// //               transform: "translateY(-50%)",
// //               backgroundColor: "rgba(255,255,255,0.3)",
// //               "&:hover": { backgroundColor: "rgba(255,255,255,0.5)" }
// //             }}
// //             onClick={scrollNext}
// //           >
// //             <ArrowForwardIcon />
// //           </IconButton>
// //         </>
// //       )}
// //     </Box>
// //   );
// // }

// // export default ReviewCarousel;

// import { useState, useEffect, useRef } from "react";
// import { Box, Typography, IconButton, CircularProgress } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import CarouselReviewCard from "./CarouselReviewCard";
// import { useReviews } from "../../utils/useReviews";
// import { createCircularList } from "../../utils/circularList";
// import { createFlowScroll } from '../../utils/flowScroll';

// function ReviewCarousel({ onReviewClick }) {
//   const { reviews, loading } = useReviews();
//   const [circularList, setCircularList] = useState(null);
//   const [currentNode, setCurrentNode] = useState(null);
//   const [offset, setOffset] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const startXRef = useRef(0);
//   const carouselRef = useRef(null);
//   const cardWidth = useRef(280);
//   const visibleCount = 5;
//   const flowScroll = useRef(null);

//   useEffect(() => {
//     if (!reviews.length) {
//       setCircularList(null);
//       setCurrentNode(null);
//       return;
//     }
//     const newCircularList = createCircularList(reviews);
//     setCircularList(newCircularList);
//     setCurrentNode(newCircularList);
//   }, [reviews]);

//   useEffect(() => {
//     if (carouselRef.current && reviews.length > 0) {
//       const firstCard = carouselRef.current.querySelector(".review-card");
//       if (firstCard) cardWidth.current = firstCard.offsetWidth + 16;
//     }
//   }, [reviews]);

//   useEffect(() => {
//     flowScroll.current = createFlowScroll({
//       initialOffset: 0,
//       updateOffset: setOffset,
//       cardWidth: cardWidth.current,
//       deceleration: 0.004,
//       maxVelocity: 2.5,
//       maxMomentumDuration: 800,
//     });
//     return () => flowScroll.current.cancel();
//   }, [reviews]);

//   const computeVisibleReviews = () => {
//     if (!currentNode) return [];
//     const visible = [];
//     let node = currentNode;
//     for (let i = 0; i < visibleCount; i++) {
//       visible.push(node.review);
//       node = node.next;
//     }
//     return visible;
//   };

//   const handleMouseDown = (e) => {
//     flowScroll.current.start();
//     setIsDragging(true);
//     startXRef.current = e.pageX;
//   };

//   const handleMouseMove = (e) => {
//     if (!isDragging) return;
//     const dx = e.pageX - startXRef.current;
//     startXRef.current = e.pageX;
//     flowScroll.current.move(dx);
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//     flowScroll.current.end();
//   };

//   const handleMouseLeave = () => {
//     if (isDragging) handleMouseUp();
//   };

//   const handleTouchStart = (e) => {
//     flowScroll.current.start();
//     setIsDragging(true);
//     startXRef.current = e.touches[0].pageX;
//   };

//   const handleTouchMove = (e) => {
//     if (!isDragging) return;
//     const dx = e.touches[0].pageX - startXRef.current;
//     startXRef.current = e.touches[0].pageX;
//     flowScroll.current.move(dx);
//     e.preventDefault();
//   };

//   const handleTouchEnd = () => {
//     setIsDragging(false);
//     flowScroll.current.end();
//   };

//   const scrollPrev = () => {
//     setCurrentNode((prev) => {
//       if (!prev || !circularList) return prev;
//       let node = circularList;
//       while (node.next !== prev) node = node.next;
//       return node;
//     });
//     setOffset(0);
//   };

//   const scrollNext = () => {
//     setCurrentNode((prev) => (prev ? prev.next : prev));
//     setOffset(0);
//   };

//   const handleReviewCardClick = (reviewId) => {
//     if (onReviewClick) onReviewClick(reviewId);
//   };

//   if (loading)
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
//         <CircularProgress size={30} />
//       </Box>
//     );

//   if (!reviews.length) return <Typography>No reviews yet</Typography>;

//   const visibleReviews = computeVisibleReviews();

//   return (
//     <Box sx={{ position: "relative", width: "100%" }}>
//       <Box
//         ref={carouselRef}
//         sx={{
//           userSelect: "none",
//           display: "flex",
//           gap: 2,
//           py: 1,
//           px: 0.5,
//           overflow: "hidden",
//           width: "100%",
//           cursor: isDragging ? "grabbing" : "grab",
//           transform: `translateX(${offset}px)`,
//           transition: isDragging ? "none" : "transform 0.05s ease-out",
//         }}
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//         onMouseLeave={handleMouseLeave}
//         onTouchStart={handleTouchStart}
//         onTouchMove={handleTouchMove}
//         onTouchEnd={handleTouchEnd}
//       >
//         {visibleReviews.map((review, idx) => (
//           <CarouselReviewCard
//             key={`${review.id}-${idx}`}
//             review={review}
//             onClick={handleReviewCardClick}
//             className="review-card"
//           />
//         ))}
//       </Box>
//       {reviews.length > 1 && (
//         <>
//           <IconButton
//             sx={{ position: "absolute", left: 4, top: "50%", transform: "translateY(-50%)" }}
//             onClick={scrollPrev}
//           >
//             <ArrowBackIcon />
//           </IconButton>
//           <IconButton
//             sx={{ position: "absolute", right: 4, top: "50%", transform: "translateY(-50%)" }}
//             onClick={scrollNext}
//           >
//             <ArrowForwardIcon />
//           </IconButton>
//         </>
//       )}
//     </Box>
//   );
// }

// export default ReviewCarousel;
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