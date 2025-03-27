import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getOrderHistory } from "../services/CartService";
import { Container, Typography } from "@mui/material";
import OrderCard from "../components/product/OrderCard";
import PageWrapper from "../components/layout/PageWrapper";


const OrderHistoryPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user?.id) {
      getOrderHistory(user.id).then(setOrders);
    }
  }, [user]);

  return (
    <PageWrapper>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Orderhistorik
        </Typography>

        {orders.length === 0 ? (
          <Typography>Du har inga tidigare beställningar.</Typography>
        ) : (
          orders.map((order) => <OrderCard key={order.id} order={order} />)
        )}
      </Container>
    </PageWrapper>
  );
};

export default OrderHistoryPage;
