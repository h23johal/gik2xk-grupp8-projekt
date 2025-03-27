const router = require('express').Router();
const validate = require("validate.js");
const userService = require('../services/userService');
const cartService = require('../services/cartService');

// Hämta alla användare
router.get('/', (req, res) => {
  userService.getAll().then(result => res.status(result.status).json(result.data));
});

// Hämta en specifik användare med angivet id
router.get('/:id', (req, res) => {
  userService.getById(req.params.id).then(result => res.status(result.status).json(result.data));
});

// Skapa en ny användare med data från request body
router.post('/', (req, res) => {
  userService.create(req.body).then(result => res.status(result.status).json(result.data));
});

// Uppdatera en befintlig användare med data från request body
router.put('/', (req, res) => {
  userService.update(req.body).then(result => res.status(result.status).json(result.data));
});

// Ta bort en användare med angivet id från URL-parametern
router.delete('/:id', (req, res) => {
  const id = req.body.id;
  userService.destroy(id).then(result => res.status(result.status).json(result.data));
});

// Hämta varukorgen för en specifik användare med angivet användar-id
router.get('/:id/getCart', (req, res) => {
  cartService.getCart(req.params.id)
    .then(result => res.status(result.status).json(result.data));
});

module.exports = router;
