// // import { useState, useRef, forwardRef, useImperativeHandle, useEffect } from "react";
// // import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, CircularProgress } from "@mui/material";
// // import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// // import AccordionReviewCard from "./AccordionReviewCard";
// // import { useReviews } from "../../utils/useReviews";

// // const ReviewAccordion = forwardRef(({ selectedReviewId, onReviewNavigated }, ref) => {
// //   const { reviews, loading } = useReviews();
// //   const [expanded, setExpanded] = useState(false);
// //   const [expandedReview, setExpandedReview] = useState(null);
// //   const reviewRefs = useRef({});

// //   const reviewsWithComments = reviews.filter(
// //     review => review.comment && review.comment.trim().length > 0
// //   );

// //   // Handle selection only when it changes
// //   useEffect(() => {
// //     if (selectedReviewId) {
// //       setExpanded(true);
// //       setExpandedReview(selectedReviewId);
      
// //       // Scroll to review with delay to allow expansion
// //       setTimeout(() => {
// //         scrollToReview(selectedReviewId);
        
// //         // Clear the selection after navigation is complete
// //         // This prevents persistent selection memory
// //         setTimeout(() => {
// //           if (typeof onReviewNavigated === 'function') {
// //             onReviewNavigated();
// //           }
// //         }, 500);
// //       }, 300);
// //     }
// //   }, [selectedReviewId, onReviewNavigated]);

// //   const scrollToReview = (reviewId) => {
// //     if (reviewRefs.current[reviewId]) {
// //       reviewRefs.current[reviewId].scrollIntoView({
// //         behavior: "smooth",
// //         block: "center"
// //       });
      
// //       const element = reviewRefs.current[reviewId];
// //       element.style.transition = "box-shadow 0.3s ease";
// //       element.style.boxShadow = "0 0 0 4px rgba(224, 145, 169, 0.4)";
      
// //       setTimeout(() => {
// //         if (element) element.style.boxShadow = "none";
// //       }, 2000);
// //     }
// //   };

// //   const expandAccordion = () => {
// //     setExpanded(true);
// //   };

// //   const handleReviewClick = (reviewId) => {
// //     setExpandedReview(expandedReview === reviewId ? null : reviewId);
// //   };

// //   useImperativeHandle(ref, () => ({
// //     scrollToReview,
// //     expandAccordion
// //   }));

// //   const handleChange = (event, isExpanded) => {
// //     setExpanded(isExpanded);
// //   };

// //   if (loading) return (
// //     <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
// //       <CircularProgress size={30} />
// //     </Box>
// //   );

// //   return (
// //     <Accordion expanded={expanded} onChange={handleChange}>
// //       <AccordionSummary
// //         expandIcon={<ExpandMoreIcon />}
// //         aria-controls="reviews-panel-content"
// //         id="reviews-panel-header"
// //       >
// //         <Typography variant="h6">
// //           Customer Reviews ({reviewsWithComments.length})
// //         </Typography>
// //       </AccordionSummary>
// //       <AccordionDetails>
// //         {reviewsWithComments.length === 0 ? (
// //           <Typography>No reviews yet for this product.</Typography>
// //         ) : (
// //           <Box sx={{ maxHeight: 300, overflowY: "auto" }}>
// //             {reviewsWithComments.map((review) => (
// //               <Box
// //                 key={review.id}
// //                 ref={(el) => (reviewRefs.current[review.id] = el)}
// //                 sx={{ scrollMarginTop: "100px" }}
// //               >
// //                 <AccordionReviewCard
// //                   review={review}
// //                   isSelected={selectedReviewId === review.id}
// //                   onClick={handleReviewClick}
// //                 />
// //               </Box>
// //             ))}
// //           </Box>
// //         )}
// //       </AccordionDetails>

// //     </Accordion>
// //   );
// // });

// // export default ReviewAccordion;

// // import { useState, useRef, forwardRef, useImperativeHandle, useEffect } from "react";
// // import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, CircularProgress } from "@mui/material";
// // import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// // import AccordionReviewCard from "./AccordionReviewCard";
// // import { useReviews } from "../../utils/useReviews";

// // const ReviewAccordion = forwardRef(({ selectedReviewId, onReviewNavigated }, ref) => {
// //   const { reviews, loading } = useReviews();
// //   const [expanded, setExpanded] = useState(false);
// //   const [expandedReview, setExpandedReview] = useState(null);
// //   const reviewRefs = useRef({});

// //   const reviewsWithComments = reviews.filter(
// //     review => review.comment && review.comment.trim().length > 0
// //   );

// //   useEffect(() => {
// //     if (selectedReviewId) {
// //       setExpanded(true);
// //       setExpandedReview(selectedReviewId);
// //       setTimeout(() => {
// //         scrollToReview(selectedReviewId);
// //         setTimeout(() => {
// //           if (typeof onReviewNavigated === 'function') {
// //             onReviewNavigated();
// //           }
// //         }, 500);
// //       }, 300);
// //     }
// //   }, [selectedReviewId, onReviewNavigated]);

// //   const scrollToReview = (reviewId) => {
// //     if (reviewRefs.current[reviewId]) {
// //       reviewRefs.current[reviewId].scrollIntoView({
// //         behavior: "smooth",
// //         block: "center"
// //       });
      
// //       const element = reviewRefs.current[reviewId];
// //       element.style.transition = "box-shadow 0.3s ease";
// //       element.style.boxShadow = "0 0 0 4px rgba(224, 145, 169, 0.4)";
      
// //       setTimeout(() => {
// //         if (element) element.style.boxShadow = "none";
// //       }, 2000);
// //     }
// //   };

// //   const expandAccordion = () => {
// //     setExpanded(true);
// //   };

// //   const handleReviewClick = (reviewId) => {
// //     setExpandedReview(expandedReview === reviewId ? null : reviewId);
// //   };

// //   useImperativeHandle(ref, () => ({
// //     scrollToReview,
// //     expandAccordion
// //   }));

// //   const handleChange = (event, isExpanded) => {
// //     setExpanded(isExpanded);
// //   };

// //   if (loading) return (
// //     <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
// //       <CircularProgress size={30} />
// //     </Box>
// //   );

// //   return (
// //     <Accordion expanded={expanded} onChange={handleChange}>
// //       <AccordionSummary
// //         expandIcon={<ExpandMoreIcon />}
// //         aria-controls="reviews-panel-content"
// //         id="reviews-panel-header"
// //       >
// //         <Typography variant="h6">
// //           Customer Reviews ({reviewsWithComments.length})
// //         </Typography>
// //       </AccordionSummary>
// //       <AccordionDetails>
// //         {reviewsWithComments.length === 0 ? (
// //           <Typography>No reviews yet for this product.</Typography>
// //         ) : (
// //           <Box 
// //             sx={{ 
// //               maxHeight: 300, 
// //               overflowY: "auto",
// //               px: 2, // Add padding to prevent shadow clipping on sides
// //               py: 1, // Optional: padding top/bottom for consistency
// //             }}
// //           >
// //             {reviewsWithComments.map((review) => (
// //               <Box
// //                 key={review.id}
// //                 ref={(el) => (reviewRefs.current[review.id] = el)}
// //                 sx={{ scrollMarginTop: "100px" }}
// //               >
// //                 <AccordionReviewCard
// //                   review={review}
// //                   isSelected={selectedReviewId === review.id}
// //                   onClick={handleReviewClick}
// //                 />
// //               </Box>
// //             ))}
// //           </Box>
// //         )}
// //       </AccordionDetails>
// //     </Accordion>
// //   );
// // });

// // export default ReviewAccordion;
// // import { useState, useRef, forwardRef, useImperativeHandle, useEffect } from "react";
// // import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, CircularProgress } from "@mui/material";
// // import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// // import AccordionReviewCard from "./AccordionReviewCard";
// // import { useReviews } from "../../utils/useReviews";
// // import { createFlowScroll } from "../../utils/flowScroll";
// // import { useSwipeScroll } from "../../utils/UseSwipeScroll";

// // const ReviewAccordion = forwardRef(({ selectedReviewId, onReviewNavigated }, ref) => {
// //   const { reviews, loading } = useReviews();
// //   const [expanded, setExpanded] = useState(false);
// //   const [expandedReview, setExpandedReview] = useState(null);
// //   const reviewRefs = useRef({});
// //   const accordionBoxRef = useRef(null);
// //   const flowScrollRef = useRef(null);

// //   const reviewsWithComments = reviews.filter(
// //     review => review.comment && review.comment.trim().length > 0
// //   );

// //   useEffect(() => {
// //     flowScrollRef.current = createFlowScroll({
// //       initialOffset: 0,
// //       updateOffset: (newOffset) => {
// //         const box = accordionBoxRef.current;
// //         if (box) box.scrollTop = -newOffset; // Drag down = scroll up, drag up = scroll down
// //       },
// //       cardWidth: 300, // Dummy value, not used
// //       deceleration: 0.004,
// //       maxVelocity: 2.5,
// //       maxMomentumDuration: 800,
// //     });
// //     return () => flowScrollRef.current.cancel();
// //   }, [reviewsWithComments]);

// //   useEffect(() => {
// //     if (selectedReviewId) {
// //       setExpanded(true);
// //       setExpandedReview(selectedReviewId);
// //       setTimeout(() => {
// //         scrollToReview(selectedReviewId);
// //         setTimeout(() => {
// //           if (typeof onReviewNavigated === "function") {
// //             onReviewNavigated();
// //           }
// //         }, 500);
// //       }, 300);
// //     }
// //   }, [selectedReviewId, onReviewNavigated]);

// //   const scrollToReview = (reviewId) => {
// //     if (reviewRefs.current[reviewId]) {
// //       reviewRefs.current[reviewId].scrollIntoView({
// //         behavior: "smooth",
// //         block: "center",
// //       });
// //       const element = reviewRefs.current[reviewId];
// //       element.style.transition = "box-shadow 0.3s ease";
// //       element.style.boxShadow = "0 0 0 4px rgba(224, 145, 169, 0.4)";
// //       setTimeout(() => {
// //         if (element) element.style.boxShadow = "none";
// //       }, 2000);
// //     }
// //   };

// //   const expandAccordion = () => {
// //     setExpanded(true);
// //   };

// //   const handleReviewClick = (reviewId) => {
// //     setExpandedReview(expandedReview === reviewId ? null : reviewId);
// //   };

// //   useImperativeHandle(ref, () => ({
// //     scrollToReview,
// //     expandAccordion,
// //   }));

// //   const handleChange = (event, isExpanded) => {
// //     setExpanded(isExpanded);
// //   };

// //   const { isDragging, swipeProps } = useSwipeScroll(flowScrollRef.current);

// //   if (loading) return (
// //     <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
// //       <CircularProgress size={30} />
// //     </Box>
// //   );

// //   return (
// //     <Accordion expanded={expanded} onChange={handleChange}>
// //       <AccordionSummary
// //         expandIcon={<ExpandMoreIcon />}
// //         aria-controls="reviews-panel-content"
// //         id="reviews-panel-header"
// //       >
// //         <Typography variant="h6">
// //           Customer Reviews ({reviewsWithComments.length})
// //         </Typography>
// //       </AccordionSummary>
// //       <AccordionDetails>
// //         {reviewsWithComments.length === 0 ? (
// //           <Typography>No reviews yet for this product.</Typography>
// //         ) : (
// //           <Box
// //             ref={accordionBoxRef}
// //             sx={{
// //               maxHeight: 300,
// //               overflowY: "auto",
// //               px: 2,
// //               py: 1,
// //               cursor: isDragging ? "grabbing" : "grab",
// //             }}
// //             {...swipeProps}
// //           >
// //             {reviewsWithComments.map((review) => (
// //               <Box
// //                 key={review.id}
// //                 ref={(el) => (reviewRefs.current[review.id] = el)}
// //                 sx={{ scrollMarginTop: "100px" }}
// //               >
// //                 <AccordionReviewCard
// //                   review={review}
// //                   isSelected={selectedReviewId === review.id}
// //                   onClick={handleReviewClick}
// //                 />
// //               </Box>
// //             ))}
// //           </Box>
// //         )}
// //       </AccordionDetails>
// //     </Accordion>
// //   );
// // });

// // export default ReviewAccordion;
// import { useState, useRef, forwardRef, useImperativeHandle, useEffect } from "react";
// import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, CircularProgress } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import AccordionReviewCard from "./AccordionReviewCard";
// import { useReviews } from "../../utils/useReviews";
// import { createFlowScroll } from "../../utils/flowScroll";
// import { useSwipeScroll } from "../../utils/UseSwipeScroll";

// const ReviewAccordion = forwardRef(({ selectedReviewId, onReviewNavigated }, ref) => {
//   const { reviews, loading } = useReviews();
//   const [expanded, setExpanded] = useState(false);
//   const [expandedReview, setExpandedReview] = useState(null);
//   const reviewRefs = useRef({});
//   const accordionBoxRef = useRef(null);
//   const flowScrollRef = useRef(null);

//   const reviewsWithComments = reviews.filter(
//     review => review.comment && review.comment.trim().length > 0
//   );

//   useEffect(() => {
//     flowScrollRef.current = createFlowScroll({
//       initialOffset: 0,
//       updateOffset: (newOffset) => {
//         const box = accordionBoxRef.current;
//         if (!box) return;
//         box.scrollTop = box.scrollTop - newOffset; // Drag down (positive) scrolls up, drag up (negative) scrolls down
//       },
//       cardWidth: 300, // Placeholder, not used
//       deceleration: 0.004,
//       maxVelocity: 2.5,
//       maxMomentumDuration: 800,
//     });
//     return () => flowScrollRef.current.cancel();
//   }, [reviewsWithComments]);

//   useEffect(() => {
//     if (selectedReviewId) {
//       setExpanded(true);
//       setExpandedReview(selectedReviewId);
//       setTimeout(() => {
//         scrollToReview(selectedReviewId);
//         setTimeout(() => {
//           if (typeof onReviewNavigated === "function") {
//             onReviewNavigated();
//           }
//         }, 500);
//       }, 300);
//     }
//   }, [selectedReviewId, onReviewNavigated]);

//   const scrollToReview = (reviewId) => {
//     if (reviewRefs.current[reviewId]) {
//       reviewRefs.current[reviewId].scrollIntoView({
//         behavior: "smooth",
//         block: "center",
//       });
//       const element = reviewRefs.current[reviewId];
//       element.style.transition = "box-shadow 0.3s ease";
//       element.style.boxShadow = "0 0 0 4px rgba(224, 145, 169, 0.4)";
//       setTimeout(() => {
//         if (element) element.style.boxShadow = "none";
//       }, 2000);
//     }
//   };

//   const expandAccordion = () => {
//     setExpanded(true);
//   };

//   const handleReviewClick = (reviewId) => {
//     setExpandedReview(expandedReview === reviewId ? null : reviewId);
//   };

//   useImperativeHandle(ref, () => ({
//     scrollToReview,
//     expandAccordion,
//   }));

//   const handleChange = (event, isExpanded) => {
//     setExpanded(isExpanded);
//   };

//   const { isDragging, swipeProps } = useSwipeScroll(flowScrollRef.current);

//   if (loading) return (
//     <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
//       <CircularProgress size={30} />
//     </Box>
//   );

//   return (
//     <Accordion expanded={expanded} onChange={handleChange}>
//       <AccordionSummary
//         expandIcon={<ExpandMoreIcon />}
//         aria-controls="reviews-panel-content"
//         id="reviews-panel-header"
//       >
//         <Typography variant="h6">
//           Customer Reviews ({reviewsWithComments.length})
//         </Typography>
//       </AccordionSummary>
//       <AccordionDetails>
//         {reviewsWithComments.length === 0 ? (
//           <Typography>No reviews yet for this product.</Typography>
//         ) : (
//           <Box
//             ref={accordionBoxRef}
//             sx={{
//               userSelect: "none",
//               maxHeight: 300,
//               overflowY: "auto",
//               px: 2,
//               py: 1,
//               cursor: isDragging ? "grabbing" : "grab",
//             }}
//             {...swipeProps}
//           >
//             {reviewsWithComments.map((review) => (
//               <Box
//                 key={review.id}
//                 ref={(el) => (reviewRefs.current[review.id] = el)}
//                 sx={{ scrollMarginTop: "100px" }}
//               >
//                 <AccordionReviewCard
//                   review={review}
//                   isSelected={selectedReviewId === review.id}
//                   onClick={handleReviewClick}
//                 />
//               </Box>
//             ))}
//           </Box>
//         )}
//       </AccordionDetails>
//     </Accordion>
//   );
// });

// export default ReviewAccordion;

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
      deceleration: 0.04,
      maxVelocity: 0.0001,
      maxMomentumDuration: 500,
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

  if (loading) return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
      <CircularProgress size={30} />
    </Box>
  );

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
  );
});

export default ReviewAccordion;