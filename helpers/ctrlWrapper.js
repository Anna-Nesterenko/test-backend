const test = require("../server");

/**
 * Wrap a controller function with error handling and logging.
 * @param {Function} ctrl - The controller function to be wrapped.
 * @returns {Function} The wrapped controller function with error handling and logging.
 */

const ctrlWrapper = (ctrl) => {
  /**
   * Wrapped controller function with error handling and logging.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   */
  const func = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
      console.log(error);
    }
  };

  return func;
};

module.exports = ctrlWrapper;
