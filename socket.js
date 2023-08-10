/**
 * Module for managing socket.io instance and handling socket events.
 *
 * @module socketManager
 */

const { Server } = require("socket.io");

let io;

module.exports = {
  // Method to initialize socket.io and attach it to the provided server instance
  init: function (server) {
    io = new Server(server);

    // Set up event listeners for socket connections
    io.on("connection", (socket) => {
      console.log("A user connected");

      // Set up an event listener for socket disconnections
      socket.on("disconnect", () => {
        console.log("A user disconnected");
      });
    });
    // Return the existing io instance
    return io;
  },
  // Method to retrieve the existing io instance
  getIO: function () {
    // If io instance doesn't exist, throw an error
    if (!io) {
      throw new Error("Can't get io instance before calling .init()");
    }
    // Return the existing io instance
    return io;
  },
};
