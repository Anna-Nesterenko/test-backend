const express = require("express");
const router = express.Router();

const { authenticate } = require("../../middleware");
const { ctrlWrapper } = require("../../helpers");
const { auth: ctrl } = require("../../controllers");

router.get("/", authenticate, ctrlWrapper(ctrl.logout));

module.exports = router;
