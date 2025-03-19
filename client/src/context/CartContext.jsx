import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  
  const [cartItems, setCartItems] = useState([]);

  // Lägg till produkt i kundvagnen
  const addToCart = (newProduct) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === newProduct.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === newProduct.id
            ? { ...item, quantity: item.quantity + newProduct.quantity }
            : item
        );
      }
      return [...prevItems, newProduct];
    });
  };

  // Ta bort en produkt från kundvagnen
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== productId));
  };

  // Uppdatera kvantiteten för en produkt
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  // Beräkna total antal produkter (summerar kvantiteter)
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
