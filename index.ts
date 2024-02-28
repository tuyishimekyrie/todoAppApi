require("dotenv").config();
import express from "express";
import todos from "./src/routers/todos";
import users from "./src/routers/users";
import auth from "./src/routers/auth";
import mongoose from "mongoose";
import config from "config";
const app = express();

// if (!config.get("jwtPrivateKey")) {
//   console.error("FATAL ERROR: jwtPrivateKey is not defined");
//   process.exit(1);
// }

mongoose
  .connect("mongodb://localhost:27017/todoAppApi")
  .then(() => console.log("Database Running"))
  .catch((error) => console.error("Database Connection Failed:", error));

app.use(express.json());

app.use("/api/todos", todos);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(8000, () => {
  console.log("Port running on 8000");
});
