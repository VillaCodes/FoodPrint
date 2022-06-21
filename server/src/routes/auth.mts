import express from "express";

import {
  authenticateGoogleUser,
  googleLogin,
  authenticateCRUDUser,
  registerNewUser,
  findUsers,
  updateUser,
  deleteUser,
  validateUser,
  emailCheck
} from "../controllers/auth.mjs";

const router = express.Router();

router.post("/Login", googleLogin, emailCheck, authenticateCRUDUser);
router.get("/register", findUsers);
router.post("/register", validateUser, registerNewUser);
router.patch("/register/:id", updateUser);
router.delete("/register/:id", deleteUser);

export default router;
