"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";

export function ChartCard({ title, children, loading = false, error = null }) {
  return (
    <Card className="card-hover-lift">
      <CardHeader className="border-b">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-5">
        {error && (
          <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        {loading && (
          <div className="grid gap-3">
            <div className="h-40 animate-pulse rounded-lg bg-muted" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
          </div>
        )}

        {!error && !loading && (children || (
          <Empty className="min-h-48">
            <EmptyHeader>
              <EmptyTitle>Sem dados</EmptyTitle>
              <EmptyDescription>Nao ha informacoes disponiveis para esta visualizacao.</EmptyDescription>
            </EmptyHeader>
          </Empty>
        ))}
      </CardContent>
    </Card>
  );
}
