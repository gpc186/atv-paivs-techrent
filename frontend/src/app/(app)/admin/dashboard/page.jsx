"use client";

import { useEffect, useState } from "react";
import PageSection from "@/components/ui/page-section";
import { dashboardService } from "@/services/dashboard.service";
import { StatCard } from "@/components/dashboard/StatCard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { SimplePieChart } from "@/components/dashboard/SimplePieChart";
import { SimpleBarChart } from "@/components/dashboard/SimpleBarChart";
import { ActivityTimeline } from "@/components/dashboard/ActivityTimeline";
import { ClipboardListIcon, MonitorCogIcon, TrendingUpIcon, AlertTriangleIcon } from "lucide-react";

export default function AdminDashboardPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
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
    <PageSection title="Dashboard administrativo" description="Visão consolidada de chamados, equipamentos e atividades recentes.">
      {error && <p className="text-sm text-red-600 animate-in fade-in-0 duration-300 mb-4">{error}</p>}

      {loading ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-muted rounded-lg animate-pulse" />
            ))}
          </div>
          <div className="h-64 bg-muted rounded-lg animate-pulse" />
        </div>
      ) : data ? (
        <div className="space-y-6">
          {/* KPI Cards - Top Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={ClipboardListIcon}
              title="Chamados Abertos"
              value={data.kpis?.chamados_abertos || 0}
              color="primary"
            />
            <StatCard
              icon={TrendingUpIcon}
              title="Em Progresso"
              value={data.kpis?.em_progresso || 0}
              color="accent"
            />
            <StatCard
              icon={TrendingUpIcon}
              title="Taxa de Resolução"
              value={`${data.kpis?.taxa_resolucao || 0}%`}
              color="primary"
            />
            <StatCard
              icon={AlertTriangleIcon}
              title="Equipamentos Críticos"
              value={data.kpis?.equipamentos_criticos || 0}
              color="destructive"
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ChartCard title="Chamados por Status" loading={!data.estatisticas_chamados}>
              {data.estatisticas_chamados && data.estatisticas_chamados.filter(i => i.status).length > 0 ? (
                <SimplePieChart data={data.estatisticas_chamados.filter(i => i.status)} />
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">Nenhum dado disponível</p>
              )}
            </ChartCard>

            <ChartCard title="Equipamentos por Status" loading={!data.estatisticas_equipamentos}>
              {data.estatisticas_equipamentos && data.estatisticas_equipamentos.filter(i => i.status).length > 0 ? (
                <SimpleBarChart data={data.estatisticas_equipamentos.filter(i => i.status)} />
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">Nenhum dado disponível</p>
              )}
            </ChartCard>
          </div>

          {/* Activities Timeline */}
          <ChartCard title="Atividades Recentes" loading={!data.atividades_recentes}>
            <ActivityTimeline
              activities={data.atividades_recentes || []}
              loading={false}
            />
          </ChartCard>
        </div>
      ) : null}
    </PageSection>
  );
}
