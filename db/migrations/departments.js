/**
 * Creates a new database table named "departments" if it does not exist.
 * The table includes an "id" column as the primary key and a "name" column,
 * which stores the name of the department.
 *
 * @function up
 * @param {object} knex - The Knex instance used for database migration.
 * @returns {Promise} - Returns a promise representing the table creation operation.
 */

exports.up = function (knex) {
  return knex.schema.createTableIfNotExists("departments", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
  });
};

/**
 * Drops the "departments" table if it exists.
 *
 * @function down
 * @param {object} knex - The Knex instance used for database migration.
 * @returns {Promise} - Returns a promise representing the table deletion operation.
 */

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("departments");
};
