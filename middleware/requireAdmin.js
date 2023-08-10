const createError = require("http-errors");

/**
 * Middleware function to require admin privileges.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function.
 * @throws {Error} If user is not authenticated or does not have admin role.
 */

const requireAdmin = (req, res, next) => {
  const user = req.user;

  // Check if the user is authenticated and has the role of "admin"
  if (!user || user.role !== "admin") {
    return next(
      createError(403, "Unauthorized: Only admin users can access this route")
    );
  }
  // If user is authenticated and has admin role, proceed to the next middleware
  next();
};

module.exports = requireAdmin;
