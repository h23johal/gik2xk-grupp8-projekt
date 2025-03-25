import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const OrderCard = ({ order }) => {
  const hasDeletedProducts = order.rows.some(
    (row) => row.product?.deletedAt !== null
  );

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">Order #{order.id}</Typography>
        <Typography variant="body2">
          Beställd: {new Date(order.updatedAt).toLocaleDateString()}
        </Typography>

        <Typography variant="body2" sx={{ mt: 1 }}>
          Produkter:
        </Typography>
        {order.rows.map((row) => (
          <Typography key={row.product?.id}>
            {row.product?.name} - {row.amount} st - {row.product?.price} kr
          </Typography>
        ))}

        {hasDeletedProducts && (
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            Denna order innehåller en eller flera produkter som har utgått.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderCard;
