import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import type { TooltipProps } from 'recharts';
import { weeklyAQIData, getAQICategory } from '@/lib/aqiData';

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const first = payload[0] as unknown as { value?: number };
    const value = typeof first.value === 'number' ? first.value : 0;
    const aqiData = getAQICategory(value);
    return (
      <div className="bg-card px-3 py-2 rounded-lg shadow-card border border-border">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">
          AQI: <span className="font-semibold" style={{ color: aqiData.color }}>{value}</span>
        </p>
      </div>
    );
  }
  return null;
};

const WeeklyBarChart = () => {
  return (
    <div className="card-elevated animate-fade-in">
      <h3 className="text-sm font-semibold text-foreground mb-4">Weekly AQI Trend</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyAQIData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: 'hsl(0, 0%, 45%)' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: 'hsl(0, 0%, 45%)' }}
              domain={[0, 150]}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(156, 40%, 92%, 0.5)' }} />
            <Bar dataKey="aqi" radius={[6, 6, 0, 0]} maxBarSize={35}>
              {weeklyAQIData.map((entry, index) => {
                const aqiData = getAQICategory(entry.aqi);
                return <Cell key={`cell-${index}`} fill={aqiData.color} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyBarChart;
