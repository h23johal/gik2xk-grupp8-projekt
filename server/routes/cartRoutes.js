const router = require('express').Router();
const validate = require("validate.js");
const cartService = require('../services/cartService');

router.get('/', (req, res) => {
  cartService.getAll().then(result => res.status(result.status).json(result.data));
});

/* router.get('/:id', (req, res) => {
  cartService.getById(req.params.id).then(result => res.status(result.status).json(result.data));
}); */

router.post('/', (req, res) => {
  cartService.create(req.body).then(result => res.status(result.status).json(result.data));
});

router.put('/', (req, res) => {
  cartService.update(req.body).then(result => res.status(result.status).json(result.data));
});

router.delete('/', (req, res) => {
  const id = req.body.id;
  cartService.destroy(id).then(result => res.status(result.status).json(result.data));
});

router.get('/:user_id', (req, res) => {
  cartService.getCart(req.params.user_id)
    .then(result => res.status(result.status).json(result.data));
});

router.post('/addProduct', (req, res) => {
  const { user_id, product_id, amount } = req.body;
  cartService.addToCart(user_id, product_id, amount)
    .then(result => res.status(result.status).json(result.data));
});

router.get('/:id/getCart', (req, res) => {
  cartService.getCart(req.params.id)
    .then(result => res.status(result.status).json(result.data));
});

module.exports = router;
