import express from "express";

import {
  authenticateGoogleUser,
  authenticateCRUDUser,
  registerNewUser,
  findUsers,
  updateUser,
  deleteUser,
  validateUser,
  emailCheck
} from "../controllers/auth.mjs";

const router = express.Router();

router.post("/Login", authenticateGoogleUser, emailCheck, authenticateCRUDUser);
router.get("/register", findUsers);
router.post("/register", validateUser, registerNewUser);
router.patch("/register/:id", updateUser);
router.delete("/register/:id", deleteUser);

export default router;
