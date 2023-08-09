const Joi = require("joi");

// Define the schema for creating a topic
const createTopicSchema = Joi.object({
  title: Joi.string().min(3).required(),
  text: Joi.string().min(10).required(),
  created_at: Joi.date().iso().default(Date.now),
  description: Joi.string().allow("").max(1000).required(),
  user_id: Joi.number().integer(),
});

// Define the schema for update a topic
const updateTopicSchema = Joi.object({
  title: Joi.string().min(3),
  text: Joi.string().min(10),
  description: Joi.string().allow("").max(1000),
});

module.exports = {
  createTopicSchema,
  updateTopicSchema,
};
