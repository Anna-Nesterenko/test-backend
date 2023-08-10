const express = require("express");
const router = express.Router();

const { validation, authenticate, requireAdmin } = require("../../middleware");
const { topic, helper } = require("../../schemas");
const { ctrlWrapper } = require("../../helpers");
const { topics: ctrl } = require("../../controllers");

/**
 * Define a route to get a list of topics.
 * The route handles GET requests at the root path ("/api/topics").
 * Authentication is required using the authenticate middleware.
 * Sorting and filtering parameters can be provided as query parameters.
 * The sortBy parameter specifies the field to sort by ("created_at").
 * The sortOrder parameter specifies the sorting order ("asc" or "desc").
 * The fromDate and toDate parameters specify the date range for filtering by creation date.
 * If no sorting or filtering parameters are provided, the endpoint returns a list of topics in descending order.
 *
 * @route GET /api/topics
 * @route GET /api/topics?sortBy=created_at&sortOrder=desc&fromDate=2023-01-01&toDate=2024-08-31
 * @route GET /api/topics?fromDate=2023-01-01&toDate=2023-08-31
 * @route GET /api/topics?sortBy=created_at&sortOrder=desc
 * @route GET /api/topics?sortBy=created_at&sortOrder=asc
 *
 * @group Topics
 * @param {string} req.query.sortBy - The field to sort by ("created_at").
 * @param {string} req.query.sortOrder - The sorting order ("asc" or "desc").
 * @param {string} req.query.fromDate - The start date for filtering by creation date.
 * @param {string} req.query.toDate - The end date for filtering by creation date.
 * @returns {Array} - Returns an array of topics.
 */

router.get(
  "/",
  authenticate,
  validation(helper.sortAndFilterSchema),
  ctrlWrapper(ctrl.getAllTopics)
);

/**
 * Define a route to add a new topic.
 * The route handles POST requests at the root path ("/").
 * Authentication and admin role are required using the authenticate and requireAdmin middleware.
 * The request body is validated against the createTopicSchema using the validation middleware.
 * The ctrl.addTopic controller method is wrapped with ctrlWrapper for error handling.
 *
 * @route POST /api/topics
 * @group Topics
 * @param {object} req.body - The request body containing topic details.
 * @returns {object} - Returns the ID of the newly created topic.
 */

router.post(
  "/",
  authenticate,
  requireAdmin,
  validation(topic.createTopicSchema),
  ctrlWrapper(ctrl.addTopic)
);

/**
 * Define a route to update a topic.
 * The route handles PUT requests at the path with an ID parameter ("/:id").
 * Authentication and admin role are required using the authenticate and requireAdmin middleware.
 * The request body is validated against the updateTopicSchema using the validation middleware.
 * The ctrl.updateTopic controller method is wrapped with ctrlWrapper for error handling.
 *
 * @route PUT /api/topics/:id
 * @group Topics
 * @param {string} req.params.id - The ID of the topic to update.
 * @param {object} req.body - The request body containing updated topic details.
 * @returns {object} - Returns the ID of the updated topic.
 */
router.put(
  "/:id",
  authenticate,
  requireAdmin,
  validation(topic.updateTopicSchema),
  ctrlWrapper(ctrl.updateTopic)
);

/**
 * Define a route to delete a topic.
 * The route handles DELETE requests at the path with an ID parameter ("/:id").
 * Authentication and admin role are required using the authenticate and requireAdmin middleware.
 * The ctrl.deleteTopic controller method is wrapped with ctrlWrapper for error handling.
 *
 * @route DELETE /api/topics/:id
 * @group Topics
 * @param {string} req.params.id - The ID of the topic to delete.
 * @returns {object} - Returns a message confirming the deletion.
 */

router.delete(
  "/:id",
  authenticate,
  requireAdmin,
  ctrlWrapper(ctrl.deleteTopic)
);

module.exports = router;
