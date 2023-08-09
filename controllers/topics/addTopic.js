const { db } = require("../../db");

const addTopic = async (req, res, next) => {
  const io = require("../../server");
  const { title, text, description } = req.body;
  const { id } = req.user;

  const newTopic = {
    title,
    text,
    created_at: new Date(),
    description,
    user_id: id,
  };

  try {
    // Insert the new topic into the database and retrieve the inserted ID
    const insertedId = await db("topics").insert(newTopic);

    io.emit("newTopic", { title: title, description: description });

    res.status(201).json({ id: insertedId[0] });
  } catch (error) {
    console.error(error);
    error.status = 400; // Set the status to 400 for SQL-related errors
    next(error);
  }
};

module.exports = addTopic;
