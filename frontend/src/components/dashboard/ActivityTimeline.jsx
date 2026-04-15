"use client";

import { TicketIcon, WrenchIcon, Clock } from "lucide-react";

function getIcon(iconType) {
  switch (iconType) {
    case "wrench":
      return <WrenchIcon className="w-4 h-4" />;
    case "ticket":
      return <TicketIcon className="w-4 h-4" />;
    default:
      return <Clock className="w-4 h-4" />;
  }
}

function formatTimeAgo(timestamp) {
  const now = new Date();
  const date = new Date(timestamp);
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return "agora";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m atrás`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h atrás`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d atrás`;
  return date.toLocaleDateString("pt-BR");
}

export function ActivityTimeline({ activities = [], loading = false, error = null }) {
  if (error) {
    return (
      <div className="text-sm text-red-600 dark:text-red-500 p-4 bg-red-50 dark:bg-red-950/20 rounded">
        {error}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-sm text-muted-foreground animate-pulse">Carregando atividades...</div>
      </div>
    );
  }

  if (!activities || activities.length === 0) {
    return <div className="text-sm text-muted-foreground text-center py-8">Nenhuma atividade recente</div>;
  }

  return (
    <div className="space-y-3">
      {activities.map((activity, index) => (
        <div
          key={`${activity.tipo}-${activity.item_id}-${index}`}
          className="surface-muted flex gap-3 p-4 card-hover-lift"
        >
          <div className="flex-shrink-0 mt-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
              {getIcon(activity.icon_type)}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{activity.descricao}</p>
                <p className="mt-1 text-xs text-muted-foreground">{activity.usuario_nome}</p>
              </div>
              <span className="flex-shrink-0 whitespace-nowrap rounded-full border border-border/70 bg-card px-2 py-1 text-[11px] font-medium text-muted-foreground shadow-sm">
                {formatTimeAgo(activity.timestamp)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
