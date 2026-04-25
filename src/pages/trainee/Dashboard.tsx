import React from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { useAppContext } from '../../context/AppContext';
import { format, isToday, parseISO } from 'date-fns';
import { Plus, History, Clock, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const TraineeDashboard: React.FC = () => {
  const { reports, currentUser } = useAppContext();
  const navigate = useNavigate();

  const userReports = reports
    .filter(r => r.traineeId === currentUser?.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const todayReport = userReports.find(r => isToday(parseISO(r.date)));
  const recentReports = userReports.slice(0, 3);

  const handleCreateNew = () => {
    console.log("CREATE_BUTTON_CLICKED");
    navigate('/report/new');
  };

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Good morning, {currentUser?.name.split(' ')[0]}!</h1>
          <p className="text-sm text-slate-500 mt-1">Here's an overview of your reports.</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{format(new Date(), 'EEEE')}</p>
          <p className="text-lg font-bold text-slate-700 leading-tight">{format(new Date(), 'MMMM d, yyyy')}</p>
        </div>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2" title="Daily Report" subtitle="Submit your report for today to track your progress.">
          {todayReport ? (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-100 rounded-lg flex items-center gap-3 text-green-700">
                <Clock size={20} />
                <span className="font-medium">You have already submitted your report for today.</span>
              </div>
              <p className="text-slate-600 line-clamp-3 italic">"{todayReport.content}"</p>
              <Button variant="outline" onClick={() => navigate(`/report/${todayReport.id}`)}>
                View Details
              </Button>
            </div>
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto">
                <Plus size={32} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">No report for today</h3>
                <p className="text-slate-500 max-w-xs mx-auto">Stay consistent and document your daily achievements and challenges.</p>
              </div>
              <Button onClick={handleCreateNew}>
                Submit Today's Report
              </Button>
            </div>
          )}
        </Card>

        <Card title="Quick Stats" subtitle="Your activity summary">
          <div className="space-y-6 py-2">
            <div className="flex justify-between items-center pb-4 border-b border-border-subtle">
              <span className="text-slate-500 text-sm">Total Reports</span>
              <span className="text-2xl font-bold text-slate-900">{userReports.length}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-border-subtle">
              <span className="text-slate-500 text-sm">This Week</span>
              <span className="text-2xl font-bold text-slate-900">{userReports.filter(r => new Date(r.date) > subDays(new Date(), 7)).length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 text-sm">Status</span>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded uppercase">Active</span>
            </div>
          </div>
        </Card>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <History size={20} />
            Recent Reports
          </h2>
          <Link to="/my-reports" className="text-primary text-sm font-semibold hover:underline">View All</Link>
        </div>
        
        <div className="grid gap-4">
          {recentReports.map(report => (
            <Link key={report.id} to={`/report/${report.id}`}>
              <Card className="hover:border-primary transition-colors cursor-pointer">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{format(parseISO(report.date), 'MMMM d, yyyy')}</p>
                    <p className="text-slate-500 text-sm mt-1 line-clamp-1">{report.content}</p>
                  </div>
                  <ChevronRight size={16} className="text-slate-300" />
                </div>
              </Card>
            </Link>
          ))}
          {recentReports.length === 0 && (
            <p className="text-center py-8 text-slate-400 bg-white rounded-xl border border-dashed border-border-subtle">
              No reports found yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper for stats logic (could be moved to context if complex)
function subDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
}
