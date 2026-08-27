import { Router } from "express";

import {
  createEmployeeController,
  getAllEmployees,
  getEmployee,
  editEmployee,
  removeEmployee,
} from "../controllers/employee.controller.js";

import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

// Protected admin routes

router.post("/", requireAuth, createEmployeeController);

router.get("/", requireAuth, getAllEmployees);

router.get("/:id", requireAuth, getEmployee);

router.patch("/:id", requireAuth, editEmployee);

router.patch("/:id/deactivate", requireAuth, removeEmployee);

export default router;
