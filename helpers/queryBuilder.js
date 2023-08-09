const createError = require("http-errors");

const applySortAndFilter = async (
  query,
  sortBy,
  sortOrder,
  fromDate,
  toDate
) => {
  // Check if sortBy is specified without sortOrder or vice versa
  if ((sortBy && !sortOrder) || (!sortBy && sortOrder)) {
    throw createError(
      400,
      `Має бути два параметра ("sortBy" i "sortOrder") для коректного сортування`
    );
  }

  if ((fromDate && !toDate) || (!fromDate && toDate)) {
    throw createError(
      400,
      `ає бути два параметра ("fromDate" i "toDate") для коректної фільтрації`
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
