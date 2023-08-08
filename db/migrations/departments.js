exports.up = function (knex) {
  return knex.schema.createTableIfNotExists("departments", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("departments");
};
