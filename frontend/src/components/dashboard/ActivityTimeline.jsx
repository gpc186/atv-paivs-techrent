"use client";

import { Clock, TicketIcon, WrenchIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";

function getIcon(iconType) {
  switch (iconType) {
    case "wrench":
      return <WrenchIcon className="size-4" />;
    case "ticket":
      return <TicketIcon className="size-4" />;
    default:
      return <Clock className="size-4" />;
  }
}

function formatTimeAgo(timestamp) {
  const now = new Date();
  const date = new Date(timestamp);
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return "agora";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m atras`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h atras`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d atras`;
  return date.toLocaleDateString("pt-BR");
}

export function ActivityTimeline({ activities = [], loading = false, error = null }) {
  if (error) {
    return (
      <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
        {error}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid gap-3">
        {[1, 2, 3].map((item) => (
          <div key={item} className="h-16 animate-pulse rounded-lg bg-muted" />
        ))}
      </div>
    );
  }

  if (!activities || activities.length === 0) {
    return (
      <Empty className="min-h-44">
        <EmptyHeader>
          <EmptyTitle>Nenhuma atividade recente</EmptyTitle>
          <EmptyDescription>As ultimas movimentacoes do sistema vao aparecer aqui.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {activities.map((activity, index) => (
        <div
          key={`${activity.tipo}-${activity.item_id}-${index}`}
          className="flex gap-3 rounded-lg border border-border bg-muted/30 p-4"
        >
          <div className="mt-1 flex shrink-0">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              {getIcon(activity.icon_type)}
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">{activity.descricao}</p>
                <p className="mt-1 text-xs text-muted-foreground">{activity.usuario_nome}</p>
              </div>
              <Badge variant="outline" className="shrink-0 whitespace-nowrap">
                {formatTimeAgo(activity.timestamp)}
              </Badge>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
