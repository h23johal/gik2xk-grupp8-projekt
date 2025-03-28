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
import { useSnackbar } from "../../context/SnackbarContext";


const CheckoutButton = () => {
  //AuthContext för att kontrollera vilken användare som datan ska sparas till
  const { user } = useAuth();
  //CartContext för att kontrollera vilken kundvagn datan ska sparas till
  const { cartItems, setCartItems } = useCart();
  //global snackbar
  const { showSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  //hantera checkout
  const handleCheckout = async () => {
    //extra redundans, ska kontrollera att användare är inloggad innan köp genomförs
    if (!user) {
      showSnackbar("Du måste vara inloggad för att slutföra köpet.", "error");
      return;
    }
    //laddfunktion, redundans för att säkerställa att allt laddas in korrekt vid nyinladdning av cart
    setLoading(true);
    //kalla på checkout funktion från CartService
    const response = await checkoutCart(user.id);
    //snackbar responsmeddelande
    if (response && !response.error) {
      showSnackbar("Köp genomfört! Din order har sparats.", "success");
      setCartItems([]); // töm cart i frontend
      setOpen(false); // stäng modal
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
        Complete Purchase
      </Button>

      {/* Checkout bekräftelse */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Purchase</DialogTitle>
        <DialogContent>
          <Typography>
          Are you sure you want to complete your purchase?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleCheckout} color="primary" disabled={loading}>
            {loading ? "Processing..." : "Confirm Purchase"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CheckoutButton;
