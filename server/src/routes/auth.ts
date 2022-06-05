import express from "express";

import { authenticateUser, registerNewUser, findUsers, updateUser, deleteUser, validateUser } from "../controllers/auth";

const router = express.Router();

router.post("/Login", authenticateUser);
router.get("/register", findUsers);
router.post("/register", validateUser, registerNewUser);
router.patch("/register/:id", updateUser);
router.delete("/register/:id", deleteUser);

export default router;
