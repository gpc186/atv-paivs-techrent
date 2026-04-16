"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getSessionUser } from "@/lib/auth-storage";
import { getHomeByRole } from "@/lib/route-guard";
import { LogoIcon } from "@/components/logo";
import { Button } from "@/components/ui/button";
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
            <SidebarHeader className="p-3">
				<SidebarMenuButton asChild tooltip="Voltar para o painel" className="h-12 rounded-2xl bg-transparent shadow-none hover:bg-sidebar-accent/60 group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:shadow-none">
					<Link href={roleHome} className="flex min-w-0 items-center gap-3 group-data-[collapsible=icon]:justify-center">
						<div className="flex size-9 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-sm">
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
					<SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              asChild
              className="min-w-8 rounded-2xl bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/20 duration-300 ease-out hover:-translate-y-0.5 hover:text-primary-foreground hover:shadow-xl hover:shadow-primary/25 active:bg-primary/90 active:text-primary-foreground"
              tooltip={primaryAction.label}
            >
              <Link href={primaryAction.href}>
                {primaryAction.icon}
                <span>{primaryAction.label}</span>
              </Link>
            </SidebarMenuButton>
						<Button
              asChild
              aria-label="Ir para o inicio"
              className="size-8 rounded-2xl border-border/70 bg-card/70 shadow-sm group-data-[collapsible=icon]:opacity-0"
              size="icon"
              variant="outline"
            >
              <Link href={roleHome}>
                <HomeIcon />
                <span className="sr-only">Ir para o inicio</span>
              </Link>
            </Button>
					</SidebarMenuItem>
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
                                className="rounded-xl text-muted-foreground hover:text-foreground"
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
