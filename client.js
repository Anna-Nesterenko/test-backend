/**
 * Initializes a socket.io client and connects to a socket.io server using the specified port.
 * Listens for the "newTopic" event and logs the received message to the console.
 *
 * @module socketClient
 * @type {object}
 */

const io = require("socket.io-client");
const dotenv = require("dotenv");

dotenv.config();

const { PORT } = process.env;

// Connect to the socket.io server using the specified port
const socket = io(`http://localhost:${PORT}`);

// Set up a listener for the "newTopic" event
socket.on("newTopic", (message) => {
  console.log("Message from server:", message);
});
