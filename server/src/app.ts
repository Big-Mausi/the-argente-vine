import express from "express";
import cors from "cors";
import contactRoutes from "./routes/contact.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/contact", contactRoutes);
app.get("/api/health", (_req, res) => {
  res.send("The Argenté Vine API is running");
});

export default app;
