"use client";

import { useEffect, useMemo, useState } from "react";
import {
  PencilIcon,
  PlusIcon,
  RefreshCcwIcon,
  ShieldAlertIcon,
  Trash2Icon,
} from "lucide-react";
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
import { equipamentosService } from "@/services/equipamentos.service";
import {
  formatEnumLabel,
  getEquipmentStatusBadgeClass,
} from "@/lib/presentation";
import { cn } from "@/lib/utils";

const EMPTY_FORM = {
  nome: "",
  categoria: "",
  patrimonio: "",
  descricao: "",
  status: "operacional",
};

const STATUS_OPTIONS = ["todos", "operacional", "em_manutencao", "desativado"];

export default function AdminEquipamentosPage() {
  const [equipamentos, setEquipamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("todos");
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    carregarEquipamentos();
  }, []);

  async function carregarEquipamentos() {
    try {
      setLoading(true);
      const data = await equipamentosService.listarTodos();
      setEquipamentos(data?.equipamentos || []);
      setError("");
    } catch (err) {
      setError(err.message || "Erro ao listar equipamentos.");
    } finally {
      setLoading(false);
    }
  }

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function startCreateMode(clearMessages = true) {
    setEditingId(null);
    setForm(EMPTY_FORM);
    if (clearMessages) {
      setFeedback("");
      setError("");
    }
  }

  function startEditMode(item) {
    setEditingId(item.id);
    setForm({
      nome: item.nome || "",
      categoria: item.categoria || "",
      patrimonio: item.patrimonio || "",
      descricao: item.descricao || "",
      status: item.status || "operacional",
    });
    setFeedback("");
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setFeedback("");
    setSaving(true);

    try {
      if (editingId) {
        await equipamentosService.atualizar(editingId, {
          nome: form.nome,
          categoria: form.categoria,
          status: form.status,
          descricao: form.descricao,
        });
        setFeedback("Equipamento atualizado com sucesso.");
      } else {
        await equipamentosService.criar({
          nome: form.nome,
          categoria: form.categoria,
          patrimonio: form.patrimonio,
          descricao: form.descricao,
        });
        setFeedback("Equipamento cadastrado com sucesso.");
      }

      startCreateMode(false);
      await carregarEquipamentos();
    } catch (err) {
      setError(err.message || "Nao foi possivel salvar o equipamento.");
    } finally {
      setSaving(false);
    }
  }

  async function handleStatusChange(id, status) {
    try {
      setError("");
      await equipamentosService.atualizarStatus(id, { status });
      setFeedback(`Status atualizado para ${formatEnumLabel(status)}.`);
      await carregarEquipamentos();
    } catch (err) {
      setError(err.message || "Erro ao atualizar status do equipamento.");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Deseja realmente excluir este equipamento?")) {
      return;
    }

    try {
      setDeletingId(id);
      setError("");
      await equipamentosService.deletar(id);
      setFeedback("Equipamento removido com sucesso.");
      if (editingId === id) {
        startCreateMode();
      }
      await carregarEquipamentos();
    } catch (err) {
      setError(err.message || "Erro ao excluir equipamento.");
    } finally {
      setDeletingId(null);
    }
  }

  const equipamentosFiltrados = useMemo(() => {
    if (statusFilter === "todos") return equipamentos;
    return equipamentos.filter((item) => item.status === statusFilter);
  }, [equipamentos, statusFilter]);

  return (
    <div className="grid gap-6 xl:grid-cols-[400px_minmax(0,1fr)]">
      <PageSection
        title={editingId ? "Editar equipamento" : "Novo equipamento"}
        description="Cadastre, ajuste status e mantenha o inventario tecnico organizado."
      >
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="nome" className="app-form-label">
              Nome
            </label>
            <input
              id="nome"
              className="app-form-control"
              value={form.nome}
              onChange={(event) => update("nome", event.target.value)}
              required
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="categoria" className="app-form-label">
              Categoria
            </label>
            <input
              id="categoria"
              className="app-form-control"
              value={form.categoria}
              onChange={(event) => update("categoria", event.target.value)}
              required
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="patrimonio" className="app-form-label">
              Patrimonio
            </label>
            <input
              id="patrimonio"
              className="app-form-control"
              value={form.patrimonio}
              onChange={(event) => update("patrimonio", event.target.value)}
              required
              disabled={Boolean(editingId)}
            />
            {editingId ? (
              <p className="app-form-helper">
                O patrimonio permanece bloqueado na edicao para preservar a referencia do inventario.
              </p>
            ) : null}
          </div>

          <div className="grid gap-2">
            <label htmlFor="status" className="app-form-label">
              Status
            </label>
            <select
              id="status"
              className="app-form-control"
              value={form.status}
              onChange={(event) => update("status", event.target.value)}
              disabled={!editingId}
            >
              <option value="operacional">Operacional</option>
              <option value="em_manutencao">Em manutencao</option>
              <option value="desativado">Desativado</option>
            </select>
          </div>

          <div className="grid gap-2">
            <label htmlFor="descricao" className="app-form-label">
              Descricao
            </label>
            <textarea
              id="descricao"
              rows={4}
              className="app-form-control"
              value={form.descricao}
              onChange={(event) => update("descricao", event.target.value)}
            />
          </div>

          {error ? (
            <div className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          ) : null}

          {feedback ? (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {feedback}
            </div>
          ) : null}

          <div className="flex flex-wrap gap-3">
            <Button type="submit" size="lg" disabled={saving}>
              {editingId ? <PencilIcon /> : <PlusIcon />}
              {saving ? "Salvando..." : editingId ? "Salvar alteracoes" : "Cadastrar equipamento"}
            </Button>
            <Button type="button" size="lg" variant="outline" onClick={startCreateMode}>
              <RefreshCcwIcon />
              Limpar formulario
            </Button>
          </div>
        </form>
      </PageSection>

      <div className="grid gap-6">
        <PageSection
          title="Inventario de equipamentos"
          description="Acompanhe o status atual do parque e ajuste rapidamente quando houver mudanca operacional."
        >
          <div className="flex flex-wrap gap-2">
            {STATUS_OPTIONS.map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={cn(
                  "rounded-lg border px-4 py-2 text-sm font-medium transition",
                  statusFilter === status
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground shadow-xs hover:bg-muted"
                )}
              >
                {formatEnumLabel(status)} (
                {status === "todos"
                  ? equipamentos.length
                  : equipamentos.filter((item) => item.status === status).length}
                )
              </button>
            ))}
          </div>

          {loading ? (
            <p className="mt-4 text-sm text-muted-foreground">Carregando equipamentos...</p>
          ) : equipamentosFiltrados.length === 0 ? (
            <Empty className="mt-4 min-h-56">
              <EmptyHeader>
                <EmptyTitle>Nenhum equipamento encontrado</EmptyTitle>
                <EmptyDescription>O filtro atual nao retornou itens no inventario.</EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            <div className="mt-5 rounded-xl border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Equipamento</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Patrimonio</TableHead>
                    <TableHead className="text-right">Acoes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {equipamentosFiltrados.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-foreground">{item.nome}</span>
                            {item.status === "desativado" ? (
                              <ShieldAlertIcon className="size-4 text-rose-500" />
                            ) : null}
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {item.descricao || "Sem descricao adicional cadastrada."}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getEquipmentStatusBadgeClass(item.status)}>
                          {formatEnumLabel(item.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.categoria || "Sem categoria"}</TableCell>
                      <TableCell>{item.patrimonio}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex flex-wrap justify-end gap-2">
                          <Button type="button" variant="outline" size="sm" onClick={() => startEditMode(item)}>
                            <PencilIcon />
                            Editar
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleStatusChange(item.id, "operacional")}
                          >
                            Operacional
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleStatusChange(item.id, "em_manutencao")}
                          >
                            Em manutencao
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleStatusChange(item.id, "desativado")}
                          >
                            Desativar
                          </Button>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(item.id)}
                            disabled={deletingId === item.id}
                          >
                            <Trash2Icon />
                            {deletingId === item.id ? "Excluindo..." : "Excluir"}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </PageSection>
      </div>
    </div>
  );
}
