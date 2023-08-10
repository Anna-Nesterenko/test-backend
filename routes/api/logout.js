const express = require("express");
const router = express.Router();

const { authenticate } = require("../../middleware");
const { ctrlWrapper } = require("../../helpers");
const { auth: ctrl } = require("../../controllers");

/**
 * Define a route for user logout.
 * The route handles GET requests at the root path ("/").
 * It requires authentication using the authenticate middleware.
 * The route uses the ctrl.logout controller method wrapped with ctrlWrapper for error handling.
 *
 * @route GET /api/auth/logout
 * @group Authentication
 * @returns {object} - Returns a message indicating successful logout.
 * @throws {Error} - Throws a 401 Unauthorized error if user is not authenticated.
 */

router.get("/", authenticate, ctrlWrapper(ctrl.logout));

module.exports = router;
