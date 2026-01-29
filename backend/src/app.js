import express from "express";
import authRoutes from "./routes/authRoutes.js";


const app = express();

// Middleware to parse JSON
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("YouTube Clone API is running");
});

export default app;
