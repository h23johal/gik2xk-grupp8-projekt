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

// AuthModal - A modal for user login and registration.
function AuthModal({ open, onClose }) {
  const { login, register } = useAuth(); // Retrieves authentication functions from AuthContext
  const [isRegister, setIsRegister] = useState(false); // State to toggle between login and registration
  // State to store the user's input data
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  // Handles changes in input fields and updates formData.
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // Handles form submission for both login and registration.
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    let response;
    if (isRegister) {
      // If the user is registering, send all fields
      response = await register(
        formData.first_name,
        formData.last_name,
        formData.email,
        formData.password
      );
    } else {
      // If the user is logging in, send only email and password
      response = await login(formData.email, formData.password);
    }

    if (response) {
      onClose(); // Close the modal upon successful login/registration
    } else {
      alert("Incorrect details. Please try again!"); // Display error message if something goes wrong
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isRegister ? "Register" : "Log In"}</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          {isRegister && (
            <>
              <TextField
                label="First Name"
                name="first_name"
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Last Name"
                name="last_name"
                onChange={handleChange}
                fullWidth
              />
            </>
          )}
          <TextField
            label="Email"
            name="email"
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            onChange={handleChange}
            fullWidth
          />
          <Button variant="contained" type="submit">
            {isRegister ? "Register" : "Log In"}
          </Button>
          <Button sx={{ mt: 2 }} onClick={() => setIsRegister(!isRegister)}>
            {isRegister
              ? "Already have an account? Log In"
              : "Create a new account"}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default AuthModal;
