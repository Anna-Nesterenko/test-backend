const express = require("express");
const router = express.Router();

const { validation } = require("../../middleware");
const { user } = require("../../schemas");
const { ctrlWrapper } = require("../../helpers");
const { auth: ctrl } = require("../../controllers");

/**
 * Define a route for user login.
 * The route uses the validation middleware to validate the request body against the login schema.
 * It then passes control to the ctrlWrapper function, which adds error handling to the controller.
 *
 * @route POST /api/auth/login
 * @group Authentication
 * @param {object} req.body - The request body containing user login details.
 * @returns {object} - Returns the access token and refresh token upon successful login.
 * @throws {Error} - Throws a 401 Unauthorized error if login credentials are invalid.
 */

router.post("/", validation(user.loginSchema), ctrlWrapper(ctrl.login));

module.exports = router;
