const io = require("socket.io-client");

const socket = io(`http://localhost:3000`);

socket.on("newTopic", (message) => {
  console.log("Message from server:", message);
});
