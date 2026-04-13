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
    <form onSubmit={handleSubmit} className="grid gap-6 rounded-xl border border-border/50 bg-gradient-to-br from-card to-card/95 p-6 text-foreground shadow-md transition-all duration-300 hover:shadow-lg">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Entrar no TechRent</h1>
        <p className="text-sm text-muted-foreground">Use seu e-mail e senha cadastrados.</p>
      </div>

      <div className="floating-input">
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          placeholder=" "
        />
        <label htmlFor="email">E-mail</label>
      </div>

      <div className="floating-input">
        <input
          type="password"
          id="password"
          value={senha}
          onChange={(event) => setSenha(event.target.value)}
          required
          placeholder=" "
        />
        <label htmlFor="password">Senha</label>
      </div>

      {error ? <p className="text-sm text-red-600 animate-in fade-in-0 duration-300">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90 hover:shadow-md disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-primary/50"
      >
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
