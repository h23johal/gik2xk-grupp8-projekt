import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  CardMedia,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";

const OrderCard = ({ order }) => {
  //kontrollera om ordern har borttagna produkter, dvs om deletedAt i produkten fältet ej är tomt
  const hasDeletedProducts = order.rows.some(
    (row) => row.product?.deletedAt !== null
  );

  return (
    <Accordion
      sx={{
        mb: 2,
        borderRadius: 2,
        boxShadow: 2,
        backgroundColor: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(6px)",
        overflow: "hidden",
        "&:before": { display: "none" },
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          boxShadow: 4,
        },
      }}
    >
      <AccordionSummary
      //expandera för att visa produkter i ordern
        expandIcon={<ExpandMoreIcon />}
        sx={{
          backgroundColor: "#f5f5f5",
          px: 3,
          py: 2,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h6">Order #{order.id}</Typography>
          <Typography variant="body2" color="text.secondary">
            Beställd: {new Date(order.updatedAt).toLocaleDateString()}
          </Typography>
        </Box>
      </AccordionSummary>

      <AccordionDetails sx={{ px: 3, pb: 3 }}>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Produkter:
        </Typography>

        {order.rows.map((row) => (
          <Paper
            key={row.product?.id}
            elevation={1}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              p: 2,
              mb: 2,
              borderRadius: 2,
              backgroundColor: "#fff",
            }}
          >
            <CardMedia
              component="img"
              src={row.product?.imageUrl}
              alt={row.product?.title}
              sx={{
                width: 60,
                height: 60,
                objectFit: "cover",
                borderRadius: 1,
                border: "1px solid #ccc",
              }}
            />
            <Box>
              <Typography
                //länka till  produkten
                component={Link}
                to={`/products/${row.product?.id}`}
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  textDecoration: "none",
                  color: "primary.main",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                {row.product?.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {row.amount} st – {row.product?.price} kr
              </Typography>
            </Box>
          </Paper>
        ))}
        
        {hasDeletedProducts && (
          //om någon av produkterna är borttagna, visa text
          <Typography variant="body2" color="error">
            Denna order innehåller en eller flera produkter som har utgått.
          </Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default OrderCard;
