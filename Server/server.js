import connectDb from "./config/connectDb.js";
import { app } from "./index.js";
const port = process.env.PORT;

// here first i am connecting with database and then i am starting the server
connectDb().then(
  app.listen(port, () => console.log(`Server is Working on ${port}`))
);
