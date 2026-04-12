import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthGate from "@/components/app-shell/auth-gate";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TechRent",
  description: "Sistema de chamados e manutenção de TI",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AuthGate>{children}</AuthGate>
      </body>
    </html>
  );
}
