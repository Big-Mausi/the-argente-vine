import type { MenuItem } from "../types/menu";

const API_URL = "/api";

// -----------------------------
// Health
// -----------------------------

export async function checkApiHealth(): Promise<string> {
  const response = await fetch(`${API_URL}/health`);

  if (!response.ok) {
    throw new Error("Unable to connect to the API");
  }

  return response.text();
}

// -----------------------------
// Contact
// -----------------------------

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function submitContactMessage(contactMessage: ContactMessage) {
  const response = await fetch(`${API_URL}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contactMessage),
  });

  if (!response.ok) {
    throw new Error("Unable to send your message");
  }

  return response.json();
}

// -----------------------------
// Menu
// -----------------------------

export async function getMenuItems(): Promise<MenuItem[]> {
  const response = await fetch(`${API_URL}/menu`);

  if (!response.ok) {
    throw new Error("Unable to fetch menu items");
  }

  return response.json();
}

export type CreateMenuItem = Omit<MenuItem, "id" | "createdAt">;

export async function createMenuItem(menuItem: CreateMenuItem) {
  const response = await fetch(`${API_URL}/menu`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(menuItem),
  });

  if (!response.ok) {
    throw new Error("Unable to create menu item");
  }

  return response.json();
}

export async function updateMenuItem(
  id: number,
  menuItem: Partial<CreateMenuItem>,
) {
  const response = await fetch(`${API_URL}/menu/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(menuItem),
  });

  if (!response.ok) {
    throw new Error("Unable to update menu item");
  }

  return response.json();
}

export async function deleteMenuItem(id: number) {
  const response = await fetch(`${API_URL}/menu/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to delete menu item");
  }

  return response.json();
}

// -----------------------------
// Reservations
// -----------------------------

export interface Reservation {
  id: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequest: string | null;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
  createdAt: string;
}

export interface ReservationRequest {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequest?: string;
}

export async function submitReservation(reservation: ReservationRequest) {
  const response = await fetch(`${API_URL}/reservations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reservation),
  });

  if (!response.ok) {
    throw new Error("Unable to make reservation");
  }

  return response.json();
}

export async function getReservations(): Promise<Reservation[]> {
  const response = await fetch(`${API_URL}/reservations`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to fetch reservations");
  }

  return response.json();
}

export async function updateReservationStatus(
  id: number,
  status: Reservation["status"],
) {
  const response = await fetch(`${API_URL}/reservations/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error("Unable to update reservation status");
  }

  return response.json();
}

export async function deleteReservation(id: number) {
  const response = await fetch(`${API_URL}/reservations/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to delete reservation");
  }

  return response.json();
}

// -----------------------------
// Admin Authentication
// -----------------------------

export interface Admin {
  id: number;
  email: string;
}

export async function getCurrentAdmin(): Promise<Admin> {
  const response = await fetch(`${API_URL}/auth/me`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Not authenticated");
  }

  const data = await response.json();

  return data.admin;
}

export async function logoutAdmin() {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to logout");
  }

  return response.json();
}

export interface ContactMessageResponse {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export async function getContactMessages(): Promise<ContactMessageResponse[]> {
  const response = await fetch(`${API_URL}/contact`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to fetch contact messages");
  }

  return response.json();
}

export async function deleteContactMessage(id: number) {
  const response = await fetch(`${API_URL}/contact/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to delete contact message");
  }

  return response.json();
}

// -----------------------------
// Employees
// -----------------------------

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobTitle: string;
  department: string;
  basicSalary: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEmployee {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobTitle: string;
  department: string;
  basicSalary: number;
}

export async function getEmployees(): Promise<Employee[]> {
  const response = await fetch(`${API_URL}/employees`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to fetch employees");
  }

  return response.json();
}

export async function createEmployee(
  employee: CreateEmployee,
): Promise<Employee> {
  const response = await fetch(`${API_URL}/employees`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(employee),
  });

  if (!response.ok) {
    throw new Error("Unable to create employee");
  }

  return response.json();
}

export async function updateEmployee(
  id: number,
  employee: Partial<CreateEmployee> & {
    isActive?: boolean;
  },
): Promise<Employee> {
  const response = await fetch(`${API_URL}/employees/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(employee),
  });

  if (!response.ok) {
    throw new Error("Unable to update employee");
  }

  return response.json();
}

export async function deactivateEmployee(id: number): Promise<Employee> {
  const response = await fetch(`${API_URL}/employees/${id}/deactivate`, {
    method: "PATCH",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to deactivate employee");
  }

  return response.json();
}

// -----------------------------
// Payroll
// -----------------------------

export interface PayrollPeriod {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  status: "OPEN" | "PROCESSED" | "CLOSED";
  createdAt: string;
}

export interface PayrollRecord {
  id: number;
  employeeId: number;
  payrollPeriodId: number;
  basicSalary: number;
  allowances: number;
  deductions: number;
  grossSalary: number;
  netSalary: number;
  status: "PENDING" | "PAID";
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
  employee: Employee;
  payrollPeriod: PayrollPeriod;
}

export interface CreatePayrollPeriod {
  name: string;
  startDate: string;
  endDate: string;
}

export async function getPayrollPeriods(): Promise<PayrollPeriod[]> {
  const response = await fetch(`${API_URL}/payroll/periods`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to fetch payroll periods");
  }

  return response.json();
}

export async function createPayrollPeriod(
  period: CreatePayrollPeriod,
): Promise<PayrollPeriod> {
  const response = await fetch(`${API_URL}/payroll/periods`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(period),
  });

  if (!response.ok) {
    throw new Error("Unable to create payroll period");
  }

  return response.json();
}

export async function processPayroll(
  periodId: number,
): Promise<PayrollRecord[]> {
  const response = await fetch(
    `${API_URL}/payroll/periods/${periodId}/process`,
    {
      method: "POST",
      credentials: "include",
    },
  );

  if (!response.ok) {
    const data = await response.json().catch(() => null);

    throw new Error(data?.message || "Unable to process payroll");
  }

  return response.json();
}

export async function getPayrollRecords(): Promise<PayrollRecord[]> {
  const response = await fetch(`${API_URL}/payroll/records`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to fetch payroll records");
  }

  return response.json();
}

export async function getPayrollRecord(id: number): Promise<PayrollRecord> {
  const response = await fetch(`${API_URL}/payroll/records/${id}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to fetch payroll record");
  }

  return response.json();
}

export async function markPayrollAsPaid(id: number): Promise<PayrollRecord> {
  const response = await fetch(`${API_URL}/payroll/records/${id}/pay`, {
    method: "PATCH",
    credentials: "include",
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);

    throw new Error(data?.message || "Unable to mark payroll as paid");
  }

  return response.json();
}
