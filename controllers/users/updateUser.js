const createError = require("http-errors");

const { db } = require("../../db");

const updateUser = async (req, res) => {
  const { login } = req.user;
  console.log(login);
  const { first_name, last_name, role, department_id, position, password } =
    req.body;
  console.log(first_name);
  // Search for user by login
  const user = await db("users").where("login", login).first();

  // Check if the user exists
  if (!user) {
    throw createError(404, `User with login ${login} not found`);
  }

  // UpdateUser data
  const updatedUser = {
    login,
    first_name: first_name || user.first_name,
    last_name: last_name || user.last_name,
    role: role || user.role,
    department_id: department_id || user.department_id,
    position: position || user.position,
    password,
  };

  // Update the user in the database
  await db("users").where("login", login).update(updatedUser);

  res.status(200).json({ message: "User updated successfully" });
};

module.exports = updateUser;
