"use client";

import { useEffect, useState } from "react";
import PageSection from "@/components/ui/page-section";
import { dashboardService } from "@/services/dashboard.service";

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
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {!data && !error ? <p className="text-sm text-zinc-500">Carregando...</p> : null}

      {data ? (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-md border border-zinc-200 p-3">
            <h3 className="mb-2 font-medium">Chamados por status</h3>
            <ul className="text-sm text-zinc-700">
              {(data.estatisticas_chamados || []).map((item) => (
                <li key={item.status}>{item.status}: {item.total}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-md border border-zinc-200 p-3">
            <h3 className="mb-2 font-medium">Equipamentos por status</h3>
            <ul className="text-sm text-zinc-700">
              {(data.estatisticas_equipamentos || []).map((item) => (
                <li key={item.status}>{item.status}: {item.total}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </PageSection>
  );
}
