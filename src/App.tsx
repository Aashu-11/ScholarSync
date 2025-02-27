import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ScholarshipFinder from './pages/ScholarshipFinder';
import ApplicationGenerator from './pages/ApplicationGenerator';
import ScholarshipCoach from './pages/AICoach';
import Community from './pages/Community';
import Documents from './pages/Documents';
import Sidebar from './components/Sidebar';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <AuthProvider>
      <div className="flex">
        <div className="flex-1 overflow-hidden">
          <Routes>
            {!isLoggedIn ? (
              <Route path="*" element={<Login onLogin={handleLogin} />} />
            ) : (
              <>
                <Route path="/" element={<Dashboard />} />
                <Route path="/scholarships" element={<ScholarshipFinder />} />
                <Route path="/application-generator" element={<ApplicationGenerator />} />
                <Route path="/coach" element={<ScholarshipCoach />} />
                <Route path="/community" element={<Community />} />
                <Route path="/documents" element={<Documents />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;