/**
 * Creates an Express app with middleware configurations and route handlers.
 * This app includes CORS support, JSON request body parsing, and routes for various endpoints.
 *
 * @module app
 * @type {object}
 */

const express = require("express");
const cors = require("cors");

const loginRouter = require("./routes/api/login");
const usersRouter = require("./routes/api/users");
const topicsRouter = require("./routes/api/topics");
const logoutRouter = require("./routes/api/logout");
const refreshRouter = require("./routes/api/refresh");

// Create an Express app
const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Use the route handlers
app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);
app.use("/api/topics", topicsRouter);
app.use("/api/logout", logoutRouter);
app.use("/api/refresh", refreshRouter);

// Handle 404 errors by sending a JSON response
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message: message });
});

module.exports = app;
