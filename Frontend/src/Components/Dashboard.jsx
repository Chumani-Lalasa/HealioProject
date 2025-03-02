import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Activity, Heart, Thermometer, TrendingUp, Plus, FileText, MessageSquare, Droplet, Moon } from 'lucide-react';
// import { Heart, Calendar, MessageSquare, AlertTriangle, Settings, Home, FileText, Activity, Droplet, Moon, BarChart2, ChevronRight, Menu, X } from 'lucide-react';
// import LoadingSpinner from './LoadingSpinner';
import LoadingSpinner from './LoadSpinner';
import HealthCard from './HealthTrackDashboard';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [healthData, setHealthData] = useState(null);
  const [trendData, setTrendData] = useState([]);
  const [activeMetric, setActiveMetric] = useState('heartRate');

  // Sample user data
  const userData = {
    name: "Alex Johnson",
    avatar: "/api/placeholder/80/80",
    heartRate: 72,
    bloodPressure: { systolic: 122, diastolic: 81 },
    bloodSugar: 105,
    caloriesBurned: 1250,
    steps: 8742,
    hydration: 65,
    sleepHours: 7.5
  };

  const healthHistory = {
    heartRate: [68, 72, 75, 71, 69, 72, 70],
    bloodPressure: [
      {systolic: 120, diastolic: 80},
      {systolic: 122, diastolic: 81},
      {systolic: 118, diastolic: 79},
      {systolic: 121, diastolic: 82},
      {systolic: 123, diastolic: 83},
      {systolic: 119, diastolic: 80},
      {systolic: 122, diastolic: 81}
    ],
    steps: [6500, 7200, 8100, 9500, 7800, 8300, 8742]
  };
  
  // COLORS for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  useEffect(() => {
    // Fetch user health data
    const fetchHealthData = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        const response = await fetch('/api/health/summary');
        const data = await response.json();
        setHealthData(data);
        
        // Fetch trend data for the active metric
        const trendResponse = await fetch(`/api/health/trends?metric=${activeMetric}`);
        const trendData = await trendResponse.json();
        setTrendData(trendData);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching health data:', error);
        setLoading(false);
      }
    };
    
    fetchHealthData();
  }, [activeMetric]);
  
  // Mock data for demo purposes (remove in production)
  const mockHealthData = {
    heartRate: { value: 72, unit: 'bpm', status: 'normal' },
    bloodPressure: { systolic: 120, diastolic: 80, status: 'normal' },
    bloodSugar: { value: 95, unit: 'mg/dL', status: 'normal' },
    caloriesBurned: { value: 1850, unit: 'cal', status: 'good' },
    sleepHours: { value: 7.5, unit: 'hours', status: 'good' },
    steps: { value: 8427, unit: 'steps', status: 'good' }
  };
  
  const mockTrendData = {
    heartRate: [
      { day: 'Mon', value: 68 },
      { day: 'Tue', value: 72 },
      { day: 'Wed', value: 76 },
      { day: 'Thu', value: 74 },
      { day: 'Fri', value: 72 },
      { day: 'Sat', value: 75 },
      { day: 'Sun', value: 73 }
    ],
    bloodPressure: [
      { day: 'Mon', systolic: 118, diastolic: 78 },
      { day: 'Tue', systolic: 120, diastolic: 80 },
      { day: 'Wed', systolic: 122, diastolic: 82 },
      { day: 'Thu', systolic: 119, diastolic: 79 },
      { day: 'Fri', systolic: 121, diastolic: 81 },
      { day: 'Sat', systolic: 118, diastolic: 78 },
      { day: 'Sun', systolic: 120, diastolic: 80 }
    ],
    bloodSugar: [
      { day: 'Mon', value: 92 },
      { day: 'Tue', value: 95 },
      { day: 'Wed', value: 98 },
      { day: 'Thu', value: 94 },
      { day: 'Fri', value: 93 },
      { day: 'Sat', value: 97 },
      { day: 'Sun', value: 95 }
    ],
    caloriesBurned: [
      { day: 'Mon', value: 1750 },
      { day: 'Tue', value: 1820 },
      { day: 'Wed', value: 1950 },
      { day: 'Thu', value: 1800 },
      { day: 'Fri', value: 1900 },
      { day: 'Sat', value: 2100 },
      { day: 'Sun', value: 1650 }
    ]
  };
  
  // Use mock data if real data is not available
  useEffect(() => {
    if (!healthData && !loading) {
      setHealthData(mockHealthData);
      setTrendData(mockTrendData[activeMetric]);
    }
  }, [healthData, loading, activeMetric]);
  
  // Activity distribution data for pie chart
  const activityData = [
    { name: 'Walking', value: 45 },
    { name: 'Running', value: 15 },
    { name: 'Cycling', value: 20 },
    { name: 'Swimming', value: 10 },
    { name: 'Other', value: 10 }
  ];
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  const renderLineChart = () => {
    if (activeMetric === 'bloodPressure') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData || mockTrendData.bloodPressure}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="systolic" stroke="#8884d8" name="Systolic" />
            <Line type="monotone" dataKey="diastolic" stroke="#82ca9d" name="Diastolic" />
          </LineChart>
        </ResponsiveContainer>
      );
    }
    
    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={trendData || mockTrendData[activeMetric]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#8884d8" 
            name={activeMetric === 'heartRate' ? 'Heart Rate (bpm)' : 
                 activeMetric === 'bloodSugar' ? 'Blood Sugar (mg/dL)' : 
                 'Calories Burned (cal)'} 
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  // Progress indicator component
  const CircularProgress = ({ value, max, color, size = 120, icon, label }) => {
    const radius = size / 2 - 10;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / max) * circumference;
    
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="relative" style={{ width: size, height: size }}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <circle
              cx={size/2}
              cy={size/2}
              r={radius}
              stroke="#e6e6e6"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx={size/2}
              cy={size/2}
              r={radius}
              stroke={color}
              strokeWidth="8"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform={`rotate(-90 ${size/2} ${size/2})`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {icon}
            <span className="text-2xl font-bold">{value}</span>
          </div>
        </div>
        <span className="mt-2 text-sm font-medium text-gray-600">{label}</span>
      </div>
    );
  };
  
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 mt-16">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Health Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          Welcome back! Here's an overview of your health metrics.
        </p>
      </div>
      
      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
        <button className="flex items-center justify-center p-4 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
          <FileText className="mr-2" size={20} />
          <span>Upload Report</span>
        </button>
        <button className="flex items-center justify-center p-4 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors">
          <MessageSquare className="mr-2" size={20} />
          <span>Ask AI</span>
        </button>
        <button className="flex items-center justify-center p-4 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
          <Activity className="mr-2" size={20} />
          <span>Log Activity</span>
        </button>
        <button className="flex items-center justify-center p-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
          <Plus className="mr-2" size={20} />
          <span>Add Metric</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Heart Rate Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center">
            <CircularProgress 
              value={userData.heartRate} 
              max={200} 
              color="#FF5A5A" 
              icon={<Heart size={24} color="#FF5A5A" className="mb-1" />}
              label="Heart Rate (BPM)"
            />
          </div>
          
          {/* Blood Pressure Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4 text-center">Blood Pressure</h3>
            <div className="flex justify-center items-center space-x-4">
              <div className="text-center">
                <span className="text-3xl font-bold text-red-500">{userData.bloodPressure.systolic}</span>
                <p className="text-sm text-gray-600">Systolic</p>
              </div>
              <span className="text-xl font-bold text-gray-400">/</span>
              <div className="text-center">
                <span className="text-3xl font-bold text-blue-500">{userData.bloodPressure.diastolic}</span>
                <p className="text-sm text-gray-600">Diastolic</p>
              </div>
            </div>
            <div className="mt-4 h-4 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500"
                style={{ width: `${(userData.bloodPressure.systolic / 180) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>Normal</span>
              <span>Elevated</span>
              <span>High</span>
            </div>
          </div>
          
          {/* Blood Sugar Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4 text-center">Blood Sugar</h3>
            <div className="flex justify-center mb-4">
              <span className="text-4xl font-bold text-purple-600">{userData.bloodSugar}</span>
              <span className="ml-1 text-sm self-end mb-1 text-gray-500">mg/dL</span>
            </div>
            <div className="relative h-16">
              <div className="absolute inset-0 flex items-center">
                <div className="h-1 w-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full"></div>
              </div>
              <div 
                className="absolute h-4 w-4 bg-white border-2 border-purple-600 rounded-full top-1/2 transform -translate-y-1/2"
                style={{ left: `${(userData.bloodSugar / 250) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>70</span>
              <span>100</span>
              <span>140</span>
              <span>200+</span>
            </div>
          </div>
          
          {/* Activity Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4 text-center">Daily Activity</h3>
            <div className="flex justify-between">
              <div className="text-center">
                <Activity size={24} className="mx-auto mb-2 text-orange-500" />
                <span className="text-2xl font-bold text-gray-800">{userData.caloriesBurned}</span>
                <p className="text-xs text-gray-500">calories</p>
              </div>
              <div className="h-16 w-px bg-gray-200"></div>
              <div className="text-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2 text-blue-500">
                  <path d="M19 5.5v13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                  <line x1="7" y1="10" x2="17" y2="10"></line>
                  <line x1="7" y1="14" x2="17" y2="14"></line>
                  <line x1="7" y1="18" x2="12" y2="18"></line>
                </svg>
                <span className="text-2xl font-bold text-gray-800">{userData.steps.toLocaleString()}</span>
                <p className="text-xs text-gray-500">steps</p>
              </div>
            </div>
            <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500"
                style={{ width: `${(userData.steps / 10000) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-right mt-1 text-gray-500">87% of daily goal</p>
          </div>
          
          {/* Hydration Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4 text-center">Hydration</h3>
            <div className="relative w-32 h-32 mx-auto">
              <svg viewBox="0 0 100 100">
                <path 
                  d="M50,10 C50,10 90,40 90,70 C90,85 75,95 50,95 C25,95 10,85 10,70 C10,40 50,10 50,10 Z" 
                  fill="#EBF8FF"
                  stroke="#4299E1"
                  strokeWidth="2"
                />
                <path 
                  d="M50,10 C50,10 90,40 90,70 C90,85 75,95 50,95 C25,95 10,85 10,70 C10,40 50,10 50,10 Z" 
                  fill="#4299E1"
                  transform={`translate(0,${100 - userData.hydration})`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Droplet size={20} className="mx-auto text-blue-600" />
                  <span className="text-2xl font-bold">{userData.hydration}%</span>
                </div>
              </div>
            </div>
            <p className="text-center text-sm mt-2 text-gray-600">1.3L / 2L daily goal</p>
          </div>
          
          {/* Sleep Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4 text-center">Sleep Analysis</h3>
            <div className="flex items-center justify-center mb-4">
              <Moon size={24} className="mr-2 text-indigo-600" />
              <span className="text-3xl font-bold">{userData.sleepHours}</span>
              <span className="ml-1 text-sm self-end mb-1 text-gray-500">hours</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="w-full bg-gray-200 h-3 rounded-full">
                <div className="bg-indigo-600 h-3 rounded-full" style={{ width: `${(userData.sleepHours / 9) * 100}%` }}></div>
              </div>
            </div>
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>Poor</span>
              <span>Good</span>
              <span>Excellent</span>
            </div>
            <div className="flex justify-between mt-4 text-xs">
              <div className="text-center">
                <div className="h-8 w-4 bg-indigo-200 mx-auto rounded-t-sm"></div>
                <span>Deep</span>
              </div>
              <div className="text-center">
                <div className="h-16 w-4 bg-indigo-400 mx-auto rounded-t-sm"></div>
                <span>Light</span>
              </div>
              <div className="text-center">
                <div className="h-6 w-4 bg-indigo-600 mx-auto rounded-t-sm"></div>
                <span>REM</span>
              </div>
              <div className="text-center">
                <div className="h-2 w-4 bg-gray-300 mx-auto rounded-t-sm"></div>
                <span>Awake</span>
              </div>
            </div>
          </div>
        </div>
      
      {/* Charts Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h2 className="text-lg font-medium text-gray-900">
            {activeMetric === 'heartRate' ? 'Heart Rate Trends' :
             activeMetric === 'bloodPressure' ? 'Blood Pressure Trends' :
             activeMetric === 'bloodSugar' ? 'Blood Sugar Trends' :
             'Calories Burned Trends'}
          </h2>
          <div className="mt-2 sm:mt-0">
            <select 
              className="form-select rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={activeMetric}
              onChange={(e) => setActiveMetric(e.target.value)}
            >
              <option value="heartRate">Heart Rate</option>
              <option value="bloodPressure">Blood Pressure</option>
              <option value="bloodSugar">Blood Sugar</option>
              <option value="caloriesBurned">Calories Burned</option>
            </select>
          </div>
        </div>
        
        {renderLineChart()}
      </div>
      
      {/* Additional Health Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Activity Distribution */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Activity Distribution</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={activityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {activityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Health Insights */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Health Insights</h2>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 text-blue-800 rounded-md">
              <h3 className="font-medium mb-1">Great progress!</h3>
              <p className="text-sm">Your average heart rate has decreased by 5 bpm this week. Keep up the good work!</p>
            </div>
            <div className="p-4 bg-yellow-50 text-yellow-800 rounded-md">
              <h3 className="font-medium mb-1">Improvement needed</h3>
              <p className="text-sm">Your activity level is slightly below target. Try to add 20 minutes of walking each day.</p>
            </div>
            <div className="p-4 bg-green-50 text-green-800 rounded-md">
              <h3 className="font-medium mb-1">Sleep quality improved</h3>
              <p className="text-sm">Your sleep duration and quality have improved by 15% compared to last month.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;