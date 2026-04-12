import { http } from "@/lib/http";

export const equipamentosService = {
  list: () => http.get("/equipamentos"),
  findById: (id) => http.get(`/equipamentos/${id}`),
};
