/**
 * Seeds the "departments" table with predefined data if no entries exist.
 * It checks if there are any existing entries in the "departments" table.
 * If no departments exist, it inserts the predefined department data.
 *
 * @function seed
 * @param {object} knex - The Knex instance used for database seeding.
 * @returns {Promise} - Returns a promise representing the seeding operation.
 */

exports.seed = async function (knex) {
  // Check if there are any existing entries in the departments table
  const existingDepartments = await knex("departments").select();

  // Insert data if no departments exist
  if (existingDepartments.length === 0) {
    await knex("departments").insert([
      { id: 101, name: "адміністрація" },
      { id: 102, name: "офіс" },
      { id: 103, name: "IT" },
    ]);
  }
};
