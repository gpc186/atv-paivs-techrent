"use client";

export function ChartCard({ title, children, loading = false, error = null }) {
  return (
    <div className="rounded-lg border border-border/50 bg-gradient-to-br from-card to-card/95 p-4">
      <h3 className="mb-4 text-lg font-semibold text-foreground">{title}</h3>

      {error && (
        <div className="text-sm text-red-600 dark:text-red-500 p-4 bg-red-50 dark:bg-red-950/20 rounded">
          {error}
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center p-8">
          <div className="text-sm text-muted-foreground animate-pulse">Carregando...</div>
        </div>
      )}

      {!error && !loading && children}
    </div>
  );
}
