const { db } = require("../../db");

const logout = async (req, res) => {
  const { id } = req.user;

  // Delete user token from the database
  await db("users").where({ id }).update({ token: null });

  res.status(200).json({ message: "Logout success" });
};

module.exports = logout;
