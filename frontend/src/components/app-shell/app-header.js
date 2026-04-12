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
    <header className="flex items-center justify-between border-b border-zinc-200 bg-white px-6 py-4">
      <div>
        <p className="text-xs uppercase tracking-wide text-zinc-500">Painel</p>
        <h1 className="text-lg font-semibold text-zinc-900">{user?.nivel_acesso || "usuário"}</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium text-zinc-800">{user?.nome || "Usuário"}</p>
          <p className="text-xs text-zinc-500">{user?.email || ""}</p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
        >
          Sair
        </button>
      </div>
    </header>
  );
}
