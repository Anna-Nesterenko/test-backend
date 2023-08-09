exports.up = function (knex) {
  return knex.schema
    .createTableIfNotExists("users", (table) => {
      table.increments("id").primary();
      table.string("login").notNullable().unique();
      table.string("password").notNullable();
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.string("role").defaultTo("user").notNullable();
      table.integer("department_id").unsigned().defaultTo(103).notNullable();
      table.string("position");
      table.string("token");
      table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();

      table.foreign("department_id").references("departments.id");
    })

    .createTableIfNotExists(
      "topics",
      (table) => {
        table.increments("id").primary();
        table.string("title").notNullable();
        table.text("text").notNullable();
        table.dateTime("created_at").notNullable();
        table.string("description", 1000);
        table
          .integer("user_id")
          .unsigned()
          .references("users.id")
          .notNullable()
          .onDelete("CASCADE");
      },
      { timestamps: false }
    );
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("topics").dropTableIfExists("users");
};
