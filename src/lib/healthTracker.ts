import { getAQICategory, pollutantData } from './aqiData';

export type Symptom =
  | 'headache'
  | 'breathing_difficulty'
  | 'eye_irritation'
  | 'coughing'
  | 'fatigue'
  | 'chest_tightness';

export interface HealthEntry {
  id: string;
  userId: string;
  symptoms: Symptom[];
  severity?: number; // 1-5
  notes?: string;
  timestamp: string; // ISO
  env: {
    pm25?: number;
    aqi?: number;
    // keep extensible
    [key: string]: any;
  };
}

const STORAGE_PREFIX = 'healthEntries_';

const getStorageKey = (userId?: string) => `${STORAGE_PREFIX}${userId || 'guest'}`;

export const saveEntry = (entry: HealthEntry) => {
  const key = getStorageKey(entry.userId);
  const raw = localStorage.getItem(key);
  const list: HealthEntry[] = raw ? JSON.parse(raw) : [];
  list.unshift(entry); // keep newest first
  localStorage.setItem(key, JSON.stringify(list));
};

export const loadEntries = (userId?: string): HealthEntry[] => {
  const key = getStorageKey(userId);
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : [];
};

// Simple helper to get "current" snapshot of environment.
export const getCurrentEnvSnapshot = () => {
  // Pollutant data in lib is example; find PM2.5 if present
  const pm25Obj = pollutantData.find((p) => p.name === 'PM2.5');
  const pm25 = pm25Obj ? pm25Obj.value : undefined;

  // Use weeklyAQIData's last item often reflects current day in this demo data
  const aqi = getAQICategory(pm25 ?? 0).value || undefined;

  return { pm25, aqi };
};

// Rule-based patterns (modular, extendable)
export interface Insight {
  id: string;
  message: string;
  severity?: 'info' | 'warning';
}

// Detect simple correlations and repeated/high severity events.
export const detectInsights = (entries: HealthEntry[]): Insight[] => {
  const insights: Insight[] = [];
  if (!entries || entries.length < 2) return insights; // need at least 2 entries

  // Group entries by symptom
  const symptomMap: Record<string, HealthEntry[]> = {};
  entries.forEach((e) => {
    e.symptoms.forEach((s) => {
      symptomMap[s] = symptomMap[s] || [];
      symptomMap[s].push(e);
    });
  });

  // Rule 1: PM2.5 threshold correlation (example threshold 120)
  const PM25_THRESHOLD = 120;
  Object.entries(symptomMap).forEach(([symptom, list]) => {
    // Count days with pm25 > threshold where symptom reported
    const daysWithHighPm25: Record<string, boolean> = {};
    list.forEach((e) => {
      const day = new Date(e.timestamp).toDateString();
      if (e.env.pm25 && e.env.pm25 > PM25_THRESHOLD) {
        daysWithHighPm25[day] = true;
      }
    });

    const highDayCount = Object.keys(daysWithHighPm25).length;

    if (highDayCount >= 2) {
      // check consecutive days (simple check)
      const dates = Object.keys(daysWithHighPm25)
        .map((d) => new Date(d))
        .sort((a, b) => a.getTime() - b.getTime());

      let maxConsec = 1;
      let cur = 1;
      for (let i = 1; i < dates.length; i++) {
        const prev = new Date(dates[i - 1]);
        const curd = new Date(dates[i]);
        const diff = (curd.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);
        if (diff === 1) cur++;
        else cur = 1;
        if (cur > maxConsec) maxConsec = cur;
      }

      if (maxConsec >= 2) {
        insights.push({
          id: `pm25-${symptom}`,
          message: `You’ve reported ${symptom.replace(/_/g, ' ')} on multiple occasions when PM2.5 exceeded ${PM25_THRESHOLD} for ${maxConsec} consecutive day(s). This is a correlation, not medical advice.`,
          severity: 'info',
        });
      } else if (highDayCount >= 2) {
        insights.push({
          id: `pm25-${symptom}-multi`,
          message: `You’ve reported ${symptom.replace(/_/g, ' ')} multiple times when PM2.5 exceeded ${PM25_THRESHOLD}. This is a correlation, not medical advice.`,
          severity: 'info',
        });
      }
    }

    // Rule 2: repeated occurrences or high severity
    const recentOccurrences = list.filter((e) => {
      const diffDays = (Date.now() - new Date(e.timestamp).getTime()) / (1000 * 60 * 60 * 24);
      return diffDays <= 14; // recent two weeks
    }).length;

    if (recentOccurrences >= 3) {
      insights.push({
        id: `repeat-${symptom}`,
        message: `You’ve reported ${symptom.replace(/_/g, ' ')} ${recentOccurrences} times in the past two weeks. If these symptoms persist or worsen, consider consulting a qualified healthcare professional.`,
        severity: 'warning',
      });
    } else {
      // check for high severity
      const severe = list.some((e) => (e.severity ?? 0) >= 4);
      if (severe) {
        insights.push({
          id: `severity-${symptom}`,
          message: `You reported ${symptom.replace(/_/g, ' ')} at high severity recently. If symptoms persist or worsen, consider consulting a qualified healthcare professional.`,
          severity: 'warning',
        });
      }
    }
  });

  // Deduplicate by id
  const unique: Record<string, Insight> = {};
  insights.forEach((i) => (unique[i.id] = i));

  return Object.values(unique);
};
