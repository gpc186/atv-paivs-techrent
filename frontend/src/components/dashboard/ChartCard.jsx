"use client";

export function ChartCard({ title, children, loading = false, error = null }) {
  return (
    <div className="surface-panel card-hover-lift rounded-[26px] p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold tracking-tight text-foreground">{title}</h3>
        <div className="hidden h-px flex-1 bg-gradient-to-r from-border via-primary/20 to-transparent md:block" />
      </div>

      {error && (
        <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-red-600 dark:text-red-500">
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
