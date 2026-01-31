import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { getAQICategory } from '@/lib/aqiData';
import { Sparkles } from 'lucide-react';

interface ForecastDay {
  day: string;
  aqi: number;
  color: string;
}

const generateForecast = (currentAQI: number): ForecastDay[] => {
  const days = ['Today', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
  const forecast: ForecastDay[] = [];
  
  let aqi = currentAQI;
  
  for (let i = 0; i < 7; i++) {
    // Simulate realistic AQI changes based on trends
    const variation = Math.floor(Math.random() * 30) - 10;
    aqi = Math.max(20, Math.min(350, aqi + variation));
    
    const aqiData = getAQICategory(aqi);
    forecast.push({
      day: days[i],
      aqi: aqi,
      color: aqiData.color,
    });
  }
  
  return forecast;
};

const generateInsight = (forecast: ForecastDay[]): string => {
  const firstAQI = forecast[0].aqi;
  const lastAQI = forecast[forecast.length - 1].aqi;
  const midAQI = forecast[3].aqi;
  const maxAQI = Math.max(...forecast.map(d => d.aqi));
  const minAQI = Math.min(...forecast.map(d => d.aqi));
  const minDay = forecast.find(d => d.aqi === minAQI)?.day;
  const maxDay = forecast.find(d => d.aqi === maxAQI)?.day;
  
  if (lastAQI > firstAQI + 30) {
    return `⚠️ AQI is predicted to deteriorate over the next week. Consider limiting outdoor activities from ${maxDay}.`;
  } else if (lastAQI < firstAQI - 30) {
    return `✨ Air quality is expected to improve gradually. Best conditions predicted around ${minDay}.`;
  } else if (midAQI > firstAQI + 20 && lastAQI < midAQI) {
    return `📊 Temporary spike expected around Day 4, with improvement afterward. Plan outdoor activities accordingly.`;
  } else if (maxAQI > 150) {
    return `🔴 Unhealthy air quality predicted on ${maxDay}. Sensitive groups should take precautions.`;
  } else if (maxAQI <= 50) {
    return `🌿 Excellent air quality expected throughout the week. Great time for outdoor activities!`;
  }
  return `📈 Air quality will remain relatively stable over the coming week with minor fluctuations.`;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const aqiData = getAQICategory(payload[0].value);
    return (
      <div className="bg-card px-3 py-2 rounded-lg shadow-card border border-border">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">
          Predicted AQI:{' '}
          <span className="font-semibold" style={{ color: aqiData.color }}>
            {payload[0].value}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

const CustomDot = (props: any) => {
  const { cx, cy, payload } = props;
  const aqiData = getAQICategory(payload.aqi);
  
  return (
    <circle
      cx={cx}
      cy={cy}
      r={5}
      fill={aqiData.color}
      stroke="white"
      strokeWidth={2}
    />
  );
};

const AQIForecastChart = () => {
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [insight, setInsight] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate AI prediction loading
    setIsLoading(true);
    const timer = setTimeout(() => {
      const currentAQI = Math.floor(Math.random() * 80) + 50; // Simulate current AQI
      const newForecast = generateForecast(currentAQI);
      setForecast(newForecast);
      setInsight(generateInsight(newForecast));
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="card-elevated animate-fade-in">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-primary animate-pulse" />
          <h3 className="text-sm font-semibold text-foreground">AI AQI Forecast</h3>
        </div>
        <div className="h-48 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-muted-foreground">Generating AI prediction...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card-elevated animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">7-Day AQI Forecast</h3>
      </div>
      
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={forecast} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="forecastGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(142, 70%, 45%)" />
                <stop offset="33%" stopColor="hsl(48, 90%, 55%)" />
                <stop offset="66%" stopColor="hsl(28, 90%, 55%)" />
                <stop offset="100%" stopColor="hsl(15, 85%, 50%)" />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: 'hsl(0, 0%, 45%)' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: 'hsl(0, 0%, 45%)' }}
              domain={[0, 'auto']}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={50} stroke="hsl(142, 70%, 45%)" strokeDasharray="3 3" strokeOpacity={0.5} />
            <ReferenceLine y={100} stroke="hsl(48, 90%, 55%)" strokeDasharray="3 3" strokeOpacity={0.5} />
            <ReferenceLine y={150} stroke="hsl(28, 90%, 55%)" strokeDasharray="3 3" strokeOpacity={0.5} />
            <Line
              type="monotone"
              dataKey="aqi"
              stroke="url(#forecastGradient)"
              strokeWidth={3}
              dot={<CustomDot />}
              activeDot={{ r: 7, stroke: 'white', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* AI Insight */}
      <div className="mt-4 p-3 bg-secondary/50 rounded-lg border border-border/50">
        <p className="text-xs text-foreground leading-relaxed">
          <span className="font-medium">AI Insight:</span>{' '}
          <span className="text-muted-foreground">{insight}</span>
        </p>
      </div>

      {/* AQI Category Legend */}
      <div className="mt-4 flex flex-wrap gap-2 text-[10px]">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-aqi-good" />
          <span className="text-muted-foreground">Good (0-50)</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-aqi-moderate" />
          <span className="text-muted-foreground">Moderate (51-100)</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-aqi-sensitive" />
          <span className="text-muted-foreground">Unhealthy (101-150)</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-aqi-unhealthy" />
          <span className="text-muted-foreground">Very Unhealthy (151+)</span>
        </div>
      </div>
    </div>
  );
};

export default AQIForecastChart;
