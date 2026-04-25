import React, { useState, useEffect, useMemo } from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { useAppContext } from '../../context/AppContext';
import { format, isToday, isYesterday, parseISO, differenceInMinutes } from 'date-fns';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, AlertCircle, Clock, CheckCircle2, XCircle, Trash2, Camera, Info } from 'lucide-react';
import { Report } from '../../types';

export const ReportEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { reports, addReport, updateReport } = useAppContext();
  
  const isEditing = id !== 'new';
  const existingReport = isEditing ? reports.find(r => r.id === id) : null;

  // Form State
  const [date, setDate] = useState(existingReport?.date || format(new Date(), 'yyyy-MM-dd'));
  const [startTime, setStartTime] = useState(existingReport?.startTime || '09:00');
  const [endTime, setEndTime] = useState(existingReport?.endTime || '17:00');
  const [workDone, setWorkDone] = useState(existingReport?.workDone || '');
  const [hasBlockers, setHasBlockers] = useState(existingReport?.hasBlockers || false);
  const [blockersDetails, setBlockersDetails] = useState(existingReport?.blockersDetails || '');
  const [nextSteps, setNextSteps] = useState(existingReport?.nextSteps || '');
  const [notes, setNotes] = useState(existingReport?.notes || '');
  const [screenshots, setScreenshots] = useState<string[]>(existingReport?.screenshots || []);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Auto-calculate Total Hours
  const totalHours = useMemo(() => {
    try {
      const [startH, startM] = startTime.split(':').map(Number);
      const [endH, endM] = endTime.split(':').map(Number);
      
      const start = new Date(0, 0, 0, startH, startM);
      const end = new Date(0, 0, 0, endH, endM);
      
      let diffMinutes = differenceInMinutes(end, start);
      
      // If end time is before start time, assume it's the next day (unlikely for daily reports but just in case)
      if (diffMinutes < 0) diffMinutes += 24 * 60;
      
      const hours = Math.floor(diffMinutes / 60);
      const minutes = diffMinutes % 60;
      
      return `${hours}h ${minutes}m`;
    } catch (e) {
      return '0h 0m';
    }
  }, [startTime, endTime]);

  useEffect(() => {
    if (isEditing && !existingReport) {
      navigate('/my-reports', { replace: true });
      return;
    }

    if (isEditing && existingReport) {
      const reportDate = parseISO(existingReport.date);
      if (!isToday(reportDate) && !isYesterday(reportDate)) {
        navigate(`/report/${id}`, { replace: true });
      }
    }
  }, [isEditing, existingReport, id, navigate]);

  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (screenshots.length + files.length > 4) {
      setError('You can only upload up to 4 screenshots.');
      return;
    }

    const newScreenshots = [...screenshots];
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newScreenshots.push(reader.result as string);
        if (newScreenshots.length <= 4) {
          setScreenshots([...newScreenshots]);
        }
      };
      reader.readAsDataURL(file as File);
    });
  };

  const removeScreenshot = (index: number) => {
    setScreenshots(screenshots.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!workDone.trim() || !nextSteps.trim() || (hasBlockers && !blockersDetails.trim())) {
      const msg = !workDone.trim() 
        ? 'Work Done is required.' 
        : !nextSteps.trim() 
          ? 'Next Steps are required.' 
          : 'Please provide details for your blockers.';
      setError(msg);
      alert(msg);
      return;
    }

    setIsSaving(true);
    setError('');

    const reportData: Partial<Report> = {
      date,
      startTime,
      endTime,
      totalHours: parseFloat(totalHours.replace('h', '.').replace('m', '').replace(' ', '')),
      workDone,
      hasBlockers,
      blockersDetails: hasBlockers ? blockersDetails : '',
      nextSteps,
      notes,
      screenshots,
    };

    console.log("REPORT_DATA", reportData);

    // Simulate API call
    setTimeout(() => {
      if (isEditing && id) {
        updateReport(id, reportData);
      } else {
        addReport(reportData);
      }
      
      setIsSaving(false);
      navigate('/my-reports');
    }, 500);
  };

  return (
    <div className="space-y-6 pb-20">
      <header className="flex flex-col gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-sm font-medium w-fit"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            {isEditing ? 'Edit Daily Report' : 'Create Daily Report'}
          </h1>
          <div className="flex items-center gap-2 text-slate-500 mt-1">
            <span className="font-medium">{format(parseISO(date), 'EEEE, MMMM d, yyyy')}</span>
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Time Section */}
        <Card title="Time Details">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Start Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="time" 
                  value={startTime}
                  onChange={e => setStartTime(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">End Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="time" 
                  value={endTime}
                  onChange={e => setEndTime(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Hours</label>
              <div className="w-full px-4 py-2.5 bg-slate-50 border border-border-subtle rounded-lg text-sm font-bold text-slate-900 flex items-center">
                {totalHours}
              </div>
            </div>
          </div>
        </Card>

        {/* Work Done */}
        <div className="space-y-2">
          <label htmlFor="workDone" className="text-sm font-bold text-slate-700 uppercase tracking-wider">
            Work Done <span className="text-red-500">*</span>
          </label>
          <textarea
            id="workDone"
            required
            rows={6}
            className="w-full px-4 py-3 bg-white border border-border-subtle rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800 placeholder:text-slate-300 resize-none"
            placeholder="Describe the tasks you completed today..."
            value={workDone}
            onChange={(e) => setWorkDone(e.target.value)}
          />
        </div>

        {/* Blockers */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={hasBlockers}
                onChange={() => setHasBlockers(!hasBlockers)}
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
            <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">I have blockers</span>
          </div>

          {hasBlockers && (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
              <label htmlFor="blockersDetails" className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                Blockers Details <span className="text-red-500">*</span>
              </label>
              <textarea
                id="blockersDetails"
                required={hasBlockers}
                rows={4}
                className="w-full px-4 py-3 bg-white border border-border-subtle rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800 placeholder:text-slate-300 resize-none"
                placeholder="What is stopping you from progressing?"
                value={blockersDetails}
                onChange={(e) => setBlockersDetails(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Next Steps */}
        <div className="space-y-2">
          <label htmlFor="nextSteps" className="text-sm font-bold text-slate-700 uppercase tracking-wider">
            Next Steps <span className="text-red-500">*</span>
          </label>
          <textarea
            id="nextSteps"
            required
            rows={4}
            className="w-full px-4 py-3 bg-white border border-border-subtle rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800 placeholder:text-slate-300 resize-none"
            placeholder="What are your planned tasks for the next session?"
            value={nextSteps}
            onChange={(e) => setNextSteps(e.target.value)}
          />
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <label htmlFor="notes" className="text-sm font-bold text-slate-700 uppercase tracking-wider">
            Notes <span className="text-slate-400 font-normal ml-1">(Optional)</span>
          </label>
          <textarea
            id="notes"
            rows={3}
            className="w-full px-4 py-3 bg-white border border-border-subtle rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800 placeholder:text-slate-300 resize-none"
            placeholder="Any additional information or comments..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {/* Screenshots */}
        <div className="space-y-4">
          <label className="text-sm font-bold text-slate-700 uppercase tracking-wider block">
            Screenshots <span className="text-slate-400 font-normal ml-1">(1 to 4 images)</span>
          </label>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {screenshots.map((src, index) => (
              <div key={index} className="relative group aspect-video rounded-xl overflow-hidden border border-border-subtle bg-slate-100">
                <img src={src} alt={`Screenshot ${index + 1}`} className="w-full h-full object-cover" />
                <button 
                  type="button"
                  onClick={() => removeScreenshot(index)}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
            
            {screenshots.length < 4 && (
              <label className="aspect-video rounded-xl border-2 border-dashed border-border-subtle flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-50 transition-colors text-slate-400 hover:text-primary hover:border-primary">
                <Camera size={24} />
                <span className="text-xs font-bold uppercase tracking-widest">Upload Image</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  multiple 
                  className="hidden" 
                  onChange={handleScreenshotUpload} 
                />
              </label>
            )}
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-lg flex items-center gap-3 text-red-600 text-sm">
            <AlertCircle size={18} />
            <span className="font-medium">{error}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-8 border-t border-border-subtle">
          <Button 
            type="submit" 
            size="lg" 
            className="min-w-[160px] gap-2"
            disabled={isSaving}
          >
            <Save size={20} />
            {isSaving ? 'Saving...' : 'Save Report'}
          </Button>
          <Button type="button" variant="ghost" size="lg" onClick={() => navigate(-1)} disabled={isSaving}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
