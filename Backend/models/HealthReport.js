const mongoose = require("mongoose");

const HealthReportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  weight: { type: Number },
  height: { type: Number },
  heartRate: { type: Number },
  bloodPressureSystolic: { type: Number },
  bloodPressureDiastolic: { type: Number },
  oxygenLevel: { type: Number },
  temperature: { type: Number },
  exerciseFrequency: { type: String },
  dietType: { type: String },
  sleepHours: { type: Number },
  existingConditions: { type: String },
  medications: { type: String },
  familyHistory: { type: String },
  symptoms: { type: [String], default: [] },
  medicalHistory: { type: String },
  aiAnalysis: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("HealthReport", HealthReportSchema);
