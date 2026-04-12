"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const MENU_BY_ROLE = {
  cliente: [
    { href: "/cliente/dashboard", label: "Dashboard" },
    { href: "/cliente/chamados", label: "Meus chamados" },
    { href: "/cliente/chamados/novo", label: "Novo chamado" },
  ],
  tecnico: [
    { href: "/tecnico/dashboard", label: "Dashboard" },
    { href: "/tecnico/fila", label: "Fila técnica" },
    { href: "/tecnico/manutencao", label: "Manutenções" },
    { href: "/tecnico/manutencao/nova", label: "Registrar manutenção" },
  ],
  admin: [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/equipamentos", label: "Equipamentos" },
    { href: "/cliente/chamados", label: "Chamados (visão cliente)" },
  ],
};

export default function AppSidebar({ role = "cliente" }) {
  const pathname = usePathname();
  const menuItems = MENU_BY_ROLE[role] || [];

  return (
    <aside className="w-full border-b border-border bg-card px-4 py-3 md:min-h-screen md:w-64 md:border-b-0 md:border-r">
      <p className="mb-4 text-lg font-semibold text-foreground">TechRent</p>
      <nav className="grid gap-2">
        {menuItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-md px-3 py-2 text-sm transition ${
                active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
