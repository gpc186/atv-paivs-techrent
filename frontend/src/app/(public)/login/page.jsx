import Link from "next/link";
import { ActivityIcon, ShieldCheckIcon, WrenchIcon } from "lucide-react";
import LoginForm from "@/components/auth/login-form";
import { Logo } from "@/components/logo";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_28%),radial-gradient(circle_at_right,_rgba(59,130,246,0.18),_transparent_34%),linear-gradient(180deg,_#f7fafc_0%,_#eef4ff_48%,_#f8fafc_100%)]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:36px_36px] opacity-60" />

      <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-4 py-10 lg:grid-cols-[minmax(0,1.05fr)_440px] lg:px-8">
        <section className="max-w-2xl">
          <div className="inline-flex items-center gap-3 rounded-full border border-slate-200/80 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-700 shadow-sm backdrop-blur">
            <Logo className="h-5 w-auto" />
            Operacao centralizada
          </div>

          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-slate-950 md:text-6xl">
            Chamados, manutencao e inventario em uma interface muito mais forte.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
            O novo fluxo concentra triagem, atendimento e acompanhamento por perfil sem aquele visual de sistema improvisado.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: ActivityIcon,
                title: "Painel vivo",
                description: "KPI, fila tecnica e chamados organizados por prioridade e status.",
              },
              {
                icon: WrenchIcon,
                title: "Fluxo tecnico",
                description: "Do chamado aberto ao reparo concluido sem depender de IDs soltos.",
              },
              {
                icon: ShieldCheckIcon,
                title: "Perfis claros",
                description: "Cliente, tecnico e admin com navegacao e permissoes consistentes.",
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
          <LoginForm />
          <p className="text-center text-sm text-slate-600">
            Nao tem conta?{" "}
            <Link href="/registro" className="font-semibold text-slate-950 underline decoration-primary/40 underline-offset-4">
              Criar agora
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
