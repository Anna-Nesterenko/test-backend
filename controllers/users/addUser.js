const bcrypt = require("bcryptjs");
const createError = require("http-errors");

const { db } = require("../../db");

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
    department_id: department_id || 102,
    position,
  };

  // Insert the new user into the database and retrieve the inserted ID
  const insertedIds = await db("users").insert(newUser);

  res.status(201).json({ id: insertedIds[0] });
};

module.exports = addUser;
