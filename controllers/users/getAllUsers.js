const { db } = require("../../db");
const applySortAndFilter = require("../../helpers/queryBuilder");

const getAllUsers = async (req, res) => {
  const { sortBy, sortOrder, fromDate, toDate } = req.query;

  let query = db("users");

  // Apply sorting and filtering using the query builder helper
  query = applySortAndFilter(query, sortBy, sortOrder, fromDate, toDate);

  // Execute the query
  const users = await query;

  res.status(200).json(users);
};

module.exports = getAllUsers;
