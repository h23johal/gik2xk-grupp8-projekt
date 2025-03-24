import React from "react";
import {
  Card,
  Box,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";

const CartItemCard = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <Card>
      <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
        {/* Produktbild */}
        {item.imageUrl ? (
          <CardMedia
            component="img"
            image={item.imageUrl}
            alt={item.title}
            sx={{
              width: 100,
              height: 100,
              objectFit: "cover",
              borderRadius: 1,
            }}
          />
        ) : (
          <Box
            sx={{
              width: 100,
              height: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="caption" color="text.secondary">
              Ingen bild
            </Typography>
          </Box>
        )}

        {/* Produktinfo */}
        <Box sx={{ flex: 1, ml: 2 }}>
          <CardContent sx={{ p: 0 }}>
            <Typography variant="h6">{item.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {item.price} kr
            </Typography>

            {/* Antal-kontroller */}
            <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
              <IconButton
                onClick={() =>
                  onUpdateQuantity(
                    item.product_id,
                    Math.max(1, item.amount - 1)
                  )
                }
                size="small"
              >
                <RemoveCircleOutlineIcon />
              </IconButton>

              <TextField
                type="number"
                value={item.amount}
                onChange={(e) => {
                  const newQty = Math.max(1, parseInt(e.target.value) || 1);
                  onUpdateQuantity(item.product_idid, newQty);
                }}
                inputProps={{ min: 1 }}
                size="small"
                sx={{ width: "60px", mx: 1 }}
              />

              <IconButton
                onClick={() =>
                  onUpdateQuantity(item.product_id, item.amount + 1)
                }
                size="small"
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Box>

        {/* Ta bort-knapp */}
        <Box sx={{ pl: 2 }}>
          <IconButton
            variant="outlined"
            color="error"
            onClick={() => onRemove(item.product_id)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};

export default CartItemCard;
