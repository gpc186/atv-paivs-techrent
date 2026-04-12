"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { chamadosService } from "@/services/chamados.service";
import PageSection from "@/components/ui/page-section";

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
            className="rounded-md border border-border bg-card p-3 text-foreground hover:bg-muted"
          >
            <p className="font-medium text-foreground">{chamado.titulo}</p>
            <p className="text-sm text-muted-foreground">Status: {chamado.status}</p>
          </Link>
        ))}
      </div>
    </PageSection>
  );
}
