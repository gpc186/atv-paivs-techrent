"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { dashboardService } from "@/services/dashboard.service";
import PageSection from "@/components/ui/page-section";

export default function TecnicoDashboardPage() {
  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function carregarFila() {
      try {
        setLoading(true);
        const response = await dashboardService.tecnico();
        setChamados(response.painel || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    carregarFila();
  }, []);

  const chamadosAbertos = chamados.filter((c) => c.status === "aberto").length;
  const chamadosEmAtendimento = chamados.filter(
    (c) => c.status === "em_atendimento"
  ).length;

  return (
    <div className="grid gap-6">
      <PageSection
        title="Dashboard Técnico"
        description="Acesse sua fila de chamados e registre manutenções"
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="/tecnico/fila"
            className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
          >
            Ver fila técnica
          </Link>
          <Link
            href="/tecnico/manutencao"
            className="rounded-md border border-border px-4 py-2 text-sm hover:bg-muted"
          >
            Histórico de manutenção
          </Link>
        </div>
      </PageSection>

      {/* Estatísticas */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">Chamados Abertos</p>
          <p className="text-3xl font-bold mt-2 text-blue-600">
            {chamadosAbertos}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">Em Atendimento</p>
          <p className="text-3xl font-bold mt-2 text-orange-600">
            {chamadosEmAtendimento}
          </p>
        </div>
      </div>

      {/* Fila de Chamados */}
      <PageSection title="Fila de Chamados">
        {loading ? (
          <p className="text-muted-foreground">Carregando...</p>
        ) : error ? (
          <p className="text-red-500">Erro: {error}</p>
        ) : chamados.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Nenhum chamado na fila.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {chamados.map((chamado) => (
              <Link
                key={chamado.chamado_id}
                href={`/tecnico/chamados/${chamado.chamado_id}`}
                className="flex items-center justify-between rounded-lg border border-border p-4 hover:bg-muted/50"
              >
                <div className="flex-1">
                  <p className="font-semibold">{chamado.titulo}</p>
                  <p className="text-sm text-muted-foreground">
                    {chamado.solicitante} • {chamado.equipamento}
                  </p>
                  <div className="mt-2 flex gap-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        chamado.prioridade === "alta"
                          ? "bg-red-100 text-red-800"
                          : chamado.prioridade === "media"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {chamado.prioridade}
                    </span>
                    {chamado.tecnico_responsavel && (
                      <span className="text-xs text-muted-foreground">
                        Atribuído: {chamado.tecnico_responsavel}
                      </span>
                    )}
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                    chamado.status === "aberto"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-orange-100 text-orange-800"
                  }`}
                >
                  {chamado.status}
                </span>
              </Link>
            ))}
          </div>
        )}
      </PageSection>
    </div>
  );
}
