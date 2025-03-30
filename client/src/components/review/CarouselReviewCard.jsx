import { Card, CardContent, Box, Typography } from '@mui/material';
import Rating from '@mui/material/Rating';
import { useState, useRef } from 'react';

function CarouselReviewCard({ review, onClick, className }) {
  const CARD_SIZES = {
    xs: 240,
    sm: 260,
    md: 280
  };

  const [isDragging, setIsDragging] = useState(false);
  const startPosRef = useRef({ x: 0, y: 0 });
  
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "Unknown date" : date.toLocaleDateString();
  };

  const username = review.username || (review.user ? review.user.first_name : "Anonymous");
  const rating = review.rating || review.score || 0;
  
  const handleMouseDown = (e) => {
    startPosRef.current = { x: e.clientX, y: e.clientY };
    setIsDragging(false);
  };
  
  const handleMouseUp = (e) => {
    const deltaX = Math.abs(e.clientX - startPosRef.current.x);
    const deltaY = Math.abs(e.clientY - startPosRef.current.y);
    
    if (deltaX < 5 && deltaY < 5 && !isDragging) {
      onClick(review.id);
    }
  };
  
  const handleMouseMove = (e) => {
    const deltaX = Math.abs(e.clientX - startPosRef.current.x);
    const deltaY = Math.abs(e.clientY - startPosRef.current.y);
    
    if (deltaX > 5 || deltaY > 5) {
      setIsDragging(true);
    }
  };
  
  return (
    <Card 
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      className={`${className}`}
      sx={{ 
        cursor: 'pointer', 
        width: { 
          xs: `${CARD_SIZES.xs}px`, 
          sm: `${CARD_SIZES.sm}px`, 
          md: `${CARD_SIZES.md}px` 
        },
        flexShrink: 0,
        transition: 'transform 0.2s, box-shadow 0.2s',
        backgroundColor: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '12px',
        height: '160px',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
        }
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="subtitle1" fontWeight="medium">
            {username}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {formatDate(review.createdAt)}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
          <Rating 
            value={rating} 
            readOnly 
            size="small"
            precision={0.5}
          />
          <Typography variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
            ({rating.toFixed(1)})
          </Typography>
        </Box>
        
        <Typography 
          variant="body2"
          sx={{ 
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            maxHeight: '2.5em'
          }}
        >
          {review.comment}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CarouselReviewCard;