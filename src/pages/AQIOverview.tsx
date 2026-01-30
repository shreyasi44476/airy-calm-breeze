import { useState, useEffect } from 'react';
import { MapPin, RefreshCw } from 'lucide-react';
import AQICircle from '@/components/AQICircle';
import WeeklyTrendChart from '@/components/WeeklyTrendChart';
import BottomNav from '@/components/BottomNav';
import { activitySuggestions, getAQICategory } from '@/lib/aqiData';

const AQIOverview = () => {
  const [aqiValue, setAqiValue] = useState(72);
  const [suggestion, setSuggestion] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [userCity, setUserCity] = useState('New Delhi');

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

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setAqiValue(Math.floor(Math.random() * 150) + 30);
      setIsRefreshing(false);
    }, 1000);
  };

  const lastUpdated = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="pt-12 pb-4 px-6">
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
      <div className="flex flex-col items-center py-8">
        <AQICircle value={aqiValue} />
        
        {/* Activity Suggestion */}
        <div className="mt-8 px-6 text-center max-w-sm mx-auto">
          <p className="text-base text-foreground font-medium animate-fade-in">
            {suggestion}
          </p>
        </div>

        {/* Last Updated */}
        <p className="text-xs text-muted-foreground mt-4">
          Last updated at {lastUpdated}
        </p>
      </div>

      {/* Weekly Trend */}
      <div className="px-6 mt-4">
        <WeeklyTrendChart />
      </div>

      {/* Quick Stats */}
      <div className="px-6 mt-6">
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
