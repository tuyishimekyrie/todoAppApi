import express from "express";
import {
  createTodo,
  deleteTodo,
  findTodos,
    updateTodo,
  completeTodo
} from "../controllers/findTodos";
import auth from "../../middlewares/authMiddleWare";
const router = express.Router();
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
router.get("/", auth, findTodos);
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
router.post("/create", auth, createTodo);
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
router.patch("/:id", auth, updateTodo);
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
router.patch("/:id/complete", auth, completeTodo);
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
router.delete("/:id", auth, deleteTodo);

export default router;
