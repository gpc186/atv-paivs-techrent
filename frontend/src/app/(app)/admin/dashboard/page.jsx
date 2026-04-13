"use client";

import { useEffect, useState } from "react";
import PageSection from "@/components/ui/page-section";
import { dashboardService } from "@/services/dashboard.service";
import { ClipboardListIcon, MonitorCogIcon } from "lucide-react";

export default function AdminDashboardPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    dashboardService
      .admin()
      .then((response) => setData(response))
      .catch((err) => setError(err.message || "Erro ao carregar dashboard"));
  }, []);

  return (
    <PageSection title="Dashboard administrativo" description="Visão consolidada de chamados e equipamentos.">
      {error ? <p className="text-sm text-red-600 animate-in fade-in-0 duration-300">{error}</p> : null}
      {!data && !error ? <p className="text-sm text-muted-foreground animate-pulse">Carregando...</p> : null}

      {data ? (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="group relative rounded-lg border border-border/50 bg-gradient-to-br from-primary/5 to-primary/0 p-4 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:scale-[1.02]">
            <div className="absolute top-3 right-3 text-primary/20 group-hover:text-primary/30 transition-colors duration-300">
              <ClipboardListIcon size={24} />
            </div>
            <h3 className="mb-4 text-lg font-semibold text-foreground">Chamados por status</h3>
            <div className="space-y-2.5">
              {(data.estatisticas_chamados || []).map((item) => (
                <div key={item.status} className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-primary/5 transition-colors duration-200">
                  <span className="text-sm font-medium text-muted-foreground capitalize">{item.status}</span>
                  <span className="text-sm font-bold text-foreground bg-primary/10 px-2.5 py-0.5 rounded-full">{item.total}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="group relative rounded-lg border border-border/50 bg-gradient-to-br from-accent/5 to-accent/0 p-4 transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:scale-[1.02]">
            <div className="absolute top-3 right-3 text-accent/20 group-hover:text-accent/30 transition-colors duration-300">
              <MonitorCogIcon size={24} />
            </div>
            <h3 className="mb-4 text-lg font-semibold text-foreground">Equipamentos por status</h3>
            <div className="space-y-2.5">
              {(data.estatisticas_equipamentos || []).map((item) => (
                <div key={item.status} className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-accent/5 transition-colors duration-200">
                  <span className="text-sm font-medium text-muted-foreground capitalize">{item.status}</span>
                  <span className="text-sm font-bold text-foreground bg-accent/10 px-2.5 py-0.5 rounded-full">{item.total}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </PageSection>
  );
}
