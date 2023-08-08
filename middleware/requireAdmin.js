const createError = require("http-errors");

const requireAdmin = (req, res, next) => {
  const user = req.user;

  // Check if the user is authenticated and has the role of "admin"
  if (!user || user.role !== "admin") {
    return next(
      createError(403, "Unauthorized: Only admin users can access this route")
    );
  }

  next();
};

module.exports = requireAdmin;
