import React, { createContext, useContext, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

// Skapar en kontext för att hantera Snackbar-meddelanden
const SnackbarContext = createContext();


// SnackbarProvider - Tillhandahåller en global Snackbar för att visa meddelanden.
// Används för att visa notifikationer i hela applikationen.
 
export const SnackbarProvider = ({ children }) => {
  // State för att hantera om Snackbar är öppen eller inte
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  // State för att lagra Snackbar-meddelandet
  const [snackbarMessage, setSnackbarMessage] = useState("");
  // State för att ange vilken typ av meddelande det är (success, error, warning, info)
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // success, error, warning, info
//Funktion för att visa Snackbar med ett meddelande och en viss typ (severity).
  const showSnackbar = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  return (
    // Tillhandahåller funktionen `showSnackbar` till resten av applikationen
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

//Hook för att använda `showSnackbar` i andra komponenter.
//Exempel: const { showSnackbar } = useSnackbar();
export const useSnackbar = () => useContext(SnackbarContext);
