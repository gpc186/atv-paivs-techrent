"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { chamadosService } from "@/services/chamados.service";
import PageSection from "@/components/ui/page-section";

const STATUS_STYLES = {
  aberto: "bg-amber-100 text-amber-800",
  pendente: "bg-amber-100 text-amber-800",
  em_atendimento: "bg-blue-100 text-blue-800",
  resolvido: "bg-emerald-100 text-emerald-800",
  finalizado: "bg-emerald-100 text-emerald-800",
  cancelado: "bg-rose-100 text-rose-800",
};

function statusBadgeClass(status) {
  return STATUS_STYLES[status] || "bg-muted text-card-foreground";
}

export default function ClienteChamadosPage() {
  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    chamadosService
      .list()
      .then((data) => setChamados(data?.chamados || []))
      .catch((err) => setError(err.message || "Erro ao carregar chamados"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageSection title="Meus chamados" description="Lista de chamados vinculados ao seu usuário.">
      {loading ? <p className="text-sm text-muted-foreground">Carregando...</p> : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      {!loading && !error && chamados.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nenhum chamado encontrado.</p>
      ) : null}

      <div className="grid gap-3">
        {chamados.map((chamado) => (
          <Link
            key={chamado.id}
            href={`/cliente/chamados/${chamado.id}`}
            className="rounded-md border border-border bg-card p-3 text-foreground shadow-sm transition hover:-translate-y-0.5 hover:bg-muted"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium text-foreground">{chamado.titulo || `Chamado #${chamado.id}`}</p>
                <p className="text-sm text-muted-foreground">Equipamento: {chamado.equipamento_nome || "N/D"}</p>
              </div>
              <span className={`rounded-full px-2 py-1 text-xs font-semibold ${statusBadgeClass(chamado.status)}`}>
                {chamado.status || "sem_status"}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </PageSection>
  );
}
