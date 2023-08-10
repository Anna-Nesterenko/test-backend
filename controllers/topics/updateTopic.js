const createError = require("http-errors");
const { db } = require("../../db");

/**
 * Updates a topic in the database with new data.
 * Checks if the topic exists, and if so, updates its properties.
 * Responds with a successful status after updating the topic.
 *
 * @function updateTopic
 * @async
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {string} req.body.title - The new title for the topic.
 * @param {string} req.body.text - The new text content for the topic.
 * @param {string} req.body.description - The new description for the topic.
 * @param {string} req.params.id - The ID of the topic to be updated.
 * @throws {Error} - Throws an error if the topic with the specified ID is not found.
 * @returns {object} - Returns a successful status and a message indicating the topic was updated.
 */

const updateTopic = async (req, res) => {
  const { title, text, description } = req.body;
  const topicId = req.params.id;

  // Check if the topic exists
  const topic = await db("topics").where("id", topicId).first();
  if (!topic) {
    throw createError(404, `Topic with id ${topicId} not found`);
  }

  // Update the topic in the database and retrieve the number of affected rows
  const updatedTopic = {
    title,
    text,
    description,
  };

  await db("topics").where("id", topicId).update(updatedTopic);

  res.status(200).json({ message: "Topic updated successfully" });
};

module.exports = updateTopic;
