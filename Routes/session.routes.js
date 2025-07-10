import express from "express";
import { getSession } from "../Controllers/session.controller.js";

const router = express.Router();

router.get("/", getSession);

export default router;
