const express = require("express");
const router = express.Router();

const { validation, authenticate, requireAdmin } = require("../../middleware");
const { user, helper } = require("../../models");
const { ctrlWrapper } = require("../../helpers");
const { users: ctrl } = require("../../controllers");

// Get all users with sorting and filtering options.
// This route requires authentication and admin privileges.
/**
 * Example requests:
 * 1. Get all users, sorted by creation date in descending order:
 *    GET /api/users?sortBy=created_at&sortOrder=desc
 *
 * 2. Get users created between 2023-01-01 and 2023-08-31:
 *    GET /api/users?fromDate=2023-01-01&toDate=2023-08-31
 *
 * 3. Get users created after 2023-08-07:
 *    GET /api/users?fromDate=2023-08-07
 *
 * 4. Get users created before 2023-08-09:
 *    GET /api/users?toDate=2023-08-09
 *
 * 5. Get all users without sorting or filtering:
 *    GET /api/users
 */

router.get(
  "/",
  authenticate,
  requireAdmin,
  validation(helper.sortAndFilterSchema),
  ctrlWrapper(ctrl.getAllUsers)
);

// Create a new user by an admin.
// This route requires authentication and admin privileges,
// validates the request body against the createUser schema,
// and then delegates control to the ctrlWrapper function, which includes error handling for the controller.
router.post(
  "/",
  authenticate,
  requireAdmin,
  validation(user.createUserSchema),
  ctrlWrapper(ctrl.addUser)
);

// Update a user by ID.
// This route requires authentication and admin privileges,
// validates the request body against the updateUser schema,
// and then delegates control to the ctrlWrapper function, which includes error handling for the controller.
router.put(
  "/:id",
  authenticate,
  requireAdmin,
  validation(user.updateUserSchema),
  ctrlWrapper(ctrl.updateUser)
);

// Delete a user by ID.
// This route requires authentication and admin privileges,
// and delegates control to the ctrlWrapper function, which includes error handling for the controller.
router.delete("/:id", authenticate, requireAdmin, ctrlWrapper(ctrl.deleteUser));

module.exports = router;
