import { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import HealthCard from '@/components/HealthCard';
import BottomNav from '@/components/BottomNav';
import ThemeToggle from '@/components/ThemeToggle';
import AnimatedLeafBackground from '@/components/AnimatedLeafBackground';
import { healthRecommendations, getAQICategory } from '@/lib/aqiData';

const HealthRecommendations = () => {
  const [aqiValue] = useState(72);
  const aqiData = getAQICategory(aqiValue);
  const recommendations = healthRecommendations[aqiData.category];

  const [userName, setUserName] = useState('');
  const [userAge, setUserAge] = useState<number | null>(null);
  const [hasSensitiveCondition, setHasSensitiveCondition] = useState(false);
  const [medicalCondition, setMedicalCondition] = useState('');

  useEffect(() => {
    const profile = localStorage.getItem('userProfile');
    if (profile) {
      const parsed = JSON.parse(profile);
      setUserName(parsed.name || '');
      setMedicalCondition(parsed.medicalCondition || 'none');
      setHasSensitiveCondition(parsed.medicalCondition && parsed.medicalCondition !== 'none');
      
      // Calculate age from date of birth
      if (parsed.dateOfBirth) {
        const dob = new Date(parsed.dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
          age--;
        }
        setUserAge(age);
      }
    }
  }, []);

  const getAgeGroup = () => {
    if (!userAge) return null;
    if (userAge < 12) return 'child';
    if (userAge < 18) return 'teen';
    if (userAge < 60) return 'adult';
    return 'senior';
  };

  const getPersonalizedNote = () => {
    const ageGroup = getAgeGroup();
    const notes: string[] = [];

    // Age-based recommendations
    if (ageGroup === 'child') {
      notes.push('Children are more vulnerable to air pollution. Limit outdoor play during peak pollution hours.');
    } else if (ageGroup === 'senior') {
      notes.push('Older adults should take extra precautions. Consider wearing a mask outdoors.');
    }

    // Condition-based recommendations
    if (medicalCondition === 'asthma') {
      notes.push('Keep your inhaler accessible. Avoid triggers and monitor your symptoms closely.');
    } else if (medicalCondition === 'respiratory') {
      notes.push('Limit strenuous outdoor activities. Use air purifiers indoors if available.');
    } else if (medicalCondition === 'heart') {
      notes.push('Air pollution can strain your heart. Rest more and stay hydrated.');
    }

    return notes;
  };

  const personalizedNotes = getPersonalizedNote();

  return (
    <div className="min-h-screen bg-background pb-24 relative">
      <AnimatedLeafBackground />
      <ThemeToggle />

      {/* Header */}
      <div className="relative z-10 pt-20 pb-6 px-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl gradient-mint-bg flex items-center justify-center shadow-soft">
            <Shield className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Health Guide</h1>
            <p className="text-sm text-muted-foreground">
              {userName ? `Personalized for ${userName}` : 'Based on current AQI'}
              {userAge && ` (Age ${userAge})`}
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10">
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

        {/* Personalized Notes */}
        {personalizedNotes.length > 0 && (
          <div className="px-6 mb-6">
            <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 animate-fade-in">
              <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                <span>👤</span> Personalized for You
              </h3>
              <ul className="space-y-2">
                {personalizedNotes.map((note, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Sensitive Group Warning */}
        {hasSensitiveCondition && aqiValue > 50 && (
          <div className="px-6 mb-6">
            <div className="p-4 rounded-2xl bg-aqi-unhealthySensitive/10 border border-aqi-unhealthySensitive/20 animate-fade-in">
              <p className="text-sm text-foreground flex items-start gap-2">
                <span className="text-lg">⚠️</span>
                <span>
                  <strong>Health Alert:</strong> Based on your health profile, take extra
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
      </div>

      <BottomNav />
    </div>
  );
};

export default HealthRecommendations;
