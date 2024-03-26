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
const cors_1 = __importDefault(require("cors"));
const swagger_1 = __importDefault(require("./src/utils/swagger"));
const app = (0, express_1.default)();
if (!config_1.default.get("jwtPrivateKey")) {
    console.error("FATAL ERROR: jwtPrivateKey is not defined");
    process.exit(1);
}
mongodb: mongoose_1.default.connect("mongodb+srv://tuyishimehope:visionkyrie%40123@todoappapi.jaedp2j.mongodb.net/todoappapi"
// "mongodb+srv://tuyishimehope:visionkyrie%40123@todoappapi.jaedp2j.mongodb.net/todoappapi"
);
// mongodb+srv://tuyishimehope:visionkyrie%40123@todoappapi.jaedp2j.mongodb.net/?retryWrites=true&w=majority&appName=todoappapi
// mongodb+srv://tuyishimehope:<password>@todoappapi.jaedp2j.mongodb.net/?retryWrites=true&w=majority&appName=todoappapi
// Connect to MongoDB Atlas
mongoose_1.default.connection.on("connected", () => {
    console.log("Connected to MongoDB Atlas");
});
mongoose_1.default.connection.on("error", (error) => {
    console.error("MongoDB Atlas Connection Error:", error);
});
app.use(express_1.default.json());
app.use((0, cors_1.default)());
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
const DEFAULT_PORT = 8000; // Default port if none is provided
const server = app.listen(DEFAULT_PORT, () => {
    const address = server.address();
    const port = typeof address === "string" ? DEFAULT_PORT : address.port;
    console.log(`Server is running on port ${port}`);
    (0, swagger_1.default)(app, port); // Pass the dynamically assigned port to the swaggerDocs function
});
