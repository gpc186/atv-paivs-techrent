"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageSection from "@/components/ui/page-section";
import { dashboardService } from "@/services/dashboard.service";

export default function TecnicoFilaPage() {
  const [painel, setPainel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    dashboardService
      .tecnico()
      .then((data) => setPainel(data?.painel || []))
      .catch((err) => setError(err.message || "Erro ao carregar fila técnica"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageSection title="Fila técnica" description="Chamados abertos e em atendimento.">
      {loading ? <p className="text-sm text-muted-foreground">Carregando...</p> : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div className="grid gap-3">
        {painel.map((item) => (
          <Link
            key={item.chamado_id}
            href={`/tecnico/chamados/${item.chamado_id}`}
            className="rounded-md border border-border bg-card p-3 text-foreground hover:bg-muted"
          >
            <p className="font-medium">{item.titulo}</p>
            <p className="text-sm text-muted-foreground">Prioridade: {item.prioridade} • Status: {item.status}</p>
          </Link>
        ))}
      </div>
    </PageSection>
  );
}
