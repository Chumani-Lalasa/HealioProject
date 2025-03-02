const mongoose = require("mongoose");

const HealthReportSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  heartRate: { type: Number, required: true },
  bloodPressure: { type: String, required: true }, // e.g., "120/80"
  bloodSugar: { type: Number, required: true },
  sleepHours: { type: Number, required: true },
  steps: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("HealthReport", HealthReportSchema);
