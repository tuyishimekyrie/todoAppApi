import express from "express";
import { createUser, currentUser } from "../controllers/usersController";
import auth from "../../middlewares/authMiddleWare";

const router = express.Router();

router.get("/me", auth, currentUser);
router.post("/", createUser);

export default router;
