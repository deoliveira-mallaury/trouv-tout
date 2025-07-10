// auth.routes.js
import express from "express";
import { auth } from "../Controllers/index.js";
import { date } from "../Middleware/index.js";
const router = express.Router();

router.post("/signup", date, auth.createUser);
router.post("/login", auth.login);
router.get("/login", auth.login);
router.get("/logout", auth.logout);

export default router;
