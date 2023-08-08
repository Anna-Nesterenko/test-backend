const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const { db } = require("../../db");

dotenv.config();

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { login, password } = req.body;

  // Fetch user information from the database based on the provided login
  const user = await db("users").where({ login }).first();

  // Compare the provided password with the hashed password stored in the database
  const isPasswordValid = await bcrypt.compare(password, user.password);

  // Check if user exists and if the provided password is valid
  if (!user || !isPasswordValid) {
    throw createError(401, "Login or password are wrong");
  }

  // Create a payload containing user's id and user's role for the JWT
  const payload = { id: user.id, role: user.role };

  // Generate a JSON Web Token using the payload and the secret key
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

  await db("users").where({ id: user.id }).update({ token });

  res.status(200).json({ id: user.id, token: token });
};

module.exports = login;
