"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const findTodos_1 = require("../controllers/findTodos");
const authMiddleWare_1 = __importDefault(require("../../middlewares/authMiddleWare"));
const router = express_1.default.Router();
router.get("/", authMiddleWare_1.default, findTodos_1.findTodos);
router.post("/create", authMiddleWare_1.default, findTodos_1.createTodo);
router.patch("/:id", authMiddleWare_1.default, findTodos_1.updateTodo);
router.patch("/:id/complete", authMiddleWare_1.default, findTodos_1.completeTodo);
router.delete("/:id", authMiddleWare_1.default, findTodos_1.deleteTodo);
exports.default = router;
