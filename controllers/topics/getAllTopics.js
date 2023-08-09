const { db } = require("../../db");
const applySortAndFilter = require("../../helpers/queryBuilder");

const getAllTopics = async (req, res) => {
  const { sortBy, sortOrder, fromDate, toDate } = req.query;

  let query = db("topics");

  // Apply sorting and filtering using the query builder helper
  query = applySortAndFilter(
    query,
    "created_at",
    "desc",
    sortBy,
    sortOrder,
    fromDate,
    toDate
  );

  // Execute the query
  const topics = await query;

  res.status(200).json(topics);
};

module.exports = getAllTopics;
