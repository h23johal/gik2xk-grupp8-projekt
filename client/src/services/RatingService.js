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

// export async function getProductRatings(productId) {
//   try {  
//     const response = await axios.get(`/ratings/${productId}`);

//     if (response.status === 200) { return response.data; }
//     else {
//       console.log(response);
//       return { ratings: [], avgScore: 0 };
//     }
//   } catch (e) {
//     e?.response ? console.log(e.response.data) : console.log(e);
//     return { ratings: [], avgScore: 0 };
//   } 
// }
export async function getProductRatings(productId) {
  try {  
    // console.log(`Attempting to fetch ratings for SPECIFIC product ID: ${productId}`);
    
    const response = await axios.get(`/ratings/${productId}`);

    // console.log('Received Response Status:', response.status);
    // console.log('Received Response Data:', JSON.stringify(response.data, null, 2));

    return response.data;
  } catch (e) {
    console.error('Error fetching product ratings:', e);
    return { ratings: [], avgScore: 0 };
  } 
}
  // useEffect(() => {
  //   axios.get(`http://localhost:5002/products/${id}`)
  //     .then(response => setProduct(response.data.data))
  //     .catch(error => console.error('Error fetching product:', error));

  //   axios.get(`http://localhost:5002/ratings/${id}`)
  //     .then(response => setRatings(response.data.data))
  //     .catch(error => console.error('Error fetching ratings:', error));
  // }, [id]);

