interface LocalFactorTagProps {
  label: string;
  icon: string;
  impact: 'low' | 'medium' | 'high';
}

const LocalFactorTag = ({ label, icon, impact }: LocalFactorTagProps) => {
  const impactColors = {
    low: 'bg-aqi-good/10 text-aqi-good border-aqi-good/20',
    medium: 'bg-aqi-moderate/10 text-aqi-moderate border-aqi-moderate/20',
    high: 'bg-aqi-unhealthy/10 text-aqi-unhealthy border-aqi-unhealthy/20',
  };

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${impactColors[impact]}`}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </div>
  );
};

export default LocalFactorTag;
