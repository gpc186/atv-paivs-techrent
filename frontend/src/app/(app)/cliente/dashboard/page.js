import Link from "next/link";
import PageSection from "@/components/ui/page-section";

export default function ClienteDashboardPage() {
  return (
    <div className="grid gap-4">
      <PageSection title="Dashboard do cliente" description="Acompanhe rapidamente seus chamados.">
        <div className="flex flex-wrap gap-3">
          <Link href="/cliente/chamados" className="rounded-md border border-border px-3 py-2 text-sm hover:bg-muted">
            Ver chamados
          </Link>
          <Link href="/cliente/chamados/novo" className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground hover:bg-primary/90">
            Abrir novo chamado
          </Link>
        </div>
      </PageSection>
    </div>
  );
}
