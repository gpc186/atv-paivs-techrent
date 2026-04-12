"use client";

import { useEffect, useMemo, useState } from "react";
import PageSection from "@/components/ui/page-section";
import { dashboardService } from "@/services/dashboard.service";

function normalizeStatusLabel(status) {
  return status && status.trim() ? status : "sem_status";
}

export default function AdminDashboardPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    dashboardService
      .admin()
      .then((response) => setData(response))
      .catch((err) => setError(err.message || "Erro ao carregar dashboard"));
  }, []);

  const totais = useMemo(() => {
    const chamados = (data?.estatisticas_chamados || []).reduce((acc, item) => acc + Number(item.total || 0), 0);
    const equipamentos = (data?.estatisticas_equipamentos || []).reduce((acc, item) => acc + Number(item.total || 0), 0);
    return { chamados, equipamentos };
  }, [data]);

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Total de chamados</p>
          <p className="mt-2 text-2xl font-bold text-card-foreground">{totais.chamados}</p>
        </article>
        <article className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Total de equipamentos</p>
          <p className="mt-2 text-2xl font-bold text-card-foreground">{totais.equipamentos}</p>
        </article>
        <article className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Última atualização</p>
          <p className="mt-2 text-sm font-semibold text-card-foreground">{new Date().toLocaleString("pt-BR")}</p>
        </article>
      </div>

      <PageSection title="Dashboard administrativo" description="Visão consolidada de chamados e equipamentos.">
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        {!data && !error ? <p className="text-sm text-muted-foreground">Carregando...</p> : null}

        {data ? (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-md border border-border border-l-4 border-l-primary bg-card p-3 text-foreground shadow-sm">
              <h3 className="mb-2 font-medium">Chamados por status</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {(data.estatisticas_chamados || []).map((item) => (
                  <li key={`${item.status}-${item.total}`} className="flex items-center justify-between gap-3">
                    <span className="font-medium text-card-foreground">{normalizeStatusLabel(item.status)}</span>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-semibold text-card-foreground">{item.total}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-md border border-border border-l-4 border-l-accent bg-card p-3 text-foreground shadow-sm">
              <h3 className="mb-2 font-medium">Equipamentos por status</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {(data.estatisticas_equipamentos || []).map((item) => (
                  <li key={`${item.status}-${item.total}`} className="flex items-center justify-between gap-3">
                    <span className="font-medium text-card-foreground">{normalizeStatusLabel(item.status)}</span>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-semibold text-card-foreground">{item.total}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </PageSection>
    </div>
  );
}
