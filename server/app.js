var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var dotenv = require("dotenv").config();
const cors = require("cors");



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});
app.use(cors({
  origin: "http://localhost:5173",  // Tillåt frontend
  methods: "GET,POST,PUT,DELETE,OPTIONS",  // Tillåt dessa metoder
  allowedHeaders: "Content-Type,Authorization"  // Tillåt dessa headers
}));

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const authRoutes = require("./routes/auth");

app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/cart', cartRoutes);
app.use('/ratings', ratingRoutes);
app.use("/auth", authRoutes);

module.exports = app;
