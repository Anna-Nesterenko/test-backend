const app = require("./app");
const http = require("http");
const { Server } = require("socket.io");

// Retrieve the port number from the environment variables
const { PORT } = process.env;

const server = http.createServer(app);
// Start the server and listen on the specified port

server.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

module.exports = io;
