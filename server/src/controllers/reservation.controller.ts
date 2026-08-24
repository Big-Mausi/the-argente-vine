import type { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { ReservationStatus } from "../generated/prisma/client.js";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

interface ReservationRequestBody {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequest?: string;
}

export const createReservation = async (
  req: Request<{}, {}, ReservationRequestBody>,
  res: Response,
) => {
  try {
    const { name, email, phone, date, time, guests, specialRequest } = req.body;

    const reservationDate = new Date(date);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (reservationDate < today) {
      return res.status(400).json({
        message: "Reservation date cannot be in the past.",
      });
    }

    const reservation = await prisma.reservation.create({
      data: {
        name,
        email,
        phone,
        date: reservationDate,
        time,
        guests,
        specialRequest: specialRequest || null,
      },
    });

    res.status(201).json({
      message: "Your reservation request has been received.",
      data: reservation,
    });
  } catch (error) {
    console.error("Error creating reservation:", error);

    res.status(500).json({
      message: "Something went wrong while making your reservation.",
    });
  }
};

export const getReservations = async (req: Request, res: Response) => {
  try {
    const reservations = await prisma.reservation.findMany({
      orderBy: {
        date: "asc",
      },
    });

    res.status(200).json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);

    res.status(500).json({
      message: "Something went wrong while fetching reservations.",
    });
  }
};

export const updateReservationStatus = async (
  req: Request<{ id: string }, {}, { status: ReservationStatus }>,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid reservation ID.",
      });
    }

    if (!Object.values(ReservationStatus).includes(status)) {
      return res.status(400).json({
        message: "Invalid reservation status.",
      });
    }

    const reservation = await prisma.reservation.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    res.status(200).json({
      message: "Reservation status updated successfully.",
      data: reservation,
    });
  } catch (error) {
    console.error("Error updating reservation status:", error);

    res.status(500).json({
      message: "Something went wrong while updating the reservation.",
    });
  }
};

export const deleteReservation = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid reservation ID.",
      });
    }

    await prisma.reservation.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      message: "Reservation deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting reservation:", error);

    res.status(500).json({
      message: "Something went wrong while deleting the reservation.",
    });
  }
};
