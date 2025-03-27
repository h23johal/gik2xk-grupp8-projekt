import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { cartCount } = useCart();
  const { user, logout, openAuthModal } = useAuth();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [newsOpen, setNewsOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) return;
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navButtonStyle = {
    mx: 0.5,
    textTransform: "none",
    fontSize: { xs: "0.7rem", md: "0.85rem" },
    px: { xs: 1, md: 2 },
    borderRadius: "20px",
    transition: "all 0.2s ease",
    whiteSpace: "nowrap",
    "&:hover": {
      transform: "scale(1.05)",
      backgroundColor: "primary.light",
      color: "white",
    },
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, mb: 6 }} component="header">
        <AppBar position="static" elevation={1}>
          <Toolbar sx={{ justifyContent: "space-between", flexWrap: "wrap" }}>
            {/* Vänstersida: Logo + News */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ display: { md: "none" } }}
              >
                <MenuIcon />
              </IconButton>

              <Button
                color="inherit"
                component={Link}
                to="/"
                sx={{
                  fontWeight: "bold",
                  fontSize: "1rem",
                  textTransform: "none",
                  display: { xs: "none", md: "inline-flex" },
                }}
              >
                Grupp 8
              </Button>

              <Button
                variant="contained"
                onClick={() => setNewsOpen(true)}
                sx={{
                  backgroundColor: "primary.main",
                  color: "#fff",
                  textTransform: "none",
                  fontWeight: "bold",
                  display: { xs: "none", md: "inline-flex" },
                  "&:hover": {
                    backgroundColor: "primary.dark",
                    color: "#fff",
                  },
                }}
              >
                News
              </Button>
            </Box>

            {/* Högersida: Nav-knappar (visa endast på md och uppåt) */}
            <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1 }}>
              {user?.id === 1 && (
                <Button component={Link} to="/admin" sx={navButtonStyle}>
                  Product Management
                </Button>
              )}
              {user && (
                <Button component={Link} to="/order-history" sx={navButtonStyle}>
                  Mina Beställningar
                </Button>
              )}
              {user ? (
                <Button onClick={handleLogout} sx={navButtonStyle}>
                  Logga ut
                </Button>
              ) : (
                <Button onClick={openAuthModal} sx={navButtonStyle}>
                  Logga in
                </Button>
              )}
              <IconButton
                component={Link}
                to="/cart"
                color="inherit"
                aria-label="Cart"
              >
                <Badge badgeContent={cartCount} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Drawer-meny för små skärmar */}
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              <ListItem button component={Link} to="/">
                <ListItemText primary="Hem" />
              </ListItem>

              <ListItem button onClick={() => {
                setDrawerOpen(false);
                setNewsOpen(true);
              }}>
                <ListItemText primary="News" />
              </ListItem>

              {user?.id === 1 && (
                <ListItem button component={Link} to="/admin">
                  <ListItemText primary="Product Management" />
                </ListItem>
              )}
              {user && (
                <ListItem button component={Link} to="/order-history">
                  <ListItemText primary="Mina Beställningar" />
                </ListItem>
              )}
              <ListItem button onClick={user ? handleLogout : openAuthModal}>
                <ListItemText primary={user ? "Logga ut" : "Logga in"} />
              </ListItem>
              <ListItem button component={Link} to="/cart">
                <ListItemText primary="Varukorg" />
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </Box>

      {/* News popup dialog */}
      <Dialog
        open={newsOpen}
        onClose={() => setNewsOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: "#fff",
            color: "#000",
            borderRadius: 3,
            px: 3,
            py: 2,
          },
        }}
        BackdropProps={{
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        <DialogTitle>Senaste Nytt 📰</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "text.primary" }}>
            ✅ Vi har precis fått in nya produkter!  
            <br /><br />
            🎮 Superrea på Gaming-tillbehör denna vecka!  
            <br /><br />
            🚚 Leveranser går nu ännu snabbare tack vare vårt nya lager!
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Navbar;
