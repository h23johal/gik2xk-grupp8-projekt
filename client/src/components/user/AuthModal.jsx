import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
} from "@mui/material";

function AuthModal({ open, onClose }) {
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    let response;
    if (isRegister) {
      response = await register(
        formData.first_name,
        formData.last_name,
        formData.email,
        formData.password
      );
    } else {
      response = await login(formData.email, formData.password);
    }

    if (response) {
      onClose();
    } else {
      alert("Felaktiga uppgifter. Försök igen!");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isRegister ? "Registrera dig" : "Logga in"}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {isRegister && (
            <>
              <TextField
                label="Förnamn"
                name="first_name"
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Efternamn"
                name="last_name"
                onChange={handleChange}
                fullWidth
              />
            </>
          )}
          <TextField
            label="E-post"
            name="email"
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Lösenord"
            type="password"
            name="password"
            onChange={handleChange}
            fullWidth
          />
          <Button variant="contained" onClick={handleSubmit}>
            {isRegister ? "Registrera" : "Logga in"}
          </Button>
          <Button sx={{ mt: 2 }} onClick={() => setIsRegister(!isRegister)}>
            {isRegister
              ? "Har du redan ett konto? Logga in"
              : "Skapa ett nytt konto"}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default AuthModal;
