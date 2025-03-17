import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './views/HomePage';
import ProductDetailPage from './views/ProductDetailPage';
import CartPage from './views/CartPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </>
  );
}

export default App
