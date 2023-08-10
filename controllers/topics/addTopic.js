const { db } = require("../../db");
const socketManager = require("./../../socket");

/**
 * Adds a new topic to the database and emits a socket event to inform clients about the new topic.
 * Retrieves the authenticated user's ID from the request object.
 * Creates a new topic object with the provided title, text, description, and user ID.
 * Inserts the new topic into the database and retrieves the inserted ID.
 * Emits a "newTopic" socket event to inform clients about the new topic.
 * Responds with a successful status and the inserted topic ID.
 *
 * @function addTopic
 * @async
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {object} req.body - The request body containing topic details.
 * @param {string} req.body.title - The title of the new topic.
 * @param {string} req.body.text - The text content of the new topic.
 * @param {string} req.body.description - The description of the new topic.
 * @param {object} req.user - The authenticated user's information.
 * @param {number} req.user.id - The ID of the authenticated user.
 * @throws {Error} - Throws an error if there's a problem inserting the topic into the database or emitting the socket event.
 * @returns {object} - Returns a successful status and the inserted topic ID.
 */

const addTopic = async (req, res) => {
  const io = socketManager.getIO();
  const { title, text, description } = req.body;
  const { id } = req.user;

  const newTopic = {
    title,
    text,
    created_at: new Date(),
    description,
    user_id: id,
  };

  // Insert the new topic into the database and retrieve the inserted ID
  const insertedId = await db("topics").insert(newTopic);

  // Emit a socket event to inform clients about the new topic
  io.emit("newTopic", { title: title, description: description });

  // Respond with a successful status and the inserted ID
  res.status(201).json({ id: insertedId[0] });
};

module.exports = addTopic;
