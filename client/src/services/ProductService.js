import axios from "./api";

// Hämta alla produkter (standard-endpoint)
export async function getAll(endpoint = "/products") {
  const response = await axios.get(endpoint);

  if (response.status === 200) { return response.data; }
  else {
    console.log(response);
    return [];
  }
}

// Hämta enskild produkt med ID
export async function getOne(id) {
  const response = await axios.get(`/products/${id}`);
  if (response.status === 200) { return response.data; }
  else {
    console.log(response);
    return [];
  }
}

// Skapa ny produkt
export async function createProduct(product) {
  try {
    const response = await axios.post("/products", product);
    if (response.status === 200) return response.data;
  } catch (e) {
    const message = e?.response?.data?.error || "An error occurred during creation.";
    throw new Error(message); // skickas till komponent
  }
}

// Uppdatera befintlig produkt
export async function updateProduct(product) {
  try {
    const response = await axios.put("/products", product);
    if (response.status === 200) return response.data;
  } catch (e) {
    const message = e?.response?.data?.error || "An error occurred during update.";
    throw new Error(message);
  }
}

// Ta bort produkt
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

// Återställ tidigare borttagen produkt
export async function restoreProduct(id) {
  try {
    const response = await axios.put(`/products/${id}/restore`, { id, deletedAt: null });
    if (response.status === 200) return response.data;
  } catch (e) {
    const message = e?.response?.data?.error || "Could not restore the product.";
    throw new Error(message);
  }
}
