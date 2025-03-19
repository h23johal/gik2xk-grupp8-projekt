import { Link } from "react-router-dom";
import {
  Box, 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton,
  Badge
} from '@mui/material';
import { useCart } from "../context/CartContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function Navbar(){
  const { cartCount } = useCart(); // Hämta antal varor i kundvagnen

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* Eventuell menyikon */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
          </IconButton>

          {/* Titel */}
          <Typography variant="h6" component="div" sx={{ mr: 2 }}>
            News
          </Typography>

          {/* Hem-knapp */}
          <Button color="inherit" component={Link} to="/">
            Hem
          </Button>

          {/* Låt de vänstra elementen vara i grupp */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Product Management (Temporary) */}
          <Button
            color="inherit"
            component={Link}
            to="/admin"
            sx={{ mr: 2 }} // Adds spacing before the cart icon
          >
            Product Management
          </Button>

          {/* Kundvagnsikon med länk till /cart */}
          <IconButton component={Link} to="/cart" color="inherit">
            <Badge badgeContent={cartCount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {/* Login-knapp */}
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
