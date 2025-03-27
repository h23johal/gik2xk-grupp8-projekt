// Importera express-ramverket
const express = require("express");

// Skapa en ny router-instans från express
const router = express.Router();

// Importera AuthController för att hantera autentiseringslogik
const AuthController = require("../controllers/AuthController");

// Skapa en route för att hantera inloggning via POST-förfrågan
router.post("/login", AuthController.login);

// Skapa en route för att hantera utloggning via POST-förfrågan
router.post("/logout", AuthController.logout);

// Exportera routern så att den kan användas i andra delar av applikationen
module.exports = router;
