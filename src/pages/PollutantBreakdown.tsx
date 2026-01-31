import { Sparkles } from 'lucide-react';
import PollutantPieChart from '@/components/PollutantPieChart';
import LocalFactorTag from '@/components/LocalFactorTag';
import AQIForecastChart from '@/components/AQIForecastChart';
import BottomNav from '@/components/BottomNav';
import ThemeToggle from '@/components/ThemeToggle';
import AnimatedLeafBackground from '@/components/AnimatedLeafBackground';
import { localFactors } from '@/lib/aqiData';

const PollutantBreakdown = () => {
  return (
    <div className="min-h-screen bg-background pb-24 relative">
      <AnimatedLeafBackground />
      <ThemeToggle />

      {/* Header */}
      <div className="relative z-10 pt-20 pb-6 px-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl gradient-mint-bg flex items-center justify-center shadow-soft">
            <Sparkles className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">AI AQI Forecast</h1>
            <p className="text-sm text-muted-foreground">Predictive air quality insights</p>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        {/* AI Forecast Chart */}
        <div className="px-6 mb-6">
          <AQIForecastChart />
        </div>

        {/* Pie Chart - Pollution Sources */}
        <div className="px-6 mb-6">
          <PollutantPieChart />
        </div>

        {/* Local Factors */}
        <div className="px-6 mb-6">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
            Local Contributing Factors
          </h3>
          <div className="card-elevated">
            <p className="text-sm text-muted-foreground mb-4">
              These factors are currently influencing air quality in your area:
            </p>
            <div className="flex flex-wrap gap-2">
              {localFactors.map((factor) => (
                <LocalFactorTag
                  key={factor.label}
                  label={factor.label}
                  icon={factor.icon}
                  impact={factor.impact as 'low' | 'medium' | 'high'}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="px-6">
          <div className="card-elevated bg-secondary/50">
            <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
              <span>🤖</span> About AI Predictions
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Our AI model analyzes current pollutant levels, historical patterns, weather 
              forecasts, and local factors to predict AQI trends. Predictions are updated 
              hourly for maximum accuracy.
            </p>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default PollutantBreakdown;
