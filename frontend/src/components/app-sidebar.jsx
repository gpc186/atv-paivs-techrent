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
import { getFooterNavLinks, getNavGroups, getPrimaryAction } from "@/components/app-shared";
import { LatestChange } from "@/components/latest-change";
import { HomeIcon } from "lucide-react";

export function AppSidebar() {
  const pathname = usePathname();
  const user = getSessionUser();
  const role = user?.nivel_acesso || "cliente";
  const roleHome = getHomeByRole(role);
  const navGroups = getNavGroups(role, pathname);
  const footerNavLinks = getFooterNavLinks(pathname);
  const primaryAction = getPrimaryAction(role);

	return (
        <Sidebar collapsible="icon" variant="floating">
            <SidebarHeader className="h-14 justify-center">
				<SidebarMenuButton asChild tooltip="Voltar para o painel">
					<Link href={roleHome}>
						<LogoIcon />
						<span className="font-medium">TechRent</span>
					</Link>
				</SidebarMenuButton>
			</SidebarHeader>
            <SidebarContent>
				<SidebarGroup>
					<SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              asChild
              className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
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
              className="size-8 group-data-[collapsible=icon]:opacity-0"
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
				<LatestChange />
				<SidebarMenu className="mt-2">
					{footerNavLinks.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton
                                asChild
                                className="text-muted-foreground"
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
