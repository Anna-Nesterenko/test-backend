const bcrypt = require("bcryptjs");
const createError = require("http-errors");

const { db } = require("../../db");

/**
 * Adds a new user to the database with provided user details.
 * Checks if the provided login is already in use. If not, hashes the password and creates a new user entry.
 * Responds with a successful status and the ID of the newly inserted user.
 *
 * @function addUser
 * @async
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {string} req.body.login - The login username for the new user.
 * @param {string} req.body.password - The plain password for the new user.
 * @param {string} req.body.first_name - The first name of the new user.
 * @param {string} req.body.last_name - The last name of the new user.
 * @param {string} req.body.role - The role of the new user (default: "user").
 * @param {number} req.body.department_id - The department ID of the new user (default: 103).
 * @param {string} req.body.position - The position of the new user.
 * @throws {Error} - Throws an error if the provided login is already in use.
 * @returns {object} - Returns a successful status and the ID of the newly inserted user.
 */

const addUser = async (req, res) => {
  const {
    login,
    password,
    first_name,
    last_name,
    role,
    department_id,
    position,
  } = req.body;

  // Check if the provided login is already in use
  const user = await db("users").where({ login }).first();
  if (user) {
    throw createError(409, `This ${login} is already in use`);
  }

  // Hash the password for secure storage
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user object with hashed password
  const newUser = {
    login,
    password: hashedPassword,
    first_name,
    last_name,
    role: role || "user",
    department_id: department_id || 103,
    position,
  };

  // Insert the new user into the database and retrieve the inserted ID
  const insertedId = await db("users").insert(newUser);

  res.status(201).json({ id: insertedId[0] });
};

module.exports = addUser;
