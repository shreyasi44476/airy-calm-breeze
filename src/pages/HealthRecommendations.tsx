import { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import HealthCard from '@/components/HealthCard';
import BottomNav from '@/components/BottomNav';
import { healthRecommendations, getAQICategory } from '@/lib/aqiData';

const HealthRecommendations = () => {
  const [aqiValue] = useState(72);
  const aqiData = getAQICategory(aqiValue);
  const recommendations = healthRecommendations[aqiData.category];

  const [userName, setUserName] = useState('');
  const [hasSensitiveCondition, setHasSensitiveCondition] = useState(false);

  useEffect(() => {
    const profile = localStorage.getItem('userProfile');
    if (profile) {
      const parsed = JSON.parse(profile);
      setUserName(parsed.name || '');
      setHasSensitiveCondition(parsed.medicalCondition && parsed.medicalCondition !== 'none');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="pt-12 pb-6 px-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl gradient-mint-bg flex items-center justify-center shadow-soft">
            <Shield className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Health Guide</h1>
            <p className="text-sm text-muted-foreground">
              {userName ? `Personalized for ${userName}` : 'Based on current AQI'}
            </p>
          </div>
        </div>
      </div>

      {/* AQI Status Banner */}
      <div className="px-6 mb-6">
        <div
          className="p-4 rounded-2xl border-l-4 animate-fade-in"
          style={{
            backgroundColor: `${aqiData.color}10`,
            borderColor: aqiData.color,
          }}
        >
          <div className="flex items-center gap-3 mb-2">
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
              style={{ backgroundColor: aqiData.color }}
            >
              {aqiValue}
            </span>
            <h2 className="text-base font-semibold text-foreground">
              {recommendations.title}
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">{recommendations.description}</p>
        </div>
      </div>

      {/* Sensitive Group Warning */}
      {hasSensitiveCondition && aqiValue > 50 && (
        <div className="px-6 mb-6">
          <div className="p-4 rounded-2xl bg-aqi-unhealthySensitive/10 border border-aqi-unhealthySensitive/20 animate-fade-in">
            <p className="text-sm text-foreground flex items-start gap-2">
              <span className="text-lg">⚠️</span>
              <span>
                <strong>Note for you:</strong> Based on your health profile, take extra
                precautions today. Consider limiting outdoor exposure.
              </span>
            </p>
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="px-6">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
          Today's Recommendations
        </h3>
        <div className="space-y-3">
          {recommendations.recommendations.map((rec, index) => (
            <HealthCard
              key={index}
              icon={rec.icon}
              title={rec.title}
              text={rec.text}
              delay={index * 100}
            />
          ))}
        </div>
      </div>

      {/* General Tips */}
      <div className="px-6 mt-8">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
          General Tips
        </h3>
        <div className="card-elevated">
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Check AQI before morning exercises</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Keep rescue medication handy if needed</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Stay hydrated throughout the day</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Indoor plants can help improve air quality</span>
            </li>
          </ul>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default HealthRecommendations;
