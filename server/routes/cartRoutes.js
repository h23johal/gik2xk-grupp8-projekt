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

router.put("/updateProduct", async (req, res) => {
    try {
        const response = await cartService.update(req.body);
        res.status(200).json(response);
    } catch (error) {
        console.error("Fel vid uppdatering av varukorg:", error);
        res.status(500).json({ error: "Serverfel vid uppdatering" });
    }
});

router.delete('/removeProduct', async (req, res) => {
  const { cart_id, product_id } = req.body;
  cartService.removeFromCart(cart_id, product_id)
    .then(result => res.status(result.status).json(result.data));
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

router.get("/history/:user_id", async (req, res) => {
  cartService.getOrderHistory(req.params.user_id)
    .then(result => res.status(result.status).json(result.data))
    .catch(error => res.status(500).json({ error: "Server error" }));
});

router.post('/checkout', async (req, res) => {
    const { user_id } = req.body;
    if (!user_id) return res.status(400).json({ error: "User ID saknas" });

    try {
        const result = await cartService.checkoutCart(user_id);
        return res.status(result.status).json(result.data);
    } catch (error) {
        return res.status(500).json({ error: "Serverfel vid checkout" });
    }
});

module.exports = router;
