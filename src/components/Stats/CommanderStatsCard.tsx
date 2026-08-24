interface CommanderStatsCardProps {
  children: React.ReactNode;
  title: string;
}

export default function CommanderStatsCard({ children, title }: CommanderStatsCardProps) {
  return (
    <div className="commander-stats-card">
      <div className="commander-stats-card-title">{title}</div>
      <div className="commander-stats-card-children">{children}</div>
    </div>
  );
}
