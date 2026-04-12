import Link from "next/link";
import LoginForm from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <LoginForm />
        <p className="text-center text-sm text-muted-foreground">
          Não tem conta? <Link href="/registro" className="font-medium underline">Criar agora</Link>
        </p>
      </div>
    </div>
  );
}
