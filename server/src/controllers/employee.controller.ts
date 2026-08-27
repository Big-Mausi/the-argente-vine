import type { Request, Response } from "express";

import {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deactivateEmployee,
} from "../services/employee.service.js";

/**
 * Create employee
 */
export async function createEmployeeController(req: Request, res: Response) {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      jobTitle,
      department,
      basicSalary,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !jobTitle ||
      !department ||
      basicSalary === undefined
    ) {
      return res.status(400).json({
        message: "All employee fields are required.",
      });
    }

    const employee = await createEmployee({
      firstName,
      lastName,
      email,
      phone,
      jobTitle,
      department,
      basicSalary: Number(basicSalary),
    });

    return res.status(201).json(employee);
  } catch (error) {
    console.error("Error creating employee:", error);

    return res.status(500).json({
      message: "Unable to create employee.",
    });
  }
}

/**
 * Get all employees
 */
export async function getAllEmployees(_req: Request, res: Response) {
  try {
    const employees = await getEmployees();

    return res.status(200).json(employees);
  } catch (error) {
    console.error("Error getting employees:", error);

    return res.status(500).json({
      message: "Unable to get employees.",
    });
  }
}

/**
 * Get one employee
 */
export async function getEmployee(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid employee ID.",
      });
    }

    const employee = await getEmployeeById(id);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found.",
      });
    }

    return res.status(200).json(employee);
  } catch (error) {
    console.error("Error getting employee:", error);

    return res.status(500).json({
      message: "Unable to get employee.",
    });
  }
}

/**
 * Update employee
 */
export async function editEmployee(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid employee ID.",
      });
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      jobTitle,
      department,
      basicSalary,
      isActive,
    } = req.body;

    const updateData: {
      firstName?: string;
      lastName?: string;
      email?: string;
      phone?: string;
      jobTitle?: string;
      department?: string;
      basicSalary?: number;
      isActive?: boolean;
    } = {};

    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;
    if (email !== undefined) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (jobTitle !== undefined) updateData.jobTitle = jobTitle;
    if (department !== undefined) updateData.department = department;

    if (basicSalary !== undefined) {
      updateData.basicSalary = Number(basicSalary);
    }

    if (isActive !== undefined) {
      updateData.isActive = isActive;
    }

    const employee = await updateEmployee(id, updateData);

    return res.status(200).json(employee);
  } catch (error) {
    console.error("Error updating employee:", error);

    return res.status(500).json({
      message: "Unable to update employee.",
    });
  }
}

/**
 * Deactivate employee
 */
export async function removeEmployee(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid employee ID.",
      });
    }

    const employee = await deactivateEmployee(id);

    return res.status(200).json(employee);
  } catch (error) {
    console.error("Error deactivating employee:", error);

    return res.status(500).json({
      message: "Unable to deactivate employee.",
    });
  }
}
