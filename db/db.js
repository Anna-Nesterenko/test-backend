// const dotenv = require("dotenv");

// dotenv.config();

// const { PORT_DB, DB_USER, DB_NAME } = process.env;

// // Import the knex module and establish a database connection
// const db = require("knex")({
//   client: "mysql",
//   connection: {
//     host: "localhost",
//     port: PORT_DB,
//     user: DB_USER,
//     database: DB_NAME,
//   },
// });

// module.exports = db;
const knex = require("knex");
const knexFile = require("../knexfile");

const environment = process.env.NODE_ENV || "development";

module.exports = knex(knexFile[environment]);
