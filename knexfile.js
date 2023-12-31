/**
 * Configuration for database connections using the Knex.js library.
 * Retrieves environment-specific values from environment variables using dotenv.
 *
 * @module knexfile
 * @type {object}
 */

require("dotenv").config();

const { PORT_DB, DB_USER, DB_NAME } = process.env;

module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: "localhost",
      port: PORT_DB,
      user: DB_USER,
      database: DB_NAME,
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
};
