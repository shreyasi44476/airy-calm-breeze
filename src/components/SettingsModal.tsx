import { useState, useEffect } from 'react';
import { X, User, Calendar, MapPin, Heart } from 'lucide-react';
import type { UserProfile } from '@/lib/aqiData';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (profile: UserProfile) => void;
}

const medicalConditions = [
  { value: 'none', label: 'None', icon: '✓' },
  { value: 'asthma', label: 'Asthma', icon: '🫁' },
  { value: 'respiratory', label: 'Respiratory', icon: '💨' },
  { value: 'heart', label: 'Heart-related', icon: '❤️' },
];

const indianCities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai',
  'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow',
  'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal',
  'Visakhapatnam', 'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana',
];

const SettingsModal = ({ isOpen, onClose, onSave }: SettingsModalProps) => {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    dateOfBirth: '',
    city: '',
    medicalCondition: 'none',
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, [isOpen]);

  const handleSave = () => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
    onSave(profile);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-card rounded-2xl shadow-elevated animate-scale-in overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-lg font-semibold text-foreground">Profile Settings</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-5">
          {/* Name */}
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
            />
          </div>

          {/* Date of Birth */}
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

          {/* City */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Your City (India)
            </label>
            <select
              value={profile.city}
              onChange={(e) => setProfile({ ...profile, city: e.target.value })}
              className="input-field"
            >
              <option value="">Select your city</option>
              {indianCities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* Medical Conditions */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <Heart className="w-4 h-4 text-primary" />
              Medical Conditions (Optional)
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

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={!profile.name.trim() || !profile.city}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
