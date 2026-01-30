const HomeIllustration = () => {
  return (
    <div className="relative w-32 h-32 mx-auto mb-4">
      {/* Main tree/plant illustration */}
      <svg viewBox="0 0 120 120" className="w-full h-full">
        {/* Ground */}
        <ellipse cx="60" cy="110" rx="35" ry="6" fill="hsl(156, 40%, 85%)" />
        
        {/* Pot */}
        <path 
          d="M40 95 L45 110 L75 110 L80 95 Z" 
          fill="hsl(28, 50%, 65%)" 
          className="drop-shadow-sm"
        />
        <path 
          d="M38 90 L82 90 L80 95 L40 95 Z" 
          fill="hsl(28, 55%, 55%)" 
        />
        
        {/* Plant stem */}
        <path 
          d="M60 90 Q58 75 60 60 Q62 45 60 30" 
          stroke="hsl(142, 45%, 40%)" 
          strokeWidth="3" 
          fill="none"
        />
        
        {/* Leaves */}
        <ellipse 
          cx="48" cy="55" rx="15" ry="8" 
          fill="hsl(156, 50%, 65%)" 
          transform="rotate(-30 48 55)"
        />
        <ellipse 
          cx="72" cy="50" rx="14" ry="7" 
          fill="hsl(156, 55%, 60%)" 
          transform="rotate(25 72 50)"
        />
        <ellipse 
          cx="45" cy="35" rx="12" ry="6" 
          fill="hsl(142, 50%, 55%)" 
          transform="rotate(-15 45 35)"
        />
        <ellipse 
          cx="75" cy="30" rx="13" ry="6" 
          fill="hsl(156, 50%, 62%)" 
          transform="rotate(20 75 30)"
        />
        <ellipse 
          cx="60" cy="22" rx="10" ry="5" 
          fill="hsl(142, 55%, 50%)" 
        />
        
        {/* Small decorative elements */}
        <circle cx="30" cy="80" r="3" fill="hsl(156, 40%, 75%)" opacity="0.6" />
        <circle cx="90" cy="85" r="2" fill="hsl(156, 40%, 70%)" opacity="0.5" />
        <circle cx="25" cy="65" r="2" fill="hsl(142, 50%, 70%)" opacity="0.4" />
        <circle cx="95" cy="70" r="3" fill="hsl(156, 45%, 72%)" opacity="0.5" />
        
        {/* Air quality indicator dots */}
        <circle cx="35" cy="45" r="4" fill="hsl(142, 70%, 50%)" opacity="0.7">
          <animate attributeName="opacity" values="0.5;0.8;0.5" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="85" cy="40" r="3" fill="hsl(156, 60%, 55%)" opacity="0.6">
          <animate attributeName="opacity" values="0.4;0.7;0.4" dur="4s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
};

export default HomeIllustration;
