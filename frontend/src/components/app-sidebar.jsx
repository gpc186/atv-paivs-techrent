"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getSessionUser } from "@/lib/auth-storage";
import { getHomeByRole } from "@/lib/route-guard";
import { LogoIcon } from "@/components/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavGroup } from "@/components/nav-group";
import { getFooterNavLinks, getNavGroups, getPrimaryAction, getRoleMeta } from "@/components/app-shared";
import { HomeIcon } from "lucide-react";

export function AppSidebar() {
  const pathname = usePathname();
  const user = getSessionUser();
  const role = user?.nivel_acesso || "cliente";
  const roleHome = getHomeByRole(role);
  const roleMeta = getRoleMeta(role);
  const navGroups = getNavGroups(role, pathname);
  const footerNavLinks = getFooterNavLinks(pathname);
  const primaryAction = getPrimaryAction(role);

  return (
    <Sidebar collapsible="icon" variant="floating" className="page-enter">
      <SidebarHeader>
        <SidebarMenuButton asChild tooltip="Voltar para o painel" className="h-12 rounded-lg bg-transparent shadow-none hover:bg-sidebar-accent group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:shadow-none">
          <Link href={roleHome} className="flex min-w-0 items-center gap-3 group-data-[collapsible=icon]:justify-center">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-white shadow-xs group-data-[collapsible=icon]:size-8">
              <LogoIcon className="block size-4 shrink-0" />
            </div>
            <div className="flex min-w-0 flex-col group-data-[collapsible=icon]:hidden">
              <span className="font-semibold tracking-tight">TechRent</span>
              <span className="truncate text-xs text-muted-foreground">{roleMeta.label}</span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="rounded-lg bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
                tooltip={primaryAction.label}
              >
                <Link href={primaryAction.href}>
                  {primaryAction.icon}
                  <span>{primaryAction.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem className="group-data-[collapsible=icon]:hidden">
              <SidebarMenuButton
                asChild
                className="rounded-lg border border-border bg-card shadow-xs"
                tooltip="Ir para o inicio"
              >
                <Link href={roleHome}>
                  <HomeIcon />
                  <span>Ir para o inicio</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        {navGroups.map((group, index) => (
          <NavGroup key={`sidebar-group-${index}`} {...group} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu className="mt-2">
          {footerNavLinks.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className="rounded-md text-muted-foreground hover:text-foreground"
                isActive={item.isActive}
                size="sm">
                <Link href={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

