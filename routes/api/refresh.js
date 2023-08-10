const express = require("express");
const router = express.Router();

const { validation } = require("../../middleware");
const { token } = require("../../schemas");
const { ctrlWrapper } = require("../../helpers");
const { auth: ctrl } = require("../../controllers");

/**
 * Define a route for refreshing tokens.
 * The route handles POST requests at the root path ("/").
 * It uses the validation middleware to validate the request body against the refresh token schema.
 * The ctrl.refresh controller method is wrapped with ctrlWrapper for error handling.
 *
 * @route POST /api/auth/refresh
 * @group Authentication
 * @param {object} req.body - The request body containing the refresh token.
 * @returns {object} - Returns new access and refresh tokens.
 * @throws {Error} - Throws a 401 Unauthorized error if refresh token is invalid or expired.
 */

router.post("/", validation(token.refreshSchema), ctrlWrapper(ctrl.refresh));

module.exports = router;
