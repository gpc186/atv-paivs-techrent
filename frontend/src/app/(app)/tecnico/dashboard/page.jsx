import Link from "next/link";
import PageSection from "@/components/ui/page-section";

export default function TecnicoDashboardPage() {
  return (
    <PageSection title="Dashboard técnico" description="Acesse rapidamente sua fila e registros de manutenção.">
      <div className="flex flex-wrap gap-3">
        <Link href="/tecnico/fila" className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground hover:bg-primary/90">
          Ver fila técnica
        </Link>
        <Link href="/tecnico/manutencao/nova" className="rounded-md border border-border px-3 py-2 text-sm hover:bg-muted">
          Registrar manutenção
        </Link>
      </div>
    </PageSection>
  );
}
