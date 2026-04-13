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
    <form onSubmit={handleSubmit} className="grid gap-6 rounded-xl border border-border/50 bg-gradient-to-br from-card to-card/95 p-6 text-foreground shadow-md transition-all duration-300 hover:shadow-lg">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Criar conta</h1>
        <p className="text-sm text-muted-foreground">Cadastre um usuário no sistema TechRent.</p>
      </div>

      <div className="floating-input">
        <input
          type="text"
          id="nome"
          value={form.nome}
          onChange={(event) => updateField("nome", event.target.value)}
          required
          placeholder=" "
        />
        <label htmlFor="nome">Nome completo</label>
      </div>

      <div className="floating-input">
        <input
          type="email"
          id="email-registro"
          value={form.email}
          onChange={(event) => updateField("email", event.target.value)}
          required
          placeholder=" "
        />
        <label htmlFor="email-registro">E-mail</label>
      </div>

      <div className="floating-input">
        <input
          type="password"
          id="senha"
          value={form.senhaSemHash}
          onChange={(event) => updateField("senhaSemHash", event.target.value)}
          required
          placeholder=" "
        />
        <label htmlFor="senha">Senha</label>
      </div>

      <div className="grid gap-1">
        <label htmlFor="perfil" className="text-sm text-muted-foreground">
          Perfil
        </label>
        <select
          id="perfil"
          value={form.nivel_acesso}
          onChange={(event) => updateField("nivel_acesso", event.target.value)}
          className="rounded-md border border-border bg-card px-3 py-2 text-foreground transition-all duration-200 hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/50"
        >
          {ACCESS_LEVEL_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {error ? <p className="text-sm text-red-600 animate-in fade-in-0 duration-300">{error}</p> : null}
      {feedback ? <p className="text-sm text-emerald-600 animate-in fade-in-0 duration-300">{feedback}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90 hover:shadow-md disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-primary/50"
      >
        {loading ? "Cadastrando..." : "Cadastrar"}
      </button>
    </form>
  );
}
