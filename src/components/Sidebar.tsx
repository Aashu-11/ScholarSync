import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, Search, FileText, MessageSquare, 
  FolderOpen, Users, LogOut, Menu, X, LogIn 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Sidebar: React.FC = () => {
  const [expanded, setExpanded] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user, logout, loginWithGoogle, isAuthenticated } = useAuth();

  const navItems = [
    { path: '/', name: 'Dashboard', icon: <Home className="w-5 h-5" /> },
    { path: '/scholarships', name: 'Scholarship Finder', icon: <Search className="w-5 h-5" /> },
    { path: '/application-generator', name: 'AI Application Generator', icon: <FileText className="w-5 h-5" /> },
    { path: '/coach', name: 'Scholarship Coach', icon: <MessageSquare className="w-5 h-5" /> },
    { path: '/documents', name: 'Document Manager', icon: <FolderOpen className="w-5 h-5" /> },
    { path: '/community', name: 'Community', icon: <Users className="w-5 h-5" /> },
  ];

  const toggleSidebar = () => setExpanded(!expanded);
  const toggleMobile = () => setMobileOpen(!mobileOpen);

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <button onClick={toggleMobile} className="p-2 rounded-full glassmorphism">
          {mobileOpen ? <X className="w-6 h-6 text-primary-600" /> : <Menu className="w-6 h-6 text-primary-600" />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <motion.div 
        className={`fixed inset-0 z-40 lg:hidden glassmorphism overflow-hidden ${mobileOpen ? 'block' : 'hidden'}`}
        initial={{ x: '-100%' }}
        animate={{ x: mobileOpen ? 0 : '-100%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center justify-between mb-8 p-2">
            <h1 className="text-xl font-display font-bold primary-gradient-text">ScholarSync</h1>
            <button onClick={toggleMobile}><X className="w-6 h-6 text-primary-600" /></button>
          </div>

          <div className="flex flex-col space-y-2 flex-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                    isActive ? 'bg-primary-500 text-white' : 'hover:bg-primary-100'
                  }`
                }
                onClick={() => setMobileOpen(false)}
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>

          {isAuthenticated ? (
            <div className="mt-auto p-3">
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src={user?.photoURL} 
                  alt={user?.name} 
                  className="w-10 h-10 rounded-full object-cover border-2 border-primary-500"
                />
                <div>
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>
              <button onClick={logout} className="flex items-center space-x-2 w-full p-2 rounded-lg hover:bg-red-100 text-red-600 transition-colors">
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <button onClick={loginWithGoogle} className="flex items-center space-x-2 p-3 rounded-lg bg-primary-500 text-white w-full">
              <LogIn className="w-5 h-5" />
              <span>Login with Google</span>
            </button>
          )}
        </div>
      </motion.div>

      {/* Desktop Sidebar */}
      <motion.div 
        className="hidden lg:flex h-screen fixed left-0 top-0 z-30"
        initial={{ width: expanded ? 240 : 80 }}
        animate={{ width: expanded ? 240 : 80 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="glassmorphism h-full py-6 flex flex-col">
          <div className="px-4 mb-8 flex items-center">
            <h1 className="text-xl font-display font-bold primary-gradient-text">{expanded && "ScholarSync"}</h1>
            <button onClick={toggleSidebar} className="ml-auto p-1 rounded-full hover:bg-gray-200 transition-colors">
              <Menu className="w-5 h-5 text-primary-600" />
            </button>
          </div>

          <div className="flex-1 px-2 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center ${expanded ? 'px-3' : 'justify-center'} py-3 rounded-lg transition-all duration-200 ${
                    isActive ? 'bg-primary-500 text-white' : 'hover:bg-primary-100'
                  }`
                }
              >
                {item.icon}
                {expanded && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>{item.name}</motion.span>}
              </NavLink>
            ))}
          </div>

          {isAuthenticated ? (
            <div className="mt-auto px-3">
              <div className={`flex ${expanded ? 'items-center' : 'flex-col'} space-x-3 mb-4`}>
                <img 
                  src={user?.photoURL} 
                  alt={user?.name} 
                  className="w-10 h-10 rounded-full object-cover border-2 border-primary-500"
                />
                {expanded && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                    <p className="font-medium">{user?.name}</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </motion.div>
                )}
              </div>
              <button onClick={logout} className="flex items-center space-x-2 w-full p-2 rounded-lg hover:bg-red-100 text-red-600 transition-colors">
                <LogOut className="w-5 h-5" />
                {expanded && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>Logout</motion.span>}
              </button>
            </div>
          ) : (
            <button onClick={loginWithGoogle} className="flex items-center space-x-2 p-3 rounded-lg bg-primary-500 text-white w-full">
              <LogIn className="w-5 h-5" />
              <span>Login with Google</span>
            </button>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
