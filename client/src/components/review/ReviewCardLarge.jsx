import { Box, Typography, Rating } from '@mui/material';

function ReviewCardLarge({ review }) {
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "Unknown date" : date.toLocaleDateString();
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="subtitle1" fontWeight="bold">
          {review.username || "Anonymous"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {formatDate(review.createdAt)}
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
        <Rating 
          value={review.rating} 
          readOnly 
          precision={0.5} 
        />
        <Typography variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
          ({review.rating.toFixed(1)})
        </Typography>
      </Box>
      
      <Typography variant="body1">
        {review.comment}
      </Typography>
    </Box>
  );
}

export default ReviewCardLarge;