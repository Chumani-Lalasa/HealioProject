import React, { useState } from 'react';
import { Heart, Calendar, MessageSquare, AlertTriangle, Settings, Home, FileText, Activity, Droplet, Moon, BarChart2, ChevronRight, Menu, X } from 'lucide-react';

const HealthTrackDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  
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
  
  // Sample health metrics history for graphs
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
  
  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };
  
  // Sidebar navigation items
  const navItems = [
    { icon: <Home size={20} />, label: "Dashboard", active: true },
    { icon: <FileText size={20} />, label: "Health Reports" },
    { icon: <Calendar size={20} />, label: "Appointments" },
    { icon: <AlertTriangle size={20} />, label: "Emergency Contacts" },
    { icon: <MessageSquare size={20} />, label: "AI Chatbot" },
    { icon: <Settings size={20} />, label: "Settings" }
  ];
  
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
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 bg-white rounded-full shadow-md"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      
      {/* Sidebar */}
      {/* <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed md:relative z-40 h-full w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out md:translate-x-0`}>
        <div className="flex items-center justify-center h-16 border-b">
          <h1 className="text-xl font-bold text-blue-600">HealthTrack</h1>
        </div>
        <div className="p-4">
          <div className="flex items-center mb-6">
            <img 
              src={userData.avatar} 
              alt="User Avatar" 
              className="w-10 h-10 rounded-full mr-3" 
            />
            <div>
              <p className="font-semibold">{userData.name}</p>
              <p className="text-xs text-gray-500">Premium Member</p>
            </div>
          </div>
          
          <nav>
            <ul>
              {navItems.map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className={`flex items-center px-4 py-3 mb-2 rounded-lg ${item.active ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.label}</span>
                    {item.active && <ChevronRight size={16} className="ml-auto" />}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div> */}
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{getGreeting()}, {userData.name}!</h2>
              <p className="text-gray-600">Here's your latest health update.</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">{currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
              <p className="text-sm font-medium text-blue-600">Last updated: 1h ago</p>
            </div>
          </div>
        </div>
        
        {/* Health Metrics Grid */}
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
        
        {/* AI Health Insights */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <BarChart2 size={20} className="mr-2 text-blue-600" />
            AI-Powered Health Insights
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-medium text-yellow-800">Risk Analysis</h4>
              <p className="text-sm text-yellow-700">Your BP levels suggest a risk of hypertension. Consider reducing sodium intake and monitoring regularly.</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <h4 className="font-medium text-blue-800">Recommendations</h4>
              <p className="text-sm text-blue-700">Drink 2L of water daily to stay hydrated. You're currently at 65% of your hydration goal.</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
              <h4 className="font-medium text-green-800">Predictive Analytics</h4>
              <p className="text-sm text-green-700">Your heart rate variation suggests better sleep quality. Keep maintaining your sleep schedule.</p>
            </div>
          </div>
        </div>
        
        {/* Health Reports & Trends */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Health Reports & Trends</h3>
          <div className="h-64 w-full relative">
            <div className="absolute top-0 left-0 text-xs text-gray-500">BPM</div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200"></div>
            <div className="absolute top-0 bottom-0 left-0 w-px bg-gray-200"></div>
            
            {/* Heart rate line */}
            <svg className="w-full h-full" viewBox="0 0 700 240" preserveAspectRatio="none">
              <polyline
                points="0,180 100,156 200,120 300,144 400,132 500,138 600,150 700,150"
                fill="none"
                stroke="#FF5A5A"
                strokeWidth="2"
              />
              <g>
                {healthHistory.heartRate.map((rate, i) => (
                  <circle key={i} cx={100 * i} cy={240 - rate * 2} r="4" fill="#FF5A5A" />
                ))}
              </g>
            </svg>
            
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 pt-2">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <span className="text-sm">Heart Rate</span>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-full">Weekly</button>
              <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full">Monthly</button>
              <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full">Yearly</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* AI Chatbot */}
      <div className="fixed bottom-6 right-6">
        <button className="w-14 h-14 bg-blue-600 rounded-full shadow-lg flex items-center justify-center">
          <MessageSquare size={24} color="white" />
        </button>
      </div>
      
      {/* Emergency Contact Button */}
      <div className="fixed bottom-6 left-6 md:left-72">
        <button className="px-4 py-2 bg-red-600 text-white rounded-full shadow-lg flex items-center">
          <AlertTriangle size={16} className="mr-2" />
          SOS Emergency
        </button>
      </div>
    </div>
  );
};

export default HealthTrackDashboard;