import { Router } from "express";
import {
  getMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menu.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
const router = Router();

router.get("/", getMenuItems);
router.post("/", requireAuth, createMenuItem);
router.patch("/:id", requireAuth, updateMenuItem);
router.delete("/:id", requireAuth, deleteMenuItem);
export default router;
