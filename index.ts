require("dotenv").config();
import express from "express";
import todos from "./src/routers/todos";
import users from "./src/routers/users";
import auth from "./src/routers/auth";
import mongoose from "mongoose";
import config from "config";
import cors from "cors"

import swaggerDocs from "./src/utils/swagger";
const app = express();

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}
mongodb: mongoose.connect(
  "mongodb+srv://tuyishimehope:visionkyrie%40123@todoappapi.jaedp2j.mongodb.net/todoappapi"
  // "mongodb+srv://tuyishimehope:visionkyrie%40123@todoappapi.jaedp2j.mongodb.net/todoappapi"
);
// mongodb+srv://tuyishimehope:visionkyrie%40123@todoappapi.jaedp2j.mongodb.net/?retryWrites=true&w=majority&appName=todoappapi
// mongodb+srv://tuyishimehope:<password>@todoappapi.jaedp2j.mongodb.net/?retryWrites=true&w=majority&appName=todoappapi
// Connect to MongoDB Atlas
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB Atlas");
});

mongoose.connection.on("error", (error) => {
  console.error("MongoDB Atlas Connection Error:", error);
});
app.use(express.json());
app.use(cors());

/**
 * @openapi
 * /todos:
 *  get:
 *     tags:
 *     - Todos
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
app.use("/api/todos", todos);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.get("/", (req, res) => {
  res.send("Hello");
});

const DEFAULT_PORT = 8000; // Default port if none is provided

const server = app.listen(DEFAULT_PORT, () => {
  const address = server.address();
  const port = typeof address === "string" ? DEFAULT_PORT : address.port;
  console.log(`Server is running on port ${port}`);
  swaggerDocs(app, port); // Pass the dynamically assigned port to the swaggerDocs function
});
