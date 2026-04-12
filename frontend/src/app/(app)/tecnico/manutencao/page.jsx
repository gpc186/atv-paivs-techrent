"use client";

import { useEffect, useState } from "react";
import PageSection from "@/components/ui/page-section";
import { manutencaoService } from "@/services/manutencao.service";

export default function ManutencaoListPage() {
  const [manutencoes, setManutencoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    manutencaoService
      .list()
      .then((data) => setManutencoes(data?.manutencoes || data || []))
      .catch((err) => setError(err.message || "Erro ao carregar manutenções"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageSection title="Histórico de manutenções" description="Registros de ações técnicas realizadas.">
      {loading ? <p className="text-sm text-muted-foreground">Carregando...</p> : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div className="grid gap-3">
        {manutencoes.map((item) => (
          <div key={item.id} className="rounded-md border border-border bg-card p-3 text-sm text-foreground">
            <p><strong>Equipamento:</strong> {item.equipamento_nome}</p>
            <p><strong>Técnico:</strong> {item.tecnico_nome || item.nome_tecnico}</p>
            <p><strong>Descrição:</strong> {item.descricao}</p>
          </div>
        ))}
      </div>
    </PageSection>
  );
}
