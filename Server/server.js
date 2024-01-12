// Import the database connection function and the configured Express application
import connectDb from "./config/connectDb.js";
import { app } from "./index.js";

// Retrieve the port number from environment variables
const port = process.env.PORT;

// Connect to the database and start the server on the specified port
connectDb().then(
  app.listen(port, () => console.log(`Server is Working on ${port}`))
);
