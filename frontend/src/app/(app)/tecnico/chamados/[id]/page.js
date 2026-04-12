"use client";

import { useEffect, useState } from "react";
import { chamadosService } from "@/services/chamados.service";
import { getSessionUser } from "@/lib/auth-storage";
import PageSection from "@/components/ui/page-section";

export default function TecnicoChamadoDetalhePage({ params }) {
  const [chamado, setChamado] = useState(null);
  const [status, setStatus] = useState("em_atendimento");
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");

  const user = getSessionUser();

  async function fetchChamadoById() {
    setError("");
    try {
      const data = await chamadosService.findById(params.id);
      setChamado(data?.chamado || null);
    } catch (err) {
      setError(err.message || "Erro ao buscar chamado");
    }
  }

  useEffect(() => {
    fetchChamadoById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  async function handleUpdateStatus(event) {
    event.preventDefault();
    setError("");
    setFeedback("");

    try {
      await chamadosService.updateStatus(params.id, { status, tecnico_id: user?.id });
      setFeedback("Status atualizado com sucesso.");
      await fetchChamadoById();
    } catch (err) {
      setError(err.message || "Erro ao atualizar status");
    }
  }

  return (
    <PageSection title={`Atendimento do chamado #${params.id}`} description="Atualize o andamento do chamado.">
      {chamado ? (
        <div className="mb-4 grid gap-1 text-sm">
          <p><strong>Título:</strong> {chamado.titulo}</p>
          <p><strong>Status atual:</strong> {chamado.status}</p>
          <p><strong>Cliente:</strong> {chamado.cliente_nome}</p>
          <p><strong>Equipamento:</strong> {chamado.equipamento_nome}</p>
        </div>
      ) : null}

      <form onSubmit={handleUpdateStatus} className="grid gap-3">
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="rounded-md border border-zinc-300 px-3 py-2"
        >
          <option value="em_atendimento">Em atendimento</option>
          <option value="resolvido">Resolvido</option>
          <option value="cancelado">Cancelado</option>
        </select>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        {feedback ? <p className="text-sm text-emerald-700">{feedback}</p> : null}

        <button type="submit" className="rounded-md bg-zinc-900 px-3 py-2 text-sm text-white hover:bg-zinc-700">
          Atualizar status
        </button>
      </form>
    </PageSection>
  );
}
