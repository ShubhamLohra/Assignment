import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user info from localStorage
    const userInfo = localStorage.getItem('user');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Pipeline', href: '/pipeline' },
  ];

  const isActive = (href) => {
    return location.pathname === href;
  };

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Redirect to login
    navigate('/login');
  };

  return (
    <div className="w-80 bg-white shadow-lg flex flex-col h-screen">
      {/* Logo - Static Section */}
      <div className="sidebar-logo h-20 px-8 py-4 border-b border-gray-200 flex items-center bg-white">
        <div className="flex items-center space-x-4 w-full">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
            <span className="text-white font-bold text-lg">TBS</span>
          </div>
          <span className="text-xl font-bold text-gray-900 whitespace-nowrap overflow-hidden">Brideside CRM</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="px-6 py-8 space-y-4 flex-1">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`
              block px-6 py-4 rounded-xl text-base font-semibold transition-all duration-200 shadow-sm
              ${isActive(item.href)
                ? 'bg-blue-500 text-white shadow-md transform scale-105'
                : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md hover:transform hover:scale-105'
              }
            `}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* User Section - Fixed at Bottom */}
      <div className="p-6 border-t border-gray-200 bg-white">
        <div className="flex items-center space-x-4 px-4 py-3 mb-4">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold text-blue-700">
              {user ? user.fullName?.charAt(0) || user.username?.charAt(0) || 'U' : 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {user ? user.fullName || 'Unknown User' : 'Unknown User'}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user ? user.email || user.username || 'No email' : 'No email'}
            </p>
            <p className="text-xs text-blue-600 font-medium">
              {user ? user.role || 'AGENT' : 'AGENT'}
            </p>
          </div>
        </div>
        
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200 text-sm font-medium"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
