import React from "react";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";

const EmptyCartMessage = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
      <Card sx={{ maxWidth: 400, textAlign: "center", p: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
          Your cart is empty
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Discover our products and fill your cart!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/"
            sx={{ mt: 2 }}
          >
            Continue shopping

          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EmptyCartMessage;