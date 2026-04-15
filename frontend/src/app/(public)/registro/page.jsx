import Link from "next/link";
import { Layers3Icon, ShieldCheckIcon, UsersIcon } from "lucide-react";
import RegisterForm from "@/components/auth/register-form";
import { Logo } from "@/components/logo";

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_right,_rgba(14,165,233,0.16),_transparent_26%),radial-gradient(circle_at_left,_rgba(34,197,94,0.16),_transparent_34%),linear-gradient(180deg,_#f8fafc_0%,_#edf4ff_52%,_#f8fafc_100%)]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:38px_38px] opacity-60" />

      <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-4 py-10 lg:grid-cols-[minmax(0,1fr)_460px] lg:px-8">
        <section className="max-w-2xl">
          <div className="inline-flex items-center gap-3 rounded-full border border-slate-200/80 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-700 shadow-sm backdrop-blur">
            <Logo className="h-5 w-auto" />
            Base pronta para escalar
          </div>

          <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight text-slate-950 md:text-6xl">
            Cadastre perfis de trabalho e organize o atendimento desde a entrada.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
            O sistema ja separa quem abre chamados, quem executa manutencoes e quem administra a operacao inteira.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: UsersIcon,
                title: "Perfis distintos",
                description: "Cada usuario entra direto no painel que faz sentido para o seu papel.",
              },
              {
                icon: Layers3Icon,
                title: "Fluxo integrado",
                description: "Cadastro, chamados, fila e manutencao usando a mesma base de dados.",
              },
              {
                icon: ShieldCheckIcon,
                title: "Acesso controlado",
                description: "Rotas protegidas por papel e token desde o primeiro login.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-[24px] border border-white/80 bg-white/75 p-5 shadow-lg shadow-slate-900/5 backdrop-blur"
              >
                <div className="flex size-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
                  <item.icon className="size-5" />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-slate-950">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="space-y-4">
          <RegisterForm />
          <p className="text-center text-sm text-slate-600">
            Ja tem conta?{" "}
            <Link href="/login" className="font-semibold text-slate-950 underline decoration-primary/40 underline-offset-4">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
