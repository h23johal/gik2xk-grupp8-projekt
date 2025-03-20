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
import { Link, useLocation } from "react-router-dom";
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
  ListItemText
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../../context/CartContext";

function Navbar() {
  const { cartCount } = useCart();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift"))
      return;
    setDrawerOpen(open);
  };

  const navItems = [
    { text: "Home", path: "/" },
    { text: "News", path: "/news" },
    { text: "Login", path: "/login" },
    { text: "Product Management", path: "/admin" }
  ];

  const drawerContent = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {navItems.map((item) => (
          <ListItem button key={item.text} component={Link} to={item.path}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }} component="header">
      <AppBar position="static">
        <Toolbar>
          {/* Mobile: Hamburger menu */}
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

          {/* Desktop: Branded logo */}
          <Button
            color="inherit"
            component={Link}
            to="/"
            aria-label="Home"
            sx={{ mr: 2, display: { xs: "none", sm: "block" } }}
          >
            YourBrand
          </Button>

          {/* Titel */}
          <Typography
            variant="h6"
            component="div"
            sx={{ mr: 2, flexGrow: 1, textAlign: { xs: "center", sm: "left" } }}
          >
            News
          </Typography>

          {/* Desktop navigation */}
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {location.pathname !== "/" && (
              <Button
                color="inherit"
                component={Link}
                to="/"
                aria-label="Back to Home"
                sx={{ mr: 2 }}
              >
                Hem
              </Button>
            )}

            <Button
              color="inherit"
              component={Link}
              to="/admin"
              sx={{ mr: 2 }}
            >
              Product Management
            </Button>

            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          </Box>

          {/* Shopping Cart */}
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
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </Box>
  );
}

export default Navbar;
