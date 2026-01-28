import express from "express";

const app = express();

// Middleware to parse JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.send("YouTube Clone API is running");
});

export default app;
