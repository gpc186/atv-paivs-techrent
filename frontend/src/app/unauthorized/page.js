import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="max-w-md rounded-xl border border-zinc-200 bg-white p-6 text-center shadow-sm">
        <h1 className="text-2xl font-semibold">Acesso não autorizado</h1>
        <p className="mt-2 text-sm text-zinc-600">Você não tem permissão para acessar esta área.</p>
        <Link href="/login" className="mt-4 inline-block rounded-md bg-zinc-900 px-4 py-2 text-sm text-white">
          Voltar ao login
        </Link>
      </div>
    </div>
  );
}
