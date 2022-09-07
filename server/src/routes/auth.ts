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
  alterIngredient,
  alterFavorite
} from "../controllers/auth.ts";

const router = express.Router();

router.post("/Login", authenticateGoogleUser, emailCheck, authenticateCRUDUser);
router.post("/logout", logoutUser);
router.post("/saveIngredient", alterIngredient);
router.post("/alterFavorite", alterFavorite);
router.get("/check", cookieCheck);
router.post("/list", ingredientList);
router.get("/register", findUsers);
router.post("/register", validateUser, registerNewUser);
router.patch("/register/:id", updateUser);
router.delete("/register/:id", deleteUser);

export default router;
