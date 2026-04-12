"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { chamadosService } from "@/services/chamados.service";
import PageSection from "@/components/ui/page-section";

export default function ChamadoDetalhePage() {
  const params = useParams();
  const id = params?.id;

  const [chamado, setChamado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    chamadosService
      .findById(id)
      .then((data) => setChamado(data?.chamado || null))
      .catch((err) => setError(err.message || "Erro ao buscar chamado"))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <PageSection title={`Chamado #${id || "..."}`} description="Detalhes do chamado selecionado.">
      {loading ? <p className="text-sm text-muted-foreground">Carregando...</p> : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {!loading && !error && chamado ? (
        <div className="grid gap-2 text-sm text-foreground">
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
