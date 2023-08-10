const { db } = require("../../db");

/**
 * Log out a user by deleting their access and refresh tokens from the database.
 * Retrieves the user's ID from the authenticated request object.
 * Updates the user's access and refresh tokens in the database to empty values.
 * Responds with a success message upon successful logout.
 *
 * @function logout
 * @async
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {object} req.user - The authenticated user object from the request.
 * @param {number} req.user.id - The ID of the logged-in user.
 * @returns {object} - Returns a success message indicating successful logout.
 */

const logout = async (req, res) => {
  const { id } = req.user;

  // Delete user token from the database
  await db("users")
    .where({ id })
    .update({ access_token: "", refresh_token: "" });

  res.status(200).json({ message: "Logout success" });
};

module.exports = logout;
