exports.up = function (knex) {
  return knex.schema.createTableIfNotExists("users", (table) => {
    table.increments("id").primary();
    table.string("login").notNullable().unique();
    table.string("password").notNullable();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("role").defaultTo("user").notNullable();
    table.integer("department_id").unsigned().defaultTo(103).notNullable();
    table.string("position");
    table.string("token");
    table.timestamps(true, true);

    table.foreign("department_id").references("departments.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
