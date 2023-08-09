const createError = require("http-errors");
const { db } = require("../../db");

const updateTopic = async (req, res, next) => {
  const { title, text, description } = req.body;
  const topicId = req.params.id;

  try {
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
  } catch (error) {
    console.error(error);
    error.status = 400; // Set the status to 400 for SQL-related errors
    next(error);
  }
};

module.exports = updateTopic;
