const db = require("../models");
const { createOkObjectSuccess, createResponseError, createResponseMessage } = require("../helpers/responseHelper");

async function getAll() {
  try {
    const users = await db.User.findAll();
    return createOkObjectSuccess(users);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function getById(id) {
  try {
    const user = await db.User.findByPk(id);
    if (!user) return createResponseError(404, "Användare ej hittad");
    return createOkObjectSuccess(user);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function create(user) {
  try {
    const newUser = await db.User.create(user);
    return createOkObjectSuccess(newUser);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function update(user) {
  try {
    const updated = await db.User.update(user, { where: { id: user.id } });
    if (!updated[0]) return createResponseError(404, "Användare ej hittad");
    return createResponseMessage(200, "Användaren uppdaterades");
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function destroy(id) {
  try {
    const deleted = await db.User.destroy({ where: { id } });
    if (!deleted) return createResponseError(404, "Användare ej hittad");
    return createResponseMessage(200, "Användaren raderades");
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

module.exports = { getAll, getById, create, update, destroy };
