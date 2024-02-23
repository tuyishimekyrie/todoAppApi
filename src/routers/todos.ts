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

router.get("/",auth, findTodos);
router.post("/create", auth, createTodo);
router.patch("/:id", auth, updateTodo);
router.patch("/:id/complete", auth, completeTodo);
router.delete("/:id", auth, deleteTodo);

export default router;
