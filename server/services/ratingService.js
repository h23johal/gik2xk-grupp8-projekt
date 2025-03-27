const db = require("../models");
const { userHasPurchased } = require("./cartService");
const { createOkObjectSuccess, createResponseError, createResponseMessage } = require("../helpers/responseHelper");

// Hämtar alla ratings från databasen
async function getAll() {
  try {
    const ratings = await db.Rating.findAll();
    return createOkObjectSuccess(ratings);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

//Hämtar ett rating-objekt baserat på dess ID
async function getById(id) {
  try {
    const rating = await db.Rating.findByPk(id);
    if (!rating) return createResponseError(404, "Rating ej hittad");
    return createOkObjectSuccess(rating);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

// Skapar ett nytt rating-objekt i databasen
async function create(rating) {
  try {
    const newRating = await db.Rating.create(rating);
    return createOkObjectSuccess(newRating);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

// Uppdaterar ett rating-objekt baserat på dess id
async function update(rating) {
  try {
    const updated = await db.Rating.update(rating, { where: { id: rating.id } });
    if (!updated[0]) return createResponseError(404, "Rating ej hittad");
    return createResponseMessage(200, "Rating uppdaterades");
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

// Raderar ett rating-objekt med angivet id
async function destroy(id) {
  try {
    const deleted = await db.Rating.destroy({ where: { id } });
    if (!deleted) return createResponseError(404, "Rating ej hittad");
    return createResponseMessage(200, "Rating raderades");
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

// Lägger till en rating för en produkt efter att verifierat att användaren har köpt produkten
async function addRating(product_id, user_id, rating, comment = null, anonymous = false) {
  try {
    const hasPurchased = await userHasPurchased(user_id, product_id);

    if (!hasPurchased) {
      return createResponseError(403, "Du har inte köpt denna produkt");
    }

    const ratingScore = await db.Rating.create({ product_id, user_id, rating, comment, anonymous });
    return createOkObjectSuccess(ratingScore);

  } catch (error) {
    return createResponseError(500, error.message || "Något gick fel vid betygssättning");
  }
}

// Hämtar ratings för en produkt och beräknar medelbetyget
async function getProductRatings(product_id) {
  try {
    const ratings = await db.Rating.findAll({ where: { product_id } });
    const avgScore = ratings.length > 0 
      ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length 
      : 0;
    return createOkObjectSuccess({ ratings, avgScore });
  } catch (error) {
    return createResponseError(error.status || 500, error.message);
  }
}

// Hämtar recensioner (ratings med kommentarer) för en produkt och exporterar rating-funktioner
async function getProductReviews(product_id) {
  try {
    const reviews = await db.Rating.findAll({
      where: {
         product_id,
         comment: { [db.Sequelize.Op.ne]: null },
      },
      include: [{ 
        model: db.User, 
        as: 'user',
        attributes: ['first_name'] 
      }],
      order: [['created_at', 'DESC']]
    });
    
    return createOkObjectSuccess({ reviews });
  } catch (error) {
    return createResponseError(error.status || 500, error.message);
  }
}

module.exports = { getAll, getById, create, update, destroy, addRating, getProductRatings, getProductReviews };
