"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const todos_1 = __importDefault(require("./src/routers/todos"));
const users_1 = __importDefault(require("./src/routers/users"));
const auth_1 = __importDefault(require("./src/routers/auth"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("config"));
const swagger_1 = __importDefault(require("./src/utils/swagger"));
const app = (0, express_1.default)();
if (!config_1.default.get("jwtPrivateKey")) {
    console.error("FATAL ERROR: jwtPrivateKey is not defined");
    process.exit(1);
}
mongoose_1.default.connect("mongodb+srv://tuyishimehope:visionkyrie%40123@todoappapi.jaedp2j.mongodb.net/");
// Connect to MongoDB Atlas
mongoose_1.default.connection.on("connected", () => {
    console.log("Connected to MongoDB Atlas");
});
mongoose_1.default.connection.on("error", (error) => {
    console.error("MongoDB Atlas Connection Error:", error);
});
app.use(express_1.default.json());
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
app.use("/api/todos", todos_1.default);
app.use("/api/users", users_1.default);
app.use("/api/auth", auth_1.default);
app.get("/", (req, res) => {
    res.send("Hello");
});
app.listen(8000, () => {
    console.log("Port running on 8000");
    (0, swagger_1.default)(app, 8000);
});
