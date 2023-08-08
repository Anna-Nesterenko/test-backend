// auth.js (routes/api/auth.js)
const express = require("express");
const router = express.Router();

const { validation, authenticate, requireAdmin } = require("../../middleware");
const { schemas } = require("../../models/user");
const { ctrlWrapper } = require("../../helpers");
const { users: ctrl } = require("../../controllers");

// Define a route for user creation by an admin.
// This route requires authentication, ensures only admin users can access it,
// validates the request body against the user schema,
// and then delegates control to the ctrlWrapper function, which includes error handling for the controller.
router.post(
  "/",
  authenticate,
  requireAdmin,
  validation(schemas.createUserSchema),
  ctrlWrapper(ctrl.addUser)
);

router.put(
  "/:id",
  authenticate,
  requireAdmin,
  validation(schemas.updateUserSchema),
  ctrlWrapper(ctrl.updateUser)
);

router.delete("/:id", authenticate, requireAdmin, ctrlWrapper(ctrl.deleteUser));

module.exports = router;
