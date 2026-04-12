"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";

const ACCESS_LEVEL_OPTIONS = [
  { value: "cliente", label: "Cliente" },
  { value: "tecnico", label: "Técnico" },
  { value: "admin", label: "Admin" },
];

export default function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senhaSemHash: "",
    nivel_acesso: "cliente",
  });
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setFeedback("");
    setLoading(true);

    try {
      await authService.register(form);
      setFeedback("Conta criada com sucesso! Você já pode fazer login.");
      setTimeout(() => router.push("/login"), 900);
    } catch (err) {
      setError(err.message || "Falha ao registrar conta.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 rounded-xl border border-border bg-card p-6 text-foreground shadow-sm">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Criar conta</h1>
        <p className="text-sm text-muted-foreground">Cadastre um usuário no sistema TechRent.</p>
      </div>

      <label className="grid gap-1 text-sm">
        Nome
        <input
          value={form.nome}
          onChange={(event) => updateField("nome", event.target.value)}
          required
          className="rounded-md border border-border bg-card px-3 py-2 text-foreground placeholder:text-muted-foreground"
          placeholder="Nome completo"
        />
      </label>

      <label className="grid gap-1 text-sm">
        E-mail
        <input
          type="email"
          value={form.email}
          onChange={(event) => updateField("email", event.target.value)}
          required
          className="rounded-md border border-border bg-card px-3 py-2 text-foreground placeholder:text-muted-foreground"
        />
      </label>

      <label className="grid gap-1 text-sm">
        Senha
        <input
          type="password"
          value={form.senhaSemHash}
          onChange={(event) => updateField("senhaSemHash", event.target.value)}
          required
          className="rounded-md border border-border bg-card px-3 py-2 text-foreground placeholder:text-muted-foreground"
        />
      </label>

      <label className="grid gap-1 text-sm">
        Perfil
        <select
          value={form.nivel_acesso}
          onChange={(event) => updateField("nivel_acesso", event.target.value)}
          className="rounded-md border border-border bg-card px-3 py-2 text-foreground placeholder:text-muted-foreground"
        >
          {ACCESS_LEVEL_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {feedback ? <p className="text-sm text-emerald-700">{feedback}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
      >
        {loading ? "Cadastrando..." : "Cadastrar"}
      </button>
    </form>
  );
}
