const router = require("express").Router();
const validate = require("validate.js");
const db = require("../models");
const productService = require("../services/productService");

// Hämta alla produkter
router.get('/', (req, res) => {
  productService.getAll().then(result => {
    res.status(result.status).json(result.data);
  });
});

// Hämta produkt med id
router.get('/:id', (req, res) => {
  productService.getById(req.params.id).then(result => {
    res.status(result.status).json(result.data);
  });
});

// Skapa produkt
router.post('/', (req, res) => {
  productService.create(req.body).then(result => {
    res.status(result.status).json(result.data);
  });
});

// Uppdatera produkt
router.put('/', (req, res) => {
  const product = req.body;
  productService.update(product).then(result => {
    res.status(result.status).json(result.data);
  });
});

// Radera produkt
router.delete('/', (req, res) => {
  const id = req.body.id;
  productService.destroy(id).then(result => {
    res.status(result.status).json(result.data);
  });
});

router.post('/:id/addRating', (req, res) => {
  const { user_id, score } = req.body;
  ratingService.addRating(req.params.id, user_id, score)
    .then(result => res.status(result.status).json(result.data));
});

router.put('/:id/restore', (req, res) => {
  productService.restore(req.params.id).then(result => {
    res.status(result.status).json(result.data);
  });
});

module.exports = router;
