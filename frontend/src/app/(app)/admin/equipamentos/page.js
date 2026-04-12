"use client";

import { useEffect, useState } from "react";
import PageSection from "@/components/ui/page-section";
import { equipamentosService } from "@/services/equipamentos.service";

export default function AdminEquipamentosPage() {
  const [equipamentos, setEquipamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    equipamentosService
      .list()
      .then((data) => setEquipamentos(data?.equipamentos || []))
      .catch((err) => setError(err.message || "Erro ao listar equipamentos"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageSection title="Equipamentos" description="Visão rápida dos equipamentos operacionais retornados pela API.">
      {loading ? <p className="text-sm text-muted-foreground">Carregando...</p> : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div className="grid gap-3">
        {equipamentos.map((item) => (
          <div key={item.id} className="rounded-md border border-border bg-card p-3 text-sm text-foreground shadow-sm">
            <p><strong>Nome:</strong> {item.nome}</p>
            <p><strong>Categoria:</strong> {item.categoria}</p>
            <p><strong>Patrimônio:</strong> {item.patrimonio}</p>
          </div>
        ))}
      </div>
    </PageSection>
  );
}
