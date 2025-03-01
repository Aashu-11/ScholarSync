import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ScholarshipFinder from './pages/ScholarshipFinder';
import ApplicationGenerator from './pages/ApplicationGenerator';
import ScholarshipCoach from './pages/AICoach';
import Community from './pages/Community';
import Documents from './pages/Documents';
import { AuthProvider } from './contexts/AuthContext';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <AuthProvider>
      <div className="flex">
        <div className="flex-1 overflow-hidden">
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/"
              element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/scholarships"
              element={isLoggedIn ? <ScholarshipFinder /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/application-generator"
              element={
                isLoggedIn ? <ApplicationGenerator /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/coach"
              element={isLoggedIn ? <ScholarshipCoach /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/community"
              element={isLoggedIn ? <Community /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/documents"
              element={isLoggedIn ? <Documents /> : <Navigate to="/login" replace />}
            />
            <Route
              path="*"
              element={<Navigate to={isLoggedIn ? "/" : "/login"} replace />}
            />
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
};

export default App;
