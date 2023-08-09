const test = require("../server");

console.log(test);

// This function wraps a controller function with error handling and logging.
const ctrlWrapper = (ctrl) => {
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
