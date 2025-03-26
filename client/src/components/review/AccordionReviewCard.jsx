import { useEffect, useState } from 'react';
import { Box, Typography, Rating, Card, CardContent } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function AccordionReviewCard({ review, isSelected, onClick }) {
  const [expanded, setExpanded] = useState(isSelected);
  
  // Update expanded state when isSelected changes (from carousel)
  useEffect(() => {
    if (isSelected) {
      setExpanded(true);
    }
  }, [isSelected]);

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "Unknown date" : date.toLocaleDateString();
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
    onClick(review.id);
  };

  return (
    <Card 
      onClick={toggleExpand}
      sx={{ 
        mb: 2,
        cursor: 'pointer',
        backgroundColor: isSelected ? 'rgba(224, 145, 169, 0.05)' : 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '12px',
        transition: 'all 0.3s ease',
        boxShadow: isSelected ? '0 4px 12px rgba(224, 145, 169, 0.2)' : '0 2px 8px rgba(0,0,0,0.1)',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 6px 16px rgba(224, 145, 169, 0.15)'
        }
      }}
    >
      <CardContent sx={{ p: 2 }}>
        {/* Header section */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            py: 1
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="subtitle1" fontWeight="medium">
              {review.user ? review.user.first_name : (review.username || "Anonymous")}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
              <Rating 
                value={review.rating || 0} 
                readOnly 
                size="small"
                precision={0.5}
              />
              <Typography variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
                ({(review.rating || 0).toFixed(1)})
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', mr: 1 }}>
              {formatDate(review.createdAt)}
            </Typography>
            {expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </Box>
        </Box>
        
        {/* Preview when collapsed, full text when expanded */}
        <Typography 
          variant="body2" 
          sx={{ 
            mt: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: expanded ? 'none' : '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {review.comment && review.comment.length > 120 
            ? `${review.comment.substring(0, 120)}...` 
            : review.comment}
        </Typography>
        
        {/* Full text only when expanded */}
        {expanded && (
          <Typography 
            variant="body1" 
            sx={{ 
              mt: 1,
              lineHeight: 1.6
            }}
          >
            {review.comment}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default AccordionReviewCard;