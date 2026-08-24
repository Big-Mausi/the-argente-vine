import { Router } from "express";

import {
  createReservation,
  getReservations,
  deleteReservation,
  updateReservationStatus,
} from "../controllers/reservation.controller.js";

import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

// Public
router.post("/", createReservation);

// Protected admin routes
router.get("/", requireAuth, getReservations);
router.delete("/:id", requireAuth, deleteReservation);
router.patch("/:id/status", requireAuth, updateReservationStatus);

export default router;
