import { useEffect, useMemo, useState } from 'react';
import { Heart, Clock, PlusCircle, Trash, Info } from 'lucide-react';
import AnimatedLeafBackground from '@/components/AnimatedLeafBackground';
import ThemeToggle from '@/components/ThemeToggle';
import BottomNav from '@/components/BottomNav';
import { Symptom, getCurrentEnvSnapshot, HealthEntry, saveEntry, loadEntries, detectInsights } from '@/lib/healthTracker';

const SYMPTOMS: { key: Symptom; label: string }[] = [
  { key: 'headache', label: 'Headache' },
  { key: 'breathing_difficulty', label: 'Breathing difficulty' },
  { key: 'eye_irritation', label: 'Eye irritation' },
  { key: 'coughing', label: 'Coughing' },
  { key: 'fatigue', label: 'Fatigue' },
  { key: 'chest_tightness', label: 'Chest tightness' },
];

const HealthTracker = () => {
  const [selected, setSelected] = useState<Record<Symptom, boolean>>(() => {
    const init: any = {};
    SYMPTOMS.forEach((s) => (init[s.key] = false));
    return init;
  });
  const [severity, setSeverity] = useState<number | undefined>(undefined);
  const [notes, setNotes] = useState('');
  const [entries, setEntries] = useState<HealthEntry[]>([]);
  const [isQuickOpen, setIsQuickOpen] = useState(true);

  const profileRaw = localStorage.getItem('userProfile');
  const profile = profileRaw ? JSON.parse(profileRaw) : { name: 'Guest' };
  const userId = profile.name || 'guest';

  useEffect(() => {
    const data = loadEntries(userId);
    setEntries(data);
  }, [userId]);

  const toggleSymptom = (s: Symptom) => {
    setSelected((prev) => ({ ...prev, [s]: !prev[s] }));
  };

  const resetForm = () => {
    setSelected((prev) => {
      const next: any = {};
      Object.keys(prev).forEach((k) => (next[k] = false));
      return next;
    });
    setSeverity(undefined);
    setNotes('');
  };

  const handleSave = () => {
    const chosen = Object.entries(selected).filter(([, v]) => v).map(([k]) => k as Symptom);
    if (chosen.length === 0) return;

    const env = getCurrentEnvSnapshot();
    const entry: HealthEntry = {
      id: Date.now().toString(),
      userId,
      symptoms: chosen,
      severity,
      notes: notes.trim() || undefined,
      timestamp: new Date().toISOString(),
      env,
    };

    saveEntry(entry);
    const updated = loadEntries(userId);
    setEntries(updated);
    resetForm();
    setIsQuickOpen(false);
  };

  const handleDelete = (id: string) => {
    const key = `healthEntries_${userId}`;
    const raw = localStorage.getItem(key);
    const list: HealthEntry[] = raw ? JSON.parse(raw) : [];
    const filtered = list.filter((e) => e.id !== id);
    localStorage.setItem(key, JSON.stringify(filtered));
    setEntries(filtered);
  };

  const insights = useMemo(() => detectInsights(entries), [entries]);

  return (
    <div className="min-h-screen bg-background pb-24 relative">
      <AnimatedLeafBackground />
      <ThemeToggle />

      <div className="relative z-10 pt-20 pb-6 px-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl gradient-mint-bg flex items-center justify-center shadow-soft">
            <Heart className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Health Tracker</h1>
            <p className="text-sm text-muted-foreground">Quickly log symptoms and see non-diagnostic correlations with local environmental data</p>
          </div>
        </div>
      </div>

      <div className="relative z-10 px-6 space-y-6">
        {/* Disclaimer */}
        <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-primary mt-1" />
            <div className="text-xs text-muted-foreground">
              <strong>This tool does not provide medical advice.</strong> Insights are simple correlations based on your entries and environmental snapshots — they are not diagnoses. If symptoms persist or worsen, consult a qualified healthcare professional.
            </div>
          </div>
        </div>

        {/* Quick Log */}
        <div className="card-elevated animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground">Quick Log</h3>
            <button
              onClick={() => setIsQuickOpen((v) => !v)}
              className="text-xs text-muted-foreground"
            >
              {isQuickOpen ? 'Close' : 'Open'}
            </button>
          </div>

          {isQuickOpen && (
            <div className="space-y-3">
              <div className="text-xs text-muted-foreground">Select symptoms</div>
              <div className="grid grid-cols-2 gap-2">
                {SYMPTOMS.map((s) => (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => toggleSymptom(s.key)}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${selected[s.key] ? 'border-primary bg-primary/10' : 'border-border bg-secondary/30 hover:border-primary/50'}`}>
                    <div className="text-sm font-medium text-foreground">{s.label}</div>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground">Severity (optional)</label>
                  <div className="flex items-center gap-2">
                    {[1,2,3,4,5].map((n) => (
                      <button key={n} type="button" onClick={() => setSeverity(n)} className={`px-3 py-2 rounded-xl border ${severity === n ? 'border-primary bg-primary/10' : 'border-border'}`}>{n}</button>
                    ))}
                    <button type="button" onClick={() => setSeverity(undefined)} className="px-2 py-1 text-xs text-muted-foreground">Clear</button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground">Time</label>
                  <div className="text-sm text-foreground p-3 rounded-xl border bg-secondary/20">{new Date().toLocaleString()}</div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Notes</label>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Brief notes (optional)" className="input-field min-h-[60px] resize-none" />
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={resetForm} type="button" className="flex-1 px-4 py-3 rounded-xl font-medium text-muted-foreground bg-secondary hover:bg-secondary/80 transition-colors">Clear</button>
                <button onClick={handleSave} type="button" className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-50" disabled={Object.values(selected).every((v) => !v)}>
                  <PlusCircle className="w-4 h-4" />
                  Log
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Insights */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Insights</h3>
          <div className="space-y-2">
            {insights.length === 0 ? (
              <div className="p-3 rounded-2xl border bg-secondary/10 text-sm text-muted-foreground">Add 2–3 entries to start seeing simple correlations here.</div>
            ) : (
              insights.map((i) => (
                <div key={i.id} className={`p-3 rounded-2xl border ${i.severity === 'warning' ? 'bg-aqi-unhealthy/10 border-aqi-unhealthy/20' : 'bg-primary/10 border-primary/20'}`}>
                  <div className="text-sm text-foreground">{i.message}</div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Entries */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Recent Entries</h3>
          <div className="space-y-3">
            {entries.length === 0 && (
              <div className="p-3 rounded-2xl border bg-secondary/10 text-sm text-muted-foreground">No entries yet. Use Quick Log to add one in seconds.</div>
            )}
            {entries.map((e) => (
              <div key={e.id} className="card-elevated">
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm font-semibold text-foreground">{e.symptoms.map(s => s.replace(/_/g, ' ')).join(', ')}</div>
                      <div className="text-xs text-muted-foreground">{new Date(e.timestamp).toLocaleString()}</div>
                    </div>

                    {e.severity && (
                      <div className="text-xs text-muted-foreground mb-1">Severity: {e.severity}/5</div>
                    )}

                    {e.notes && <div className="text-sm text-muted-foreground mb-2">"{e.notes}"</div>}

                    <div className="text-[12px] text-muted-foreground flex items-center gap-3">
                      <div>PM2.5: <strong className="text-foreground">{e.env.pm25 ?? '—'}</strong></div>
                      <div>AQI: <strong className="text-foreground">{e.env.aqi ?? '—'}</strong></div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <button onClick={() => handleDelete(e.id)} className="text-xs text-muted-foreground"> <Trash className="w-4 h-4" /> </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <BottomNav />
    </div>
  );
};

export default HealthTracker;
