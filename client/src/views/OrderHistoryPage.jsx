import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getOrderHistory } from "../services/CartService";
import { Box, Typography, Card, CardContent } from "@mui/material";

const OrderHistoryPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user?.id) {
      getOrderHistory(user.id).then(setOrders);
    }
  }, [user]);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Orderhistorik</Typography>
      {orders.length === 0 ? (
        <Typography>Du har inga tidigare beställningar.</Typography>
      ) : (
        orders.map((order) => (
          <Card key={order.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">Order #{order.id}</Typography>
              <Typography variant="body2">
                Beställd: {new Date(order.updatedAt).toLocaleDateString()}
              </Typography>
              <Typography variant="body2">Produkter:</Typography>
              {order.rows.map((row) => (
                <Typography key={row.product.id}>
                  {row.product.name} - {row.amount} st - {row.product.price} kr
                </Typography>
              ))}
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default OrderHistoryPage;
