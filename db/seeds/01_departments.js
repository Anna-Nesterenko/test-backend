exports.seed = async function (knex) {
  await knex("departments").insert([
    { id: 101, name: "адміністрація" },
    { id: 102, name: "офіс" },
    { id: 103, name: "IT" },
  ]);
};
