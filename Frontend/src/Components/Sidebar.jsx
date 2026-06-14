import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, FileText, MessageSquare, Settings,
  Activity, LogOut, Home, Scan, ChevronLeft, ChevronRight, Heart
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState({ name: 'User', email: '' });

  useEffect(() => {
    try {
      const stored = localStorage.getItem('user');
      if (stored) setUser(JSON.parse(stored));
    } catch {
      // no stored user
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/signin');
  };

  const navLinks = [
    { name: 'Home',              icon: <Home size={20} />,           path: '/' },
    { name: 'Dashboard',         icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'Health Reports',    icon: <FileText size={20} />,        path: '/reports' },
    { name: 'AI Chatbot',        icon: <MessageSquare size={20} />,   path: '/chatbot' },
    { name: 'Skin Analyzer',     icon: <Scan size={20} />,            path: '/skinanalysis' },
    { name: 'Activity',          icon: <Activity size={20} />,        path: '/activity' },
    { name: 'Settings',          icon: <Settings size={20} />,        path: '/settings' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-30 flex flex-col bg-gray-900 transition-all duration-300
          ${collapsed ? 'w-16' : 'w-64'}
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className={`flex items-center h-16 px-4 border-b border-gray-800 ${collapsed ? 'justify-center' : 'gap-3'}`}>
          <div className="w-8 h-8 flex-shrink-0 rounded-lg bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center">
            <Heart size={15} className="text-white" />
          </div>
          {!collapsed && <span className="text-white font-bold text-base">HealthTrack</span>}
        </div>

        {/* User info */}
        {!collapsed && (
          <div className="px-4 py-4 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                {user.name ? user.name[0].toUpperCase() : 'U'}
              </div>
              <div className="overflow-hidden">
                <p className="text-white text-sm font-medium truncate">{user.name || 'User'}</p>
                <p className="text-gray-400 text-xs truncate">{user.email || 'user@email.com'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Nav links */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1 px-2">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                    ${isActive
                      ? 'bg-sky-500/20 text-sky-400 border-l-2 border-sky-500'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white border-l-2 border-transparent'
                    }
                    ${collapsed ? 'justify-center' : ''}`
                  }
                  title={collapsed ? link.name : undefined}
                  onClick={() => {
                    if (isOpen && toggleSidebar) toggleSidebar();
                  }}
                >
                  <span className="flex-shrink-0">{link.icon}</span>
                  {!collapsed && <span>{link.name}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Collapse toggle (desktop only) */}
        <button
          className="hidden lg:flex items-center justify-center h-10 border-t border-gray-800 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 px-5 py-4 text-gray-400 hover:text-red-400 hover:bg-gray-800 transition-colors border-t border-gray-800 ${collapsed ? 'justify-center px-0' : ''}`}
          title={collapsed ? 'Logout' : undefined}
        >
          <LogOut size={20} className="flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
