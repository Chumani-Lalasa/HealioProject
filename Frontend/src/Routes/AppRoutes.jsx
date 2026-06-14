import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import LandingPage from '../Pages/LandingPage';
import Dashboard from '../Components/Dashboard';
import HealthReportForm from '../Pages/HealthReportForm';
import Chatbot from '../Pages/Chatbot';
import Settings from '../Pages/Settings';
import Signin from '../Pages/Signin';
import Signup from '../Pages/Signup';
import SkinDiseaseAnalyzer from '../Pages/SkinDiseaseAnalyzer';

const AUTH_ROUTES = ['/signin', '/signup'];
const NO_SIDEBAR_ROUTES = ['/', ...AUTH_ROUTES];

const AppLayout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const hideSidebar = NO_SIDEBAR_ROUTES.includes(location.pathname);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {!hideSidebar && (
        <Sidebar
          isOpen={sidebarOpen}
          toggleSidebar={() => setSidebarOpen((o) => !o)}
        />
      )}
      <main
        className={`flex-1 transition-all duration-300 ${
          !hideSidebar ? 'lg:ml-64' : ''
        }`}
      >
        {/* Mobile topbar for authenticated pages */}
        {!hideSidebar && (
          <div className="lg:hidden flex items-center h-14 px-4 bg-white border-b border-gray-200 sticky top-0 z-10">
            <button
              onClick={() => setSidebarOpen((o) => !o)}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <span className="ml-3 font-semibold text-gray-900">HealthTrack</span>
          </div>
        )}
        <Routes>
          <Route path="/"             element={<LandingPage />} />
          <Route path="/dashboard"    element={<Dashboard />} />
          <Route path="/reports"      element={<HealthReportForm />} />
          <Route path="/chatbot"      element={<Chatbot />} />
          <Route path="/settings"     element={<Settings />} />
          <Route path="/signin"       element={<Signin />} />
          <Route path="/signup"       element={<Signup />} />
          <Route path="/skinanalysis" element={<SkinDiseaseAnalyzer />} />
        </Routes>
      </main>
    </div>
  );
};

const AppRoutes = () => (
  <Router>
    <AppLayout />
  </Router>
);

export default AppRoutes;
