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
