import React, { createContext, useContext, useState, useEffect } from "react";
import { loginUser, createUser, logoutUser } from "../services/UserService";
import AuthModal from "../components/user/AuthModal";
import { Dialog } from "@mui/material";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Ladda användare från localStorage på siduppdatering
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Konvertera tillbaka till objekt
    }
  }, []);

  const login = async (email, password) => {
    const response = await loginUser(email, password);
    if (response?.user_id) {
      const loggedInUser = { id: response.user_id, email }; // Lagra relevant information
      localStorage.setItem("user", JSON.stringify(loggedInUser)); // Lagra hela användarobjektet
      setUser(loggedInUser);
      setAuthModalOpen(false);
    }
    return response;
  };

  const register = async (first_name, last_name, email, password) => {
    const response = await createUser(first_name, last_name, email, password);
    if (response?.user_id) {
      const registeredUser = { id: response.user_id, email };
      localStorage.setItem("user", JSON.stringify(registeredUser));
      setUser(registeredUser);
      setAuthModalOpen(false);
    }
    return response;
  };

  const logout = () => {
    logoutUser();
    localStorage.removeItem("user"); // Ta bort hela användarobjektet
    setUser(null);

    setTimeout(() => {
      window.location.reload(); // Tvinga full omladdning för rent tillstånd
    }, 100);
  };

  const openAuthModal = () => setAuthModalOpen(true);
  const closeAuthModal = () => setAuthModalOpen(false);

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, openAuthModal }}
    >
      {children}

      {/* Inloggningsmodal (kan öppnas var som helst i appen) */}
      <Dialog open={authModalOpen} onClose={closeAuthModal}>
        <AuthModal open={authModalOpen} onClose={closeAuthModal} />
      </Dialog>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
