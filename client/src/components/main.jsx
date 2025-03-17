import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '../App.jsx'
import ProductDetail from '../views/ProductDetailPage.jsx'
import HomePage from '../views/HomePage.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage/>
      },
      {
        path: '/products/',
        element: <Products />
      },
      {
      path: '/products/:id/',
      element: <ProductDetail />
      }
    ]
  }]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
);
