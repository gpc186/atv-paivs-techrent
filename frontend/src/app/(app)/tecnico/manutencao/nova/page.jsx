"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PageSection from "@/components/ui/page-section";
import { manutencaoService } from "@/services/manutencao.service";
import { chamadosService } from "@/services/chamados.service";

export default function NovaManutencaoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const chamadoIdParam = searchParams.get("chamadoId");
  const equipamentoIdParam = searchParams.get("equipamentoId");

  const [form, setForm] = useState({
    chamado_id: chamadoIdParam || "",
    equipamento_id: equipamentoIdParam || "",
    descricao: "",
    status_equipamento: "operacional",
  });

  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [chamado, setChamado] = useState(null);
  const [loadingChamado, setLoadingChamado] = useState(!!chamadoIdParam);

  // Carregar dados do chamado se houver ID na URL
  useEffect(() => {
    if (chamadoIdParam) {
      carregarChamado();
    }
  }, [chamadoIdParam]);

  async function carregarChamado() {
    try {
      setLoadingChamado(true);
      const data = await chamadosService.findById(Number(chamadoIdParam));
      setChamado(data);
      if (data.equipamento_id) {
        setForm((prev) => ({
          ...prev,
          equipamento_id: data.equipamento_id.toString(),
        }));
      }
    } catch (err) {
      setError("Erro ao carregar chamado: " + err.message);
    } finally {
      setLoadingChamado(false);
    }
  }

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setFeedback("");

    if (!form.chamado_id || !form.equipamento_id || !form.descricao) {
      setError("Preencha todos os campos obrigatórios");
      return;
    }

    try {
      setLoading(true);
      await manutencaoService.registrar({
        chamado_id: Number(form.chamado_id),
        equipamento_id: Number(form.equipamento_id),
        descricao: form.descricao,
        status_equipamento: form.status_equipamento,
      });
      setFeedback("Manutenção registrada com sucesso! Redirecionando...");
      setTimeout(() => {
        router.push("/tecnico/fila");
      }, 1500);
    } catch (err) {
      setError(err.message || "Erro ao registrar manutenção");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6">
      <PageSection
        title="Registrar Manutenção"
        description="Conclua o atendimento e atualize o status do equipamento"
      >
        {/* Informações do Chamado */}
        {chamado && (
          <div className="rounded-lg border border-border bg-muted p-4 mb-4">
            <p className="text-sm text-muted-foreground">Chamado:</p>
            <p className="font-semibold">{chamado.titulo}</p>
            <p className="text-sm text-muted-foreground mt-2">{chamado.descricao}</p>
          </div>
        )}

        {loadingChamado && (
          <p className="text-muted-foreground text-sm">Carregando chamado...</p>
        )}
      </PageSection>

      {/* Formulário */}
      <PageSection>
        <form onSubmit={handleSubmit} className="grid gap-4">
          {/* Chamado ID */}
          <div>
            <label className="block text-sm font-medium mb-2">
              ID do Chamado
            </label>
            <input
              type="number"
              className="w-full rounded-md border border-border px-3 py-2 bg-card"
              placeholder="Ex: 1"
              value={form.chamado_id}
              onChange={(e) => update("chamado_id", e.target.value)}
              required
            />
          </div>

          {/* Equipamento ID */}
          <div>
            <label className="block text-sm font-medium mb-2">
              ID do Equipamento
            </label>
            <input
              type="number"
              className="w-full rounded-md border border-border px-3 py-2 bg-card"
              placeholder="Ex: 5"
              value={form.equipamento_id}
              onChange={(e) => update("equipamento_id", e.target.value)}
              required
            />
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Descrição do Reparo
            </label>
            <textarea
              className="w-full rounded-md border border-border px-3 py-2 bg-card"
              rows={5}
              placeholder="Descreva detalhadamente o reparo realizado..."
              value={form.descricao}
              onChange={(e) => update("descricao", e.target.value)}
              required
            />
          </div>

          {/* Status do Equipamento */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Status Final do Equipamento
            </label>
            <select
              className="w-full rounded-md border border-border px-3 py-2 bg-card"
              value={form.status_equipamento}
              onChange={(e) => update("status_equipamento", e.target.value)}
            >
              <option value="operacional">✓ Operacional</option>
              <option value="em_manutencao">⏳ Em Manutenção</option>
              <option value="desativado">✗ Desativado</option>
            </select>
            <p className="text-xs text-muted-foreground mt-1">
              Selecione o status final do equipamento após o reparo
            </p>
          </div>

          {/* Mensagens */}
          {error && (
            <div className="rounded-md bg-red-50 border border-red-200 p-3">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}
          {feedback && (
            <div className="rounded-md bg-green-50 border border-green-200 p-3">
              <p className="text-sm text-green-800">{feedback}</p>
            </div>
          )}

          {/* Botões */}
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? "Salvando..." : "Registrar Manutenção"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 rounded-md border border-border hover:bg-muted transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      </PageSection>
    </div>
  );
}
