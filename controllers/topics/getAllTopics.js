const { db } = require("../../db");
const applySortAndFilter = require("../../helpers/queryBuilder");

/**
 * Retrieves a list of topics from the database with optional sorting and filtering.
 * Queries the database for topics and applies sorting and filtering options using the query builder helper.
 * Responds with a successful status and an array of retrieved topics.
 *
 * @function getAllTopics
 * @async
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {string} req.query.sortBy - The field to sort topics by (default: "created_at").
 * @param {string} req.query.sortOrder - The sorting order ("asc" or "desc", default: "desc").
 * @param {string} req.query.fromDate - The start date for filtering topics by creation date (optional).
 * @param {string} req.query.toDate - The end date for filtering topics by creation date (optional).
 * @throws {Error} - Throws an error if there's a problem querying the database.
 * @returns {object} - Returns a successful status and an array of retrieved topics.
 */

const getAllTopics = async (req, res) => {
  const { sortBy, sortOrder, fromDate, toDate } = req.query;

  let query = db("topics");

  // Apply sorting and filtering using the query builder helper
  query = applySortAndFilter(query, sortBy, sortOrder, fromDate, toDate);

  // Execute the query
  const topics = await query;

  if (!sortBy || !sortOrder) {
    topics.sort((a, b) => b.created_at - a.created_at);
  }

  res.status(200).json(topics);
};

module.exports = getAllTopics;
