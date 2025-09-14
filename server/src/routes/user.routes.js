import express from "express";
import { isLoggedin } from "../middlewares/auth.middleware.js";
import {
  getUsers,
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
} from "../controllers/user.controllers.js";

const router = express.Router();

router.get("/users", isLoggedin, getUsers); // admin only
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", isLoggedin, logoutUser);
router.get("/me", isLoggedin, currentUser);

export default router;