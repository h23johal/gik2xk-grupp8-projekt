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

async function getCart(user_id) {
    try {
        console.log(`Fetching cart with user_id: ${user_id}`);

        // Hämta den senaste obetalda varukorgen
        let cart = await db.Cart.findOne({ 
            where: { user_id, paid: false }, // Endast obetalda varukorgar
            include: [{ 
                model: db.CartRow, 
                as: 'rows', 
                include: [{ model: db.Product, as: 'product' }] 
            }],
            order: [['createdAt', 'DESC']], // Ifall det finns flera, hämta den senaste
        });

        // Om ingen obetald varukorg finns, skapa en ny
        if (!cart) {
            cart = await db.Cart.create({ user_id, paid: false });
        }

        console.log("Hittade eller skapade varukorg:", cart);

        const cartItems = cart.rows.map(row => ({
            cart_id: cart.id,
            product_id: row.product.id,
            name: row.product.title,
            price: row.product.price,
            amount: row.amount,
            imageUrl: row.product.imageUrl,
        }));

        return createOkObjectSuccess(cartItems);
    } catch (error) {
        console.error("Fel i getCart:", error);
        return createResponseError(error.status || 500, error.message || "Fel vid hämtning av varukorg");
    }
}


async function addToCart(user_id, product_id, amount) {
  try {
    const [cart] = await db.Cart.findOrCreate({
      where: { user_id, paid: false },
      defaults: { user_id, paid: false }
    });

    const [cartRow, created] = await db.CartRow.findOrCreate({ 
      where: { cart_id: cart.id, product_id }, 
      defaults: { amount } 
    });

    if (!created) {
      cartRow.amount = Number(cartRow.amount) + Number(amount);
      await cartRow.save();
    }

    return createResponseMessage(200, "Produkten har lagts till i varukorgen");
  } catch (error) {
    return createResponseError(error.status || 500, error.message || "Ett fel uppstod vid tillägg till varukorg");
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

async function update(cartData) {
  try {
    const { cart_id, product_id, amount } = cartData;

    const updated = await db.CartRow.update(
      { amount }, 
      { where: { cart_id, product_id } }
    );

    if (!updated[0]) return createResponseError(404, "Varukorgsrad ej hittad");

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

async function removeFromCart(cart_id, product_id) {
  try {
    const deleted = await db.CartRow.destroy({
      where: { cart_id, product_id },
    });

    if (!deleted) return createResponseError(404, "Produkten hittades inte i varukorgen");
    
    return createResponseMessage(200, "Produkten togs bort från varukorgen");
  } catch (error) {
    return createResponseError(error.status || 500, error.message);
  }
}

async function checkoutCart(user_id) {
    try {
        // Hämta den senaste obetalda varukorgen
        const cart = await db.Cart.findOne({ 
            where: { user_id, paid: 0 }, // Endast obetalda ordrar
            include: [{ 
                model: db.CartRow, 
                as: 'rows' // Inkludera cart_rows
            }],
            order: [['createdAt', 'DESC']], // Senaste cart först
        });

        // Om ingen obetald varukorg finns, returnera fel
        if (!cart) return createResponseError(404, "Ingen obetald varukorg hittades");

        // Kontrollera att varukorgen faktiskt har produkter
        if (!cart.rows || cart.rows.length === 0) {
            return createResponseError(400, "Kan inte checka ut en tom varukorg");
        }

        // Markera varukorgen som betald
        await db.Cart.update(
            { paid: 1, updated_at: new Date() }, // Sätt `paid` till `1` (true)
            { where: { id: cart.id } }
        );

        return createResponseMessage(200, "Checkout lyckades");
    } catch (error) {
        console.error("Fel vid checkout:", error);
        return createResponseError(500, error.message || "Något gick fel vid checkout");
    }
}



async function getOrderHistory(user_id) {
  try {
    const orders = await db.Cart.findAll({
      where: { user_id, paid: true },
      include: [{ model: db.CartRow, as: "rows", include: [{ model: db.Product, as: "product", paranoid: false, }] }],
      order: [["updatedAt", "DESC"]],
    });

    return createOkObjectSuccess(orders);
  } catch (error) {
    return createResponseError(500, "Kunde inte hämta orderhistorik");
  }
}

async function userHasPurchased(user_id, product_id) {
  try {
    const result = await db.Cart.findOne({
      where: { user_id, paid: true },
      include: [
        {
          model: db.CartRow,
          as: "rows",
          where: { product_id },
        },
      ],
    });

    return !!result; // true = produkt hittad i köpt cart
  } catch (error) {
    console.error("Fel i userHasPurchased:", error);
    return false;
  }
}


module.exports = { getAll, getById, create, update, destroy, getCart, addToCart, removeFromCart, checkoutCart, getOrderHistory, userHasPurchased };
