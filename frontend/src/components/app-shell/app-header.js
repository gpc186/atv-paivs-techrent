"use client";

import { useRouter } from "next/navigation";
import { clearSession } from "@/lib/auth-storage";

export default function AppHeader({ user }) {
  const router = useRouter();

  function handleLogout() {
    clearSession();
    router.replace("/login");
  }

  return (
    <header className="flex items-center justify-between border-b border-border bg-card px-6 py-4">
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Painel</p>
        <h1 className="text-lg font-semibold text-foreground">{user?.nivel_acesso || "usuário"}</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium text-muted-foreground">{user?.nome || "Usuário"}</p>
          <p className="text-xs text-muted-foreground">{user?.email || ""}</p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-md border border-border px-3 py-2 text-sm text-muted-foreground hover:bg-muted"
        >
          Sair
        </button>
      </div>
    </header>
  );
}
