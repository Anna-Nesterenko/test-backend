const Joi = require("joi");

/**
 * Joi schema for sorting and filtering data.
 * Specifies the shape and validation rules for sorting and filtering parameters.
 *
 * @property {string} [sortBy] - The field to sort by (e.g., "created_at").
 * @property {string} [sortOrder] - The sorting order ("asc" or "desc").
 * @property {string} [fromDate] - The start date for filtering by creation date (e.g., "YYYY-MM-DD").
 * @property {string} [toDate] - The end date for filtering by creation date (e.g., "YYYY-MM-DD").
 */

const sortAndFilterSchema = Joi.object({
  sortBy: Joi.string().valid("created_at"),
  sortOrder: Joi.string().valid("asc", "desc"),
  fromDate: Joi.date().iso().example("YYYY-MM-DD"),
  toDate: Joi.date().iso().example("YYYY-MM-DD"),
});

module.exports = {
  sortAndFilterSchema,
};
