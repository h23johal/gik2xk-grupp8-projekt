import React, { useState } from "react";
import { Rating, TextField, Button, Box, Typography } from "@mui/material";
import { addRating } from "../../services/RatingService";
import { useSnackbar } from "../../context/SnackbarContext";

function AddReviewForm({ productId, userId, onReviewAdded }) {
  const [score, setScore] = useState(0);
  const [comment, setComment] = useState("");
  const { showSnackbar } = useSnackbar();

  const handleSubmit = async () => {
    if (score === 0) {
      showSnackbar("Choose a rating before submitting.", "error");
      return;
    }

    try {
      await addRating(productId, userId, score, comment, false);
      showSnackbar("Thank you for your review!", "success");
      setScore(0);
      setComment("");
      if (onReviewAdded) onReviewAdded();
    } catch (err) {
      showSnackbar(err.message || "Could not submit review", "error");
    }
  };

  return (
    <Box
      p={{ xs: 2, sm: 3, md: 4 }}
      mt={{ xs: 3, sm: 4 }}
      borderRadius={2}
      boxShadow={3}
      bgcolor="rgba(255,255,255,0.03)"
      sx={{ m: { xs: 1, sm: 2 } }}
    >
      <Typography variant="h6" gutterBottom>
        Leave a Review
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        <Rating name="rating" value={score} onChange={(e, newValue) => setScore(newValue)} />
        <TextField
          label="Write a comment (optional)"
          multiline
          minRows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={handleSubmit}>
          Submit Review
        </Button>
      </Box>
    </Box>
  );
}

export default AddReviewForm;
// import React, { useState } from "react";
// import { Rating, TextField, Button, Box, Typography } from "@mui/material";
// import { addRating } from "../../services/RatingService";
// import { useSnackbar } from "../../context/SnackbarContext";

// function AddReviewForm({ productId, userId, onReviewAdded }) {
//   const [score, setScore] = useState(0);
//   const [comment, setComment] = useState("");
//   const { showSnackbar } = useSnackbar();

//   const handleSubmit = async () => {
//     if (score === 0) {
//       showSnackbar("Choose a rating before submitting.", "error");
//       return;
//     }
//     try {
//       await addRating(productId, userId, score, comment, false);
//       showSnackbar("Thank you for your review!", "success");
//       setScore(0);
//       setComment("");
//       if (onReviewAdded) onReviewAdded();
//     } catch (err) {
//       showSnackbar(err.message || "Could not submit review", "error");
//     }
//   };

//   return (
//     <Box
//       p={{ xs: 2, sm: 3, md: 4 }}
//       mt={{ xs: 3, sm: 4 }}
//       borderRadius={2}
//       boxShadow={3}
//       bgcolor="rgba(255,255,255,0.03)"
//       sx={{ m: { xs: 1, sm: 2 } }}
//     >
//       <Typography variant="h6" gutterBottom>
//         Leave a Review
//       </Typography>
//       <Box display="flex" flexDirection="column" gap={2}>
//         <Rating
//           name="rating"
//           value={score}
//           onChange={(e, newValue) => setScore(newValue)}
//         />
//         <TextField
//           label="Write a comment (optional)"
//           multiline
//           minRows={3}
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//           fullWidth
//         />
//         <Button variant="contained" onClick={handleSubmit}>
//           Submit Review
//         </Button>
//       </Box>
//     </Box>
//   );
// }

// export default AddReviewForm;
