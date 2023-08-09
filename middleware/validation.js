// Middleware for request validation
const validation = (schema) => {
  return (req, res, next) => {
    // Validate the request body using the provided schema
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
