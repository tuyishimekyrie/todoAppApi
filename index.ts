require("dotenv").config();
import express from "express";
import todos from "./src/routers/todos";
import users from "./src/routers/users";
import auth from "./src/routers/auth";
import mongoose from "mongoose";
import config from "config";

import swaggerDocs from "./src/utils/swagger";
const app = express();

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

mongoose.connect(
  "mongodb+srv://tuyishimehope:visionkyrie%40123@todoappapi.jaedp2j.mongodb.net/"
);

// Connect to MongoDB Atlas
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB Atlas");
});

mongoose.connection.on("error", (error) => {
  console.error("MongoDB Atlas Connection Error:", error);
});
app.use(express.json());

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

app.listen(8000, () => {
  console.log("Port running on 8000");
  swaggerDocs(app, 8000);
});
