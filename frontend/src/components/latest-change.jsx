"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { getSessionUser } from "@/lib/auth-storage";
import { getPageInfo, getPrimaryAction, getRoleMeta } from "@/components/app-shared";
import { usePathname } from "next/navigation";

export function LatestChange() {
  const pathname = usePathname();
  const user = getSessionUser();
  const role = user?.nivel_acesso || "cliente";
  const roleMeta = getRoleMeta(role);
  const page = getPageInfo(pathname, role);
  const primaryAction = getPrimaryAction(role);

	return (
        <div
            className={cn(
                "min-h-27 relative flex size-full flex-col gap-1 overflow-hidden rounded-lg border bg-background px-4 pt-3 pb-3",
                "group/latest-change justify-center transition-opacity group-data-[collapsible=icon]:pointer-events-none group-data-[collapsible=icon]:opacity-0"
            )}>
            <span className="font-mono text-[10px] font-light text-muted-foreground">
				{roleMeta.label.toUpperCase()}
			</span>
            <p className="text-xs font-medium">{page.title}</p>
            <span className="text-[10px] text-muted-foreground">
				{roleMeta.description}
			</span>
            <Link
              className="mt-2 w-max text-xs font-light text-primary hover:underline"
              href={primaryAction.href}
            >
              {primaryAction.label}
            </Link>
        </div>
    );
}
