"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const findTodos_1 = require("../controllers/findTodos");
const authMiddleWare_1 = __importDefault(require("../../middlewares/authMiddleWare"));
const router = express_1.default.Router();
/**
   * @openapi
   * /api/todos/:
   *  get:
   *     tags:
   *     - Todos
   *     description: Responds if the app is up and running and you need to supply the token
   *     responses:
   *       200:
   *         description: App is up and running
   */
router.get("/", authMiddleWare_1.default, findTodos_1.findTodos);
router.get("/allTodos", authMiddleWare_1.default, findTodos_1.allTodos);
/**
  * @openapi
  * '/api/todos/create':
  *  post:
  *     tags:
  *     - Todo
  *     summary: create a todo
  *     requestBody:
  *      required: true
 
  *     responses:
  *      200:
  *        description: Success

  *      409:
  *        description: Conflict
  *      400:
  *        description: Bad request
  */
router.post("/create", authMiddleWare_1.default, findTodos_1.createTodo);
/**
   * @openapi
   * /updatetodo:
   *  get:
   *     tags:
   *     - Update A Todo
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
router.patch("/:id", authMiddleWare_1.default, findTodos_1.updateTodo);
/**
   * @openapi
   * /completetodo:
   *  get:
   *     tags:
   *     - Todos
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
router.patch("/:id/complete", authMiddleWare_1.default, findTodos_1.completeTodo);
/**
   * @openapi
   * /deletetodo:
   *  get:
   *     tags:
   *     - Todos
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
router.delete("/:id", authMiddleWare_1.default, findTodos_1.deleteTodo);
exports.default = router;
