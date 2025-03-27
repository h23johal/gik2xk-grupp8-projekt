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

// AuthModal - En modal för inloggning och registrering av användare.
function AuthModal({ open, onClose }) {
  const { login, register } = useAuth(); // Hämtar autentiseringsfunktioner från AuthContext
  const [isRegister, setIsRegister] = useState(false); // State för att växla mellan inloggning och registrering
  // State för att lagra användarens inmatade data
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  //Hanterar ändringar i inputfält och uppdaterar formData.
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //Hanterar formulärets inlämning för både inloggning och registrering.
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    let response;
    if (isRegister) {
      // Om användaren registrerar sig, skicka alla fält
      response = await register(
        formData.first_name,
        formData.last_name,
        formData.email,
        formData.password
      );
    } else {
      // Om användaren loggar in, skicka endast e-post och lösenord
      response = await login(formData.email, formData.password);
    }

    if (response) {
      onClose(); // Stäng modalen vid lyckad inloggning/registrering
    } else {
      alert("Felaktiga uppgifter. Försök igen!"); // Visa felmeddelande om något går fel
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isRegister ? "Registrera dig" : "Logga in"}</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
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
          <Button variant="contained" type="submit">
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
