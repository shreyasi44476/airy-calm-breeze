import { useState, useEffect } from 'react';
import { AlertTriangle, Clock, MapPin, Send, ThumbsUp, Flag } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import ThemeToggle from '@/components/ThemeToggle';
import AnimatedLeafBackground from '@/components/AnimatedLeafBackground';

interface Report {
  id: string;
  type: string;
  location: string;
  time: string;
  description: string;
  upvotes: number;
  timestamp: number;
  reportedBy: string;
}

const eventTypes = [
  { value: 'plastic-burning', label: 'Plastic Burning', icon: '🔥' },
  { value: 'garbage-fire', label: 'Garbage Fire', icon: '🗑️' },
  { value: 'construction-dust', label: 'Construction Dust', icon: '🏗️' },
  { value: 'industrial-emission', label: 'Industrial Emission', icon: '🏭' },
  { value: 'vehicle-exhaust', label: 'Heavy Vehicle Exhaust', icon: '🚛' },
  { value: 'other', label: 'Other', icon: '📍' },
];

const mockReports: Report[] = [
  {
    id: '1',
    type: 'plastic-burning',
    location: 'MG Road, Near Metro Station',
    time: '6:00 PM - 6:30 PM',
    description: 'Plastic waste burning observed near the construction site',
    upvotes: 12,
    timestamp: Date.now() - 3600000,
    reportedBy: 'Rahul S.',
  },
  {
    id: '2',
    type: 'construction-dust',
    location: 'Whitefield Main Road',
    time: '2:00 PM - 4:00 PM',
    description: 'Heavy dust from ongoing road construction work',
    upvotes: 8,
    timestamp: Date.now() - 7200000,
    reportedBy: 'Priya M.',
  },
  {
    id: '3',
    type: 'garbage-fire',
    location: 'Koramangala 5th Block',
    time: '7:30 AM - 8:00 AM',
    description: 'Open garbage burning by local workers',
    upvotes: 23,
    timestamp: Date.now() - 86400000,
    reportedBy: 'Amit K.',
  },
];

const ReportEvent = () => {
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [upvotedReports, setUpvotedReports] = useState<Set<string>>(new Set());
  
  const [newReport, setNewReport] = useState({
    type: '',
    location: '',
    time: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const profile = localStorage.getItem('userProfile');
    const userName = profile ? JSON.parse(profile).name : 'Anonymous';
    
    const report: Report = {
      id: Date.now().toString(),
      ...newReport,
      upvotes: 0,
      timestamp: Date.now(),
      reportedBy: userName,
    };
    
    setReports([report, ...reports]);
    setNewReport({ type: '', location: '', time: '', description: '' });
    setIsFormOpen(false);
  };

  const handleUpvote = (id: string) => {
    if (upvotedReports.has(id)) return;
    
    setReports(reports.map(r => 
      r.id === id ? { ...r, upvotes: r.upvotes + 1 } : r
    ));
    setUpvotedReports(new Set([...upvotedReports, id]));
  };

  const getTimeAgo = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const getEventIcon = (type: string) => {
    return eventTypes.find(t => t.value === type)?.icon || '📍';
  };

  return (
    <div className="min-h-screen bg-background pb-24 relative">
      <AnimatedLeafBackground />
      <ThemeToggle />

      {/* Header */}
      <div className="relative z-10 pt-20 pb-6 px-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl gradient-mint-bg flex items-center justify-center shadow-soft">
            <AlertTriangle className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Report an Event</h1>
            <p className="text-sm text-muted-foreground">Help your community stay informed</p>
          </div>
        </div>
      </div>

      <div className="relative z-10 px-6">
        {/* New Report Button */}
        {!isFormOpen && (
          <button
            onClick={() => setIsFormOpen(true)}
            className="w-full btn-primary flex items-center justify-center gap-2 mb-6"
          >
            <Flag className="w-5 h-5" />
            Report a Pollution Event
          </button>
        )}

        {/* Report Form */}
        {isFormOpen && (
          <div className="card-elevated mb-6 animate-scale-in">
            <h3 className="text-sm font-semibold text-foreground mb-4">New Report</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Event Type */}
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Event Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {eventTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setNewReport({ ...newReport, type: type.value })}
                      className={`p-3 rounded-xl border-2 transition-all text-left ${
                        newReport.type === type.value
                          ? 'border-primary bg-primary/10'
                          : 'border-border bg-secondary/30 hover:border-primary/50'
                      }`}
                    >
                      <span className="text-lg">{type.icon}</span>
                      <span className="text-xs font-medium text-foreground block mt-1">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location
                </label>
                <input
                  type="text"
                  value={newReport.location}
                  onChange={(e) => setNewReport({ ...newReport, location: e.target.value })}
                  placeholder="e.g., MG Road, Near Metro Station"
                  className="input-field"
                  required
                />
              </div>

              {/* Time */}
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Time of Event
                </label>
                <input
                  type="text"
                  value={newReport.time}
                  onChange={(e) => setNewReport({ ...newReport, time: e.target.value })}
                  placeholder="e.g., 6:00 PM - 6:30 PM"
                  className="input-field"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Description</label>
                <textarea
                  value={newReport.description}
                  onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
                  placeholder="Brief description of what you observed..."
                  className="input-field min-h-[80px] resize-none"
                  required
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="flex-1 px-4 py-3 rounded-xl font-medium text-muted-foreground bg-secondary hover:bg-secondary/80 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newReport.type || !newReport.location || !newReport.time}
                  className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Community Reports */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
            Community Reports
          </h3>
          
          <div className="space-y-3">
            {reports.map((report, index) => (
              <div
                key={report.id}
                className="card-elevated animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{getEventIcon(report.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-foreground capitalize">
                        {report.type.replace('-', ' ')}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {getTimeAgo(report.timestamp)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                      <MapPin className="w-3 h-3" />
                      {report.location}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
                      <Clock className="w-3 h-3" />
                      {report.time}
                    </p>
                    <p className="text-xs text-foreground leading-relaxed mb-2">
                      {report.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-muted-foreground">
                        Reported by {report.reportedBy}
                      </span>
                      <button
                        onClick={() => handleUpvote(report.id)}
                        disabled={upvotedReports.has(report.id)}
                        className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                          upvotedReports.has(report.id)
                            ? 'bg-primary/20 text-primary'
                            : 'bg-secondary text-muted-foreground hover:bg-primary/20 hover:text-primary'
                        }`}
                      >
                        <ThumbsUp className="w-3 h-3" />
                        {report.upvotes}
                      </button>
                    </div>
                  </div>
                </div>

                {/* High engagement indicator */}
                {report.upvotes >= 20 && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-[10px] text-aqi-unhealthy-sensitive flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      High community concern - may be escalated to local authorities
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default ReportEvent;
