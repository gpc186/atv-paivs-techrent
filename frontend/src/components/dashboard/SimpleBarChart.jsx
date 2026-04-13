"use client";

export function SimpleBarChart({ data, colors = ["hsl(221, 83%, 53%)", "hsl(190, 95%, 36%)", "hsl(262, 83%, 58%)", "hsl(31, 95%, 56%)"] }) {
  if (!data || data.length === 0) {
    return <div className="text-sm text-muted-foreground text-center py-8">Nenhum dado disponível</div>;
  }

  const total = data.reduce((sum, item) => sum + item.total, 0);
  const bars = data.map((item, i) => ({
    ...item,
    percentage: total > 0 ? (item.total / total) * 100 : 0,
    color: colors[i % colors.length]
  }));

  return (
    <div className="space-y-4">
      {bars.map((bar) => (
        <div key={bar.status} className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground capitalize">{bar.status}</span>
            <span className="text-sm font-bold text-foreground">{bar.total}</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${bar.percentage}%`,
                backgroundColor: bar.color
              }}
            />
          </div>
          <div className="text-xs text-muted-foreground text-right">{bar.percentage.toFixed(0)}%</div>
        </div>
      ))}
    </div>
  );
}
