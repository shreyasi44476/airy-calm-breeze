import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import type { TooltipProps, LegendProps } from 'recharts';
import { pollutantData } from '@/lib/aqiData';

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const first = payload[0] as unknown as { name?: string; value?: number };
    return (
      <div className="bg-card px-3 py-2 rounded-lg shadow-card border border-border">
        <p className="text-sm font-medium text-foreground">{first.name}</p>
        <p className="text-xs text-muted-foreground">
          Contribution: <span className="font-semibold">{first.value}%</span>
        </p>
      </div>
    );
  }
  return null;
};

const renderCustomLegend = (props: LegendProps) => {
  const payload = props.payload ?? [];
  return (
    <div className="flex flex-wrap justify-center gap-3 mt-4">
      {payload.map((entry, index) => {
        const e = entry as { value?: string | number; color?: string };
        return (
          <div key={index} className="flex items-center gap-1.5">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: e.color }}
            />
            <span className="text-xs text-muted-foreground">{e.value}</span>
          </div>
        );
      })}
    </div>
  );
};

const PollutantPieChart = () => {
  return (
    <div className="card-elevated animate-fade-in">
      <h3 className="text-sm font-semibold text-foreground mb-4">Pollutant Breakdown</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pollutantData}
              cx="50%"
              cy="45%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={3}
              dataKey="percentage"
              nameKey="name"
              stroke="none"
            >
              {pollutantData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={renderCustomLegend} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PollutantPieChart;
