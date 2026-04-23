"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ClipboardCheckIcon, Layers3Icon, WrenchIcon } from "lucide-react";
import { dashboardService } from "@/services/dashboard.service";
import PageSection from "@/components/ui/page-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardContent } from "@/components/ui/card";
import {
  formatEnumLabel,
  getPriorityBadgeClass,
  getTicketStatusBadgeClass,
} from "@/lib/presentation";

export default function TecnicoDashboardPage() {
  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function carregarFila() {
      try {
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

  const chamadosAbertos = chamados.filter((item) => item.status === "aberto").length;
  const chamadosEmAtendimento = chamados.filter((item) => item.status === "em_atendimento").length;

  return (
    <div className="grid gap-6">
      <PageSection
        title="Dashboard tecnico"
        description="Veja a carga atual de atendimento e siga direto para a fila ou para o historico de manutencao."
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/tecnico/fila">
              <Layers3Icon />
              Ver fila tecnica
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/tecnico/manutencao">
              <ClipboardCheckIcon />
              Historico de manutencao
            </Link>
          </Button>
        </div>
      </PageSection>

      <div className="grid gap-4 md:grid-cols-2">
        <StatCard title="Chamados abertos" value={chamadosAbertos} color="accent" />
        <StatCard title="Em atendimento" value={chamadosEmAtendimento} color="primary" />
      </div>

      <PageSection title="Proximos atendimentos" description="Os chamados mais urgentes sobem primeiro.">
        {loading ? (
          <div className="grid gap-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-24 animate-pulse rounded-lg bg-muted" />
            ))}
          </div>
        ) : error ? (
          <p className="text-sm text-destructive">Erro: {error}</p>
        ) : chamados.length === 0 ? (
          <Empty className="min-h-52">
            <EmptyHeader>
              <EmptyTitle>Nenhum chamado na fila</EmptyTitle>
              <EmptyDescription>Quando surgirem novos atendimentos, eles vao aparecer aqui.</EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="grid gap-4">
            {chamados.slice(0, 5).map((chamado) => (
              <Link key={chamado.chamado_id} href={`/tecnico/chamados/${chamado.chamado_id}`}>
                <Card className="transition-shadow hover:shadow-md">
                  <CardContent className="flex flex-col gap-3 pt-5 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className={getTicketStatusBadgeClass(chamado.status)}>
                          {formatEnumLabel(chamado.status)}
                        </Badge>
                        <Badge variant="outline" className={getPriorityBadgeClass(chamado.prioridade)}>
                          {formatEnumLabel(chamado.prioridade)}
                        </Badge>
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-foreground">{chamado.titulo}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {chamado.solicitante} - {chamado.equipamento}
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-sm font-medium text-primary">
                      <WrenchIcon className="size-4" />
                      Atender
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </PageSection>
    </div>
  );
}
