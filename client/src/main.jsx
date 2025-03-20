import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ProductDetail from './views/ProductDetailPage.jsx'
import ProductDetailManagement from "./views/ProductDetailManagementPage.jsx";
import HomePage from './views/HomePage.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import { CartProvider } from "./context/CartContext";
import CartPage from "./views/CartPage";
import ProductManagement from "./views/ProductManagementPage.jsx";



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage/>
      },
      // {
      //   path: '/products/',
      //   element: <ProductList />
      // },
      {
        path: "/products/:id/",
        element: <ProductDetail />
      },
      { 
        path: "/cart/", 
        element: <CartPage /> },
      {
        path: '/admin',
        element: <ProductManagement />
      },
      {
        path: '/admin/:id',
        element: <ProductDetailManagement />
      }
      // {
      //   path: '/products/:id/edit/',
      //   element: <ProductEdit />
      // },
      // {
      //   path: '/products/new/',
      //   element: <ProductNew />
      // },
      // {
      //   path: 'cart/',
      //   element: <Cart />
      // }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
    <ThemeProvider theme={theme}>
    <CssBaseline /> {/* This normalizes CSS across browsers */}
    <RouterProvider router={router}/>
    </ThemeProvider>
    </CartProvider>
  </StrictMode>,
);

