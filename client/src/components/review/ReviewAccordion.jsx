import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getProductReviews } from '../../services/RatingService';
import AccordionReviewCard from './AccordionReviewCard';

const ReviewAccordion = forwardRef(({ productId, selectedReviewId }, ref) => {
  const [expanded, setExpanded] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedReview, setExpandedReview] = useState(null);
  const reviewRefs = useRef({});

  useEffect(() => {
    getProductReviews(productId)
      .then(response => {
        // Get reviews from the same endpoint the carousel uses
        const reviewList = response.reviews || [];
        // Only include reviews with actual comment text
        const reviewsWithComments = reviewList
          .filter(review => review.comment && review.comment.trim().length > 0);
        
        setReviews(reviewsWithComments);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching reviews:", err);
        setLoading(false);
      });
  }, [productId]);

  useEffect(() => {
    if (selectedReviewId) {
      // Automatically expand accordion when a review is selected from carousel
      setExpanded(true);
      // Set the selected review as expanded
      setExpandedReview(selectedReviewId);
      // Scroll to it after a short delay to allow the accordion to expand
      setTimeout(() => {
        scrollToReview(selectedReviewId);
      }, 300);
    }
  }, [selectedReviewId]);

  const scrollToReview = (reviewId) => {
    if (reviewRefs.current[reviewId]) {
      reviewRefs.current[reviewId].scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
      
      // Add a visual highlight effect to draw attention
      const element = reviewRefs.current[reviewId];
      element.style.transition = 'box-shadow 0.3s ease';
      element.style.boxShadow = '0 0 0 4px rgba(224, 145, 169, 0.4)';
      
      // Remove highlight after a moment
      setTimeout(() => {
        if (element) {
          element.style.boxShadow = 'none';
        }
      }, 2000);
    }
  };

  const expandAccordion = () => {
    setExpanded(true);
  };

  const handleReviewClick = (reviewId) => {
    // Toggle expanded state for clicked review
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
          Customer Reviews ({reviews.length})
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {loading ? (
          <Typography>Loading reviews...</Typography>
        ) : reviews.length === 0 ? (
          <Typography>No reviews yet for this product.</Typography>
        ) : (
          <Box>
            {reviews.map((review) => (
              <Box 
                key={review.id} 
                ref={el => reviewRefs.current[review.id] = el}
                sx={{ scrollMarginTop: '100px' }}
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