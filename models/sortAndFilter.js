const Joi = require("joi");

// Define the schema for sorting and filtering user and topics data
const sortAndFilterSchema = Joi.object({
  sortBy: Joi.string().valid("created_at"),
  sortOrder: Joi.string().valid("asc", "desc"),
  fromDate: Joi.date().iso().example("YYYY-MM-DD"),
  toDate: Joi.date().iso().example("YYYY-MM-DD"),
});

module.exports = {
  sortAndFilterSchema,
};
