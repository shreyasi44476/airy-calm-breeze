import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, ChevronRight, Activity, Heart, PieChart } from 'lucide-react';
import AQICircle from '@/components/AQICircle';
import BottomNav from '@/components/BottomNav';
import QuoteRotator from '@/components/QuoteRotator';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userCity, setUserCity] = useState('');
  const [aqiValue] = useState(72);

  useEffect(() => {
    const profile = localStorage.getItem('userProfile');
    if (!profile) {
      navigate('/');
      return;
    }
    const parsed = JSON.parse(profile);
    setUserName(parsed.name || 'Friend');
    setUserCity(parsed.city || 'Your City');
  }, [navigate]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const quickActions = [
    {
      icon: Activity,
      label: 'AQI Details',
      description: 'View current levels',
      path: '/aqi',
      color: 'bg-aqi-good/10 text-aqi-good',
    },
    {
      icon: Heart,
      label: 'Health Tips',
      description: 'Personalized advice',
      path: '/health',
      color: 'bg-primary/10 text-primary',
    },
    {
      icon: PieChart,
      label: 'Pollutants',
      description: 'See breakdown',
      path: '/pollutants',
      color: 'bg-aqi-moderate/10 text-aqi-moderate',
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="pt-12 pb-6 px-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{getGreeting()}</p>
            <h1 className="text-2xl font-bold text-foreground mt-1">{userName}</h1>
          </div>
          <div className="w-12 h-12 rounded-xl gradient-mint-bg flex items-center justify-center shadow-soft">
            <Leaf className="w-6 h-6 text-primary-foreground" />
          </div>
        </div>
      </div>

      {/* Main AQI Card */}
      <div className="px-6 mb-6">
        <div className="card-elevated p-6 text-center animate-scale-in">
          <p className="text-sm text-muted-foreground mb-4">Air Quality in {userCity}</p>
          <div className="flex justify-center mb-4">
            <AQICircle value={aqiValue} size="md" />
          </div>
          <button
            onClick={() => navigate('/aqi')}
            className="text-sm text-primary font-medium flex items-center gap-1 mx-auto hover:gap-2 transition-all"
          >
            View Details
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quote */}
      <div className="px-6 mb-6">
        <div className="card-elevated bg-secondary/30">
          <QuoteRotator />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
          Quick Access
        </h3>
        <div className="space-y-3">
          {quickActions.map((action, index) => (
            <button
              key={action.path}
              onClick={() => navigate(action.path)}
              className="w-full card-elevated flex items-center gap-4 text-left hover:shadow-elevated transition-shadow animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${action.color}`}>
                <action.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{action.label}</p>
                <p className="text-xs text-muted-foreground">{action.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
