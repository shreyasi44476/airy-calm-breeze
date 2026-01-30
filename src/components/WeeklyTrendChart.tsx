import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { weeklyAQIData } from '@/lib/aqiData';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card px-3 py-2 rounded-lg shadow-card border border-border">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">
          AQI: <span className="font-semibold">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

const WeeklyTrendChart = () => {
  return (
    <div className="card-elevated animate-fade-in">
      <h3 className="text-sm font-semibold text-foreground mb-4">Weekly Trend</h3>
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={weeklyAQIData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="aqiGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(156, 50%, 55%)" stopOpacity={0.6} />
                <stop offset="50%" stopColor="hsl(48, 90%, 55%)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="hsl(28, 90%, 55%)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(142, 70%, 45%)" />
                <stop offset="50%" stopColor="hsl(48, 90%, 55%)" />
                <stop offset="100%" stopColor="hsl(28, 90%, 55%)" />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: 'hsl(160, 8%, 50%)' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: 'hsl(160, 8%, 50%)' }}
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="aqi"
              stroke="url(#lineGradient)"
              strokeWidth={2.5}
              fill="url(#aqiGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyTrendChart;
