import Link from "next/link";
import PageSection from "@/components/ui/page-section";

export default function TecnicoDashboardPage() {
  return (
    <PageSection title="Dashboard técnico" description="Acesse rapidamente sua fila e registros de manutenção.">
      <div className="flex flex-wrap gap-3">
        <Link href="/tecnico/fila" className="rounded-md bg-zinc-900 px-3 py-2 text-sm text-white hover:bg-zinc-700">
          Ver fila técnica
        </Link>
        <Link href="/tecnico/manutencao/nova" className="rounded-md border border-zinc-300 px-3 py-2 text-sm hover:bg-zinc-100">
          Registrar manutenção
        </Link>
      </div>
    </PageSection>
  );
}
