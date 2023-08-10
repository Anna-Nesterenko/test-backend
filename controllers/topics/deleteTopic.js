const createError = require("http-errors");
const { db } = require("../../db");

/**
 * Deletes a topic from the database based on the provided topic ID.
 * Checks if the topic exists in the database.
 * Deletes the topic from the database.
 * Responds with a successful status and a message indicating successful deletion.
 *
 * @function deleteUser
 * @async
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {string} req.params.id - The ID of the topic to delete.
 * @throws {Error} - Throws an error if the topic does not exist or there's a problem deleting it.
 * @returns {object} - Returns a successful status and a message indicating successful deletion.
 */

const deleteUser = async (req, res) => {
  const { id } = req.params;

  // Check if user exists
  const user = await db("topics").where({ id: id }).first();
  if (!user) {
    throw createError(404, `Topic with id ${id} not found`);
  }

  // Delete the user
  await db("topics").where({ id: id }).del();

  return res.status(200).json({ message: "Topic deleted successfully" });
};

module.exports = deleteUser;
