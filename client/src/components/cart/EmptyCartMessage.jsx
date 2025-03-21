import React from "react";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";

const EmptyCartMessage = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
      <Card sx={{ maxWidth: 400, textAlign: "center", p: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Din kundvagn är tom
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Upptäck våra produkter och fyll din kundvagn!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/"
            sx={{ mt: 2 }}
          >
            Fortsätt handla
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EmptyCartMessage;