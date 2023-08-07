// db-init.js
const bcrypt = require("bcryptjs");
const db = require("./db");
const dotenv = require("dotenv");

dotenv.config();

const { ADMIN_PASSWORD } = process.env;

const createAdmin = async () => {
  try {
    // Create an object representing the admin user's details
    const admin = {
      login: "admin",
      password: await bcrypt.hash(ADMIN_PASSWORD, 10),
      first_name: "Admin",
      last_name: "User",
      role: "admin",
    };

    // Insert or update the admin user's details into the 'users' table
    await db.raw(
      `
      INSERT INTO users (login, password, first_name, last_name, role)
      VALUES (:login, :password, :first_name, :last_name, :role)
      ON DUPLICATE KEY UPDATE login=login
    `,
      admin
    );
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
};

module.exports = createAdmin;
