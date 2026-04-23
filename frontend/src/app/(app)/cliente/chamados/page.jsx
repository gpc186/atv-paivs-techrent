"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRightIcon, PlusIcon } from "lucide-react";
import PageSection from "@/components/ui/page-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { chamadosService } from "@/services/chamados.service";
import { formatEnumLabel, getPriorityBadgeClass, getTicketStatusBadgeClass } from "@/lib/presentation";

export default function ClienteChamadosPage() {
  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    chamadosService
      .list()
      .then((data) => setChamados(data?.chamados || []))
      .catch((err) => setError(err.message || "Erro ao carregar chamados."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageSection
      title="Meus chamados"
      description="Lista completa dos atendimentos vinculados ao seu usuario, com status, prioridade e acesso aos detalhes."
    >
      <div className="flex flex-wrap gap-3">
        <Button asChild size="lg">
          <Link href="/cliente/chamados/novo">
            <PlusIcon />
            Novo chamado
          </Link>
        </Button>
      </div>

      {loading ? <p className="mt-5 text-sm text-muted-foreground">Carregando chamados...</p> : null}
      {error ? <p className="mt-5 text-sm text-destructive">{error}</p> : null}

      {!loading && !error && chamados.length === 0 ? (
        <Empty className="mt-5 min-h-52">
          <EmptyHeader>
            <EmptyTitle>Nenhum chamado encontrado</EmptyTitle>
            <EmptyDescription>Quando houver atendimentos vinculados ao seu usuario, eles serao listados aqui.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : null}

      {!loading && !error && chamados.length > 0 ? (
        <div className="mt-5 rounded-xl border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titulo</TableHead>
                <TableHead>Equipamento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Prioridade</TableHead>
                <TableHead className="text-right">Acoes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {chamados.map((chamado) => (
                <TableRow key={chamado.id}>
                  <TableCell className="font-medium">{chamado.titulo}</TableCell>
                  <TableCell>{chamado.equipamento_nome || "Equipamento nao informado"}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getTicketStatusBadgeClass(chamado.status)}>
                      {formatEnumLabel(chamado.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getPriorityBadgeClass(chamado.prioridade)}>
                      {formatEnumLabel(chamado.prioridade)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/cliente/chamados/${chamado.id}`}>
                        Ver detalhes
                        <ArrowRightIcon />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : null}
    </PageSection>
  );
}
