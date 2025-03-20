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
export async function createProduct(product) {
  try {
    const response = await axios.post('/products', product);
    if (response.status === 200) return response.data;
    else {
      console.log(response.data);
      return null;
    }
  } catch (e) {
    e?.response ? console.log(e.response.data) : console.log(e);
  }
}

export async function updateProduct(product) {
  try {
    const response = await axios.put('/products', product);
    if (response.status === 200) return response.data;
    else {
      console.log(response.data);
      return null;
    }
  } catch (e) {
    e?.response ? console.log(e.response.data) : console.log(e);
  }
}

export async function removeProduct(id) {
  try {
    const response = await axios.delete('/products', { data: { id } });
    if (response.status === 200) return response.data;
    else {
      console.log(response.data);
      return null;
    }
  } catch (e) {
    e?.response ? console.log(e.response.data) : console.log(e);
  }
}