import React from 'react';
import { Button } from '../components/Button';
import { useAppContext } from '../context/AppContext';
import { Navigate } from 'react-router-dom';

export const LoginPage: React.FC = () => {
  const { login, currentUser } = useAppContext();

  if (currentUser) {
    return <Navigate to={currentUser.role === 'ADMIN' ? '/admin/dashboard' : '/dashboard'} replace />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-pulse rounded-2xl flex items-center justify-center text-white mx-auto mb-4 text-3xl font-bold shadow-lg shadow-pulse/20">
            <div className="w-8 h-8 bg-white/20 rounded-lg backdrop-blur-sm flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">PulseDesk</h1>
          <p className="text-slate-500 mt-2">Welcome back. Please select your role to continue.</p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-border-pulse shadow-sm space-y-4">
          <Button 
            className="w-full h-14 text-lg" 
            onClick={() => login('TRAINEE')}
          >
            Enter as Trainee
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-400">or</span>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="w-full h-14 text-lg" 
            onClick={() => login('ADMIN')}
          >
            Login as Admin
          </Button>
        </div>

        <p className="text-center text-xs text-slate-400 mt-8">
          &copy; 2026 PulseDesk. All rights reserved.
        </p>
      </div>
    </div>
  );
};
