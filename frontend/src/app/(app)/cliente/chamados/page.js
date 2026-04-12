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
      {loading ? <p className="text-sm text-zinc-500">Carregando...</p> : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      {!loading && !error && chamados.length === 0 ? (
        <p className="text-sm text-zinc-500">Nenhum chamado encontrado.</p>
      ) : null}

      <div className="grid gap-3">
        {chamados.map((chamado) => (
          <Link
            key={chamado.id}
            href={`/cliente/chamados/${chamado.id}`}
            className="rounded-md border border-zinc-200 bg-zinc-50 p-3 hover:bg-zinc-100"
          >
            <p className="font-medium text-zinc-900">{chamado.titulo}</p>
            <p className="text-sm text-zinc-600">Status: {chamado.status}</p>
          </Link>
        ))}
      </div>
    </PageSection>
  );
}
