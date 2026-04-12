import { http } from "@/lib/http";

export const manutencaoService = {
  list: (chamadoId) =>
    http.get(chamadoId ? `/manutencao?chamado_id=${encodeURIComponent(chamadoId)}` : "/manutencao"),
  register: (payload) => http.post("/manutencao", payload),
};
