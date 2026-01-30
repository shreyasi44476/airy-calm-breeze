import { useEffect, useState } from 'react';
import { getAQICategory, getCategoryLabel } from '@/lib/aqiData';

interface AQICircleProps {
  value: number;
  size?: 'sm' | 'md' | 'lg';
}

const AQICircle = ({ value, size = 'lg' }: AQICircleProps) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const aqiData = getAQICategory(value);

  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-36 h-36',
    lg: 'w-48 h-48',
  };

  const textSizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-5xl',
  };

  const labelSizeClasses = {
    sm: 'text-[10px]',
    md: 'text-xs',
    lg: 'text-sm',
  };

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const stepDuration = duration / steps;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setAnimatedValue(value);
        clearInterval(timer);
      } else {
        setAnimatedValue(Math.round(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [value]);

  // Calculate the stroke dash for the progress ring
  const circumference = 2 * Math.PI * 88;
  const maxAQI = 500;
  const progress = Math.min(value / maxAQI, 1);
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <div className={`${sizeClasses[size]} relative animate-scale-in`}>
      {/* Background glow */}
      <div
        className="absolute inset-0 rounded-full blur-2xl opacity-30"
        style={{ backgroundColor: aqiData.color }}
      />

      {/* SVG Ring */}
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 200 200">
        {/* Background circle */}
        <circle
          cx="100"
          cy="100"
          r="88"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-muted/50"
        />
        {/* Progress circle */}
        <circle
          cx="100"
          cy="100"
          r="88"
          fill="none"
          stroke={aqiData.color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>

      {/* Inner circle with value */}
      <div
        className="absolute inset-4 rounded-full flex flex-col items-center justify-center bg-card"
        style={{ boxShadow: `0 0 30px ${aqiData.color}30` }}
      >
        <span
          className={`${textSizeClasses[size]} font-bold`}
          style={{ color: aqiData.color }}
        >
          {animatedValue}
        </span>
        <span className={`${labelSizeClasses[size]} text-muted-foreground font-medium mt-1`}>
          {getCategoryLabel(aqiData.category)}
        </span>
      </div>
    </div>
  );
};

export default AQICircle;
