import { Router } from "express";

import {
  createContactMessage,
  getContactMessages,
  deleteContactMessage,
} from "../controllers/contact.controller.js";

import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

// Public
router.post("/", createContactMessage);

// Protected admin routes
router.get("/", requireAuth, getContactMessages);
router.delete("/:id", requireAuth, deleteContactMessage);

export default router;
