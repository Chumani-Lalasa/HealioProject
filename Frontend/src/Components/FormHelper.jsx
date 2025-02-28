import React from 'react';

// Normal ranges and helper text for various health metrics
const healthRanges = {
  weight: {
    check: (value) => value > 0,
    hint: "For adults, a healthy BMI is typically between 18.5-24.9"
  },
  height: {
    check: (value) => value > 0,
    hint: "Average adult height varies by region and gender"
  },
  heartRate: {
    check: (value) => value >= 60 && value <= 100,
    hint: "Normal resting heart rate: 60-100 bpm",
    warning: (value) => {
      if (value < 60) return "Below normal range (bradycardia)";
      if (value > 100) return "Above normal range (tachycardia)";
      return null;
    }
  },
  bloodPressure: {
    check: (value) => {
      if (!value.includes('/')) return false;
      const [systolic, diastolic] = value.split('/').map(Number);
      return (
        systolic >= 90 && systolic <= 120 && 
        diastolic >= 60 && diastolic <= 80
      );
    },
    hint: "Normal range: 90-120/60-80 mmHg",
    warning: (value) => {
      if (!value.includes('/')) return null;
      const [systolic, diastolic] = value.split('/').map(Number);
      
      if (systolic < 90 || diastolic < 60) 
        return "Below normal range (hypotension)";
      if ((systolic >= 120 && systolic < 130) && diastolic < 80) 
        return "Elevated";
      if ((systolic >= 130 && systolic < 140) || (diastolic >= 80 && diastolic < 90)) 
        return "Stage 1 hypertension";
      if (systolic >= 140 || diastolic >= 90) 
        return "Stage 2 hypertension";
      if (systolic > 180 || diastolic > 120) 
        return "Hypertensive crisis - seek medical attention";
      
      return null;
    }
  },
  oxygenLevel: {
    check: (value) => value >= 95 && value <= 100,
    hint: "Normal range: 95-100%",
    warning: (value) => {
      if (value < 95 && value >= 90) return "Slightly below normal";
      if (value < 90) return "Low oxygen saturation - medical attention may be needed";
      return null;
    }
  },
  temperature: {
    check: (value) => value >= 36.1 && value <= 37.2,
    hint: "Normal range: 36.1-37.2°C (97-99°F)",
    warning: (value) => {
      if (value < 36.1) return "Below normal (hypothermia)";
      if (value > 37.2 && value <= 38) return "Slightly elevated";
      if (value > 38) return "Fever - consider medical advice";
      return null;
    }
  },
  sleepHours: {
    check: (value) => value >= 7 && value <= 9,
    hint: "Recommended for adults: 7-9 hours",
    warning: (value) => {
      if (value < 7) return "Below recommended amount";
      if (value > 9) return "Above typical recommendation";
      return null;
    }
  }
};

const FormHelper = ({ fieldName, value }) => {
  // Return nothing if no value, no field match, or field doesn't have ranges
  if (!value || !healthRanges[fieldName]) return null;
  
  const field = healthRanges[fieldName];
  const isNormal = field.check(value);
  const warning = field.warning ? field.warning(value) : null;
  
  return (
    <div className="mt-1 text-sm">
      <span className="text-gray-500">{field.hint}</span>
      
      {warning && (
        <p className={`mt-1 font-medium ${isNormal ? 'text-green-600' : 'text-red-600'}`}>
          {warning}
        </p>
      )}
      
      {!warning && !isNormal && field.warning && (
        <p className="mt-1 font-medium text-yellow-600">
          Outside normal range
        </p>
      )}
    </div>
  );
};

export default FormHelper;