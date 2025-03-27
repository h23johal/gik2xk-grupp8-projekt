import axios from "./api";

// Hämta användarens varukorg
export async function getCart(user_id) {
  try {
    const response = await axios.get(`/cart/${user_id}`);
    return response.data;
  } catch (e) {
    console.error("Kunde inte hämta varukorg:", e);
    return null;
  }
}

// Lägg till produkt i varukorgen
export async function addToCart(user_id, product_id, amount) {
  try {
    const response = await axios.post(`/cart/addProduct`, { user_id, product_id, amount });
    return response.data;
  } catch (e) {
    console.error("Kunde inte lägga till produkt i varukorgen:", e);
    return null;
  }
}

// Ta bort produkt från varukorgen
export async function removeFromCart(cart_id, product_id) {
  try {
    const response = await axios.delete(`/cart/removeProduct`, { data: { cart_id, product_id } });
    return response.data;
  } catch (e) {
    console.error("Kunde inte ta bort produkt från varukorgen:", e);
    return null;
  }
}

// Uppdatera antal av produkt i varukorgen
export async function updateCart(cartId, productId, amount) {
  try {
    const response = await axios.put("/cart/updateProduct", { cart_id: cartId, product_id: productId, amount });
    return response.data;
  } catch (error) {
    console.error("Kunde inte uppdatera varukorgen:", error);
    return null;
  }
}

// Slutför köp
export async function checkoutCart(user_id) {
  try {
    const response = await axios.post("/cart/checkout", { user_id });
    return response.data;
  } catch (e) {
    console.error("Checkout misslyckades:", e);
    return null;
  }
}

// Hämta användarens orderhistorik
export async function getOrderHistory(user_id) {
  try {
    const response = await axios.get(`/cart/history/${user_id}`);
    return response.data;
  } catch (e) {
    console.error("Kunde inte hämta orderhistorik:", e);
    return null;
  }
}
