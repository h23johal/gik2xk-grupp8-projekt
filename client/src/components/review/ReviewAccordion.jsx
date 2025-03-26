import { useState, useRef, forwardRef, useImperativeHandle, useEffect } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionReviewCard from "./AccordionReviewCard";

const ReviewAccordion = forwardRef(({ reviews, selectedReviewId }, ref) => {
  const [expanded, setExpanded] = useState(false);
  const [expandedReview, setExpandedReview] = useState(null);
  const reviewRefs = useRef({});

  const reviewsWithComments = reviews.filter(
    review => review.comment && review.comment.trim().length > 0
  );

  useEffect(() => {
    if (selectedReviewId) {
      setExpanded(true);
      setExpandedReview(selectedReviewId);
      setTimeout(() => {
        scrollToReview(selectedReviewId);
      }, 300);
    }
  }, [selectedReviewId]);

  const scrollToReview = (reviewId) => {
    if (reviewRefs.current[reviewId]) {
      reviewRefs.current[reviewId].scrollIntoView({
        behavior: "smooth",
        block: "center"
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

  const handleReviewClick = (reviewId) => {
    setExpandedReview(expandedReview === reviewId ? null : reviewId);
  };

  useImperativeHandle(ref, () => ({
    scrollToReview,
    expandAccordion
  }));

  const handleChange = (event, isExpanded) => {
    setExpanded(isExpanded);
  };

  return (
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
          <Box>
            {reviewsWithComments.map((review) => (
              <Box
                key={review.id}
                ref={el => reviewRefs.current[review.id] = el}
                sx={{ scrollMarginTop: "100px" }}
              >
                <AccordionReviewCard
                  review={review}
                  isSelected={selectedReviewId === review.id}
                  onClick={handleReviewClick}
                />
              </Box>
            ))}
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
});

export default ReviewAccordion;
