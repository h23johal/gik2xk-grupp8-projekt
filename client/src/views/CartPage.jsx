import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Box, Typography, Button } from "@mui/material";

// Imported components
import EmptyCartMessage from "../components/cart/EmptyCartMessage";
import ShippingNotice from "../components/cart/ShippingNotice";
import CartItemCard from "../components/cart/CartItemCard";
import CartSummary from "../components/cart/CartSummary";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  // Beräkna priser
  const subTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.amount,
    0
  );
  const shippingCost = subTotal > 500 ? 0 : 49.99; // Fri frakt över 500 kr
  const taxAmount = subTotal * 0.25; // 25% moms
  const totalPrice = subTotal + taxAmount + shippingCost;

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h4" gutterBottom>
        Din Kundvagn
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
      <Button
        color="inherit"
        aria-label="Empty Cart"
        onClick={() =>
          cartItems.forEach((item) => removeFromCart(item.product_id))
        }
      >
        Töm Kundvagn
      </Button>
    </Box>
  );
};

export default CartPage;
