interface StatsCardProps {
  children: React.ReactNode;
  title: string;
}

export default function StatsCard({ children, title }: StatsCardProps) {
  return (
    <div className="stats-card">
      <div className="stats-card-title">{title}</div>
      <div className="tick"></div>
      <div className="stats-card-children">{children}</div>
    </div>
  );
}
