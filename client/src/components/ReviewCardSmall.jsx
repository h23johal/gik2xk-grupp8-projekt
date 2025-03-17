// // ReviewCardSmall.jsx
import { Card, CardContent, Box, Typography } from '@mui/material';
import Rating from '@mui/material/Rating';

// function ReviewCardSmall({ review, onClick }) {
//   return (
//     <Card 
//       onClick={() => onClick(review.id)}
//       sx={{ 
//         cursor: 'pointer', 
//         minWidth: 260,
//         flexShrink: 0,
//         transition: 'transform 0.3s',
//         backgroundColor: 'rgba(255,255,255,0.05)',
//         backdropFilter: 'blur(12px)',
//         border: '1px solid rgba(255,255,255,0.1)',
//         borderRadius: '12px',
//         '&:hover': {
//           transform: 'translateY(-4px)'
//         }
//       }}
//     >
//       <CardContent>
//         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//           <Typography variant="subtitle1">
//             {review.username || "Anonymous"}
//           </Typography>
//           <Typography variant="caption" sx={{ color: 'text.secondary' }}>
//             {new Date(review.createdAt).toLocaleDateString()}
//           </Typography>
//         </Box>
        
//         <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
//           <Rating 
//             value={review.rating} 
//             readOnly 
//             size="small"
//             precision={0.5}
//           />
//         </Box>
        
//         <Typography 
//           variant="body2"
//           sx={{ 
//             overflow: 'hidden',
//             textOverflow: 'ellipsis',
//             display: '-webkit-box',
//             WebkitLineClamp: 2,
//             WebkitBoxOrient: 'vertical'
//           }}
//         >
//           {review.comment}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// }

// export default ReviewCardSmall;
function ReviewCardSmall({ review, onClick }) {
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Unknown date";
    
    return date.toLocaleDateString();
  };
  return (
    <Card 
      onClick={() => onClick(review.id)}
      sx={{ 
        cursor: 'pointer', 
        minWidth: 260,
        flexShrink: 0,
        transition: 'transform 0.3s',
        backgroundColor: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '12px',
        '&:hover': {
          transform: 'translateY(-4px)'
        }
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="subtitle1" fontWeight="medium">
            {review.username || "Anonymous"}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
  {formatDate(review.createdAt)}
</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
          <Rating 
            value={review.rating} 
            readOnly 
            size="small"
            precision={0.5}
          />
          <Typography variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
            ({review.rating.toFixed(1)})
          </Typography>
        </Box>
        
        <Typography 
          variant="body2"
          sx={{ 
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {review.comment && review.comment.length > 80 
            ? `${review.comment.substring(0, 80)}...` 
            : review.comment}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ReviewCardSmall;