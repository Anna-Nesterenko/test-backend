const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { db } = require("../db");

dotenv.config();

const { SECRET_KEY } = process.env;

const authenticate = async (req, _, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer" || !token) {
      throw createError(401, `Not authorized`);
    }

    // Verify the token using jwt.verify
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await db("users").where({ id }).first();

    if (!user || user.token !== token) {
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
