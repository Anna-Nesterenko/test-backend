const createError = require("http-errors");

const { db } = require("../../db");

const deleteUser = async (req, res) => {
  const { id } = req.params;

  // Check if user exists
  const user = await db("users").where({ id: id }).first();
  if (!user) {
    throw createError(404, `User with id=${id} not found`);
  }

  // Delete the user
  await db("users").where({ id: id }).del();

  return res.status(200).json({ message: "User deleted successfully" });
};

module.exports = deleteUser;
