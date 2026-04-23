"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRightIcon, ClipboardListIcon, PlusIcon } from "lucide-react";
import { dashboardService } from "@/services/dashboard.service";
import PageSection from "@/components/ui/page-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardContent } from "@/components/ui/card";
import { formatEnumLabel, getTicketStatusBadgeClass } from "@/lib/presentation";

export default function ClienteDashboardPage() {
  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function carregarDados() {
      try {
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
  const chamadosAbertos = chamados.filter((item) => item.status === "aberto").length;
  const chamadosResolvidos = chamados.filter((item) => item.status === "resolvido").length;

  return (
    <div className="grid gap-6">
      <PageSection
        title="Dashboard do cliente"
        description="Acompanhe seus chamados abertos, veja o andamento mais recente e abra novas solicitacoes com rapidez."
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/cliente/chamados/novo">
              <PlusIcon />
              Abrir novo chamado
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/cliente/chamados">
              <ClipboardListIcon />
              Ver todos os chamados
            </Link>
          </Button>
        </div>
      </PageSection>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Total de chamados" value={totalChamados} color="primary" />
        <StatCard title="Abertos" value={chamadosAbertos} color="accent" />
        <StatCard title="Resolvidos" value={chamadosResolvidos} color="primary" trend={12} />
      </div>

      <PageSection title="Ultimos chamados" description="Resumo rapido para saber o que ainda precisa de retorno.">
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
              <EmptyTitle>Nenhum chamado encontrado</EmptyTitle>
              <EmptyDescription>Abra seu primeiro chamado para acompanhar o atendimento por aqui.</EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="grid gap-4">
            {chamados.slice(0, 5).map((chamado) => (
              <Link key={chamado.id} href={`/cliente/chamados/${chamado.id}`}>
                <Card className="transition-shadow hover:shadow-md">
                  <CardContent className="flex flex-col gap-3 pt-5 md:flex-row md:items-start md:justify-between">
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold text-foreground">{chamado.titulo}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {chamado.equipamento_nome || "Equipamento nao informado"}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className={getTicketStatusBadgeClass(chamado.status)}>
                        {formatEnumLabel(chamado.status)}
                      </Badge>
                      <ArrowRightIcon className="size-4 text-muted-foreground" />
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
