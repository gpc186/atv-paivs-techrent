import { http } from "@/lib/http";

export const dashboardService = {
  admin: () => http.get("/dashboard/admin"),
  tecnico: () => http.get("/dashboard/tecnico"),
};
