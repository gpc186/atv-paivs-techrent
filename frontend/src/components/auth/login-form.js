"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import { setSession } from "@/lib/auth-storage";
import { getHomeByRole } from "@/lib/route-guard";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await authService.login({ email, senha });
      setSession({ token: data.token, user: data.usuario });
      router.replace(getHomeByRole(data.usuario?.nivel_acesso));
    } catch (err) {
      setError(err.message || "Falha ao autenticar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div>
        <h1 className="text-xl font-semibold text-zinc-900">Entrar no TechRent</h1>
        <p className="text-sm text-zinc-500">Use seu e-mail e senha cadastrados.</p>
      </div>

      <label className="grid gap-1 text-sm">
        E-mail
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          className="rounded-md border border-zinc-300 px-3 py-2"
          placeholder="voce@empresa.com"
        />
      </label>

      <label className="grid gap-1 text-sm">
        Senha
        <input
          type="password"
          value={senha}
          onChange={(event) => setSenha(event.target.value)}
          required
          className="rounded-md border border-zinc-300 px-3 py-2"
          placeholder="••••••••"
        />
      </label>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-60"
      >
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
