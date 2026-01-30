const aqiRanges = [
  { range: '0-50', label: 'Good', color: 'hsl(142, 70%, 45%)', description: 'Air quality is satisfactory' },
  { range: '51-100', label: 'Moderate', color: 'hsl(48, 90%, 55%)', description: 'Acceptable for most people' },
  { range: '101-200', label: 'Unhealthy for Sensitive', color: 'hsl(28, 90%, 55%)', description: 'Sensitive groups should reduce outdoor activity' },
  { range: '201-300', label: 'Unhealthy', color: 'hsl(15, 85%, 50%)', description: 'Everyone may experience health effects' },
  { range: '301+', label: 'Hazardous', color: 'hsl(0, 75%, 40%)', description: 'Health emergency conditions' },
];

const AQILegend = () => {
  return (
    <div className="card-elevated animate-fade-in">
      <h3 className="text-sm font-semibold text-foreground mb-4">AQI Scale Guide</h3>
      <div className="space-y-2">
        {aqiRanges.map((item) => (
          <div key={item.range} className="flex items-center gap-3">
            <div 
              className="w-4 h-4 rounded-full flex-shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-foreground">{item.range}</span>
                <span className="text-xs text-muted-foreground">• {item.label}</span>
              </div>
              <p className="text-[10px] text-muted-foreground truncate">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AQILegend;
