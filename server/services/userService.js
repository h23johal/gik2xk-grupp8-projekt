const db = require("../models");
const { createOkObjectSuccess, createResponseError, createResponseMessage } = require("../helpers/responseHelper");
const bcrypt = require("bcrypt");

// Hämtar alla varukorgar från databasen
async function getAll() {
  try {
    const users = await db.User.findAll();
    return createOkObjectSuccess(users);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

// Hämtar en specifik varukorg baserat på ID
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
    console.log("Mottagen användardata:", user);

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
    console.log(" Användare skapad:", newUser);
    return createOkObjectSuccess(newUser);
  } catch (error) {
    console.error(" Fel vid skapande av användare:", error);
    return createResponseError(500, "Ett serverfel uppstod vid skapande av användare.");
  }
}

//Uppdaterar användare
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
  //Starta en transaktion för att säkerställa att alla operationer lyckas/misslyckas tillsammans
  const transaction = await db.sequelize.transaction();

  try {
    // Anonymisera användarbetyg
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

    // Radera aktiv användarvagn
    await db.Cart.destroy({
      where: { 
        user_id: id
      },
      transaction
    });

    const deleted = await db.User.destroy({ 
      where: { id },
      transaction
    });

    // Kontrollera om användaren togs bort 
    if (!deleted) {
      await transaction.rollback();
      return createResponseError(404, "Användare ej hittad");
    }

    // Genomföra transaktionen
    await transaction.commit();
    return createResponseMessage(200, "Användaren raderades");
  } catch (error) {
    await transaction.rollback();
    return createResponseError(error.status, error.message);
  }
}

module.exports = { getAll, getById, create, update, destroy };
