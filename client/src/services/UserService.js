import axios from "./api";

// Hämta alla användare
export async function getAll() {
  try {
    const response = await axios.get("/users");
    return response.status === 200 ? response.data : [];
  } catch (e) {
    console.error("Could not fetch user:", e);
    return [];
  }
}

// Hämta enskild användare via ID
export async function getOne(id) {
  try {
    const response = await axios.get(`/users/${id}`);
    return response.status === 200 ? response.data : null;
  } catch (e) {
    console.error("Could not fetch user:", e);
    return null;
  }
}

// Skapa ny användare
export async function createUser(first_name, last_name, email, password) {
  try {
    const response = await axios.post("/users", { first_name, last_name, email, password });
    return response.status === 200 ? response.data : null;
  } catch (e) {
    console.error("Could not create user:", e);
    return null;
  }
}

// Logga in användare
export async function loginUser(email, password) {
  try {
    const response = await axios.post("/auth/login", { email, password });
    return response.status === 200 ? response.data : null;
  } catch (e) {
    console.error("FError during login:", e);
    return null;
  }
}

// Logga ut användare
export async function logoutUser() {
  try {
    await axios.post("/auth/logout");
    localStorage.removeItem("user_id");
  } catch (e) {
    console.error("Error during logout:", e);
  }
}

// Uppdatera användarinformation
export async function updateUser(userId, userData) {
  try {
    const response = await axios.put(`/users/${userId}`, userData);
    return response.status === 200 ? response.data : null;
  } catch (e) {
    console.error("Could not update user:", e);
    return null;
  }
}

// Radera användare
export async function destroy(userId) {
  try {
    const response = await axios.delete(`/users/${userId}`);
    return response.status === 200 ? response.data : null;
  } catch (e) {
    console.error("Could not delete user:", e);
    return null;
  }
}
