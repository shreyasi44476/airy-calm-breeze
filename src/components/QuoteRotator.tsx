import { useState, useEffect } from 'react';
import { environmentQuotes } from '@/lib/aqiData';

const QuoteRotator = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentQuote((prev) => (prev + 1) % environmentQuotes.length);
        setIsVisible(true);
      }, 500);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const quote = environmentQuotes[currentQuote];

  return (
    <div className="text-center px-6 py-4 min-h-[120px] flex flex-col justify-center">
      <div
        className={`transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        <p className="text-muted-foreground italic text-sm leading-relaxed mb-2">
          "{quote.text}"
        </p>
        <p className="text-xs text-muted-foreground/70">— {quote.author}</p>
      </div>
    </div>
  );
};

export default QuoteRotator;
