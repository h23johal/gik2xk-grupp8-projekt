// Importera nödvändiga moduler
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var dotenv = require("dotenv").config(); // Laddar miljövariabler från .env-fil
const cors = require("cors"); // Importerar CORS för att hantera cross-origin-förfrågningar

// Middleware för loggning av HTTP-förfrågningar
app.use(logger('dev'));

// Middleware för att hantera JSON- och URL-kodade förfrågningar
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware för att hantera cookies
app.use(cookieParser());

// Statiska filer serveras från "public"-mappen
app.use(express.static(path.join(__dirname, 'public')));

// CORS-inställningar för att tillåta förfrågningar från andra domäner
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Tillåter alla domäner att göra förfrågningar
  res.header('Access-Control-Allow-Headers', '*'); // Tillåter alla headers
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Tillåter angivna HTTP-metoder
  next();
});

// CORS-konfiguration för att tillåta förfrågningar från frontend (t.ex. React eller Vue)
app.use(cors({
  origin: "http://localhost:5173", // Tillåten domän (frontend-server)
  methods: "GET,POST,PUT,DELETE,OPTIONS",  // Tillåtna HTTP-metoder
  allowedHeaders: "Content-Type,Authorization"  // Tillåtna headers
}));

// Importera routeshanterare för olika delar av API:et
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const authRoutes = require("./routes/auth");

// Definiera URL-prefix för varje route
app.use('/products', productRoutes); // Hanterar produktrelaterade API-förfrågningar
app.use('/users', userRoutes); // Hanterar användarrelaterade API-förfrågningar
app.use('/cart', cartRoutes); // Hanterar varukorgsrelaterade API-förfrågningar
app.use('/ratings', ratingRoutes); // Hanterar betyg och recensioner
app.use("/auth", authRoutes); // Hanterar autentisering (login, logout, registrering)

// Exporterar appen för att användas av servern
module.exports = app;
