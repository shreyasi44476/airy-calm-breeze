import { Wind } from 'lucide-react';
import PollutantPieChart from '@/components/PollutantPieChart';
import LocalFactorTag from '@/components/LocalFactorTag';
import BottomNav from '@/components/BottomNav';
import { pollutantData, localFactors } from '@/lib/aqiData';

const PollutantBreakdown = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="pt-12 pb-6 px-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl gradient-mint-bg flex items-center justify-center shadow-soft">
            <Wind className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Pollutant Analysis</h1>
            <p className="text-sm text-muted-foreground">What's in your air today</p>
          </div>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="px-6 mb-6">
        <PollutantPieChart />
      </div>

      {/* Pollutant Details */}
      <div className="px-6 mb-6">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
          Pollutant Levels
        </h3>
        <div className="space-y-3">
          {pollutantData.map((pollutant, index) => (
            <div
              key={pollutant.name}
              className="card-elevated flex items-center justify-between animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: pollutant.color }}
                />
                <div>
                  <p className="text-sm font-medium text-foreground">{pollutant.name}</p>
                  <p className="text-xs text-muted-foreground">Concentration: {pollutant.value} µg/m³</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-foreground">{pollutant.percentage}%</p>
              </div>
            </div>
          ))}
        </div>
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
            <span>💡</span> Understanding Pollutants
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong>PM2.5</strong> are fine particles that can penetrate deep into lungs.{' '}
            <strong>PM10</strong> are larger particles from dust and pollen.{' '}
            <strong>NO₂</strong> primarily comes from vehicle emissions.{' '}
            <strong>CO</strong> is from incomplete combustion, while{' '}
            <strong>O₃</strong> forms when sunlight reacts with pollutants.
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default PollutantBreakdown;
