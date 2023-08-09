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
