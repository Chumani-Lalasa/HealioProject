const mongoose = require("mongoose");

const HealthReportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  symptoms: { type: [String], required: true },
  medicalHistory: { type: String },
  aiAnalysis: { type: String }, // AI-Generated Report
}, { timestamps: true });

module.exports = mongoose.model("HealthReport", HealthReportSchema);
