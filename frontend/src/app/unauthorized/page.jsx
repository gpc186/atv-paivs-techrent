import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="max-w-md rounded-xl border border-border bg-card p-6 text-center shadow-sm">
        <h1 className="text-2xl font-semibold">Acesso não autorizado</h1>
        <p className="mt-2 text-sm text-muted-foreground">Você não tem permissão para acessar esta área.</p>
        <Link href="/login" className="mt-4 inline-block rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
          Voltar ao login
        </Link>
      </div>
    </div>
  );
}
