import express from "express";
import cors from "cors";
import contactRoutes from "./routes/contact.routes.js";
import menuRoutes from "./routes/menu.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.send("The Argenté Vine API is running");
});

app.use("/contact", contactRoutes);
app.use("/api/menu", menuRoutes);
export default app;
