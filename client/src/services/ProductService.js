import axios from "./api";

export async function getAll( endpoint = "/products") {
  const response = await axios.get(endpoint);

  if (response.status === 200) { return response.data; }
  else {
    console.log(response);
    return [];;
  }
}
export async function getOne(id) {
  const response = await axios.get(`/products/${id}`);
  if (response.status === 200) { return response.data; }
  else {
    console.log(response);
    return [];;
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

