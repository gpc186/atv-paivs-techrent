import Link from "next/link";
import PageSection from "@/components/ui/page-section";

export default function ClienteDashboardPage() {
  return (
    <div className="grid gap-4">
      <PageSection title="Dashboard do cliente" description="Acompanhe rapidamente seus chamados.">
        <div className="flex flex-wrap gap-3">
          <Link href="/cliente/chamados" className="rounded-md border border-zinc-300 px-3 py-2 text-sm hover:bg-zinc-100">
            Ver chamados
          </Link>
          <Link href="/cliente/chamados/novo" className="rounded-md bg-zinc-900 px-3 py-2 text-sm text-white hover:bg-zinc-700">
            Abrir novo chamado
          </Link>
        </div>
      </PageSection>
    </div>
  );
}
