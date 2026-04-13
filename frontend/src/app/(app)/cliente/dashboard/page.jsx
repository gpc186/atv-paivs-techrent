"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { dashboardService } from "@/services/dashboard.service";
import PageSection from "@/components/ui/page-section";

export default function ClienteDashboardPage() {
  const router = useRouter();
  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function carregarDados() {
      try {
        setLoading(true);
        const response = await dashboardService.cliente();
        setChamados(response.chamados || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, []);

  const totalChamados = chamados.length;
  const chamadosAbertos = chamados.filter((c) => c.status === "aberto").length;
  const chamadosResolvidos = chamados.filter((c) => c.status === "resolvido").length;

  return (
    <div className="grid gap-6">
      <PageSection
        title="Dashboard do Cliente"
        description="Acompanhe rapidamente seus chamados de TI"
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="/cliente/chamados"
            className="rounded-md border border-border px-4 py-2 text-sm hover:bg-muted"
          >
            Ver todos os chamados
          </Link>
          <Link
            href="/cliente/chamados/novo"
            className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
          >
            Abrir novo chamado
          </Link>
        </div>
      </PageSection>

      {/* Estatísticas */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-lg border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">Total de Chamados</p>
          <p className="text-3xl font-bold mt-2">{totalChamados}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">Abertos</p>
          <p className="text-3xl font-bold mt-2 text-blue-600">{chamadosAbertos}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">Resolvidos</p>
          <p className="text-3xl font-bold mt-2 text-green-600">
            {chamadosResolvidos}
          </p>
        </div>
      </div>

      {/* Últimos chamados */}
      <PageSection title="Últimos Chamados">
        {loading ? (
          <p className="text-muted-foreground">Carregando...</p>
        ) : error ? (
          <p className="text-red-500">Erro: {error}</p>
        ) : chamados.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Você não possui chamados no momento.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {chamados.slice(0, 5).map((chamado) => (
              <div
                key={chamado.id}
                className="flex items-center justify-between rounded-lg border border-border p-4 hover:bg-muted/50"
              >
                <div className="flex-1">
                  <p className="font-semibold">{chamado.titulo}</p>
                  <p className="text-sm text-muted-foreground">
                    {chamado.equipamento_nome}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    chamado.status === "aberto"
                      ? "bg-blue-100 text-blue-800"
                      : chamado.status === "em_atendimento"
                      ? "bg-orange-100 text-orange-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {chamado.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </PageSection>
    </div>
  );
}
