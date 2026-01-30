interface HealthCardProps {
  icon: string;
  title: string;
  text: string;
  delay?: number;
}

const HealthCard = ({ icon, title, text, delay = 0 }: HealthCardProps) => {
  return (
    <div
      className="health-card flex gap-4 items-start animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
        <span className="text-lg">{icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-foreground mb-1">{title}</h4>
        <p className="text-xs text-muted-foreground leading-relaxed">{text}</p>
      </div>
    </div>
  );
};

export default HealthCard;
