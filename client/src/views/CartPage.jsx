import React from "react";
import { useCart } from "../context/CartContext";
import {
  Box,
  Typography,
  Button,
  Container,
} from "@mui/material";

// Importerade komponenter
import EmptyCartMessage from "../components/cart/EmptyCartMessage";
import ShippingNotice from "../components/cart/ShippingNotice";
import CartItemCard from "../components/cart/CartItemCard";
import CartSummary from "../components/cart/CartSummary";
import PageWrapper from "../components/layout/PageWrapper";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  // Beräkna priser
  const subTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.amount,
    0
  );
  const shippingCost = subTotal > 500 ? 0 : 49.99; 
  const taxAmount = subTotal * 0.25; 
  const totalPrice = subTotal + taxAmount + shippingCost;

  return (
    <PageWrapper>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Your Cart
        </Typography>

        {/* Fraktinfo-ruta */}
        <ShippingNotice />

        {/* Om kundvagnen är tom, visa ett Card med en knapp */}
        {cartItems.length === 0 ? (
          <EmptyCartMessage />
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 3,
              mt: 3,
            }}
          >
            {/* Produktlista (Vänster sida) */}
            <Box sx={{ flex: 2, width: "100%" }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {cartItems.map((item) => (
                  <CartItemCard
                    key={item.product_id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                  />
                ))}
              </Box>
            </Box>

            {/* Totalsumma (Höger sida) */}
            <Box sx={{ flex: 1, width: "100%" }}>
              <CartSummary
                subtotal={subTotal}
                tax={taxAmount}
                shipping={shippingCost}
                total={totalPrice}
              />
            </Box>
          </Box>
        )}

        {/* Töm knapp */}
        {cartItems.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Button
              color="inherit"
              variant="outlined"
              onClick={() =>
                cartItems.forEach((item) => removeFromCart(item.product_id))
              }
            >
              Empty Cart
            </Button>
          </Box>
        )}
      </Container>
    </PageWrapper>
  );
};

export default CartPage;
