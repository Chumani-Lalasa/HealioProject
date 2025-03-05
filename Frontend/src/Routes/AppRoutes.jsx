import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
// import LandingPage from './pages/LandingPage';
// import HealthTrackDashboard from './pages/HealthTrackDashboard';
// import HealthReportForm from './pages/HealthReportForm';
// import Chatbot from './pages/Chatbot';
// import Settings from './pages/Settings';
import LandingPage from '../Pages/LandingPage';
import HealthTrackDashboard from '../Components/HealthTrackDashboard';
import HealthReportForm from '../Pages/HealthReportForm';
import Chatbot from '../Pages/Chatbot';
import Settings from '../Pages/Settings';
import Signin from '../Pages/Signin';
import Signup from '../Pages/Signup';
import SkinDiseaseAnalyzer from '../Pages/SkinDiseaseAnalyzer';

const AppLayout = () => {
  const location = useLocation();  // Get current route

  // Hide Sidebar only on the home page
  const hideSidebar = location.pathname === '/';

  return (
    <div className="flex">
      {!hideSidebar && <Sidebar />}  {/* Render Sidebar only when not on home page */}
      <div className={`flex-1 p-6 ${!hideSidebar ? 'ml-64' : ''}`}>  
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<HealthTrackDashboard />} />
          <Route path="/reports" element={<HealthReportForm />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/settings" element={<Settings />} />
          <Route path='/signin' element={<Signin />}/>
          <Route path='/signup' element={<Signup />}/>
          <Route path='skinanalysis' element={<SkinDiseaseAnalyzer />}/>
        </Routes>
      </div>
    </div>
  );
};

const AppRoutes = () => {
  return (
      <AppLayout />
  );
};

export default AppRoutes;