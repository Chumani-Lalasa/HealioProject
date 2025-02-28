import React, { useState } from 'react';
// import VoiceInput from '../Components/VoiceInput';
// import FormHelper from './FormHelper';
// import HealthAnalysis from './HealthAnalysis';
import VoiceInput from '../Components/VoiceInput';
import FormHelper from '../Components/FormHelper';
import HealthAnalysis from '../Components/HealthAnalysis';

const HealthReportForm = () => {
  // Form state
  const [formData, setFormData] = useState({
    // Basic Info
    name: '',
    age: '',
    gender: '',
    weight: '',
    height: '',
    
    // Vital Signs
    heartRate: '',
    bloodPressureSystolic: '',
    bloodPressureDiastolic: '',
    oxygenLevel: '',
    temperature: '',
    
    // Lifestyle Details
    exerciseFrequency: '',
    dietType: '',
    sleepHours: '',
    
    // Medical History
    existingConditions: '',
    medications: '',
    familyHistory: ''
  });
  
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  // Handle voice input
  const handleVoiceInput = (field, text) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: text
    }));
  };
  
  // Submit and analyze data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Call to Health Data API to store information
      await fetch('/api/health-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      // Call to AI-based Health Analysis API
      const response = await fetch('/api/health-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      setAnalysisData(result);
      setShowAnalysis(true);
    } catch (error) {
      console.error('Error submitting health data:', error);
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">Health Report Form</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info Section */}
        <section className="p-4 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">1️⃣ Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Full Name</label>
              <div className="flex">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
                <VoiceInput onResult={(text) => handleVoiceInput('name', text)} />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Age</label>
              <div className="flex">
                <input
                  type="number"
                  name="age"
                  min="0"
                  max="120"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
                <VoiceInput onResult={(text) => handleVoiceInput('age', text)} />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-binary</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Weight (kg)</label>
              <div className="flex">
                <input
                  type="number"
                  name="weight"
                  min="0"
                  step="0.1"
                  value={formData.weight}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
                <VoiceInput onResult={(text) => handleVoiceInput('weight', text)} />
              </div>
              <FormHelper fieldName="weight" value={formData.weight} />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Height (cm)</label>
              <div className="flex">
                <input
                  type="number"
                  name="height"
                  min="0"
                  value={formData.height}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
                <VoiceInput onResult={(text) => handleVoiceInput('height', text)} />
              </div>
              <FormHelper fieldName="height" value={formData.height} />
            </div>
          </div>
        </section>
        
        {/* Vital Signs Section */}
        <section className="p-4 bg-green-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-green-600">2️⃣ Vital Signs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Heart Rate (bpm)</label>
              <div className="flex">
                <input
                  type="number"
                  name="heartRate"
                  min="0"
                  max="250"
                  value={formData.heartRate}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
                <VoiceInput onResult={(text) => handleVoiceInput('heartRate', text)} />
              </div>
              <FormHelper fieldName="heartRate" value={formData.heartRate} />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Blood Pressure (mmHg)</label>
              <div className="flex space-x-2">
                <div className="flex-1">
                  <input
                    type="number"
                    name="bloodPressureSystolic"
                    placeholder="Systolic"
                    min="0"
                    max="300"
                    value={formData.bloodPressureSystolic}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <span className="self-center">/</span>
                <div className="flex-1">
                  <input
                    type="number"
                    name="bloodPressureDiastolic"
                    placeholder="Diastolic"
                    min="0"
                    max="200"
                    value={formData.bloodPressureDiastolic}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <VoiceInput onResult={(text) => {
                  if (text.includes('/')) {
                    const [sys, dia] = text.split('/');
                    handleVoiceInput('bloodPressureSystolic', sys.trim());
                    handleVoiceInput('bloodPressureDiastolic', dia.trim());
                  }
                }} />
              </div>
              <FormHelper 
                fieldName="bloodPressure" 
                value={`${formData.bloodPressureSystolic}/${formData.bloodPressureDiastolic}`} 
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Oxygen Level (%)</label>
              <div className="flex">
                <input
                  type="number"
                  name="oxygenLevel"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData.oxygenLevel}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
                <VoiceInput onResult={(text) => handleVoiceInput('oxygenLevel', text)} />
              </div>
              <FormHelper fieldName="oxygenLevel" value={formData.oxygenLevel} />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Body Temperature (°C)</label>
              <div className="flex">
                <input
                  type="number"
                  name="temperature"
                  min="30"
                  max="45"
                  step="0.1"
                  value={formData.temperature}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
                <VoiceInput onResult={(text) => handleVoiceInput('temperature', text)} />
              </div>
              <FormHelper fieldName="temperature" value={formData.temperature} />
            </div>
          </div>
        </section>
        
        {/* Lifestyle Details Section */}
        <section className="p-4 bg-purple-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-purple-600">3️⃣ Lifestyle Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Exercise Frequency (per week)</label>
              <div className="flex">
                <select
                  name="exerciseFrequency"
                  value={formData.exerciseFrequency}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select</option>
                  <option value="none">None</option>
                  <option value="1-2 times">1-2 times</option>
                  <option value="3-4 times">3-4 times</option>
                  <option value="5+ times">5+ times</option>
                </select>
                <VoiceInput onResult={(text) => handleVoiceInput('exerciseFrequency', text)} />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Diet Type</label>
              <div className="flex">
                <select
                  name="dietType"
                  value={formData.dietType}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select</option>
                  <option value="regular">Regular/Omnivore</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="keto">Keto</option>
                  <option value="paleo">Paleo</option>
                  <option value="other">Other</option>
                </select>
                <VoiceInput onResult={(text) => handleVoiceInput('dietType', text)} />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Average Sleep (hours)</label>
              <div className="flex">
                <input
                  type="number"
                  name="sleepHours"
                  min="0"
                  max="24"
                  step="0.5"
                  value={formData.sleepHours}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
                <VoiceInput onResult={(text) => handleVoiceInput('sleepHours', text)} />
              </div>
              <FormHelper fieldName="sleepHours" value={formData.sleepHours} />
            </div>
          </div>
        </section>
        
        {/* Medical History Section */}
        <section className="p-4 bg-yellow-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-yellow-600">4️⃣ Medical History</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Existing Medical Conditions</label>
              <div className="flex">
                <textarea
                  name="existingConditions"
                  value={formData.existingConditions}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  rows="2"
                  placeholder="Diabetes, hypertension, asthma, etc."
                ></textarea>
                <VoiceInput onResult={(text) => handleVoiceInput('existingConditions', text)} />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Current Medications</label>
              <div className="flex">
                <textarea
                  name="medications"
                  value={formData.medications}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  rows="2"
                  placeholder="Name, dosage, frequency"
                ></textarea>
                <VoiceInput onResult={(text) => handleVoiceInput('medications', text)} />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Family Medical History</label>
              <div className="flex">
                <textarea
                  name="familyHistory"
                  value={formData.familyHistory}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  rows="2"
                  placeholder="Conditions present in immediate family members"
                ></textarea>
                <VoiceInput onResult={(text) => handleVoiceInput('familyHistory', text)} />
              </div>
            </div>
          </div>
        </section>
        
        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? 'Analyzing...' : 'Analyze Health'}
          </button>
        </div>
      </form>
      
      {/* Analysis Results */}
      {showAnalysis && analysisData && (
        <div className="mt-8">
          <HealthAnalysis data={analysisData} />
        </div>
      )}
    </div>
  );
};

export default HealthReportForm;
