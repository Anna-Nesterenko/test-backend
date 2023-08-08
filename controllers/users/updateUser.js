const createError = require("http-errors");
const bcrypt = require("bcryptjs");

const { db } = require("../../db");

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

  const hashedPassword = await bcrypt.hash(password, 10);

  // UpdateUser data
  const updatedUser = {
    first_name: first_name || user.first_name,
    last_name: last_name || user.last_name,
    role: role || user.role,
    department_id: department_id || user.department_id,
    position: position || user.position,
    password: hashedPassword || user.password,
  };

  // Update the user in the database
  await db("users").where("id", id).update(updatedUser);

  res.status(200).json({ message: "User updated successfully" });
};

module.exports = updateUser;
