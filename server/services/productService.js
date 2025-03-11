const db = require("../models");
const { createOkObjectSuccess, createResponseError, createResponseMessage } = require("../helpers/responseHelper");

async function getAll() {
  try {
    const products = await db.Product.findAll();
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

async function create(productData) {
  try {
    const product = await db.Product.create(productData);
    return createOkObjectSuccess(product);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function update(productData) {
  try {
    const updated = await db.Product.update(productData, { where: { id: productData.id } });
    if (!updated[0]) return createResponseError(404, "Produkt ej hittad");
    return createResponseMessage(200, "Produkten uppdaterades");
  } catch (error) {
    return createResponseError(error.status, error.message);
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

module.exports = { getAll, getById, create, update, destroy };