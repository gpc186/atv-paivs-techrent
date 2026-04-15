"use client";

import { useState } from "react";
import { ArrowRightIcon, LockKeyholeIcon, MailIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { setSession } from "@/lib/auth-storage";
import { getHomeByRole } from "@/lib/route-guard";
import { authService } from "@/services/auth.service";
import { Button } from "@/components/ui/button";

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
    <form
      onSubmit={handleSubmit}
      className="grid gap-6 rounded-[28px] border border-white/10 bg-white/85 p-6 text-foreground shadow-2xl shadow-slate-950/10 backdrop-blur md:p-8"
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-primary">Acesso seguro</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">Entrar no TechRent</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Acompanhe chamados, fila tecnica e disponibilidade de equipamentos em um unico painel.
        </p>
      </div>

      <div className="grid gap-4">
        <div className="grid gap-2">
          <label htmlFor="email" className="app-form-label">
            E-mail
          </label>
          <div className="app-form-shell">
            <MailIcon />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="bg-transparent"
              placeholder="voce@empresa.com"
            />
          </div>
        </div>

        <div className="grid gap-2">
          <label htmlFor="password" className="app-form-label">
            Senha
          </label>
          <div className="app-form-shell">
            <LockKeyholeIcon />
            <input
              id="password"
              type="password"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              required
              className="bg-transparent"
              placeholder="Digite sua senha"
            />
          </div>
        </div>
      </div>

      {error ? (
        <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      <Button type="submit" size="lg" disabled={loading} className="w-full">
        {loading ? "Entrando..." : "Entrar agora"}
        <ArrowRightIcon />
      </Button>
    </form>
  );
}
