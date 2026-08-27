import type { Request, Response } from "express";

import {
  createPayrollPeriod,
  getPayrollPeriods,
  getPayrollPeriodById,
  generatePayroll,
  getPayrollRecords,
  getPayrollRecordById,
  markPayrollAsPaid,
} from "../services/payroll.service.js";

/**
 * Create payroll period
 */
export async function createPeriod(req: Request, res: Response) {
  try {
    const { name, startDate, endDate } = req.body;

    if (!name || !startDate || !endDate) {
      return res.status(400).json({
        message: "Name, start date and end date are required.",
      });
    }

    const period = await createPayrollPeriod(
      name,
      new Date(startDate),
      new Date(endDate),
    );

    return res.status(201).json(period);
  } catch (error) {
    console.error("Error creating payroll period:", error);

    return res.status(500).json({
      message: "Unable to create payroll period.",
    });
  }
}

/**
 * Get all payroll periods
 */
export async function getPeriods(_req: Request, res: Response) {
  try {
    const periods = await getPayrollPeriods();

    return res.status(200).json(periods);
  } catch (error) {
    console.error("Error getting payroll periods:", error);

    return res.status(500).json({
      message: "Unable to get payroll periods.",
    });
  }
}

/**
 * Get one payroll period
 */
export async function getPeriodById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid payroll period ID.",
      });
    }

    const period = await getPayrollPeriodById(id);

    if (!period) {
      return res.status(404).json({
        message: "Payroll period not found.",
      });
    }

    return res.status(200).json(period);
  } catch (error) {
    console.error("Error getting payroll period:", error);

    return res.status(500).json({
      message: "Unable to get payroll period.",
    });
  }
}

/**
 * Generate payroll
 */
export async function processPayroll(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid payroll period ID.",
      });
    }

    const records = await generatePayroll(id);

    return res.status(200).json(records);
  } catch (error) {
    console.error("Error processing payroll:", error);

    const message =
      error instanceof Error ? error.message : "Unable to process payroll.";

    return res.status(400).json({
      message,
    });
  }
}

/**
 * Get all payroll records
 */
export async function getRecords(_req: Request, res: Response) {
  try {
    const records = await getPayrollRecords();

    return res.status(200).json(records);
  } catch (error) {
    console.error("Error getting payroll records:", error);

    return res.status(500).json({
      message: "Unable to get payroll records.",
    });
  }
}

/**
 * Get one payroll record
 */
export async function getRecordById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid payroll record ID.",
      });
    }

    const record = await getPayrollRecordById(id);

    if (!record) {
      return res.status(404).json({
        message: "Payroll record not found.",
      });
    }

    return res.status(200).json(record);
  } catch (error) {
    console.error("Error getting payroll record:", error);

    return res.status(500).json({
      message: "Unable to get payroll record.",
    });
  }
}

/**
 * Mark payroll record as paid
 */
export async function payRecord(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid payroll record ID.",
      });
    }

    const record = await markPayrollAsPaid(id);

    return res.status(200).json(record);
  } catch (error) {
    console.error("Error marking payroll as paid:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Unable to mark payroll as paid.";

    return res.status(400).json({
      message,
    });
  }
}
