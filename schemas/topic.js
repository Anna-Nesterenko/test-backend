const Joi = require("joi");

/**
 * Joi schema for creating a new topic.
 * Specifies the shape and validation rules for the data when creating a topic.
 *
 * @property {string} title - The title of the topic (minimum length: 3 characters).
 * @property {string} text - The text content of the topic (minimum length: 10 characters).
 * @property {string} [created_at] - The creation date of the topic in ISO format (default: current date).
 * @property {string} description - The description of the topic (maximum length: 1000 characters, optional).
 * @property {number} [user_id] - The ID of the user creating the topic (integer, optional).
 */

const createTopicSchema = Joi.object({
  title: Joi.string().min(3).required(),
  text: Joi.string().min(10).required(),
  created_at: Joi.date().iso().default(Date.now),
  description: Joi.string().allow("").max(1000).required(),
  user_id: Joi.number().integer(),
});

/**
 * Joi schema for updating a topic.
 * Specifies the shape and validation rules for the data when updating a topic.
 *
 * @property {string} [title] - The updated title of the topic (minimum length: 3 characters).
 * @property {string} [text] - The updated text content of the topic (minimum length: 10 characters).
 * @property {string} [description] - The updated description of the topic (maximum length: 1000 characters, optional).
 */

const updateTopicSchema = Joi.object({
  title: Joi.string().min(3),
  text: Joi.string().min(10),
  description: Joi.string().allow("").max(1000),
});

module.exports = {
  createTopicSchema,
  updateTopicSchema,
};
