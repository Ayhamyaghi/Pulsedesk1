import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/Layout';
import { LoginPage } from './pages/Login';

// Trainee Pages
import { TraineeDashboard } from './pages/trainee/Dashboard';
import { ReportsList } from './pages/trainee/ReportsList';
import { ReportDetail } from './pages/trainee/ReportDetail';
import { ReportEdit } from './pages/trainee/ReportEdit';

// Admin Pages
import { AdminDashboard } from './pages/admin/Dashboard';
import { ReportsManage } from './pages/admin/ReportsManage';
import { TraineeManage } from './pages/admin/TraineeManage';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route element={<Layout />}>
            {/* Trainee Routes */}
            <Route path="/dashboard" element={<TraineeDashboard />} />
            <Route path="/my-reports" element={<ReportsList />} />
            <Route path="/report/:id" element={<ReportDetail />} />
            <Route path="/report/new" element={<ReportEdit />} />
            <Route path="/report/:id/edit" element={<ReportEdit />} />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/reports" element={<ReportsManage />} />
            <Route path="/admin/trainees" element={<TraineeManage />} />
            
            {/* Fallback */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
