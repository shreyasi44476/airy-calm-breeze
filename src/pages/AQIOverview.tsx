import { useState, useEffect, useCallback, useRef } from 'react';
import { MapPin, RefreshCw } from 'lucide-react';
import AQICircle from '@/components/AQICircle';
import WeeklyBarChart from '@/components/WeeklyBarChart';
import AQILegend from '@/components/AQILegend';
import BottomNav from '@/components/BottomNav';
import ThemeToggle from '@/components/ThemeToggle';
import AnimatedLeafBackground from '@/components/AnimatedLeafBackground';
import AQISpikeAlert from '@/components/AQISpikeAlert';
import { activitySuggestions, getAQICategory } from '@/lib/aqiData';

const AQIOverview = () => {
  const [aqiValue, setAqiValue] = useState(72);
  const [previousAQI, setPreviousAQI] = useState(72);
  const [suggestion, setSuggestion] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [userCity, setUserCity] = useState('New Delhi');
  const [showSpikeAlert, setShowSpikeAlert] = useState(false);
  const lastAlertedAQI = useRef(72);

  useEffect(() => {
    const profile = localStorage.getItem('userProfile');
    if (profile) {
      const parsed = JSON.parse(profile);
      if (parsed.city) {
        setUserCity(parsed.city);
      }
    }
  }, []);

  useEffect(() => {
    const category = getAQICategory(aqiValue).category;
    const suggestions = activitySuggestions[category];
    setSuggestion(suggestions[Math.floor(Math.random() * suggestions.length)]);
  }, [aqiValue]);

  // Check for significant AQI increase
  const checkForSpikeAlert = useCallback((newAQI: number, oldAQI: number) => {
    const increase = newAQI - oldAQI;
    const oldCategory = getAQICategory(oldAQI).category;
    const newCategory = getAQICategory(newAQI).category;
    const categoryChanged = oldCategory !== newCategory && newAQI > oldAQI;
    
    // Only alert if increase >= 20 OR category worsened
    // And avoid repeated alerts for same spike
    if ((increase >= 20 || categoryChanged) && newAQI > lastAlertedAQI.current) {
      lastAlertedAQI.current = newAQI;
      setShowSpikeAlert(true);
    }
  }, []);

  const handleCloseAlert = useCallback(() => {
    setShowSpikeAlert(false);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    const currentAQI = aqiValue;
    
    // Simulate API call
    setTimeout(() => {
      const newAQI = Math.floor(Math.random() * 150) + 30;
      setPreviousAQI(currentAQI);
      setAqiValue(newAQI);
      checkForSpikeAlert(newAQI, currentAQI);
      setIsRefreshing(false);
    }, 1000);
  };

  const lastUpdated = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div className="min-h-screen bg-background pb-24 relative">
      <AnimatedLeafBackground />
      <ThemeToggle />
      
      {/* AQI Spike Alert */}
      <AQISpikeAlert
        isVisible={showSpikeAlert}
        previousAQI={previousAQI}
        currentAQI={aqiValue}
        onClose={handleCloseAlert}
      />

      {/* Header */}
      <div className="relative z-10 pt-20 pb-4 px-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Current Location</p>
            <div className="flex items-center gap-1.5 mt-1">
              <MapPin className="w-4 h-4 text-primary" />
              <h1 className="text-lg font-semibold text-foreground">{userCity}</h1>
            </div>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
          >
            <RefreshCw
              className={`w-5 h-5 text-muted-foreground ${isRefreshing ? 'animate-spin' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Main AQI Display */}
      <div className="relative z-10 flex flex-col items-center py-6">
        <AQICircle value={aqiValue} />
        
        {/* Activity Suggestion */}
        <div className="mt-6 px-6 text-center max-w-sm mx-auto">
          <p className="text-base text-foreground font-medium animate-fade-in">
            {suggestion}
          </p>
        </div>

        {/* Last Updated */}
        <p className="text-xs text-muted-foreground mt-3">
          Last updated at {lastUpdated}
        </p>
      </div>

      {/* Weekly Trend - Bar Chart */}
      <div className="relative z-10 px-6 mt-4">
        <WeeklyBarChart />
      </div>

      {/* AQI Legend */}
      <div className="relative z-10 px-6 mt-4">
        <AQILegend />
      </div>

      {/* Quick Stats */}
      <div className="relative z-10 px-6 mt-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="card-elevated text-center py-4">
            <p className="text-xl font-bold text-foreground">38</p>
            <p className="text-[10px] text-muted-foreground mt-1">Weekly Low</p>
          </div>
          <div className="card-elevated text-center py-4">
            <p className="text-xl font-bold text-foreground">78</p>
            <p className="text-[10px] text-muted-foreground mt-1">Weekly High</p>
          </div>
          <div className="card-elevated text-center py-4">
            <p className="text-xl font-bold text-foreground">53</p>
            <p className="text-[10px] text-muted-foreground mt-1">Average</p>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default AQIOverview;
