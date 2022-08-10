// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import express  from "express";
import {
  authenticateGoogleUser,
  authenticateCRUDUser,
  registerNewUser,
  findUsers,
  updateUser,
  deleteUser,
  validateUser,
  emailCheck,
  logoutUser,
  cookieCheck
} from "../controllers/auth.ts";

const router = express.Router();

router.post("/Login", authenticateGoogleUser, emailCheck, authenticateCRUDUser);
router.post("/logout", logoutUser);
router.get("/check", cookieCheck);
router.get("/register", findUsers);
router.post("/register", validateUser, registerNewUser);
router.patch("/register/:id", updateUser);
router.delete("/register/:id", deleteUser);

export default router;
