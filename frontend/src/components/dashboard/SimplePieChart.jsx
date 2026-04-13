"use client";

export function SimplePieChart({ data, colors = ["hsl(221, 83%, 53%)", "hsl(190, 95%, 36%)", "hsl(262, 83%, 58%)", "hsl(31, 95%, 56%)"] }) {
  if (!data || data.length === 0) {
    return <div className="text-sm text-muted-foreground text-center py-8">Nenhum dado disponível</div>;
  }

  const total = data.reduce((sum, item) => sum + item.total, 0);
  const segments = data.map((item, i) => ({
    ...item,
    percentage: total > 0 ? (item.total / total) * 100 : 0,
    color: colors[i % colors.length]
  }));

  // Criar SVG pie chart simples
  let currentAngle = 0;
  const svgSegments = segments.map((segment) => {
    const sliceAngle = (segment.percentage / 100) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;

    // Converter para radianos e calcular coordenadas
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = 50 + 40 * Math.cos(startRad);
    const y1 = 50 + 40 * Math.sin(startRad);
    const x2 = 50 + 40 * Math.cos(endRad);
    const y2 = 50 + 40 * Math.sin(endRad);

    const largeArc = sliceAngle > 180 ? 1 : 0;

    const pathData = [
      `M 50 50`,
      `L ${x1} ${y1}`,
      `A 40 40 0 ${largeArc} 1 ${x2} ${y2}`,
      `Z`
    ].join(" ");

    currentAngle = endAngle;

    return (
      <path key={segment.status} d={pathData} fill={segment.color} opacity="0.8" />
    );
  });

  return (
    <div className="flex flex-col gap-4">
      <svg viewBox="0 0 100 100" className="w-full max-w-xs mx-auto">
        {svgSegments}
      </svg>

      <div className="grid grid-cols-1 gap-2 text-sm">
        {segments.map((segment) => (
          <div key={segment.status} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: segment.color }}
            />
            <span className="text-muted-foreground capitalize flex-1">{segment.status}</span>
            <span className="font-semibold">{segment.total}</span>
            <span className="text-xs text-muted-foreground">({segment.percentage.toFixed(0)}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}
