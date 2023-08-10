const createError = require("http-errors");

/**
 * Apply sorting and filtering to a database query.
 * @param {Object} query - The database query to be modified.
 * @param {string} sortBy - The field by which to sort the results.
 * @param {string} sortOrder - The order (asc or desc) for sorting the results.
 * @param {string} fromDate - The start date for filtering.
 * @param {string} toDate - The end date for filtering.
 * @returns {Object} The modified database query with applied sorting and filtering.
 * @throws {Error} If sortBy is specified without sortOrder, or vice versa.
 * @throws {Error} If fromDate is specified without toDate, or vice versa.
 */

const applySortAndFilter = async (
  query,
  sortBy,
  sortOrder,
  fromDate,
  toDate
) => {
  if ((sortBy && !sortOrder) || (!sortBy && sortOrder)) {
    throw createError(
      400,
      "There must be two parameters (sortBy and sortOrder) for correct sorting"
    );
  }

  if ((fromDate && !toDate) || (!fromDate && toDate)) {
    throw createError(
      400,
      "There must be two parameters (fromDate and toDate) for correct filtering"
    );
  }

  if (fromDate && toDate) {
    query = query.whereBetween("created_at", [fromDate, toDate]);
  }

  if (sortBy && sortOrder) {
    query = query.orderBy(sortBy, sortOrder);
  }

  return query;
};

module.exports = applySortAndFilter;
