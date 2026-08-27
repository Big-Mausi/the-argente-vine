import { Router } from "express";

import {
  createPeriod,
  getPeriods,
  getPeriodById,
  processPayroll,
  getRecords,
  getRecordById,
  payRecord,
} from "../controllers/payroll.controller.js";

import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

// Protected admin routes

router.post("/periods", requireAuth, createPeriod);

router.get("/periods", requireAuth, getPeriods);

router.get("/periods/:id", requireAuth, getPeriodById);

router.post("/periods/:id/process", requireAuth, processPayroll);

router.get("/records", requireAuth, getRecords);

router.get("/records/:id", requireAuth, getRecordById);

router.patch("/records/:id/pay", requireAuth, payRecord);

export default router;
