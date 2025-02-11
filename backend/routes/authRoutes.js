import express from "express";
import { register, login } from "../controllers/authCoI. ler.js";
import { validateUser } from "../middlewares/validation.js";

const router = express.Router();

router.post("/register", validateUser, register);
router.post("/login", login);

export default router;
