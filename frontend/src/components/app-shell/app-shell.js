"use client";

import { getSessionUser } from "@/lib/auth-storage";
import AppHeader from "@/components/app-shell/app-header";
import AppSidebar from "@/components/app-shell/app-sidebar";

export default function AppShell({ children }) {
  const user = getSessionUser();

  return (
    <div className="min-h-screen bg-muted/30 md:flex">
      <AppSidebar role={user?.nivel_acesso} />
      <div className="flex min-h-screen flex-1 flex-col">
        <AppHeader user={user} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
