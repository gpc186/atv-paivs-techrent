"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRightIcon, FilterIcon, WrenchIcon } from "lucide-react";
import PageSection from "@/components/ui/page-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { Card, CardContent } from "@/components/ui/card";
import { chamadosService } from "@/services/chamados.service";
import { dashboardService } from "@/services/dashboard.service";
import {
  formatEnumLabel,
  getPriorityBadgeClass,
  getTicketStatusBadgeClass,
} from "@/lib/presentation";
import { getSessionUser } from "@/lib/auth-storage";
import { cn } from "@/lib/utils";

const FILTERS = ["todos", "aberto", "em_atendimento"];

export default function TecnicoFilaPage() {
  const user = getSessionUser();
  const [painel, setPainel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState(null);
  const [error, setError] = useState("");
  const [filtro, setFiltro] = useState("todos");

  useEffect(() => {
    carregarFila();
  }, []);

  async function carregarFila() {
    try {
      setLoading(true);
      const data = await dashboardService.tecnico();
      setPainel(data?.painel || []);
      setError("");
    } catch (err) {
      setError(err.message || "Erro ao carregar fila tecnica.");
    } finally {
      setLoading(false);
    }
  }

  async function assumirChamado(chamadoId) {
    try {
      setActionId(chamadoId);
      await chamadosService.updateStatus(chamadoId, {
        status: "em_atendimento",
        tecnico_id: user?.id,
      });
      await carregarFila();
    } catch (err) {
      setError(`Erro ao assumir chamado: ${err.message}`);
    } finally {
      setActionId(null);
    }
  }

  const chamadosFiltrados = painel.filter((item) => {
    if (filtro === "todos") return true;
    return item.status === filtro;
  });

  const counters = {
    todos: painel.length,
    aberto: painel.filter((item) => item.status === "aberto").length,
    em_atendimento: painel.filter((item) => item.status === "em_atendimento").length,
  };

  return (
    <div className="grid gap-6">
      <PageSection
        title="Fila tecnica"
        description="Priorize chamados abertos, assuma atendimentos e siga direto para o registro de manutencao."
      >
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFiltro(item)}
              className={cn(
                "inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition",
                filtro === item
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border bg-card text-foreground shadow-xs hover:bg-muted"
              )}
            >
              <FilterIcon className="size-3.5" />
              {formatEnumLabel(item)} ({counters[item]})
            </button>
          ))}
        </div>
      </PageSection>

      {loading ? (
        <div className="grid gap-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-40 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      ) : error ? (
        <p className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-center text-sm text-destructive">
          {error}
        </p>
      ) : chamadosFiltrados.length === 0 ? (
        <Empty className="min-h-60">
          <EmptyHeader>
            <EmptyTitle>Nenhum chamado encontrado</EmptyTitle>
            <EmptyDescription>Altere o filtro ou aguarde novos atendimentos para esta fila.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="grid gap-4">
          {chamadosFiltrados.map((item) => (
            <Card key={item.chamado_id}>
              <CardContent className="flex flex-col gap-4 pt-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className={getTicketStatusBadgeClass(item.status)}>
                      {formatEnumLabel(item.status)}
                    </Badge>
                    <Badge variant="outline" className={getPriorityBadgeClass(item.prioridade)}>
                      Prioridade {formatEnumLabel(item.prioridade)}
                    </Badge>
                  </div>

                  <h2 className="mt-4 text-xl font-semibold text-foreground">{item.titulo}</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                    {item.descricao || "Sem descricao detalhada informada pelo solicitante."}
                  </p>

                  <div className="mt-4 grid gap-3 text-sm text-muted-foreground md:grid-cols-3">
                    <div className="rounded-lg border border-border bg-muted/30 p-3">
                      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        Solicitante
                      </p>
                      <p className="mt-1 font-medium text-foreground">{item.solicitante}</p>
                    </div>
                    <div className="rounded-lg border border-border bg-muted/30 p-3">
                      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        Equipamento
                      </p>
                      <p className="mt-1 font-medium text-foreground">{item.equipamento}</p>
                      <p className="text-xs text-muted-foreground">{item.categoria || "Sem categoria"}</p>
                    </div>
                    <div className="rounded-lg border border-border bg-muted/30 p-3">
                      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        Responsavel
                      </p>
                      <p className="mt-1 font-medium text-foreground">
                        {item.tecnico_responsavel || "Nao atribuido"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex w-full flex-col gap-2 lg:w-56">
                  <Button asChild variant="outline" size="lg">
                    <Link href={`/tecnico/chamados/${item.chamado_id}`}>
                      Ver detalhes
                      <ArrowRightIcon />
                    </Link>
                  </Button>

                  {item.status === "aberto" ? (
                    <Button
                      type="button"
                      size="lg"
                      onClick={() => assumirChamado(item.chamado_id)}
                      disabled={actionId === item.chamado_id}
                    >
                      <WrenchIcon />
                      {actionId === item.chamado_id ? "Assumindo..." : "Assumir atendimento"}
                    </Button>
                  ) : (
                    <Button asChild size="lg">
                      <Link
                        href={`/tecnico/manutencao/nova?chamadoId=${item.chamado_id}&equipamentoId=${item.equipamento_id}`}
                      >
                        Registrar reparo
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
