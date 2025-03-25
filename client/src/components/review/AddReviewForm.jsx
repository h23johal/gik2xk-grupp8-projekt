import React, { useState } from "react";
import {
  Rating,
  TextField,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import { addRating } from "../../services/RatingService";
import { useSnackbar } from "../../context/SnackbarContext";

function AddReviewForm({ productId, userId }) {
  const [score, setScore] = useState(0);
  const [comment, setComment] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const { showSnackbar } = useSnackbar();

  const handleSubmit = async () => {
    if (score === 0) {
      showSnackbar("Välj ett betyg innan du skickar.", "error");
      return;
    }

    try {
      await addRating(productId, userId, score, comment, anonymous);
      showSnackbar("Tack för din recension!", "success");
      setScore(0);
      setComment("");
      setAnonymous(false);
    } catch (err) {
      showSnackbar(err.message || "Kunde inte skicka recension", "error");
    }
  };

  return (
    <Box
      p={{ xs: 2, sm: 3, md: 4 }}
      mt={{ xs: 3, sm: 4 }}
      borderRadius={2}
      boxShadow={3}
      bgcolor="rgba(255,255,255,0.03)"
      sx={{
        m: { xs: 1, sm: 2 },
      }}
    >
      <Typography variant="h6" gutterBottom>
        Lämna en recension
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        <Rating
          name="rating"
          value={score}
          onChange={(e, newValue) => setScore(newValue)}
        />
        <TextField
          label="Skriv en kommentar (valfritt)"
          multiline
          minRows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          fullWidth
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={anonymous}
              onChange={(e) => setAnonymous(e.target.checked)}
            />
          }
          label="Publicera anonymt"
        />
        <Button variant="contained" onClick={handleSubmit}>
          Skicka recension
        </Button>
      </Box>
    </Box>
  );
}

export default AddReviewForm;
