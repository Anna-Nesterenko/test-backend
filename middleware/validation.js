/**
 * Middleware function for request validation using a provided schema.
 * @param {Joi.Schema} schema - The Joi schema for request validation.
 * @returns {function} A middleware function.
 */

const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    // If validation fails, set the status and pass the error to the next middleware
    if (error) {
      error.status = 400;
      next(error);
    }

    // If validation succeeds, proceed to the next middleware
    next();
  };
};

module.exports = validation;
