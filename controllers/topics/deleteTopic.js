const createError = require("http-errors");
const { db } = require("../../db");

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
