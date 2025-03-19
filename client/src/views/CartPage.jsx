import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  TextField,
  Grid,
  Divider
} from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  // Beräkna priser
  const subTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = subTotal > 500 ? 0 : 49; // Fri frakt över 500 kr
  const taxAmount = subTotal * 0.25; // 25% moms
  const totalPrice = subTotal + taxAmount + shippingCost;

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h4" gutterBottom>
        Din Kundvagn
      </Typography>

      {/* Fraktinfo-ruta */}
      <Box
        sx={{
          backgroundColor: "#f5f5f5", // Ljusgrå bakgrund
          padding: 2,
          borderRadius: 2,
          textAlign: "center",
          mb: 3, // Marginal nedåt
        }}
      >
        <Typography variant="body1">
          Frakt <strong>49 kr</strong> eller handla för över <strong>500 kr</strong> och få <strong>fri frakt</strong>!
        </Typography>
      </Box>

      {/* Om kundvagnen är tom, visa ett Card med en knapp */}
      {cartItems.length === 0 ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <Card sx={{ maxWidth: 400, textAlign: "center", p: 3, boxShadow: 3 }}>
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
                component={Link} // Gör knappen till en länk
                to="/" // Ändra till rätt path för produktlistan
                sx={{ mt: 2 }}
              >
                Fortsätt handla
              </Button>
            </CardContent>
          </Card>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {/* Produktlista (Vänster sida) */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              {cartItems.map((item) => (
                <Grid item xs={12} key={item.id}>
                  <Card sx={{ display: "flex", alignItems: "center", p: 2, boxShadow: 2 }}>
                    
                    {/* Produktbild */}
                    {item.image_url ? (
                      <CardMedia
                        component="img"
                        image={item.image_url}
                        alt={item.title}
                        sx={{ width: 100, height: 100, objectFit: "cover", borderRadius: 2 }}
                      />
                    ) : (
                      <Box sx={{ width: 100, height: 100, backgroundColor: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 2 }}>
                        <Typography variant="caption">Ingen bild</Typography>
                      </Box>
                    )}

                    {/* Produktinfo */}
                    <Box sx={{ flex: 1, ml: 2 }}>
                      <CardContent sx={{ p: 0 }}>
                        <Typography variant="h6">{item.title}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.price} kr
                        </Typography>

                        {/* Antal-kontroller */}
                        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                          <IconButton onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} size="small">
                            <RemoveCircleOutlineIcon />
                          </IconButton>

                          <TextField
                            type="number"
                            value={item.quantity}
                            onChange={(e) => {
                              const newQty = Math.max(1, parseInt(e.target.value) || 1);
                              updateQuantity(item.id, newQty);
                            }}
                            inputProps={{ min: 1 }}
                            size="small"
                            sx={{ width: "50px", mx: 1, textAlign: "center" }}
                          />

                          <IconButton onClick={() => updateQuantity(item.id, item.quantity + 1)} size="small">
                            <AddCircleOutlineIcon />
                          </IconButton>
                        </Box>
                      </CardContent>
                    </Box>

                    {/* Ta bort-knapp */}
                    <Box sx={{ pl: 2 }}>
                      <Button variant="outlined" color="error" onClick={() => removeFromCart(item.id)}>
                        Ta bort
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Totalsumma (Höger sida) */}
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Sammanställning
                </Typography>

                <Divider sx={{ my: 2 }} />

                {/* Subtotal */}
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body1">Delsumma:</Typography>
                  <Typography variant="body1">{subTotal.toFixed(2)} kr</Typography>
                </Box>

                {/* Moms */}
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body1">Moms (25%):</Typography>
                  <Typography variant="body1">{taxAmount.toFixed(2)} kr</Typography>
                </Box>

                {/* Frakt */}
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                  <Typography variant="body1">Frakt:</Typography>
                  <Typography variant="body1">
                    {shippingCost === 0 ? "Gratis" : `${shippingCost} kr`}
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Totalbelopp */}
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                  <Typography variant="h5">Totalt:</Typography>
                  <Typography variant="h5" color="primary">
                    {totalPrice.toFixed(2)} kr
                  </Typography>
                </Box>

                <Button variant="contained" color="primary" size="large" fullWidth>
                  Gå till kassan
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default CartPage;