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
    const response = await axios.get(`/ratings/${productId}`);
    return response.data;
  } catch (e) {
    console.error('Error fetching product ratings:', e);
    return { ratings: [], avgScore: 0 };
  } 
}

export async function getProductReviews(productId) {
  try {  
    const response = await axios.get(`/ratings/product/${productId}/reviews`);
    return response.data;
  } catch (e) {
    console.error('Error fetching product reviews:', e);
    return { reviews: [] };
  } 
}