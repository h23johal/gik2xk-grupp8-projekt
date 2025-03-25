const router = require('express').Router();
const validate = require("validate.js");
const ratingService = require('../services/ratingService');
const { userHasPurchased } = require("../services/cartService");

router.get('/', (req, res) => {
  ratingService.getAll().then(result => res.status(result.status).json(result.data));
});

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

router.get('/products/:productId/ratings', (req, res) => {
  ratingService.getProductRatings(req.params.productId)
    .then(result => res.status(result.status).json(result.data));
});

router.get('/products/:productId/ratings/:ratingId', (req, res) => {
  ratingService.getProductRatingById(req.params.productId, req.params.ratingId)
    .then(result => res.status(result.status).json(result.data));
});

router.get('/products/:productId/reviews', (req, res) => {
  ratingService.getProductReviews(req.params.productId)
    .then(result => res.status(result.status).json(result.data));
});

router.get('/products/:productId/reviews/:reviewId', (req, res) => {
  ratingService.getProductReviewById(req.params.productId, req.params.reviewId)
    .then(result => res.status(result.status).json(result.data));
});

router.post('/products/:productId/addRating', (req, res) => {
  const { user_id, rating, comment, anonymous } = req.body;
  ratingService
    .addRating(req.params.productId, user_id, rating, comment, anonymous)
    .then(result => res.status(result.status).json(result.data));
});

router.get('/products/:productId/can-rate', async (req, res) => {
  const { productId } = req.params;
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "userId saknas i query." });
  }

  const canRate = await userHasPurchased(userId, productId);
  return res.status(200).json({ canRate });
});

module.exports = router;

