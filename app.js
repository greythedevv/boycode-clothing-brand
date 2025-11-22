const express = require("express");
const app = express();

const clothingRoutes = require("./routes/clothingRoutes");
const logger = require("./middleware/logger");
// const errorHandler = require("./middleware/errorHandler");

app.use(express.json());

app.use(logger);

app.use("/api/clothing", clothingRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// app.use(errorHandler);

module.exports = app;
