const router = require('express').Router();
const validate = require("validate.js");
const ratingService = require('../services/ratingService');

router.get('/', (req, res) => {
  ratingService.getAll().then(result => res.status(result.status).json(result.data));
});

/* router.get('/:id', (req, res) => {
  ratingService.getById(req.params.id).then(result => res.status(result.status).json(result.data));
}); */

router.post('/', (req, res) => {
  ratingService.create(req.body).then(result => res.status(result.status).json(result.data));
});

router.put('/', (req, res) => {
  ratingService.update(req.body).then(result => res.status(result.status).json(result.data));
});

router.delete('/', (req, res) => {
  const id = req.body.id;
  ratingService.destroy(id).then(result => res.status(result.status).json(result.data));
});

router.post('/add', (req, res) => {
  const { product_id, user_id, rating } = req.body;
  ratingService.addRating(product_id, user_id, rating)
    .then(result => res.status(result.status).json(result.data));
});

router.get('/:product_id', (req, res) => {
  ratingService.getProductRatings(req.params.product_id)
    .then(result => res.status(result.status).json(result.data));
});

module.exports = router;

