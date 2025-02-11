import { config } from "dotenv";
import app from "./app.js";

import connectionToDB from "./config/dbConnection.js";
import "dotenv/config";
config();

const PORT = Math.floor(Math.random() * (9000 - 3001) + 3001);

app.listen(PORT, async () => {
  await connectionToDB();
  console.log(`The App is listing to the port https:localhost:${PORT}`);
});
