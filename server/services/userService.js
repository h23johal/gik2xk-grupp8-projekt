const db = require("../models");
const { createOkObjectSuccess, createResponseError, createResponseMessage } = require("../helpers/responseHelper");
const bcrypt = require("bcrypt");

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
    console.log("Mottagen användardata:", user); // 🔹 Logga inkommande data

    // Kolla om alla nödvändiga fält finns
    if (!user.first_name || !user.last_name || !user.email || !user.password) {
      console.error("Saknade fält i användardata");
      return createResponseError(400, "Alla fält måste vara ifyllda");
    }

    // Hasha lösenordet
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    // Skapa användare
    const newUser = await db.User.create(user);
    console.log("✅ Användare skapad:", newUser); // 🔹 Logga skapad användare
    return createOkObjectSuccess(newUser);
  } catch (error) {
    console.error("🔴 Fel vid skapande av användare:", error); // 🔹 Logga backend-felet
    return createResponseError(500, "Ett serverfel uppstod vid skapande av användare.");
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
  //start a transaction to ensure all operations succeed or fail together
  const transaction = await db.sequelize.transaction();

  try {
    //anonymize user ratings
    await db.Rating.update(
      {
        user_id: null,
        anonymous: true
      },
      {
        where: { user_id: id },
        transaction      
      }
    );

    //delete active user cart
    await db.Cart.destroy({
      where: { 
        user_id: id
      },
      transaction
    });

    //delete user
    const deleted = await db.User.destroy({ 
      where: { id },
      transaction
    });

    //check if user was deleted (if faulty or concurrent requests mess this up)
    if (!deleted) {
      await transaction.rollback();
      return createResponseError(404, "Användare ej hittad");
    }

    //commit the transaction
    await transaction.commit();
    return createResponseMessage(200, "Användaren raderades");
  } catch (error) {
    //if an error occurs, rollback the transaction
    await transaction.rollback();
    return createResponseError(error.status, error.message);
  }
}

module.exports = { getAll, getById, create, update, destroy };
