import { Box, Typography, Rating, Card, CardContent } from "@mui/material";

function AccordionReviewCard({ review, isSelected }) {
  //säkerställ att ett datum är kopplat till reviewen, annars skriv Unknown date
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "Unknown date" : date.toLocaleDateString();
  };

  return (
    <Card
      sx={{
        mb: 2,
        backgroundColor: isSelected ? "rgba(224, 145, 169, 0.05)" : "rgba(255,255,255,0.05)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "12px",
        transition: "all 0.3s ease",
        boxShadow: isSelected ? "0 4px 12px rgba(224, 145, 169, 0.2)" : "0 2px 8px rgba(0,0,0,0.1)",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 6px 16px rgba(224, 145, 169, 0.15)",
        },
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 1 }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="subtitle1" fontWeight="medium">
              {review.user ? review.user.first_name : (review.username || "Anonymous")}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
              <Rating value={review.rating || 0} readOnly size="small" precision={0.5} />
              <Typography variant="body2" sx={{ ml: 1, color: "text.secondary" }}>
                ({(review.rating || 0).toFixed(1)})
              </Typography>
            </Box>
          </Box>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {formatDate(review.createdAt)}
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ mt: 1, lineHeight: 1.6 }}>
          {review.comment}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default AccordionReviewCard;