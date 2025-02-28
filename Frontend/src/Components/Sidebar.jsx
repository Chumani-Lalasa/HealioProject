import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, MessageSquare, Settings, Users, Activity, LogOut, HomeIcon, GitGraph } from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [userRole, setUserRole] = useState('user');
  
//   useEffect(() => {
//     // Fetch user role when component mounts
//     const fetchUserRole = async () => {
//       try {
//         // Replace with your actual API endpoint
//         const response = await fetch('/api/user/role');
//         const data = await response.json();
//         setUserRole(data.role);
//       } catch (error) {
//         console.error('Error fetching user role:', error);
//       }
//     };
    
//     fetchUserRole();
//   }, []);
  
//   const handleLogout = async () => {
//     try {
//       // Replace with your actual logout endpoint
//       await fetch('/api/auth/logout', { method: 'POST' });
//       window.location.href = '/login';
//     } catch (error) {
//       console.error('Error logging out:', error);
//     }
//   };
  
  // Common navigation links for all users
  
  const navLinks = [
    {
      name: 'Home',
      icon: <HomeIcon size={20} />,
      path: '/home'
    },
    {
      name: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
      path: '/dashboard',
    },
    {
      name: 'Health Reports',
      icon: <FileText size={20} />,
      path: '/reports',
    },
    {
      name: 'AI Chatbot',
      icon: <MessageSquare size={20} />,
      path: '/chatbot',
    },
    {
      name: 'Skin Disease Analysis',
      icon: <GitGraph size={20}/>,
      path: '/skinanalysis',
    },
    {
      name: 'Settings',
      icon: <Settings size={20} />,
      path: '/settings',
    },
  ];
  
  // Admin-only links
  const adminLinks = [
    {
      name: 'User Management',
      icon: <Users size={20} />,
      path: '/admin/users',
    },
  ];
  
  // Determine which links to show based on user role
  const linksToShow = userRole === 'admin' 
    ? [...navLinks, ...adminLinks] 
    : navLinks;
  
  return (
    <>
      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between h-16 px-4 bg-gray-800">
            <span className="text-xl font-bold text-white">HealthTrack</span>
            <button 
              className="text-gray-300 hover:text-white lg:hidden"
              onClick={toggleSidebar}
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Navigation links */}
          <nav className="flex-1 px-2 py-4 overflow-y-auto">
            <ul className="space-y-1">
              {linksToShow.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) => 
                      `flex items-center px-4 py-3 text-sm font-medium rounded-md group transition-colors ${
                        isActive 
                          ? 'bg-blue-800 text-white' 
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className={`mr-3 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                          {link.icon}
                        </span>
                        {link.name}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Logout button */}
          <div className="p-4 border-t border-gray-700">
            <button
            //   onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white transition-colors"
            >
              <LogOut size={20} className="mr-3 text-gray-400" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;