// auth.js (routes/api/auth.js)
const express = require("express");
const router = express.Router();

const { validation } = require("../../middleware");
const { schemas } = require("../../models/users");
const { ctrlWrapper } = require("../../helpers");
const { auth: ctrl } = require("../../controllers");

// Define a route for user signup.
// It uses the validation middleware to validate the request body against the signup schema,
// and then passes the control to the ctrlWrapper function, which adds error handling to the controller.
router.post("/", validation(schemas.signupSchema), ctrlWrapper(ctrl.signup));

module.exports = router;
