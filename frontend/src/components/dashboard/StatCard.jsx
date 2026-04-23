"use client";

import StatisticsCard from "@/components/shadcn-studio/blocks/statistics-with-status";

export function StatCard({ icon: Icon, title, value, trend, color = "primary", onClick }) {
  const status = {
    primary: "within",
    accent: "observe",
    destructive: "exceed",
  }[color] || "unknown";

  const range =
    typeof trend === "number"
      ? `${trend > 0 ? "+" : ""}${trend}%`
      : "Atualizado agora";

  return (
    <div onClick={onClick} className={onClick ? "cursor-pointer" : undefined}>
      <StatisticsCard
        title={title}
        value={value}
        status={status}
        range={range}
        icon={Icon ? <Icon /> : null}
      />
    </div>
  );
}
