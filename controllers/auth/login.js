const bcrypt = require("bcryptjs");
const createError = require("http-errors");

const { db } = require("../../db");
const { createTokens } = require("../../helpers");

/**
 * Log in a user with the provided credentials.
 * Fetches user information from the database based on the provided login.
 * Compares the provided password with the hashed password stored in the database.
 * Generates access and refresh tokens for the authenticated user.
 * Updates the user's access and refresh tokens in the database.
 * Responds with user information and tokens upon successful login.
 *
 * @function login
 * @async
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {string} req.body.login - The user's login username.
 * @param {string} req.body.password - The user's password.
 * @throws {Error} - If the provided login or password are incorrect.
 * @returns {object} - Returns user information and generated tokens.
 */

const login = async (req, res) => {
  const { login, password } = req.body;
  console.log(login);
  // Fetch user information from the database based on the provided login
  const user = await db("users").where({ login }).first();

  // Check if user exists
  if (!user) {
    throw createError(401, "Login or password are wrong");
  }

  // Compare the provided password with the hashed password stored in the database
  const isPasswordValid = await bcrypt.compare(password, user.password);

  // Check if the provided password is valid
  if (!isPasswordValid) {
    throw createError(401, "Login or password are wrong");
  }

  const { access_token, refresh_token } = await createTokens(user.id);

  await db("users")
    .where({ id: user.id })
    .update({ access_token, refresh_token });

  res.status(200).json({
    id: user.id,
    access_token,
    refresh_token,
  });
};

module.exports = login;
