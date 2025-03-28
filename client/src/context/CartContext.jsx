import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import {
  getCart,
  addToCart,
  removeFromCart,
  updateCart,
} from "../services/CartService";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, openAuthModal } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  // Ladda varukorgen från backend när användaren loggar in
  useEffect(() => {
    if (user?.id) {
      loadCart(user.id);
    }
  }, [user]);

  // Hämta varukorg från backend
  const loadCart = async (userId) => {
    try {
      const cartData = await getCart(userId);
      if (cartData) {
        setCartItems(cartData);
      }
    } catch (error) {
      console.error("Could not fetch cart:", error);
    }
  };

  // Lägg till produkt i varukorgen
  const addToCartHandler = async (product, amount) => {
    if (!user) {
      openAuthModal();
      return;
    }

    try {
      await addToCart(user.id, product.id, amount);
      await loadCart(user.id); // Ladda om varukorgen efter att en produkt lagts till
    } catch (error) {
      console.error("Could not add to cart:", error);
    }
  };

  // Ta bort produkt från varukorgen
  const removeFromCartHandler = async (productId) => {
    if (!user) {
      openAuthModal();
      return;
    }

    // Hitta cart_id från cartItems
    const cartItem = cartItems.find((item) => item.product_id === productId);
    if (!cartItem) {
      console.error("No cart found for product:", productId);
      return;
    }

    const cartId = cartItem.cart_id;
    if (!cartId) {
      console.error("Cart ID is missing during removal");
      return;
    }

    try {
      await removeFromCart(cartId, productId);
      await loadCart(user.id); // Ladda om varukorgen efter borttagning
    } catch (error) {
      console.error("Could not remove product from cart:", error);
    }
  };

  // Uppdatera kvantitet
  const updateQuantityHandler = async (productId, newQuantity) => {
    if (!user) {
      openAuthModal();
      return;
    }

    const cartId = cartItems.length > 0 ? cartItems[0].cart_id : null;
    if (!cartId) return console.error("Cart ID is missing during update");

    if (newQuantity <= 0) {
      return await removeFromCartHandler(productId);
    }

    try {
      await updateCart(cartId, productId, newQuantity);
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.product_id === productId
            ? { ...item, amount: newQuantity }
            : item
        )
      );
    } catch (error) {
      console.error("Could not update product quantity:", error);
    }
  };


  // Beräkna total antal produkter
  const cartCount = cartItems.reduce((total, item) => total + item.amount, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart: addToCartHandler,
        removeFromCart: removeFromCartHandler,
        updateQuantity: updateQuantityHandler,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
