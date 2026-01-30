import express from "express";
import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import channelRoutes from "./routes/channelRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";

const app = express();

// Middleware to parse JSON
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/channels", channelRoutes);
app.use("/api/videos", videoRoutes);

app.get("/", (req, res) => {
  res.send("YouTube Clone API is running");
});

export default app;
