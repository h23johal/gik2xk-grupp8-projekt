const db = require("../models");
const { createOkObjectSuccess, createResponseError, createResponseMessage } = require("../helpers/responseHelper");

async function getAll() {
  try {
    const carts = await db.Cart.findAll();
    return createOkObjectSuccess(carts);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function getById(id) {
  try {
    const cart = await db.Cart.findByPk(id);
    if (!cart) return createResponseError(404, "Varukorg ej hittad");
    return createOkObjectSuccess(cart);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function getCart(id) {
  try {
    const cart = await db.Cart.findOne({ 
      where: { id }, 
      include: [{ 
        model: db.CartRow, 
        as: 'rows', 
        include: [{ model: db.Product, as: 'product' }] 
      }] 
    });
    if (!cart) return createResponseError(404, "Varukorg ej hittad");

    const cartItems = cart.rows.map(row => ({
      product_id: row.product.id,
      name: row.product.title,
      price: row.product.price,
      amount: row.amount,
    }));
    return createOkObjectSuccess(cartItems);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function addToCart(user_id, product_id, amount) {
  try {
    const [cart] = await db.Cart.findOrCreate({ where: { user_id } });
    const [cartRow, created] = await db.CartRow.findOrCreate({ 
      where: { cart_id: cart.id, product_id }, 
      defaults: { amount } 
    });

    if (!created) {
      cartRow.amount += amount;
      await cartRow.save();
    }

    return createResponseMessage(200, "Produkten har lagts till i varukorgen");
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function create(cart) {
  try {
    const newCart = await db.Cart.create(cart);
    return createOkObjectSuccess(newCart);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function update(cart) {
  try {
    const updated = await db.Cart.update(cart, { where: { id: cart.id } });
    if (!updated[0]) return createResponseError(404, "Varukorg ej hittad");
    return createResponseMessage(200, "Varukorg uppdaterades");
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function destroy(id) {
  try {
    const deleted = await db.Cart.destroy({ where: { id } });
    if (!deleted) return createResponseError(404, "Varukorg ej hittad");
    return createResponseMessage(200, "Varukorg raderades");
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

module.exports = { getAll, getById, create, update, destroy, getCart, addToCart };
