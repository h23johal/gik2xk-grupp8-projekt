// import { StrictMode } from 'react'
import React from 'react';
import ReactDOM from 'react-dom/client';
// import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App.jsx';

import {createBrowserRouter, RouterProvider} from 'react-router-dom';

const router = createBrowserRouter([
  {path: '/', element: <App />}
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
