"use client";

import { useEffect, useState } from "react";
import { chamadosService } from "@/services/chamados.service";
import PageSection from "@/components/ui/page-section";
import { useParams } from "next/navigation";

export default function ChamadoDetalhePage() {
  const [chamado, setChamado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const params = useParams();

  useEffect(() => {
    chamadosService
      .findById(params?.id)
      .then((data) => setChamado(data?.chamado || null))
      .catch((err) => setError(err.message || "Erro ao buscar chamado"))
      .finally(() => setLoading(false));
  }, [params.id]);

  return (
    <PageSection title={`Chamado #${params.id}`} description="Detalhes do chamado selecionado.">
      {loading ? <p className="text-sm text-muted-foreground">Carregando...</p> : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {!loading && !error && chamado ? (
        <div className="grid gap-2 text-sm text-foreground">
    <PageSection title={`Chamado #${params?.id}`} description="Detalhes do chamado selecionado.">
      {loading ? <p className="text-sm text-zinc-500">Carregando...</p> : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {!loading && !error && chamado ? (
        <div className="grid gap-2 text-sm">
          <p><strong>Título:</strong> {chamado.titulo}</p>
          <p><strong>Descrição:</strong> {chamado.descricao}</p>
          <p><strong>Status:</strong> {chamado.status}</p>
          <p><strong>Prioridade:</strong> {chamado.prioridade}</p>
          <p><strong>Equipamento:</strong> {chamado.equipamento_nome}</p>
          <p><strong>Técnico:</strong> {chamado.tecnico_nome || "Não atribuído"}</p>
        </div>
      ) : null}
    </PageSection>
  );
}
