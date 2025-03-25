const db = require("../models");
const { createOkObjectSuccess, createResponseError, createResponseMessage } = require("../helpers/responseHelper");

async function getAll() {
  try {
    const products = await db.Product.findAll({ paranoid: false });
    return createOkObjectSuccess(products);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function getById(id) {
  try {
    const product = await db.Product.findByPk(id);
    if (!product) return createResponseError(404, "Produkt ej hittad");
    return createOkObjectSuccess(product);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function restore(id) {
  try {
    const product = await db.Product.findByPk(id, { paranoid: false });
    if (!product) return createResponseError(404, "Produkten hittades inte");
    await product.restore();
    return createResponseMessage(200, "Produkten återställdes");
  } catch (error) {
    return createResponseError(500, error.message);
  }
}

async function create(productData) {
  try {
    const product = await db.Product.create(productData);
    return createOkObjectSuccess(product);
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const message = error.errors.map(e => e.message).join(", ");
      return createResponseError(400, message);
    }
    return createResponseError(500, error.message);
  }
}

async function update(productData) {
  try {
    const product = await db.Product.findByPk(productData.id);
    if (!product) return createResponseError(404, "Produkt ej hittad");

    await product.update(productData); // Triggar validering automatiskt

    return createOkObjectSuccess(product); // eller createResponseMessage om du hellre vill
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const message = error.errors.map(e => e.message).join(", ");
      return createResponseError(400, message);
    }
    return createResponseError(500, error.message);
  }
}

async function destroy(id) {
  try {
    const deleted = await db.Product.destroy({ where: { id } });
    if (!deleted) return createResponseError(404, "Produkt ej hittad");
    return createResponseMessage(200, "Produkten raderades");
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

module.exports = { getAll, getById, create, update, destroy, restore };