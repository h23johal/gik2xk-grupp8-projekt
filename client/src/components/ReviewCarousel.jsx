// import * as React from 'react';
// import AspectRatio from '@mui/joy/AspectRatio';
// import Box from '@mui/joy/Box';
// import Typography from '@mui/joy/Typography';
// import Card from '@mui/joy/Card';

// const data = [
//   {
//     src: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236',
//     title: 'Night view',
//     description: '4.21M views',
//   },
//   {
//     src: 'https://images.unsplash.com/photo-1527549993586-dff825b37782',
//     title: 'Lake view',
//     description: '4.74M views',
//   },
//   {
//     src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
//     title: 'Mountain view',
//     description: '3.98M views',
//   },
// ];

// export default function CarouselRatio() {
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         gap: 1,
//         py: 1,
//         overflow: 'auto',
//         width: 343,
//         scrollSnapType: 'x mandatory',
//         '& > *': {
//           scrollSnapAlign: 'center',
//         },
//         '::-webkit-scrollbar': { display: 'none' },
//       }}
//     >
//       {data.map((item) => (
//         <Card orientation="horizontal" size="sm" key={item.title} variant="outlined">
//           <AspectRatio ratio="1" sx={{ minWidth: 60 }}>
//             <img
//               srcSet={`${item.src}?h=120&fit=crop&auto=format&dpr=2 2x`}
//               src={`${item.src}?h=120&fit=crop&auto=format`}
//               alt={item.title}
//             />
//           </AspectRatio>
//           <Box sx={{ whiteSpace: 'nowrap', mx: 1 }}>
//             <Typography level="title-md">{item.title}</Typography>
//             <Typography level="body-sm">{item.description}</Typography>
//           </Box>
//         </Card>
//       ))}
//     </Box>
//   );
// }
// export default ReviewCarousel;
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { getProductRatings } from "../services/RatingService";
import ReviewCardSmall from "./ReviewCardSmall";

function ReviewCarousel({ productId, onReviewClick }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductRatings(productId)
      .then(response => {
        // Only include reviews that have comments
        const reviewList = (response?.data?.ratings || [])
          .filter(review => review.comment && review.comment.trim().length > 0)
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 5);
          
        setReviews(reviewList);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching reviews:", err);
        setReviews([]);
        setLoading(false);
      });
  }, [productId]);

  if (loading) return <Typography>Loading reviews...</Typography>;
  if (reviews.length === 0) return <Typography>No reviews yet</Typography>;

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        py: 1,
        overflow: 'auto',
        width: '100%',
        scrollSnapType: 'x mandatory',
        '& > *': {
          scrollSnapAlign: 'center',
        },
        '::-webkit-scrollbar': { display: 'none' },
      }}
    >
      {reviews.map((review) => (
        <ReviewCardSmall 
          key={review.id}
          review={review}
          onClick={onReviewClick}
        />
      ))}
    </Box>
  );
}

export default ReviewCarousel;