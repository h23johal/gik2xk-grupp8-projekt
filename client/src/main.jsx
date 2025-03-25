import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ProductDetail from "./views/ProductDetailPage.jsx";
import ProductDetailManagement from "./views/ProductDetailManagementPage.jsx";
import HomePage from "./views/HomePage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import CartPage from "./views/CartPage";
import ProductManagement from "./views/ProductManagementPage.jsx";
import ProtectedRoute from "./components/user/ProtectedRoute.jsx";
import OrderHistoryPage from "./views/OrderHistoryPage.jsx";
import { SnackbarProvider } from "./context/SnackbarContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/products/:id/",
        element: <ProductDetail />,
      },
      {
        path: "/cart/",
        element: <CartPage />,
      },
      {
        path: "/order-history",
        element: <OrderHistoryPage />,
      },
      {
        path: "/admin",
        element: <ProtectedRoute requiredRole={1} />, 
        children: [
          {
            index: true,
            element: <ProductManagement />,
          },
          {
            path: ":id",
            element: <ProductDetailManagement />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SnackbarProvider>
      <AuthProvider>
        {" "}
        {/* 🔹 Wrappa allt med AuthProvider */}
        <CartProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline /> {/* Normaliserar CSS */}
            <RouterProvider router={router} />
          </ThemeProvider>
        </CartProvider>
      </AuthProvider>
    </SnackbarProvider>
  </StrictMode>
);
