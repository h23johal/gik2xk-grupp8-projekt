import { useState, useRef, forwardRef, useImperativeHandle, useEffect } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, CircularProgress } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionReviewCard from "./AccordionReviewCard";
import { useReviews } from "../../utils/useReviews";
import { createFlowScroll } from "../../utils/flowScroll";
import { useSwipeScroll } from "../../utils/UseSwipeScroll";

const ReviewAccordion = forwardRef(({ selectedReviewId, onReviewNavigated }, ref) => {
  const { reviews, loading } = useReviews();
  const [expanded, setExpanded] = useState(false);
  const reviewRefs = useRef({});
  const accordionBoxRef = useRef(null);
  const flowScrollRef = useRef(null);

  const reviewsWithComments = reviews.filter(
    review => review.comment && review.comment.trim().length > 0
  );

  useEffect(() => {
    flowScrollRef.current = createFlowScroll({
      initialOffset: 0,
      updateOffset: (newOffset) => {
        const box = accordionBoxRef.current;
        if (!box) return;
        box.scrollTop = box.scrollTop - newOffset; // Drag down scrolls up, drag up scrolls down
      },
      deceleration: 0.0004,
      maxVelocity: 0.01,
      maxMomentumDuration: 800,
    });
    return () => flowScrollRef.current.cancel();
  }, [reviewsWithComments]);

  useEffect(() => {
    if (selectedReviewId) {
      setExpanded(true);
      setTimeout(() => {
        scrollToReview(selectedReviewId);
        setTimeout(() => {
          if (typeof onReviewNavigated === "function") {
            onReviewNavigated();
          }
        }, 500);
      }, 300);
    }
  }, [selectedReviewId, onReviewNavigated]);

  const scrollToReview = (reviewId) => {
    if (reviewRefs.current[reviewId]) {
      reviewRefs.current[reviewId].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      const element = reviewRefs.current[reviewId];
      element.style.transition = "box-shadow 0.3s ease";
      element.style.boxShadow = "0 0 0 4px rgba(224, 145, 169, 0.4)";
      setTimeout(() => {
        if (element) element.style.boxShadow = "none";
      }, 2000);
    }
  };

  const expandAccordion = () => {
    setExpanded(true);
  };

  useImperativeHandle(ref, () => ({
    scrollToReview,
    expandAccordion,
  }));

  const handleChange = (event, isExpanded) => {
    setExpanded(isExpanded);
  };

  const { isDragging, swipeProps } = useSwipeScroll({
    flowScroll: flowScrollRef.current,
    direction: "y",
  });

  return (
    <Box position="relative">
      <Accordion expanded={expanded} onChange={handleChange}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="reviews-panel-content"
          id="reviews-panel-header"
        >
          <Typography variant="h6">
            Customer Reviews ({reviewsWithComments.length})
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {reviewsWithComments.length === 0 ? (
            <Typography>No reviews yet for this product.</Typography>
          ) : (
            <Box
              ref={accordionBoxRef}
              sx={{
                scrollBehavior: "smooth",
                userSelect: "none",
                maxHeight: 500,
                overflowY: "auto",
                px: 2,
                py: 1,
                cursor: isDragging ? "grabbing" : "grab",
              }}
              {...swipeProps}
            >
              {reviewsWithComments.map((review) => (
                <Box
                  key={review.id}
                  ref={(el) => (reviewRefs.current[review.id] = el)}
                  sx={{ scrollMarginTop: "100px" }}
                >
                  <AccordionReviewCard
                    review={review}
                    isSelected={selectedReviewId === review.id}
                  />
                </Box>
              ))}
            </Box>
          )}
        </AccordionDetails>
      </Accordion>
      
      {loading && (
        <Box 
          position="absolute" 
          top={0} 
          left={0} 
          right={0} 
          bottom={0}
          display="flex"
          alignItems="center"
          justifyContent="center"
          bgcolor="rgba(255, 255, 255, 0.7)"
          zIndex={1}
        >
          <CircularProgress size={30} />
        </Box>
      )}
    </Box>
  );
});

export default ReviewAccordion;