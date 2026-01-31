import { detectInsights, HealthEntry } from '@/lib/healthTracker';

describe('healthTracker insights', () => {
  test('detects PM2.5 consecutive day correlation', () => {
    const day1 = new Date();
    const day2 = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const entries: HealthEntry[] = [
      {
        id: '1',
        userId: 'u',
        symptoms: ['headache'],
        timestamp: day1.toISOString(),
        env: { pm25: 130, aqi: 160 },
      } as any,
      {
        id: '2',
        userId: 'u',
        symptoms: ['headache'],
        timestamp: day2.toISOString(),
        env: { pm25: 140, aqi: 170 },
      } as any,
    ];

    const insights = detectInsights(entries);
    expect(insights.some((i) => i.message.toLowerCase().includes('headache'))).toBe(true);
  });

  test('detects repeated occurrences escalation', () => {
    const now = Date.now();
    const entries: HealthEntry[] = new Array(3).fill(0).map((_, i) => ({
      id: String(i),
      userId: 'u',
      symptoms: ['coughing'],
      timestamp: new Date(now - i * 2 * 24 * 60 * 60 * 1000).toISOString(),
      env: { pm25: 40, aqi: 40 },
    }) as any);

    const insights = detectInsights(entries);
    expect(insights.some((i) => i.message.toLowerCase().includes('consider consulting'))).toBe(true);
  });
});