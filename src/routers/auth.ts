import express from "express"
import { logUser } from "../controllers/authController";

const router = express.Router();


router.post("/", logUser);


export default router;