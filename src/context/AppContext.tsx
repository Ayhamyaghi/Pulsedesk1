import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Report, UserRole, AppState } from '../types';
import { subDays, format, isSameDay } from 'date-fns';

interface AppContextType extends AppState {
  login: (role: UserRole) => void;
  logout: () => void;
  addReport: (reportData: Partial<Report>) => void;
  updateReport: (id: string, reportData: Partial<Report>) => void;
  addUser: (name: string, email: string) => void;
  toggleUserStatus: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock Data
const MOCK_TRAINEES: User[] = [
  { id: '1', name: 'Alex Johnson', email: 'alex@example.com', role: 'TRAINEE', status: 'active' },
  { id: '2', name: 'Sarah Miller', email: 'sarah@example.com', role: 'TRAINEE', status: 'active' },
  { id: '3', name: 'James Wilson', email: 'james@example.com', role: 'TRAINEE', status: 'inactive' },
];

const MOCK_REPORTS: Report[] = [
  {
    id: 'r1',
    traineeId: '1',
    traineeName: 'Alex Johnson',
    date: format(subDays(new Date(), 2), 'yyyy-MM-dd'),
    content: 'Completed the task regarding user authentication and started on the dashboard layout.',
    status: 'submitted',
    createdAt: subDays(new Date(), 2).toISOString(),
    updatedAt: subDays(new Date(), 2).toISOString(),
  },
  {
    id: 'r2',
    traineeId: '1',
    traineeName: 'Alex Johnson',
    date: format(subDays(new Date(), 1), 'yyyy-MM-dd'),
    content: 'Finished the dashboard layout and integrated the side navigation bar.',
    status: 'submitted',
    createdAt: subDays(new Date(), 1).toISOString(),
    updatedAt: subDays(new Date(), 1).toISOString(),
  },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(MOCK_TRAINEES);
  const [reports, setReports] = useState<Report[]>(MOCK_REPORTS);

  const login = (role: UserRole) => {
    if (role === 'ADMIN') {
      setCurrentUser({ id: 'admin', name: 'Admin User', email: 'admin@pulsedesk.com', role: 'ADMIN', status: 'active' });
    } else {
      setCurrentUser(users[0]);
    }
  };

  const logout = () => setCurrentUser(null);

  const addReport = (reportData: Partial<Report>) => {
    if (!currentUser) return;
    const newReport: Report = {
      id: Math.random().toString(36).substr(2, 9),
      traineeId: currentUser.id,
      traineeName: currentUser.name,
      date: reportData.date || format(new Date(), 'yyyy-MM-dd'),
      content: reportData.workDone || reportData.content || '',
      status: 'submitted',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...reportData
    };
    setReports([newReport, ...reports]);
  };

  const updateReport = (id: string, reportData: Partial<Report>) => {
    setReports(reports.map(r => r.id === id ? { 
      ...r, 
      ...reportData, 
      content: reportData.workDone || reportData.content || r.content,
      updatedAt: new Date().toISOString() 
    } : r));
  };

  const addUser = (name: string, email: string) => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role: 'TRAINEE',
      status: 'active',
    };
    setUsers([...users, newUser]);
  };

  const toggleUserStatus = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u));
  };

  return (
    <AppContext.Provider value={{ 
      currentUser, 
      users, 
      reports, 
      login, 
      logout,
      addReport,
      updateReport,
      addUser,
      toggleUserStatus
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
