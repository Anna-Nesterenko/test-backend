const createError = require("http-errors");
const bcrypt = require("bcryptjs");

const { db } = require("../../db");

/**
 * Updates a user's information in the database.
 * Retrieves user data based on the provided ID, updates the specified fields,
 * and stores the updated information back in the database.
 *
 * @function updateUser
 * @async
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {string} req.params.id - The ID of the user to update.
 * @param {string} req.body.first_name - The updated first name of the user.
 * @param {string} req.body.last_name - The updated last name of the user.
 * @param {string} req.body.role - The updated role of the user ("admin" or "user").
 * @param {number} req.body.department_id - The updated department ID of the user.
 * @param {string} req.body.position - The updated position of the user.
 * @param {string} req.body.password - The updated password of the user.
 * @returns {object} - Returns a message confirming the successful update.
 */

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, role, department_id, position, password } =
    req.body;

  // Search for user by id
  const user = await db("users").where("id", id).first();

  // Check if the user exists
  if (!user) {
    throw createError(404, `User with id ${id} not found`);
  }

  const updatedUser = {
    first_name: first_name || user.first_name,
    last_name: last_name || user.last_name,
    role: role || user.role,
    department_id: department_id || user.department_id,
    position: position || user.position,
  };

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    updatedUser.password = hashedPassword;
  }

  // Update the user in the database
  await db("users").where("id", id).update(updatedUser);

  res.status(200).json({ message: "User updated successfully" });
};

module.exports = updateUser;
