import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

/**
 * Create a payroll period
 */
export async function createPayrollPeriod(
  name: string,
  startDate: Date,
  endDate: Date,
) {
  return prisma.payrollPeriod.create({
    data: {
      name,
      startDate,
      endDate,
    },
  });
}

/**
 * Get all payroll periods
 */
export async function getPayrollPeriods() {
  return prisma.payrollPeriod.findMany({
    orderBy: {
      startDate: "desc",
    },
  });
}

/**
 * Get a single payroll period with payroll records
 */
export async function getPayrollPeriodById(id: number) {
  return prisma.payrollPeriod.findUnique({
    where: {
      id,
    },
    include: {
      payrollRecords: {
        include: {
          employee: true,
        },
      },
    },
  });
}

/**
 * Generate payroll for all active employees
 */
export async function generatePayroll(payrollPeriodId: number) {
  const period = await prisma.payrollPeriod.findUnique({
    where: {
      id: payrollPeriodId,
    },
  });

  if (!period) {
    throw new Error("Payroll period not found.");
  }

  if (period.status !== "OPEN") {
    throw new Error("Payroll period is not open.");
  }

  const employees = await prisma.employee.findMany({
    where: {
      isActive: true,
    },
  });

  const payrollRecords = [];

  for (const employee of employees) {
    const basicSalary = employee.basicSalary;
    const allowances = 0;
    const deductions = 0;

    const grossSalary = basicSalary + allowances;
    const netSalary = grossSalary - deductions;

    const record = await prisma.payrollRecord.upsert({
      where: {
        employeeId_payrollPeriodId: {
          employeeId: employee.id,
          payrollPeriodId,
        },
      },
      update: {},
      create: {
        employeeId: employee.id,
        payrollPeriodId,
        basicSalary,
        allowances,
        deductions,
        grossSalary,
        netSalary,
      },
      include: {
        employee: true,
      },
    });

    payrollRecords.push(record);
  }

  await prisma.payrollPeriod.update({
    where: {
      id: payrollPeriodId,
    },
    data: {
      status: "PROCESSED",
    },
  });

  return payrollRecords;
}

/**
 * Get all payroll records
 */
export async function getPayrollRecords() {
  return prisma.payrollRecord.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      employee: true,
      payrollPeriod: true,
    },
  });
}

/**
 * Get a single payroll record
 */
export async function getPayrollRecordById(id: number) {
  return prisma.payrollRecord.findUnique({
    where: {
      id,
    },
    include: {
      employee: true,
      payrollPeriod: true,
    },
  });
}

/**
 * Mark payroll as paid
 */
export async function markPayrollAsPaid(id: number) {
  const payrollRecord = await prisma.payrollRecord.findUnique({
    where: {
      id,
    },
  });

  if (!payrollRecord) {
    throw new Error("Payroll record not found.");
  }

  if (payrollRecord.status === "PAID") {
    throw new Error("Payroll record has already been paid.");
  }

  return prisma.payrollRecord.update({
    where: {
      id,
    },
    data: {
      status: "PAID",
      paidAt: new Date(),
    },
    include: {
      employee: true,
      payrollPeriod: true,
    },
  });
}
