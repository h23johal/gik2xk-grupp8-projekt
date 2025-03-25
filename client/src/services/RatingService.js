import axios from "./api";

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

export async function getProductRatings(productId) {
  try {  
    const response = await axios.get(`/ratings/products/${productId}/ratings`);
    return response.data;
  } catch (e) {
    console.error('Error fetching product ratings:', e);
    return { ratings: [], avgScore: 0 };
  } 
}

export async function canUserRate(productId, userId) {
  try {
    const response = await axios.get(`/ratings/products/${productId}/can-rate`, {
      params: { userId }
    });

    return response.data.canRate;
  } catch (e) {
    console.error("Kunde inte hämta rating-behörighet:", e);
    return false;
  }
}

export async function getProductReviews(productId) {
  try {  
    const response = await axios.get(`/ratings/products/${productId}/reviews`);
    return response.data;
  } catch (e) {
    console.error('Error fetching product reviews:', e);
    return { reviews: [] };
  } 
}

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
      throw new Error(response.data?.error || "Kunde inte skicka recension");
    }
  } catch (e) {
    const message = e?.response?.data?.error || "Något gick fel vid betygssättning";
    throw new Error(message);
  }
}