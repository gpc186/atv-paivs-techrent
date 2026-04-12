"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { getSessionUser } from "@/lib/auth-storage";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AppBreadcrumbs } from "@/components/app-breadcrumbs";
import { CustomSidebarTrigger } from "@/components/custom-sidebar-trigger";
import { getPageInfo } from "@/components/app-shared";
import { NavUser } from "@/components/nav-user";
import { BellIcon } from "lucide-react";

export function AppHeader() {
  const pathname = usePathname();
  const user = getSessionUser();
  const page = getPageInfo(pathname, user?.nivel_acesso);

	return (
        <header
            className={cn("mb-6 flex items-center justify-between gap-2 px-4 md:px-2")}>
            <div className="flex items-center gap-3">
				<CustomSidebarTrigger />
				<Separator
                    className="mr-2 h-4 data-[orientation=vertical]:self-center"
                    orientation="vertical" />
				<AppBreadcrumbs page={page} />
			</div>
            <div className="flex items-center gap-3">
				<Button aria-label="Notifications" size="icon" variant="ghost">
					<BellIcon />
				</Button>
				<Separator
                    className="h-4 data-[orientation=vertical]:self-center"
                    orientation="vertical" />
				<NavUser />
			</div>
        </header>
    );
}
