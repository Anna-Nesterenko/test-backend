const express = require("express");
const router = express.Router();

const { validation, authenticate, requireAdmin } = require("../../middleware");
const { user, helper } = require("../../schemas");
const { ctrlWrapper } = require("../../helpers");
const { users: ctrl } = require("../../controllers");

/**
 * Define a route to get a list of users with sorting and filtering options.
 * The route handles GET requests at the root path ("/api/users").
 * Authentication is required using the authenticate middleware.
 * Admin privileges are required using the requireAdmin middleware.
 * Sorting and filtering parameters can be provided as query parameters.
 * The sortBy parameter specifies the field to sort by ("created_at").
 * The sortOrder parameter specifies the sorting order ("asc" or "desc").
 * The fromDate and toDate parameters specify the date range for filtering by creation date.
 * If no sorting or filtering parameters are provided, the endpoint returns a list of users in ascending order.
 *
 * @route GET /api/users
 * @route GET /api/users?sortBy=created_at&sortOrder=desc&fromDate=2023-01-01&toDate=2024-08-31
 * @route GET /api/users?fromDate=2023-01-01&toDate=2023-08-31
 * @route GET /api/users?sortBy=created_at&sortOrder=desc
 * @route GET /api/users?sortBy=created_at&sortOrder=asc
 * @group Users
 * @param {string} req.query.sortBy - The field to sort by ("created_at").
 * @param {string} req.query.sortOrder - The sorting order ("asc" or "desc").
 * @param {string} req.query.fromDate - The start date for filtering by creation date.
 * @param {string} req.query.toDate - The end date for filtering by creation date.
 * @returns {Array} - Returns an array of users.
 */

router.get(
  "/",
  authenticate,
  requireAdmin,
  validation(helper.sortAndFilterSchema),
  ctrlWrapper(ctrl.getAllUsers)
);

/**
 * Define a route to create a new user by an admin.
 * The route handles POST requests at the root path ("/api/users").
 * Authentication and admin privileges are required using the authenticate and requireAdmin middleware.
 * The request body is validated against the createUserSchema using the validation middleware.
 * The ctrl.addUser controller method is wrapped with ctrlWrapper for error handling.
 *
 * @route POST /api/users
 * @group Users
 * @param {object} req.body - The request body containing user details.
 * @returns {object} - Returns the ID of the newly created user.
 */
router.post(
  "/",
  authenticate,
  requireAdmin,
  validation(user.createUserSchema),
  ctrlWrapper(ctrl.addUser)
);

/**
 * Define a route to update a user by ID.
 * The route handles PUT requests at the path with an ID parameter ("/:id").
 * Authentication and admin privileges are required using the authenticate and requireAdmin middleware.
 * The request body is validated against the updateUserSchema using the validation middleware.
 * The ctrl.updateUser controller method is wrapped with ctrlWrapper for error handling.
 *
 * @route PUT /api/users/:id
 * @group Users
 * @param {string} req.params.id - The ID of the user to update.
 * @param {object} req.body - The request body containing updated user details.
 * @returns {object} - Returns the ID of the updated user.
 */

router.put(
  "/:id",
  authenticate,
  requireAdmin,
  validation(user.updateUserSchema),
  ctrlWrapper(ctrl.updateUser)
);

/**
 * Define a route to delete a user by ID.
 * The route handles DELETE requests at the path with an ID parameter ("/:id").
 * Authentication and admin privileges are required using the authenticate and requireAdmin middleware.
 * The ctrl.deleteUser controller method is wrapped with ctrlWrapper for error handling.
 *
 * @route DELETE /api/users/:id
 * @group Users
 * @param {string} req.params.id - The ID of the user to delete.
 * @returns {object} - Returns a message confirming the deletion.
 */

router.delete("/:id", authenticate, requireAdmin, ctrlWrapper(ctrl.deleteUser));

module.exports = router;
