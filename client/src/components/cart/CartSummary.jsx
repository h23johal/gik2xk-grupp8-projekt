import React from "react";
import {
  Card,
  Box,
  CardContent,
  Typography,
  Divider
} from "@mui/material";
import CheckoutButton from "./CheckoutButton";

const CartSummary = ({ subtotal, tax, shipping, total }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Summary
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Subtotal */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body1">Subtotal:</Typography>
          <Typography variant="body1">{"$" +subtotal.toFixed(2)}</Typography>
        </Box>

        {/* Moms */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body1">VAT (25%):</Typography>
          <Typography variant="body1">{"$" + tax.toFixed(2)}</Typography>
        </Box>

        {/* Frakt */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="body1">Shipping:</Typography>
          <Typography variant="body1">
            {shipping === 0 ? "Free" : `$${shipping}`}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Totalbelopp */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h5">Total:</Typography>
          <Typography variant="h5" color="primary">
            {"$" + total.toFixed(2)}
          </Typography>
        </Box>

        <CheckoutButton />
      </CardContent>
    </Card>
  );
};

export default CartSummary;