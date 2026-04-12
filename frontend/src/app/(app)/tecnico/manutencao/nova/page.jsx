"use client";

import { useState } from "react";
import PageSection from "@/components/ui/page-section";
import { manutencaoService } from "@/services/manutencao.service";

export default function NovaManutencaoPage() {
  const [form, setForm] = useState({
    chamado_id: "",
    equipamento_id: "",
    descricao: "",
    status_equipamento: "operacional",
  });
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setFeedback("");

    try {
      await manutencaoService.register({
        ...form,
        chamado_id: Number(form.chamado_id),
        equipamento_id: Number(form.equipamento_id),
      });
      setFeedback("Manutenção registrada com sucesso.");
      setForm({ chamado_id: "", equipamento_id: "", descricao: "", status_equipamento: "operacional" });
    } catch (err) {
      setError(err.message || "Erro ao registrar manutenção");
    }
  }

  return (
    <PageSection title="Registrar manutenção" description="Conclua o atendimento e atualize o equipamento.">
      <form onSubmit={handleSubmit} className="grid gap-3">
        <input
          className="rounded-md border border-border px-3 py-2"
          placeholder="ID do chamado"
          value={form.chamado_id}
          onChange={(event) => update("chamado_id", event.target.value)}
          required
        />
        <input
          className="rounded-md border border-border px-3 py-2"
          placeholder="ID do equipamento"
          value={form.equipamento_id}
          onChange={(event) => update("equipamento_id", event.target.value)}
          required
        />
        <textarea
          className="rounded-md border border-border px-3 py-2"
          rows={4}
          placeholder="Descreva o reparo"
          value={form.descricao}
          onChange={(event) => update("descricao", event.target.value)}
          required
        />
        <select
          className="rounded-md border border-border px-3 py-2"
          value={form.status_equipamento}
          onChange={(event) => update("status_equipamento", event.target.value)}
        >
          <option value="operacional">Operacional</option>
          <option value="em_manutencao">Em manutenção</option>
          <option value="desativado">Desativado</option>
        </select>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        {feedback ? <p className="text-sm text-emerald-700">{feedback}</p> : null}

        <button type="submit" className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground hover:bg-primary/90">
          Salvar manutenção
        </button>
      </form>
    </PageSection>
  );
}
