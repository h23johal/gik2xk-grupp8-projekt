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



  // useEffect(() => {
  //   axios.get(`http://localhost:5002/products/${id}`)
  //     .then(response => setProduct(response.data.data))
  //     .catch(error => console.error('Error fetching product:', error));

  //   axios.get(`http://localhost:5002/ratings/${id}`)
  //     .then(response => setRatings(response.data.data))
  //     .catch(error => console.error('Error fetching ratings:', error));
  // }, [id]);

