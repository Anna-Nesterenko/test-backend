const bcrypt = require("bcryptjs");
require("dotenv").config();

const { ADMIN_PASSWORD } = process.env;

exports.seed = async function (knex) {
  // Hash the password for secure storage
  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

  // Create admin user
  await knex("users").insert([
    {
      login: "admin",
      password: hashedPassword,
      first_name: "Admin",
      last_name: "User",
      role: "admin",
    },
  ]);
};
