import { useEffect, useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { getAQICategory } from '@/lib/aqiData';

interface AQISpikeAlertProps {
  isVisible: boolean;
  previousAQI: number;
  currentAQI: number;
  onClose: () => void;
}

const AQISpikeAlert = ({ isVisible, previousAQI, currentAQI, onClose }: AQISpikeAlertProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
    }
  }, [isVisible, onClose]);

  if (!isVisible && !isAnimating) return null;

  const increase = currentAQI - previousAQI;
  const previousCategory = getAQICategory(previousAQI).category;
  const currentCategory = getAQICategory(currentAQI).category;
  const categoryChanged = previousCategory !== currentCategory;

  return (
    <div
      className={`
        fixed top-20 right-4 z-50 max-w-sm w-[calc(100%-2rem)] sm:w-80
        transition-all duration-500 ease-out
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
      role="alert"
      aria-live="polite"
    >
      <div className="aqi-spike-alert rounded-2xl p-4 shadow-lg border">
        <div className="flex items-start gap-3">
          {/* Warning Icon */}
          <div className="aqi-spike-icon flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm leading-tight">
              AQI has increased in your area
            </h4>
            <p className="text-xs mt-1 opacity-80">
              {categoryChanged 
                ? `AQI rose by ${increase} points and crossed into a new pollution category.`
                : `AQI increased by ${increase} points. Take precautions if needed.`
              }
            </p>
            <div className="flex items-center gap-2 mt-2 text-xs font-medium opacity-90">
              <span>{previousAQI}</span>
              <span>→</span>
              <span>{currentAQI}</span>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center hover:opacity-70 transition-opacity aqi-spike-close"
            aria-label="Dismiss alert"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress bar for auto-dismiss */}
        <div className="mt-3 h-1 rounded-full overflow-hidden bg-black/10 dark:bg-white/10">
          <div 
            className="h-full rounded-full aqi-spike-progress"
            style={{
              animation: isVisible ? 'shrink-progress 5s linear forwards' : 'none'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AQISpikeAlert;
