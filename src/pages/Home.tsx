import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import ThemeToggle from '@/components/ThemeToggle';
import AnimatedLeafBackground from '@/components/AnimatedLeafBackground';
import QuoteRotator from '@/components/QuoteRotator';
import HomeIllustration from '@/components/HomeIllustration';
import SettingsModal from '@/components/SettingsModal';
import type { UserProfile } from '@/lib/aqiData';

const Home = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userCity, setUserCity] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const profile = localStorage.getItem('userProfile');
    if (!profile) {
      // First time user - show settings modal
      setIsSettingsOpen(true);
      return;
    }
    const parsed = JSON.parse(profile);
    setUserName(parsed.name || '');
    setUserCity(parsed.city || '');
  }, []);

  const handleProfileSave = (profile: UserProfile) => {
    setUserName(profile.name);
    setUserCity(profile.city);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="min-h-screen bg-background pb-24 relative">
      <AnimatedLeafBackground />
      <ThemeToggle />

      {/* Header with Settings */}
      <div className="relative z-10 pt-20 pb-4 px-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{getGreeting()}</p>
            <h1 className="text-2xl font-bold text-foreground mt-1">
              {userName || 'Welcome to BreatheIn'}
            </h1>
            {userCity && (
              <p className="text-sm text-muted-foreground mt-0.5">📍 {userCity}</p>
            )}
          </div>
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
          >
            <Settings className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-6">
        {/* Illustration + Quote Card */}
        <div className="card-elevated text-center py-8 mb-6 animate-scale-in">
          <HomeIllustration />
          <QuoteRotator />
        </div>

        {/* Quick Access Cards */}
        <div className="space-y-3">
          <button
            onClick={() => navigate('/aqi')}
            className="w-full card-elevated flex items-center gap-4 text-left hover:shadow-elevated transition-all animate-fade-in"
          >
            <div className="w-14 h-14 rounded-xl bg-aqi-good/20 flex items-center justify-center">
              <span className="text-2xl">🌿</span>
            </div>
            <div className="flex-1">
              <p className="text-base font-semibold text-foreground">Check Air Quality</p>
              <p className="text-xs text-muted-foreground">View current AQI for {userCity || 'your city'}</p>
            </div>
          </button>

          <button
            onClick={() => navigate('/health')}
            className="w-full card-elevated flex items-center gap-4 text-left hover:shadow-elevated transition-all animate-fade-in"
            style={{ animationDelay: '100ms' }}
          >
            <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
              <span className="text-2xl">💚</span>
            </div>
            <div className="flex-1">
              <p className="text-base font-semibold text-foreground">Health Recommendations</p>
              <p className="text-xs text-muted-foreground">Personalized advice based on AQI</p>
            </div>
          </button>

          <button
            onClick={() => navigate('/pollutants')}
            className="w-full card-elevated flex items-center gap-4 text-left hover:shadow-elevated transition-all animate-fade-in"
            style={{ animationDelay: '200ms' }}
          >
            <div className="w-14 h-14 rounded-xl bg-aqi-moderate/20 flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
            <div className="flex-1">
              <p className="text-base font-semibold text-foreground">Pollutant Breakdown</p>
              <p className="text-xs text-muted-foreground">See what's in your air</p>
            </div>
          </button>

          <button
            onClick={() => navigate('/report')}
            className="w-full card-elevated flex items-center gap-4 text-left hover:shadow-elevated transition-all animate-fade-in"
            style={{ animationDelay: '300ms' }}
          >
            <div className="w-14 h-14 rounded-xl bg-destructive/20 flex items-center justify-center">
              <span className="text-2xl">🚨</span>
            </div>
            <div className="flex-1">
              <p className="text-base font-semibold text-foreground">Report an Event</p>
              <p className="text-xs text-muted-foreground">Help your community stay informed</p>
            </div>
          </button>
        </div>
      </div>

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)}
        onSave={handleProfileSave}
      />

      <BottomNav />
    </div>
  );
};

export default Home;
