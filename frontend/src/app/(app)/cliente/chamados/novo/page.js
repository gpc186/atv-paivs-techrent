"use client";

import { useEffect, useState } from "react";
import { equipamentosService } from "@/services/equipamentos.service";
import { chamadosService } from "@/services/chamados.service";
import PageSection from "@/components/ui/page-section";

export default function NovoChamadoPage() {
  const [equipamentos, setEquipamentos] = useState([]);
  const [loadingEquip, setLoadingEquip] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    equipamento_id: "",
    prioridade: "media",
  });

  useEffect(() => {
    equipamentosService
      .list()
      .then((data) => setEquipamentos(data?.equipamentos || []))
      .catch((err) => setError(err.message || "Erro ao carregar equipamentos"))
      .finally(() => setLoadingEquip(false));
  }, []);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setFeedback("");

    try {
      await chamadosService.create({ ...form, equipamento_id: Number(form.equipamento_id) });
      setFeedback("Chamado aberto com sucesso!");
      setForm({ titulo: "", descricao: "", equipamento_id: "", prioridade: "media" });
    } catch (err) {
      setError(err.message || "Não foi possível abrir o chamado");
    }
  }

  return (
    <PageSection title="Abrir novo chamado" description="Informe o problema e selecione o equipamento.">
      <form onSubmit={handleSubmit} className="grid gap-3">
        <input
          className="rounded-md border border-zinc-300 px-3 py-2"
          placeholder="Título"
          value={form.titulo}
          onChange={(event) => update("titulo", event.target.value)}
          required
        />

        <textarea
          className="rounded-md border border-zinc-300 px-3 py-2"
          placeholder="Descrição"
          rows={4}
          value={form.descricao}
          onChange={(event) => update("descricao", event.target.value)}
          required
        />

        <select
          className="rounded-md border border-zinc-300 px-3 py-2"
          value={form.equipamento_id}
          onChange={(event) => update("equipamento_id", event.target.value)}
          required
          disabled={loadingEquip}
        >
          <option value="">Selecione um equipamento</option>
          {equipamentos.map((equipamento) => (
            <option key={equipamento.id} value={equipamento.id}>
              {equipamento.nome}
            </option>
          ))}
        </select>

        <select
          className="rounded-md border border-zinc-300 px-3 py-2"
          value={form.prioridade}
          onChange={(event) => update("prioridade", event.target.value)}
        >
          <option value="baixa">Baixa</option>
          <option value="media">Média</option>
          <option value="alta">Alta</option>
        </select>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        {feedback ? <p className="text-sm text-emerald-700">{feedback}</p> : null}

        <button className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-700" type="submit">
          Abrir chamado
        </button>
      </form>
    </PageSection>
  );
}
