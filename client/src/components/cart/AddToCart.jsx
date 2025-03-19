// AddToCart.jsx
import { Box, Typography, Button, TextField } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
import { useCart } from "../../context/CartContext"; // Hämta kundvagnsdata

function AddToCart({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart(); // Hämta funktionen för att lägga till i kundvagnen

  const handleAddToCart = () => {
    addToCart({ ...product, quantity }); // Lägg till produkten med antal
    console.log(`Added ${quantity} of product ${product.id} to cart`);
  };

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundColor: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.1)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography variant="h5" gutterBottom>
        ${product.price.toFixed(2)}
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        In stock - Ships within 24 hours
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <TextField
          type="number"
          label="Quantity"
          value={quantity}
          onChange={(e) =>
            setQuantity(Math.max(1, parseInt(e.target.value) || 1))
          }
          InputProps={{ inputProps: { min: 1 } }}
          size="small"
          sx={{ width: "80px", mr: 2 }}
        />

        <Button
          variant="contained"
          color="primary"
          startIcon={<ShoppingCartIcon />}
          onClick={handleAddToCart} // Använd `addToCart`
          sx={{ flexGrow: 1 }}
        >
          Add to Cart
        </Button>
      </Box>

      <Typography variant="body2">Free shipping on orders over $50</Typography>
    </Box>
  );
}

export default AddToCart;
