"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageSection from "@/components/ui/page-section";
import { dashboardService } from "@/services/dashboard.service";
import { chamadosService } from "@/services/chamados.service";

export default function TecnicoFilaPage() {
  const [painel, setPainel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filtro, setFiltro] = useState("todos"); // todos, aberto, em_atendimento

  useEffect(() => {
    carregarFila();
  }, []);

  async function carregarFila() {
    try {
      setLoading(true);
      const data = await dashboardService.tecnico();
      setPainel(data?.painel || []);
    } catch (err) {
      setError(err.message || "Erro ao carregar fila técnica");
    } finally {
      setLoading(false);
    }
  }

  async function assumirChamado(chamadoId) {
    try {
      await chamadosService.updateStatus(chamadoId, {
        status: "em_atendimento",
      });
      carregarFila();
    } catch (err) {
      setError("Erro ao assumir chamado: " + err.message);
    }
  }

  const chamadosFiltrados = painel.filter((item) => {
    if (filtro === "todos") return true;
    return item.status === filtro;
  });

  const abertos = painel.filter((c) => c.status === "aberto").length;
  const emAtendimento = painel.filter((c) => c.status === "em_atendimento").length;

  return (
    <div className="grid gap-6">
      <PageSection title="Fila Técnica" description="Gerenciar chamados atribuídos">
        {/* Filtros */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setFiltro("todos")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              filtro === "todos"
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            Todos ({painel.length})
          </button>
          <button
            onClick={() => setFiltro("aberto")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              filtro === "aberto"
                ? "bg-blue-600 text-white"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            Abertos ({abertos})
          </button>
          <button
            onClick={() => setFiltro("em_atendimento")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              filtro === "em_atendimento"
                ? "bg-orange-600 text-white"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            Em Atendimento ({emAtendimento})
          </button>
        </div>
      </PageSection>

      {loading ? (
        <p className="text-center text-muted-foreground py-8">Carregando...</p>
      ) : error ? (
        <p className="text-center text-red-600 py-8">{error}</p>
      ) : chamadosFiltrados.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          Nenhum chamado {filtro === "todos" ? "" : filtro}
        </div>
      ) : (
        <div className="grid gap-4">
          {chamadosFiltrados.map((item) => (
            <div
              key={item.chamado_id}
              className="rounded-lg border border-border bg-card p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start justify-between gap-4">
                <Link
                  href={`/tecnico/chamados/${item.chamado_id}`}
                  className="flex-1 hover:opacity-80 transition"
                >
                  <p className="font-semibold text-lg">{item.titulo}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.descricao}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        item.prioridade === "alta"
                          ? "bg-red-100 text-red-800"
                          : item.prioridade === "media"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {item.prioridade}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Equipamento: {item.equipamento}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Cliente: {item.solicitante}
                    </span>
                  </div>
                </Link>

                <div className="flex flex-col gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                      item.status === "aberto"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-orange-100 text-orange-800"
                    }`}
                  >
                    {item.status}
                  </span>

                  {item.status === "aberto" && (
                    <button
                      onClick={() => assumirChamado(item.chamado_id)}
                      className="px-3 py-1 rounded-md text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition whitespace-nowrap"
                    >
                      Assumir
                    </button>
                  )}

                  {item.status === "em_atendimento" && (
                    <Link
                      href={`/tecnico/manutencao/novo?chamadoId=${item.chamado_id}&equipamentoId=${item.equipamento_id}`}
                      className="px-3 py-1 rounded-md text-xs font-semibold bg-orange-600 text-white hover:bg-orange-700 transition text-center"
                    >
                      Registrar Reparo
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
