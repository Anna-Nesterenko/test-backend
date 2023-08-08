const app = require("./app");

// Retrieve the port number from the environment variables
const { PORT } = process.env;

// Start the server and listen on the specified port

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
