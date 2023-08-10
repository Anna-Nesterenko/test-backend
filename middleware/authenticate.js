const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { db } = require("../db");

/**
 * Middleware function to authenticate a user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function.
 * @throws {Error} If authorization header is missing or token is invalid.
 */

dotenv.config();

const { SECRET_KEY_ACCESS } = process.env;

const authenticate = async (req, _, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, access_token] = authorization.split(" ");

    if (bearer !== "Bearer" || !access_token) {
      throw createError(401, `Not authorized`);
    }
    // Verify the access_token using jwt.verify
    const { id } = jwt.verify(access_token, SECRET_KEY_ACCESS);
    const user = await db("users").where({ id }).first();

    if (!user || !user.access_token || user.access_token !== access_token) {
      throw createError(401, `Not authorized`);
    }

    req.user = user;
    next();
  } catch (error) {
    if (!error.status) {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = authenticate;
