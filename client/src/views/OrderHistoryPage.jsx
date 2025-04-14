import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getOrderHistory } from "../services/CartService";
import { Container, Typography } from "@mui/material";
import OrderCard from "../components/product/OrderCard";
import PageWrapper from "../components/layout/PageWrapper";

const OrderHistoryPage = () => {
  // Hämta inloggad användare
  const { user } = useAuth();
  
  // State: användarens orderhistorik
  const [orders, setOrders] = useState([]);

  // Hämta orderhistorik när användaren ändras
  useEffect(() => {
    if (user?.id) {
      getOrderHistory(user.id).then(setOrders);
    }
  }, [user]);

  return (
    <PageWrapper>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Sidrubrik */}
        <Typography variant="h4" gutterBottom>
        Order History
        </Typography>

        {/* Visa meddelande om inga beställningar finns */}
        {orders.length === 0 ? (
          <Typography>You have no previous orders.</Typography>
        ) : (
          // Visa orderkort om det finns beställningar
          orders.map((order) => <OrderCard key={order.id} order={order} />)
        )}
      </Container>
    </PageWrapper>
  );
};

export default OrderHistoryPage;
