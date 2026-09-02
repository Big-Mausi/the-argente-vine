// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";

// import contactRoutes from "./routes/contact.routes.js";
// import menuRoutes from "./routes/menu.routes.js";
// import reservationRoutes from "./routes/reservation.routes.js";
// import authRoutes from "./routes/auth.routes.js";
// import payrollRoutes from "./routes/payroll.routes.js";
// import employeeRoutes from "./routes/employee.routes.js";
// const app = express();

// app.use(
//   cors({
//     origin: "https://the-argente-vine-1.onrender.com",
//     credentials: true,
//   }),
// );

// app.use(express.json());
// app.use(cookieParser());

// app.get("/api/health", (_req, res) => {
//   res.send("The Argenté Vine API is running");
// });

// app.use("/api/contact", contactRoutes);
// app.use("/api/menu", menuRoutes);
// app.use("/api/reservations", reservationRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/payroll", payrollRoutes);
// app.use("/api/employees", employeeRoutes);

// export default app;

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import contactRoutes from "./routes/contact.routes.js";
import menuRoutes from "./routes/menu.routes.js";
import reservationRoutes from "./routes/reservation.routes.js";
import authRoutes from "./routes/auth.routes.js";
import payrollRoutes from "./routes/payroll.routes.js";
import employeeRoutes from "./routes/employee.routes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const clientDistPath = path.resolve(__dirname, "../../client/dist");

app.use(
  cors({
    origin: "https://the-argente-vine.onrender.com",
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

app.use(express.static(clientDistPath));

app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api/")) {
    return res.sendFile(path.join(clientDistPath, "index.html"));
  }

  next();
});

export default app;
