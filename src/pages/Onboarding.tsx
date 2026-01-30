import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, MapPin, User, Calendar, Heart } from 'lucide-react';
import QuoteRotator from '@/components/QuoteRotator';
import type { UserProfile } from '@/lib/aqiData';

const medicalConditions = [
  { value: 'none', label: 'None', icon: '✓' },
  { value: 'asthma', label: 'Asthma', icon: '🫁' },
  { value: 'respiratory', label: 'Respiratory', icon: '💨' },
  { value: 'heart', label: 'Heart-related', icon: '❤️' },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    dateOfBirth: '',
    city: '',
    medicalCondition: 'none',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('userProfile', JSON.stringify(profile));
    navigate('/aqi');
  };

  const isStep1Valid = profile.name.trim() !== '';
  const isStep2Valid = profile.city.trim() !== '';

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="pt-12 pb-6 px-6 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-mint-bg flex items-center justify-center shadow-elevated">
          <Leaf className="w-8 h-8 text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">BreatheWell</h1>
        <p className="text-sm text-muted-foreground">Your personal air quality companion</p>
      </div>

      {/* Quote Section */}
      <QuoteRotator />

      {/* Progress Indicator */}
      <div className="px-6 mb-6">
        <div className="flex gap-2 justify-center">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                s === step
                  ? 'w-8 bg-primary'
                  : s < step
                  ? 'w-4 bg-primary/50'
                  : 'w-4 bg-muted'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 px-6 pb-8">
        <div className="card-elevated max-w-md mx-auto">
          {step === 1 && (
            <div className="space-y-5 animate-fade-in">
              <h2 className="text-lg font-semibold text-foreground mb-4">Let's get to know you</h2>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  Your Name
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  placeholder="Enter your name"
                  className="input-field"
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={profile.dateOfBirth}
                  onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
                  className="input-field"
                />
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!isStep1Valid}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5 animate-fade-in">
              <h2 className="text-lg font-semibold text-foreground mb-4">Where are you located?</h2>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Your City
                </label>
                <input
                  type="text"
                  value={profile.city}
                  onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                  placeholder="Enter your city"
                  className="input-field"
                  autoFocus
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 px-6 py-3 rounded-xl font-medium text-muted-foreground bg-secondary hover:bg-secondary/80 transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={!isStep2Valid}
                  className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5 animate-fade-in">
              <h2 className="text-lg font-semibold text-foreground mb-2">Health Information</h2>
              <p className="text-sm text-muted-foreground">Optional: helps personalize recommendations</p>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Heart className="w-4 h-4 text-primary" />
                  Any medical conditions?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {medicalConditions.map((condition) => (
                    <button
                      key={condition.value}
                      type="button"
                      onClick={() =>
                        setProfile({
                          ...profile,
                          medicalCondition: condition.value as UserProfile['medicalCondition'],
                        })
                      }
                      className={`p-3 rounded-xl border-2 transition-all text-left ${
                        profile.medicalCondition === condition.value
                          ? 'border-primary bg-primary/10'
                          : 'border-border bg-secondary/30 hover:border-primary/50'
                      }`}
                    >
                      <span className="text-lg mb-1 block">{condition.icon}</span>
                      <span className="text-xs font-medium text-foreground">{condition.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 px-6 py-3 rounded-xl font-medium text-muted-foreground bg-secondary hover:bg-secondary/80 transition-colors"
                >
                  Back
                </button>
                <button type="submit" className="btn-primary flex-1">
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Onboarding;
