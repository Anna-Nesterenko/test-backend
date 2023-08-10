/**
 * Creates a Knex instance based on the specified environment configuration
 * from the "knexfile.js". If no environment is provided, "development" is used.
 * This Knex instance can be used to interact with the database.
 *
 * @module db
 * @type {object}
 */

const knex = require("knex");
const knexFile = require("../knexfile");

const environment = process.env.NODE_ENV || "development";

module.exports = knex(knexFile[environment]);
