const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import routes
const questionRoutes = require("./routes/questions");
const submissionRoutes = require("./routes/submissions");
const statsRoutes = require("./routes/stats");

const app = express();

app.use(cors());
app.use(express.json());

// IMPORTANT: Routes must be added BEFORE the health check
app.use("/api/questions", questionRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/stats", statsRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "QOTD API is running" });
});

// 404 handler - MUST BE LAST
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
