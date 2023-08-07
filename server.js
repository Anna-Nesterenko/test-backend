const app = require("./app");
const {db} = require("./db");
const {createAdmin} = require("./db");

// Retrieve the port number from the environment variables
const { PORT } = process.env;

// Start the server and listen on the specified port
db.raw("SELECT 1")
  .then(() => {
    console.log("Database connected successfully");
    //Create an administrator
    createAdmin()
      .then(() => {
        console.log("Admin user created successfully.");
        // Запускаємо сервер
        app.listen(PORT, () => {
          console.log(`Server running. Use our API on port: ${PORT}`);
        });
      })
      .catch((error) => {
        console.error("Error creating admin user:", error);
      });
  })
  .catch((error) => {
    res.status(500).json({ message: "Error connecting to database" });
  });
