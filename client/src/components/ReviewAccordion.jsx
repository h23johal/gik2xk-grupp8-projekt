// import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
// import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Divider, Rating } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { getAll } from '../services/RatingService';

// const ReviewAccordion = forwardRef(({ productId, selectedReviewId }, ref) => {
//   const [expanded, setExpanded] = useState(false);
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const reviewRefs = useRef({});

//   useEffect(() => {
//     getAll()
//       .then(data => {
//         const productReviews = data.filter(review => review.productId == productId);
//         setReviews(productReviews);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error("Error fetching reviews:", err);
//         setLoading(false);
//       });
//   }, [productId]);

//   useEffect(() => {
//     if (selectedReviewId && expanded) {
//       scrollToReview(selectedReviewId);
//     }
//   }, [selectedReviewId, expanded]);

//   const scrollToReview = (reviewId) => {
//     if (reviewRefs.current[reviewId]) {
//       reviewRefs.current[reviewId].scrollIntoView({ 
//         behavior: 'smooth',
//         block: 'center'
//       });
//     }
//   };

//   const expandAccordion = () => {
//     setExpanded(true);
//   };

//   useImperativeHandle(ref, () => ({
//     scrollToReview,
//     expandAccordion
//   }));

//   const handleChange = () => {
//     setExpanded(!expanded);
//   };

//   return (
//     <Accordion expanded={expanded} onChange={handleChange}>
//       <AccordionSummary 
//         expandIcon={<ExpandMoreIcon />}
//         aria-controls="reviews-panel-content"
//         id="reviews-panel-header"
//       >
//         <Typography variant="h6">
//           Customer Reviews ({reviews.length})
//         </Typography>
//       </AccordionSummary>
//       <AccordionDetails>
//         {loading ? (
//           <Typography>Loading reviews...</Typography>
//         ) : reviews.length === 0 ? (
//           <Typography>No reviews yet for this product.</Typography>
//         ) : (
//           <Box>
//             {reviews.map((review, index) => (
//               <Box 
//                 key={review.id} 
//                 ref={el => reviewRefs.current[review.id] = el}
//                 sx={{
//                   py: 2,
//                   backgroundColor: selectedReviewId === review.id ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
//                   scrollMarginTop: '100px'
//                 }}
//               >
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                   <Typography variant="subtitle1" fontWeight="bold">
//                     {review.username || "Anonymous"}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {new Date(review.createdAt).toLocaleDateString()}
//                   </Typography>
//                 </Box>
                
//                 <Rating value={review.rating} readOnly precision={0.5} sx={{ my: 1 }} />
                
//                 <Typography variant="body1" paragraph>
//                   {review.comment}
//                 </Typography>
                
//                 {index < reviews.length - 1 && <Divider />}
//               </Box>
//             ))}
//           </Box>
//         )}
//       </AccordionDetails>
//     </Accordion>
//   );
// });

// export default ReviewAccordion;

import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getProductRatings } from '../services/RatingService';
import ReviewCardLarge from './ReviewCardLarge';

const ReviewAccordion = forwardRef(({ productId, selectedReviewId }, ref) => {
  const [expanded, setExpanded] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const reviewRefs = useRef({});

  useEffect(() => {
    getProductRatings(productId)
      .then(response => {
        // Only include reviews with actual comment text
        const reviewsWithComments = (response?.data?.ratings || [])
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
    if (selectedReviewId && expanded) {
      scrollToReview(selectedReviewId);
    }
  }, [selectedReviewId, expanded]);

  const scrollToReview = (reviewId) => {
    if (reviewRefs.current[reviewId]) {
      reviewRefs.current[reviewId].scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  const expandAccordion = () => {
    setExpanded(true);
  };

  useImperativeHandle(ref, () => ({
    scrollToReview,
    expandAccordion
  }));

  const handleChange = () => {
    setExpanded(!expanded);
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
            {reviews.map((review, index) => (
              <Box 
                key={review.id} 
                ref={el => reviewRefs.current[review.id] = el}
                sx={{
                  py: 2,
                  backgroundColor: selectedReviewId === review.id ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
                  scrollMarginTop: '100px'
                }}
              >
                <ReviewCardLarge review={review} />
                {index < reviews.length - 1 && <Divider />}
              </Box>
            ))}
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
});

export default ReviewAccordion;