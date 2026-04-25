import React from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { useAppContext } from '../../context/AppContext';
import { format, parseISO, isToday, isYesterday } from 'date-fns';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit2, Calendar, Clock, User, AlertCircle, CheckCircle2, ChevronRight, Info, AlertTriangle, FileText } from 'lucide-react';

export const ReportDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { reports, currentUser } = useAppContext();
  
  const report = reports.find(r => r.id === id);

  if (!report) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-800">Report not found</h2>
        <Button className="mt-4" onClick={() => navigate('/my-reports')}>Back to Reports</Button>
      </div>
    );
  }

  const isEditable = (isToday(parseISO(report.date)) || isYesterday(parseISO(report.date))) && currentUser?.role === 'TRAINEE';

  return (
    <div className="space-y-6 pb-12">
      <div className="flex justify-between items-center">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        {isEditable && (
          <Link to={`/report/${id}/edit`}>
            <Button variant="outline" className="gap-2">
              <Edit2 size={16} />
              Edit Report
            </Button>
          </Link>
        )}
      </div>

      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] uppercase font-bold rounded tracking-wider">
              Submitted
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <User size={12} />
              {report.traineeId === currentUser?.id ? 'My Report' : report.traineeName}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{format(parseISO(report.date), 'MMMM d, yyyy')}</h1>
          <p className="text-slate-500 mt-1">{format(parseISO(report.date), 'EEEE')}</p>
        </div>
        
        <div className="flex gap-6 pb-2">
          <div className="text-right">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Duration</p>
            <p className="text-sm font-bold text-slate-800 flex items-center gap-1.5 justify-end">
              <Clock size={14} className="text-primary" />
              {report.startTime} - {report.endTime}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Total</p>
            <p className="text-sm font-bold text-primary">
              {report.totalHours?.toString().includes('.') ? report.totalHours.toString().replace('.', 'h ') + 'm' : report.totalHours + 'h'}
            </p>
          </div>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card title="Work Done">
            <div className="whitespace-pre-wrap text-slate-700 leading-relaxed py-2">
              {report.workDone || report.content}
            </div>
          </Card>

          {report.hasBlockers && (
            <Card className="border-red-100 bg-red-50/30">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-red-700 uppercase tracking-wider mb-1">Blockers</h3>
                  <div className="text-slate-700 whitespace-pre-wrap">{report.blockersDetails}</div>
                </div>
              </div>
            </Card>
          )}

          <Card title="Next Steps">
            <div className="whitespace-pre-wrap text-slate-700 leading-relaxed py-2">
              {report.nextSteps || 'No next steps listed.'}
            </div>
          </Card>

          {report.notes && (
            <Card title="Additional Notes">
              <div className="whitespace-pre-wrap text-slate-600 italic py-2">
                {report.notes}
              </div>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          {report.screenshots && report.screenshots.length > 0 && (
            <Card title="Screenshots">
              <div className="grid grid-cols-2 gap-3 mt-4">
                {report.screenshots.map((src, i) => (
                  <div key={i} className="aspect-video rounded-lg overflow-hidden border border-border-subtle group cursor-pointer relative">
                    <img src={src} alt={`Screenshot ${i+1}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <FileText className="text-white" size={20} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          <Card title="Report Details">
            <div className="space-y-4 text-sm mt-4">
              <div className="flex justify-between items-center text-slate-500">
                <span className="flex items-center gap-2"><Info size={14} /> ID</span>
                <span className="font-mono text-[10px] bg-slate-100 px-1.5 py-0.5 rounded">{report.id}</span>
              </div>
              <div className="flex justify-between items-center text-slate-500 border-t border-slate-50 pt-3">
                <span>Submitted</span>
                <span className="font-medium text-slate-800">{format(parseISO(report.createdAt), 'MMM d, h:mm a')}</span>
              </div>
              <div className="flex justify-between items-center text-slate-500 border-t border-slate-50 pt-3">
                <span>Last Updated</span>
                <span className="font-medium text-slate-800">{format(parseISO(report.updatedAt), 'MMM d, h:mm a')}</span>
              </div>
            </div>
          </Card>

          <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-3">
              <CheckCircle2 size={24} />
            </div>
            <h4 className="font-bold text-slate-900 mb-1">Report Verified</h4>
            <p className="text-xs text-slate-500">This report has been successfully logged into the system.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
