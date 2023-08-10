const { db } = require("../../db");
const applySortAndFilter = require("../../helpers/queryBuilder");

/**
 * Retrieves a list of users from the database with optional sorting and filtering.
 * Applies sorting and filtering to the user data based on provided query parameters.
 *
 * @function getAllUsers
 * @async
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {string} req.query.sortBy - The field to sort by ("created_at").
 * @param {string} req.query.sortOrder - The sorting order ("asc" or "desc").
 * @param {string} req.query.fromDate - The start date for filtering by creation date.
 * @param {string} req.query.toDate - The end date for filtering by creation date.
 * @returns {Array} - Returns an array of user objects with optional sorting and filtering applied.
 */

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
