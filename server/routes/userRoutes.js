const router = require('express').Router();
const validate = require("validate.js");
const userService = require('../services/userService');
const cartService = require('../services/cartService');

router.get('/', (req, res) => {
  userService.getAll().then(result => res.status(result.status).json(result.data));
});

router.get('/:id', (req, res) => {
  userService.getById(req.params.id).then(result => res.status(result.status).json(result.data));
});

router.post('/', (req, res) => {
  userService.create(req.body).then(result => res.status(result.status).json(result.data));
});

router.put('/', (req, res) => {
  userService.update(req.body).then(result => res.status(result.status).json(result.data));
});

router.delete('/:id', (req, res) => {
  const id = req.body.id;
  userService.destroy(id).then(result => res.status(result.status).json(result.data));
});

router.get('/:id/getCart', (req, res) => {
  cartService.getCart(req.params.id)
    .then(result => res.status(result.status).json(result.data));
});

module.exports = router;
