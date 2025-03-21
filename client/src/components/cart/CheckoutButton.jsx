import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { checkoutCart } from "../../services/CartService";
import { useSnackbar } from "../../context/SnackbarContext"; // 🔹 Import global snackbar

const CheckoutButton = () => {
  const { user } = useAuth();
  const { cartItems, setCartItems } = useCart();
  const { showSnackbar } = useSnackbar(); // 🔹 Use global snackbar
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleCheckout = async () => {
    if (!user) {
      showSnackbar("Du måste vara inloggad för att slutföra köpet.", "error");
      return;
    }

    setLoading(true);
    const response = await checkoutCart(user.id);

    if (response && !response.error) {
      showSnackbar("Köp genomfört! Din order har sparats.", "success");
      setCartItems([]); // Clear frontend cart
      setOpen(false); // Close modal
    } else {
      showSnackbar("Något gick fel vid checkout. Försök igen.", "error");
    }
    setLoading(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={() => setOpen(true)}
        disabled={cartItems.length === 0}
      >
        Genomför köp
      </Button>

      {/* 🔹 Checkout Confirmation Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Bekräfta köp</DialogTitle>
        <DialogContent>
          <Typography>
            Är du säker på att du vill genomföra ditt köp?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Avbryt</Button>
          <Button onClick={handleCheckout} color="primary" disabled={loading}>
            {loading ? "Behandlar..." : "Bekräfta köp"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CheckoutButton;
