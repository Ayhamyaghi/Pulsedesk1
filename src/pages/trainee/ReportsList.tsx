import React, { useState, useMemo } from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { useAppContext } from '../../context/AppContext';
import { format, parseISO } from 'date-fns';
import { Search, Filter, Calendar as CalendarIcon, ChevronRight, FileText, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const ReportsList: React.FC = () => {
  const { reports, currentUser } = useAppContext();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'blockers' | 'no-blockers'>('all');
  
  const handleCreateNew = () => {
    console.log("CREATE_BUTTON_CLICKED");
    navigate("/report/new");
  };

  const filteredReports = useMemo(() => {
    return reports
      .filter(r => r.traineeId === currentUser?.id)
      .filter(r => {
        const query = searchQuery.toLowerCase();
        const matchesQuery = 
          r.date.includes(query) || 
          r.content.toLowerCase().includes(query) ||
          r.workDone?.toLowerCase().includes(query) ||
          r.traineeName.toLowerCase().includes(query);
        
        const matchesFilter = 
          filterType === 'all' || 
          (filterType === 'blockers' && r.hasBlockers) || 
          (filterType === 'no-blockers' && !r.hasBlockers);
          
        return matchesQuery && matchesFilter;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [reports, currentUser, searchQuery, filterType]);

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Reports</h1>
          <p className="text-slate-500 mt-1">Manage and view your reporting history.</p>
        </div>
        <Button onClick={handleCreateNew}>Create New Report</Button>
      </header>

      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by date or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
            />
          </div>
          <Button 
            variant={showFilters ? 'primary' : 'outline'} 
            size="md" 
            className="gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} />
            <span className="hidden sm:inline">Filter</span>
          </Button>
        </div>

        {showFilters && (
          <div className="flex gap-2 p-3 bg-slate-50 border border-border-subtle rounded-lg animate-in fade-in slide-in-from-top-1">
            <button 
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${filterType === 'all' ? 'bg-primary text-white' : 'bg-white text-slate-500 border border-border-subtle hover:bg-slate-100'}`}
            >
              All Reports
            </button>
            <button 
              onClick={() => setFilterType('blockers')}
              className={`px-3 py-1 text-xs font-bold rounded-full transition-all flex items-center gap-1.5 ${filterType === 'blockers' ? 'bg-red-500 text-white' : 'bg-white text-slate-500 border border-border-subtle hover:bg-slate-100'}`}
            >
              <AlertCircle size={12} />
              Has Blockers
            </button>
            <button 
              onClick={() => setFilterType('no-blockers')}
              className={`px-3 py-1 text-xs font-bold rounded-full transition-all flex items-center gap-1.5 ${filterType === 'no-blockers' ? 'bg-green-600 text-white' : 'bg-white text-slate-500 border border-border-subtle hover:bg-slate-100'}`}
            >
              <CheckCircle2 size={12} />
              No Blockers
            </button>
            <div className="ml-auto flex items-center gap-2">
               <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                {filteredReports.length} results
               </span>
               <button onClick={() => setShowFilters(false)} className="text-slate-400 hover:text-slate-600 p-0.5">
                <X size={14} />
               </button>
            </div>
          </div>
        )}
      </div>

      <div className="grid gap-4">
        {filteredReports.map(report => (
          <Link key={report.id} to={`/report/${report.id}`}>
            <Card className="hover:border-primary transition-colors cursor-pointer group">
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-center justify-center bg-slate-50 rounded-lg p-3 w-20">
                  <span className="text-xs font-bold text-slate-400 uppercase">{format(parseISO(report.date), 'MMM')}</span>
                  <span className="text-2xl font-bold text-primary">{format(parseISO(report.date), 'dd')}</span>
                </div>
                
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center gap-2 mb-1">
                    <CalendarIcon size={14} className="text-slate-400" />
                    <span className="text-xs font-medium text-slate-500">{format(parseISO(report.date), 'EEEE, yyyy')}</span>
                    {report.hasBlockers && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-red-500 uppercase ml-2 bg-red-50 px-1.5 py-0.5 rounded">
                        <AlertCircle size={10} />
                        Blockers
                      </span>
                    )}
                  </div>
                  <p className="text-slate-900 font-medium line-clamp-1 group-hover:text-primary transition-colors">
                    {report.workDone || report.content}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex flex-col items-end mr-4">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Status</span>
                    <span className="text-xs font-bold text-green-600">Submitted</span>
                  </div>
                  <ChevronRight size={20} className="text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Card>
          </Link>
        ))}

        {filteredReports.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-dashed border-border-subtle">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
              <FileText size={32} />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">
              {searchQuery || filterType !== 'all' ? 'No matching reports' : 'No reports yet'}
            </h3>
            <p className="text-slate-500 mt-1">
              {searchQuery || filterType !== 'all' 
                ? 'Try adjusting your search or filters.' 
                : 'Start tracking your journey by creating your first report.'}
            </p>
            {!searchQuery && filterType === 'all' && (
              <div className="mt-4">
                <Button onClick={handleCreateNew}>Create First Report</Button>
              </div>
            )}
            {(searchQuery || filterType !== 'all') && (
              <button 
                onClick={() => {setSearchQuery(''); setFilterType('all');}}
                className="mt-4 text-sm font-bold text-primary hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
