const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { db } = require("../../db");
const { createTokens } = require("../../helpers");

dotenv.config();

const { SECRET_KEY_REFRESH } = process.env;

/**
 * Refreshes the user's access and refresh tokens based on a provided refresh token.
 * Verifies the refresh token using jwt.verify and retrieves the user's ID from it.
 * Fetches the user's information from the database based on the retrieved ID.
 * Checks if the user exists and if the provided refresh token matches the one stored in the database.
 * Generates new access and refresh tokens using the createTokens helper function.
 * Updates the user's access and refresh tokens in the database.
 * Responds with the new access and refresh tokens upon successful token refresh.
 *
 * @function refresh
 * @async
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {object} req.body - The request body containing the refresh token.
 * @param {string} req.body.refresh_token - The refresh token to be verified and refreshed.
 * @throws {Error} - Throws an error if the refresh token is invalid or expired.
 * @returns {object} - Returns the new access and refresh tokens.
 */

const refresh = async (req, res) => {
  const { refresh_token: token } = req.body;
  try {
    // Verify the refresh token using jwt.verify
    const { id } = jwt.verify(token, SECRET_KEY_REFRESH);
    const user = await db("users").where({ id }).first();

    // Check if the user exists and if the provided refresh token matches
    if (!user || user.refresh_token !== token) {
      throw createError(400, `token expired`);
    }

    // Generate new access and refresh tokens
    const { access_token, refresh_token } = await createTokens(user.id);

    // Update the user's access and refresh tokens in the database
    await db("users")
      .where({ id: user.id })
      .update({ access_token, refresh_token });

    // Respond with the new access and refresh tokens
    res.status(200).json({
      access_token,
      refresh_token,
    });
  } catch (error) {
    throw createError(401, error.message);
  }
};

module.exports = refresh;
