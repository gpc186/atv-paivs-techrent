"use client";

import { useEffect, useState } from "react";
import {
  AlertTriangleIcon,
  ClipboardListIcon,
  MonitorCogIcon,
  TrendingUpIcon,
} from "lucide-react";
import PageSection from "@/components/ui/page-section";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { dashboardService } from "@/services/dashboard.service";
import { ActivityTimeline } from "@/components/dashboard/ActivityTimeline";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { SimpleBarChart } from "@/components/dashboard/SimpleBarChart";
import { SimplePieChart } from "@/components/dashboard/SimplePieChart";
import { StatCard } from "@/components/dashboard/StatCard";

export default function AdminDashboardPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardService
      .admin()
      .then((response) => {
        setData(response);
        setError("");
      })
      .catch((err) => {
        setError(err.message || "Erro ao carregar dashboard");
        setData(null);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageSection
      title="Dashboard administrativo"
      description="Visao consolidada da operacao para acompanhar volume de chamados, saude do inventario e atividade recente."
    >
      {error ? (
        <div className="mb-5 rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      {loading ? (
        <div className="dashboard-grid">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-36 animate-pulse rounded-lg bg-muted" />
            ))}
          </div>
          <div className="grid gap-4 xl:grid-cols-2">
            <div className="h-80 animate-pulse rounded-lg bg-muted" />
            <div className="h-80 animate-pulse rounded-lg bg-muted" />
          </div>
        </div>
      ) : data ? (
        <div className="dashboard-grid">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icon={ClipboardListIcon}
              title="Chamados abertos"
              value={data.kpis?.chamados_abertos || 0}
              color="primary"
            />
            <StatCard
              icon={TrendingUpIcon}
              title="Em progresso"
              value={data.kpis?.em_progresso || 0}
              color="accent"
            />
            <StatCard
              icon={MonitorCogIcon}
              title="Taxa de resolucao"
              value={`${data.kpis?.taxa_resolucao || 0}%`}
              color="primary"
            />
            <StatCard
              icon={AlertTriangleIcon}
              title="Equipamentos criticos"
              value={data.kpis?.equipamentos_criticos || 0}
              color="destructive"
            />
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            <ChartCard title="Chamados por status" loading={!data.estatisticas_chamados}>
              {data.estatisticas_chamados?.filter((item) => item.status).length > 0 ? (
                <SimplePieChart data={data.estatisticas_chamados.filter((item) => item.status)} />
              ) : (
                <Empty className="min-h-64 border-0">
                  <EmptyHeader>
                    <EmptyTitle>Nenhum dado disponivel</EmptyTitle>
                    <EmptyDescription>Quando houver distribuicao de chamados por status, ela sera exibida aqui.</EmptyDescription>
                  </EmptyHeader>
                </Empty>
              )}
            </ChartCard>

            <ChartCard title="Equipamentos por status" loading={!data.estatisticas_equipamentos}>
              {data.estatisticas_equipamentos?.filter((item) => item.status).length > 0 ? (
                <SimpleBarChart data={data.estatisticas_equipamentos.filter((item) => item.status)} />
              ) : (
                <Empty className="min-h-64 border-0">
                  <EmptyHeader>
                    <EmptyTitle>Nenhum dado disponivel</EmptyTitle>
                    <EmptyDescription>Os indicadores de equipamentos vao aparecer aqui quando houver dados.</EmptyDescription>
                  </EmptyHeader>
                </Empty>
              )}
            </ChartCard>
          </div>

          <ChartCard title="Atividades recentes" loading={!data.atividades_recentes}>
            <ActivityTimeline activities={data.atividades_recentes || []} loading={false} />
          </ChartCard>
        </div>
      ) : null}
    </PageSection>
  );
}
