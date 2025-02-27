import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, Search, FileText, MessageSquare, 
  FolderOpen, Users, LogOut, Menu, X 
} from 'lucide-react';
// import { useAuth } from '../contexts/AuthContext';

const Sidebar: React.FC = () => {
  const [expanded, setExpanded] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  // const { user, logout } = useAuth();
  const user = { name: 'Alex Johnson', email: 'alex.johnson@example.com', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' }; // Mock user data
  const logout = () => {
    console.log('Logged out');
  };

  const navItems = [
    { path: '/', name: 'Dashboard', icon: <Home className="w-5 h-5" /> },
    { path: '/scholarships', name: 'Scholarship Finder', icon: <Search className="w-5 h-5" /> },
    { path: '/application-generator', name: 'AI Application Generator', icon: <FileText className="w-5 h-5" /> },
    { path: '/coach', name: 'Scholarship Coach', icon: <MessageSquare className="w-5 h-5" /> },
    { path: '/documents', name: 'Document Manager', icon: <FolderOpen className="w-5 h-5" /> },
    { path: '/community', name: 'Community', icon: <Users className="w-5 h-5" /> },
  ];

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const toggleMobile = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <button 
          onClick={toggleMobile}
          className="p-2 rounded-full glassmorphism"
        >
          {mobileOpen ? <X className="w-6 h-6 text-primary-600" /> : <Menu className="w-6 h-6 text-primary-600" />}
        </button>
      </div>

      {/* Mobile sidebar */}
      <motion.div 
        className={`fixed inset-0 z-40 lg:hidden glassmorphism overflow-hidden ${mobileOpen ? 'block' : 'hidden'}`}
        initial={{ x: '-100%' }}
        animate={{ x: mobileOpen ? 0 : '-100%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center justify-between mb-8 p-2">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full primary-gradient flex items-center justify-center">
                <Search className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-display font-bold primary-gradient-text">ScholarSync</h1>
            </div>
            <button onClick={toggleMobile}>
              <X className="w-6 h-6 text-primary-600" />
            </button>
          </div>

          <div className="flex flex-col space-y-2 flex-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'bg-primary-500 text-white' 
                      : 'hover:bg-primary-100'
                  }`
                }
                onClick={() => setMobileOpen(false)}
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>

          {user && (
            <div className="mt-auto p-3">
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-10 h-10 rounded-full object-cover border-2 border-primary-500"
                />
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <button 
                onClick={logout}
                className="flex items-center space-x-2 w-full p-2 rounded-lg hover:bg-red-100 text-red-600 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Desktop sidebar */}
      <motion.div 
        className="hidden lg:flex h-screen fixed left-0 top-0 z-30"
        initial={{ width: expanded ? 240 : 80 }}
        animate={{ width: expanded ? 240 : 80 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="glassmorphism h-full py-6 flex flex-col">
          <div className="px-4 mb-8 flex items-center">
            <div className="w-10 h-10 rounded-full primary-gradient flex items-center justify-center">
              <Search className="w-6 h-6 text-white" />
            </div>
            {expanded && (
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="ml-3 text-xl font-display font-bold primary-gradient-text"
              >
                ScholarSync
              </motion.h1>
            )}
            <button 
              onClick={toggleSidebar}
              className="ml-auto p-1 rounded-full hover:bg-gray-200 transition-colors"
            >
              {expanded ? (
                <motion.div initial={{ rotate: 0 }} animate={{ rotate: 180 }} transition={{ duration: 0.3 }}>
                  <Menu className="w-5 h-5 text-primary-600" />
                </motion.div>
              ) : (
                <motion.div initial={{ rotate: 180 }} animate={{ rotate: 0 }} transition={{ duration: 0.3 }}>
                  <Menu className="w-5 h-5 text-primary-600" />
                </motion.div>
              )}
            </button>
          </div>

          <div className="flex-1 px-2 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center ${expanded ? 'px-3' : 'justify-center'} py-3 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'bg-primary-500 text-white' 
                      : 'hover:bg-primary-100'
                  }`
                }
              >
                <div className={`${expanded ? '' : 'tooltip'} relative`}>
                  {item.icon}
                  {!expanded && (
                    <div className="tooltip-text absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity whitespace-nowrap">
                      {item.name}
                    </div>
                  )}
                </div>
                {expanded && (
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="ml-3"
                  >
                    {item.name}
                  </motion.span>
                )}
              </NavLink>
            ))}
          </div>

          {user && (
            <div className="mt-auto px-3">
              <div className={`flex ${expanded ? 'items-center' : 'flex-col'} space-x-3 mb-4`}>
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-10 h-10 rounded-full object-cover border-2 border-primary-500"
                />
                {expanded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </motion.div>
                )}
              </div>
              <button 
                onClick={logout}
                className={`flex ${expanded ? 'items-center space-x-2' : 'justify-center'} w-full p-2 rounded-lg hover:bg-red-100 text-red-600 transition-colors`}
              >
                <LogOut className="w-5 h-5" />
                {expanded && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    Logout
                  </motion.span>
                )}
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;