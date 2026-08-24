import { Router } from "express";
import {
  login,
  logout,
  getCurrentAdmin,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", login);
router.post("/logout", logout);
router.get("/me", getCurrentAdmin);

export default router;
