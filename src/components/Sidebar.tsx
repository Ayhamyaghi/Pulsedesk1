import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  ChevronRight, 
  LogOut 
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const Sidebar: React.FC = () => {
  const { currentUser, logout } = useAppContext();
  
  if (!currentUser) return null;

  const traineeLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/my-reports', label: 'My Reports', icon: FileText },
  ];

  const adminLinks = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/reports', label: 'All Reports', icon: FileText },
    { to: '/admin/trainees', label: 'Trainees', icon: Users },
  ];

  const links = currentUser.role === 'ADMIN' ? adminLinks : traineeLinks;

  return (
    <div className="w-64 h-full border-r border-border-subtle bg-white flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
          <div className="w-8 h-8 bg-pulse rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm opacity-90"></div>
          </div>
          PulseDesk
        </h1>
      </div>

      <nav className="flex-1 px-4 py-2 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 text-sm transition-all group ${
                isActive 
                  ? 'bg-slate-100 text-primary font-semibold border-r-4 border-primary rounded-none' 
                  : 'text-slate-600 hover:bg-slate-100 hover:text-primary'
              }`
            }
          >
            <link.icon size={20} className="transition-colors" />
            <span>{link.label}</span>
            <ChevronRight size={16} className="ml-auto opacity-0 group-hover:opacity-40 transition-opacity" />
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-border-subtle">
        <div className="flex items-center gap-3 px-2 py-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
            {currentUser.name.charAt(0)}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-slate-900 truncate">{currentUser.name}</p>
            <p className="text-xs text-slate-500 truncate">{currentUser.role.toLowerCase()}</p>
          </div>
        </div>
        <button 
          onClick={logout}
          className="flex items-center gap-3 w-full px-3 py-2 text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors"
        >
          <LogOut size={20} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};
