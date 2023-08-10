const bcrypt = require("bcryptjs");
require("dotenv").config();

const { ADMIN_PASSWORD } = process.env;

/**
 * Seeds the "users" table with an admin user if no entries exist.
 * It hashes the admin password using bcrypt for secure storage,
 * checks if there are any existing entries in the "users" table,
 * and inserts the admin user data if no users exist.
 *
 * @function seed
 * @param {object} knex - The Knex instance used for database seeding.
 * @returns {Promise} - Returns a promise representing the seeding operation.
 */

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
        last_name: "First",
        role: "admin",
      },
    ]);
  }
};
