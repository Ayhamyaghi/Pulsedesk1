import React from 'react';
import { Card } from '../../components/Card';
import { useAppContext } from '../../context/AppContext';
import { Users, FileText, Activity, CheckCircle, Clock } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const { reports, users } = useAppContext();
  
  const activeTrainees = users.filter(u => u.status === 'active');
  const recentReports = [...reports].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);
  
  const stats = [
    { label: 'Total Trainees', value: users.length, icon: Users, color: 'bg-blue-50 text-blue-600' },
    { label: 'Active Now', value: activeTrainees.length, icon: Activity, color: 'bg-green-50 text-green-600' },
    { label: 'Reports Today', value: reports.filter(r => format(parseISO(r.date), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')).length, icon: CheckCircle, color: 'bg-primary/10 text-primary' },
    { label: 'Total Logs', value: reports.length, icon: FileText, color: 'bg-slate-50 text-slate-600' },
  ];

  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Admin Overview</h1>
        <p className="text-sm text-slate-500 mt-1">Monitor trainee progress and system activity.</p>
      </header>

      <div className="grid md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="flex flex-col justify-center py-6 shadow-sm border-border-subtle bg-white">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Recent Activity</h2>
            <Link to="/admin/reports" className="text-pulse text-sm font-medium hover:underline">View All Reports</Link>
          </div>
          
          <div className="bg-white border border-border-subtle rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-border-subtle">
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Trainee</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Date</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle text-slate-800">
                  {recentReports.map((report) => (
                    <tr key={report.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-primary font-bold text-xs">
                            {report.traineeName.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-sm font-medium">{report.traineeName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                        {format(parseISO(report.date), 'MMM d, yyyy')}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-semibold rounded-full uppercase">
                          Submitted
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Link to={`/report/${report.id}`}>
                          <button className="text-primary hover:underline transition-colors text-xs font-bold">Review</button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {recentReports.length === 0 && (
              <div className="py-12 text-center text-slate-400 italic">No recent reports available.</div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Active Trainees</h2>
            <Link to="/admin/trainees" className="text-primary text-sm font-semibold hover:underline">Manage</Link>
          </div>
          
          <div className="space-y-3">
            {activeTrainees.slice(0, 5).map(user => (
              <div key={user.id} className="flex items-center gap-4 p-4 bg-white border border-border-subtle rounded-xl hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {user.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                  <p className="text-xs text-slate-500">{user.email}</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
