"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersController_1 = require("../controllers/usersController");
const authMiddleWare_1 = __importDefault(require("../../middlewares/authMiddleWare"));
const router = express_1.default.Router();
/**
   * @openapi
   * /getCurrentUser:
   *  get:
   *     tags:
   *     - User
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
router.get("/me", authMiddleWare_1.default, usersController_1.currentUser);
/**
   * @openapi
   * /createUser:
   *  get:
   *     tags:
   *     - createUser
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
router.post("/", usersController_1.createUser);
exports.default = router;
