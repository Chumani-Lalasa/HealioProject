const express = require("express");
const HealthReport = require("../models/HealthReport");
const healthRoutes = express.Router();
const authMiddleware = require('../middleware/authMiddleware');


// ✅ Store Health Report (with logged-in user ID)
healthRoutes.post("/add-report", authMiddleware, async (req, res) => {
    try {
      const userId = req.user.id; // Extracted from the token
      const report = new HealthReport({ ...req.body, userId });
      await report.save();
      res.status(201).json({ message: "Report saved successfully!" });
    } catch (error) {
      res.status(500).json({ error: "Failed to save report" });
    }
  });

// ✅ Get all reports for a user
healthRoutes.get("/reports/:userId", async (req, res) => {
  try {
    const reports = await HealthReport.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reports" });
  }
});

// ✅ AI Analysis Logic
healthRoutes.post("/analyze", async (req, res) => {
  try {
    const { heartRate, bloodPressure, bloodSugar, sleepHours, steps } = req.body;

    let analysis = { riskLevel: "Normal", recommendations: [] };

    if (heartRate > 100) {
      analysis.riskLevel = "High Risk";
      analysis.recommendations.push("Monitor heart rate and reduce stress.");
    }

    const [systolic, diastolic] = bloodPressure.split("/").map(Number);
    if (systolic > 140 || diastolic > 90) {
      analysis.riskLevel = "High Risk";
      analysis.recommendations.push("Check with a doctor about high blood pressure.");
    }

    if (bloodSugar > 140) {
      analysis.recommendations.push("Maintain a balanced diet and exercise.");
    }

    if (sleepHours < 5) {
      analysis.recommendations.push("Increase sleep to at least 6-8 hours per night.");
    }

    if (steps < 5000) {
      analysis.recommendations.push("Increase daily activity to at least 10,000 steps.");
    }

    res.status(200).json(analysis);
  } catch (error) {
    res.status(500).json({ error: "Analysis failed" });
  }
});

module.exports = healthRoutes;
