import express  from "express";

import {
  googleLogin,
  authenticateCRUDUser,
  registerNewUser,
  findUsers,
  updateUser,
  deleteUser,
  validateUser,
  emailCheck,
  logoutUser
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
} from "../controllers/auth.ts";

const router = express.Router();

router.post("/Login", googleLogin, emailCheck, authenticateCRUDUser);
router.get("/logout", logoutUser);
router.get("/register", findUsers);
router.post("/register", validateUser, registerNewUser);
router.patch("/register/:id", updateUser);
router.delete("/register/:id", deleteUser);

export default router;
