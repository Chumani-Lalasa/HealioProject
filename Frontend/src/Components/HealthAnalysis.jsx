import React, { useState } from 'react';

const HealthAnalysis = ({ data }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Sample data format (this would come from your API)
  // const data = {
  //   overview: {
  //     score: 75,
  //     summary: "Your health indicators show mostly normal values with a few areas of concern."
  //   },
  //   insights: [
  //     { category: "Vitals", status: "normal", message: "Your vital signs are within normal ranges." },
  //     { category: "Weight", status: "warning", message: "Your BMI is 27.5, which falls in the overweight category." },
  //     { category: "Lifestyle", status: "warning", message: "Your reported sleep hours are below recommended levels." }
  //   ],
  //   recommendations: [
  //     { priority: "high", message: "Increase sleep duration to 7-9 hours per night" },
  //     { priority: "medium", message: "Consider implementing a moderate exercise routine 3-4 times per week" },
  //     { priority: "medium", message: "Consult with a healthcare provider about your blood pressure" }
  //   ],
  //   risks: [
  //     { level: "moderate", condition: "Hypertension", message: "Your blood pressure readings indicate pre-hypertension" },
  //     { level: "low", condition: "Sleep Deficiency", message: "Chronic insufficient sleep may contribute to health issues" }
  //   ]
  // };
  
  if (!data) {
    return <div className="p-4 bg-gray-100 rounded-lg">No analysis data available</div>;
  }
  
  // Status color mappings
  const getStatusColor = (status) => {
    switch (status) {
      case 'normal': return 'bg-green-100 text-green-800 border-green-300';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'alert': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };
  
  // Priority color mappings
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-700';
      case 'medium': return 'text-orange-700';
      case 'low': return 'text-blue-700';
      default: return 'text-gray-700';
    }
  };
  
  // Risk level color mappings
  const getRiskColor = (level) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      case 'moderate': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'low': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-blue-600 text-white p-4">
        <h2 className="text-2xl font-bold">Health Analysis Results</h2>
        <p className="mt-1 opacity-90">Based on your reported health data</p>
      </div>
      
      {/* Overview Card */}
      <div className="p-4 flex flex-col md:flex-row items-center gap-4 bg-blue-50">
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold">{data.overview.score}</span>
          </div>
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke="#e5e7eb" 
              strokeWidth="8" 
            />
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke={data.overview.score > 80 ? "#10b981" : data.overview.score > 60 ? "#f59e0b" : "#ef4444"} 
              strokeWidth="8" 
              strokeDasharray={`${2 * Math.PI * 45 * data.overview.score / 100} ${2 * Math.PI * 45 * (100 - data.overview.score) / 100}`}
              strokeDashoffset={2 * Math.PI * 45 * 0.25}
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold">Health Score</h3>
          <p className="mt-2 text-gray-700">{data.overview.summary}</p>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 border-b-2 font-medium ${
              activeTab === 'overview' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Insights
          </button>
          <button
            onClick={() => setActiveTab('recommendations')}
            className={`py-3 px-4 border-b-2 font-medium ${
              activeTab === 'recommendations' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Recommendations
          </button>
          <button
            onClick={() => setActiveTab('risks')}
            className={`py-3 px-4 border-b-2 font-medium ${
              activeTab === 'risks' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Risk Factors
          </button>
        </nav>
      </div>
      
      {/* Tab Content */}
      <div className="p-4">
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Health Insights</h3>
            <div className="space-y-3">
              {data.insights.map((insight, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-lg border ${getStatusColor(insight.status)}`}
                >
                  <div className="font-medium">{insight.category}</div>
                  <div>{insight.message}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'recommendations' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Personalized Recommendations</h3>
            <ul className="space-y-2">
              {data.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className={`font-semibold ${getPriorityColor(recommendation.priority)}`}>
                    {recommendation.priority.charAt(0).toUpperCase() + recommendation.priority.slice(1)}:
                  </span>
                  <span>{recommendation.message}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {activeTab === 'risks' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Potential Risk Factors</h3>
            {data.risks.length === 0 ? (
              <p className="text-green-600">No significant risk factors identified.</p>
            ) : (
              <div className="space-y-3">
                {data.risks.map((risk, index) => (
                  <div 
                    key={index} 
                    className={`p-3 rounded-lg border ${getRiskColor(risk.level)}`}
                  >
                    <div className="font-medium">{risk.condition}</div>
                    <div>{risk.message}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="bg-gray-50 p-4 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          <strong>Disclaimer:</strong> This analysis is based on the information you provided and is not a medical diagnosis. 
          Always consult with a healthcare professional for proper medical advice.
        </p>
      </div>
    </div>
  );
};

export default HealthAnalysis;