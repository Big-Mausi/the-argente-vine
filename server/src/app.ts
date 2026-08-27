import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import contactRoutes from "./routes/contact.routes.js";
import menuRoutes from "./routes/menu.routes.js";
import reservationRoutes from "./routes/reservation.routes.js";
import authRoutes from "./routes/auth.routes.js";
import payrollRoutes from "./routes/payroll.routes.js";
import employeeRoutes from "./routes/employee.routes.js";
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (_req, res) => {
  res.send("The Argenté Vine API is running");
});

app.use("/api/contact", contactRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/payroll", payrollRoutes);
app.use("/api/employees", employeeRoutes);

export default app;
