import "./globals.css";
import AuthGate from "@/components/app-shell/auth-gate";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata = {
  title: "TechRent",
  description: "Sistema de chamados e manutencao de TI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className="antialiased" suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <AuthGate>
          <TooltipProvider>{children}</TooltipProvider>
        </AuthGate>
      </body>
    </html>
  );
}
