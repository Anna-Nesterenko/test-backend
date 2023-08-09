const express = require("express");
const router = express.Router();

const { validation, authenticate, requireAdmin } = require("../../middleware");
const { topic, helper } = require("../../models");
const { ctrlWrapper } = require("../../helpers");
const { topics: ctrl } = require("../../controllers");

router.get(
  "/",
  authenticate,
  validation(helper.sortAndFilterSchema),
  ctrlWrapper(ctrl.getAllTopics)
);

router.post(
  "/",
  authenticate,
  requireAdmin,
  validation(topic.createTopicSchema),
  ctrlWrapper(ctrl.addTopic)
);

router.put(
  "/:id",
  authenticate,
  requireAdmin,
  validation(topic.updateTopicSchema),
  ctrlWrapper(ctrl.updateTopic)
);

router.delete(
  "/:id",
  authenticate,
  requireAdmin,
  ctrlWrapper(ctrl.deleteTopic)
);

module.exports = router;
