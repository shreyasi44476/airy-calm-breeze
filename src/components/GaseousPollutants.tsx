const gaseousPollutants = [
  {
    name: 'NO₂ (Nitrogen Dioxide)',
    description: 'Primarily from vehicle emissions and power plants. Can irritate airways and worsen respiratory conditions.',
    level: 'moderate',
  },
  {
    name: 'SO₂ (Sulfur Dioxide)',
    description: 'Released from burning fossil fuels. Can cause breathing difficulties and aggravate asthma.',
    level: 'low',
  },
  {
    name: 'CO (Carbon Monoxide)',
    description: 'Colorless, odorless gas from incomplete combustion. Reduces oxygen delivery in the body.',
    level: 'low',
  },
  {
    name: 'O₃ (Ground-level Ozone)',
    description: 'Forms when sunlight reacts with pollutants. Can trigger chest pain, coughing, and throat irritation.',
    level: 'moderate',
  },
];

const getLevelColor = (level: string) => {
  switch (level) {
    case 'low':
      return 'bg-aqi-good/20 text-aqi-good';
    case 'moderate':
      return 'bg-aqi-moderate/20 text-aqi-moderate';
    case 'high':
      return 'bg-aqi-unhealthy/20 text-aqi-unhealthy';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const GaseousPollutants = () => {
  return (
    <div className="card-elevated animate-fade-in">
      <h3 className="text-sm font-semibold text-foreground mb-4">Gaseous Pollutants</h3>
      <ul className="space-y-4">
        {gaseousPollutants.map((pollutant, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="text-primary mt-1">•</span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-foreground">{pollutant.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium capitalize ${getLevelColor(pollutant.level)}`}>
                  {pollutant.level}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{pollutant.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GaseousPollutants;
