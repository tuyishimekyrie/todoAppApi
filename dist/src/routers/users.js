"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersController_1 = require("../controllers/usersController");
const authMiddleWare_1 = __importDefault(require("../../middlewares/authMiddleWare"));
const router = express_1.default.Router();
router.get("/me", authMiddleWare_1.default, usersController_1.currentUser);
router.post("/", usersController_1.createUser);
exports.default = router;
