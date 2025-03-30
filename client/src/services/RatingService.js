import axios from "./api";

// Hämta alla betyg
export async function getAll() {
  try {
    const response = await axios.get("/ratings");

    if (response.status === 200) { return response.data; }
    else {
      console.log(response);
      return [];
    }
  } catch (e) {
    e?.response ? console.log(e.response.data) : console.log(e);
  }
}

// Hämta ett enskilt betyg med ID
export async function getOne(id) {
  try {  
    const response = await axios.get(`/ratings/${id}`);

    if (response.status === 200) { return response.data; }
    else {
      console.log(response);
      return null;
    }
  } catch (e) {
    e?.response ? console.log(e.response.data) : console.log(e);
  } 
}

// Hämta alla betyg för en viss produkt
export async function getProductRatings(productId) {
  try {  
    const response = await axios.get(`/ratings/products/${productId}/ratings`);
    return response.data;
  } catch (e) {
    console.error("Could not fetch product rating:", e);
    return { ratings: [], avgScore: 0 };
  } 
}

// Kontrollera om en användare får betygsätta en produkt
export async function canUserRate(productId, userId) {
  try {
    const response = await axios.get(`/ratings/products/${productId}/can-rate`, {
      params: { userId }
    });

    return response.data.canRate;
  } catch (e) {
    console.error("Could not fetch rating permission:", e);
    return false;
  }
}

// Hämta recensioner för en viss produkt
export async function getProductReviews(productId) {
  try {  
    const response = await axios.get(`/ratings/products/${productId}/reviews`);
    return response.data;
  } catch (e) {
    console.error("Could not fetch reviews:", e);
    return { reviews: [] };
  } 
}

// Skicka nytt betyg/recension
export async function addRating(productId, userId, score, comment, anonymous = false) {
  try {
    const response = await axios.post(`/ratings/products/${productId}/addRating`, {
      user_id: userId,
      rating: score,
      comment: comment || null,
      anonymous,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.data?.error || "Could not submit review.");
    }
  } catch (e) {
    const message = e?.response?.data?.error || "Something went wrong during rating.";
    throw new Error(message);
  }
}
