import express from "express";

import { authenticateUser, registerUser, practice } from "../controllers/auth";

const router = express.Router();

router.post("/", authenticateUser);
router.get("/register", practice);
router.post("/register", registerUser);

export default router;
