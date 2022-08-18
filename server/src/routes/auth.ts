// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
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
  logoutUser,
  cookieCheck,
  ingredientList,
  saveIngredient
} from "../controllers/auth.ts";

const router = express.Router();

router.post("/saveIngredient", saveIngredient);
router.post("/Login", googleLogin, emailCheck, authenticateCRUDUser);
router.get("/logout", logoutUser);
router.get("/check", cookieCheck);
router.post("/list", ingredientList);
router.get("/register", findUsers);
router.post("/register", validateUser, registerNewUser);
router.patch("/register/:id", updateUser);
router.delete("/register/:id", deleteUser);

export default router;
