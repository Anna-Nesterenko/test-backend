const express = require("express");
const router = express.Router();

const { validation } = require("../../middleware");
const { user } = require("../../models");
const { ctrlWrapper } = require("../../helpers");
const { auth: ctrl } = require("../../controllers");

// Define a route for user login.
// It uses the validation middleware to validate the request body against the login schema,
// and then passes the control to the ctrlWrapper function, which adds error handling to the controller.
router.post("/", validation(user.loginSchema), ctrlWrapper(ctrl.login));

module.exports = router;
