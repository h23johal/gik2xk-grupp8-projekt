// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   Box,
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   IconButton,
//   Badge,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import { useCart } from "../../context/CartContext";

// function Navbar() {
//   const { cartCount } = useCart();
//   const location = useLocation();
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   const toggleDrawer = (open) => (event) => {
//     if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift"))
//       return;
//     setDrawerOpen(open);
//   };

//   const navItems = [
//     { text: "Home", path: "/" },
//     { text: "News", path: "/news" },
//     { text: "Login", path: "/login" }
//   ];

//   const drawerContent = (
//     <Box
//       sx={{ width: 250 }}
//       role="presentation"
//       onClick={toggleDrawer(false)}
//       onKeyDown={toggleDrawer(false)}
//     >
//       <List>
//         {navItems.map((item) => (
//           <ListItem button key={item.text} component={Link} to={item.path}>
//             <ListItemText primary={item.text} />
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );

//   return (
//     <Box sx={{ flexGrow: 1 }} component="header">
//       <AppBar position="static">
//         <Toolbar>
//           {/* Mobile: Hamburger menu */}
//           <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             onClick={toggleDrawer(true)}
//             sx={{ mr: 2, display: { sm: "none" } }}
//           >
//             <MenuIcon />
//           </IconButton>

//           {/* Desktop: Branded logo */}
//           <Button
//             color="inherit"
//             component={Link}
//             to="/"
//             aria-label="Home"
//             sx={{ mr: 2, display: { xs: "none", sm: "block" } }}
//           >
//             YourBrand
//           </Button>

//           {/* Title */}
//           <Typography
//             variant="h6"
//             component="div"
//             sx={{
//               mr: 2,
//               flexGrow: 1,
//               textAlign: { xs: "center", sm: "left" }
//             }}
//           >
//             News
//           </Typography>

//           {/* Desktop navigation */}
//           <Box sx={{ display: { xs: "none", sm: "block" } }}>
//             {location.pathname !== "/" && (
//               <Button
//                 color="inherit"
//                 component={Link}
//                 to="/"
//                 aria-label="Back to Home"
//                 sx={{ mr: 2 }}
//               >
//                 Home
//               </Button>
//             )}
//             <Button
//               color="inherit"
//               component={Link}
//               to="/login"
//               aria-label="Login"
//             >
//               Login
//             </Button>
//           </Box>

//           {/* Shopping Cart */}
//           <IconButton
//             component={Link}
//             to="/cart"
//             color="inherit"
//             aria-label="Cart"
//           >
//             <Badge badgeContent={cartCount} color="error">
//               <ShoppingCartIcon />
//             </Badge>
//           </IconButton>
//         </Toolbar>
//       </AppBar>

//       {/* Mobile Drawer */}
//       <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
//         {drawerContent}
//       </Drawer>
//     </Box>
//   );
// }

// export default Navbar;

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { cartCount } = useCart();
  const { user, logout, openAuthModal } = useAuth();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    )
      return;
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navButtonStyle = {
    mx: 1,
    textTransform: "none",
    transition: "all 0.2s ease",
    borderRadius: "30px",
    "&:hover": {
      transform: "scale(1.08)",
      backgroundColor: "primary.light",
      color: "white",
    },
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }} component="header">
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <Button
              color="inherit"
              component={Link}
              to="/"
              aria-label="Home"
              sx={{ mr: 2, display: { xs: "none", sm: "block" }, ...navButtonStyle }}
            >
              YourBrand
            </Button>

            <Typography
              variant="h6"
              component="div"
              sx={{
                mr: 2,
                flexGrow: 1,
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              News
            </Typography>

            <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}>
              {user?.id === 1 && (
                <Button
                  component={Link}
                  to="/admin"
                  sx={navButtonStyle}
                >
                  Product Management
                </Button>
              )}

              {user && (
                <Button
                  component={Link}
                  to="/order-history"
                  sx={navButtonStyle}
                >
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

        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              <ListItem button component={Link} to="/">
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem button component={Link} to="/news">
                <ListItemText primary="News" />
              </ListItem>
              {user?.id === "1" && (
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
            </List>
          </Box>
        </Drawer>
      </Box>
    </>
  );
}

export default Navbar;
