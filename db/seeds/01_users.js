const bcrypt = require("bcryptjs");
require("dotenv").config();

const { ADMIN_PASSWORD } = process.env;

exports.seed = async function (knex) {
  // Hash the password for secure storage
  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

  // Check if there are any existing entries in the users table
  const existingUsers = await knex("users").select();

  // Insert data if no users exist
  if (existingUsers.length === 0) {
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
  }
};
