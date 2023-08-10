/**
 * Entry point for starting the server and initializing socket.io.
 * Creates an HTTP server using the Express app and initializes socket.io to work with it.
 *
 * @module server
 */

const app = require("./app");
const http = require("http");
const socketManager = require("./socket");

// Retrieve the port number from the environment variables
const { PORT } = process.env;

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Start the server and listen on the specified port
server.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});

// Initialize socket.io and bind it to the HTTP server
socketManager.init(server);
