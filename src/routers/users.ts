import express from "express";
import { createUser, currentUser } from "../controllers/usersController";
import auth from "../../middlewares/authMiddleWare";

const router = express.Router();
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
router.get("/me", auth, currentUser);
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
router.post("/", createUser);

export default router;
