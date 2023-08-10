const createError = require("http-errors");

const { db } = require("../../db");

/**
 * Deletes a user from the database based on the provided user ID.
 * Checks if the user with the given ID exists in the database. If not, throws an error.
 * Deletes the user and responds with a successful status and a message indicating successful deletion.
 *
 * @function deleteUser
 * @async
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {string} req.params.id - The ID of the user to be deleted.
 * @throws {Error} - Throws an error if the user with the provided ID does not exist.
 * @returns {object} - Returns a successful status and a message indicating successful deletion.
 */

const deleteUser = async (req, res) => {
  const { id } = req.params;

  // Check if user exists
  const user = await db("users").where({ id: id }).first();
  if (!user) {
    throw createError(404, `User with id ${id} not found`);
  }

  // Delete the user
  await db("users").where({ id: id }).del();

  return res.status(200).json({ message: "User deleted successfully" });
};

module.exports = deleteUser;
