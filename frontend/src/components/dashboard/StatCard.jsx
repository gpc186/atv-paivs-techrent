"use client";

export function StatCard({ icon: Icon, title, value, trend, color = "primary", onClick }) {
  return (
    <div
      onClick={onClick}
      className={`
        rounded-lg border border-border/50 bg-gradient-to-br from-card to-card/95
        p-4 transition-all duration-300 hover:border-${color}/30 hover:shadow-lg hover:scale-105
        ${onClick ? "cursor-pointer" : ""}
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {trend && (
              <span className={`text-xs font-semibold ${trend > 0 ? "text-emerald-600 dark:text-emerald-500" : "text-red-600 dark:text-red-500"}`}>
                {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}%
              </span>
            )}
          </div>
        </div>
        {Icon && (
          <div className={`text-${color}/20 opacity-60`}>
            <Icon size={32} />
          </div>
        )}
      </div>
    </div>
  );
}
