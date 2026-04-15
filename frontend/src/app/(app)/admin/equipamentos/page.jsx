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
      .listarTodos()
      .then((data) => setEquipamentos(data?.equipamentos || []))
      .catch((err) => setError(err.message || "Erro ao listar equipamentos"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageSection title="Equipamentos" description="Visao rapida dos equipamentos operacionais retornados pela API.">
      {loading ? <p className="text-sm text-muted-foreground">Carregando...</p> : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div className="grid gap-3">
        {equipamentos.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-border/80 bg-card/95 p-4 text-sm text-foreground shadow-sm transition-colors hover:bg-card"
          >
            <p className="text-base font-semibold text-card-foreground">{item.nome}</p>
            <div className="mt-3 grid gap-1.5 text-muted-foreground">
              <p><strong className="text-foreground">Categoria:</strong> {item.categoria}</p>
              <p><strong className="text-foreground">Patrimonio:</strong> {item.patrimonio}</p>
            </div>
          </div>
        ))}
      </div>
    </PageSection>
  );
}
