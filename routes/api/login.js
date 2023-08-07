const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const createError = require("http-errors");

const { validation } = require("../../middleware");
const { schemas } = require("../../models/users");
const { ctrlWrapper } = require("../../helpers");
const { auth: ctrl } = require("../../controllers");

// Define a route for user login.
// It uses the validation middleware to validate the request body against the login schema,
// and then passes the control to the ctrlWrapper function, which adds error handling to the controller.
router.post("/", validation(schemas.loginSchema), ctrlWrapper(ctrl.login));

module.exports = router;
