// ✅ src/App.js

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import Login from './pages/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import Patients from './pages/admin/Patients';
import Appointments from './pages/admin/Appointments';
import CalendarView from './pages/admin/CalendarView';
import PatientDashboard from './pages/patient/PatientDashboard';

import { seedMockData } from './utils/seed';

function ProtectedRoute({ children, role }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
}

function App() {
  useEffect(() => {
    seedMockData(); // ✅ Call seeded mock data
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute role="Admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/patients"
            element={
              <ProtectedRoute role="Admin">
                <Patients />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/appointments"
            element={
              <ProtectedRoute role="Admin">
                <Appointments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/calendar"
            element={
              <ProtectedRoute role="Admin">
                <CalendarView />
              </ProtectedRoute>
            }
          />

          {/* Patient Route */}
          <Route
            path="/patient/dashboard"
            element={
              <ProtectedRoute role="Patient">
                <PatientDashboard />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
