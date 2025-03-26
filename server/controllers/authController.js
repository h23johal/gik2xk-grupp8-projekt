const db = require("../models");
const bcrypt = require("bcryptjs"); // För att hasha lösenord
const jwt = require("jsonwebtoken"); // För att generera en token
const { createOkObjectSuccess, createResponseError } = require("../helpers/responseHelper");

// 🔹 Login: Validera användare och generera JWT-token
async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await db.User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: "Fel e-post eller lösenord" });

    // 🔹 Jämför lösenord
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Fel e-post eller lösenord" });

    // 🔹 Skapa en JWT-token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "24h" });

    return res.status(200).json({ user_id: user.id, token });
  } catch (error) {
    return res.status(500).json({ error: "Serverfel vid inloggning" });
  }
}

// 🔹 Logout (frontend tar bort token, inget backend behövs)
function logout(req, res) {
  return res.status(200).json({ message: "Utloggning lyckades" });
}

module.exports = { login, logout };
