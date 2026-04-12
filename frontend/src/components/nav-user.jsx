"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { clearSession, getSessionUser } from "@/lib/auth-storage";
import { getHomeByRole } from "@/lib/route-guard";
import { getRoleMeta } from "@/components/app-shared";
import { HomeIcon, LogOutIcon, ShieldIcon } from "lucide-react";

export function NavUser() {
  const router = useRouter();
  const user = getSessionUser();
  const role = user?.nivel_acesso || "cliente";
  const roleMeta = getRoleMeta(role);

  function handleLogout() {
    clearSession();
    router.replace("/login");
  }

	return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
				<button className="rounded-full outline-hidden ring-sidebar-ring transition focus-visible:ring-2">
          <Avatar className="size-8">
            <AvatarImage src="" />
            <AvatarFallback>{(user?.nome || "U").charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </button>
			</DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
				<div className="px-2 py-1.5">
          <div className="flex items-center gap-3">
            <Avatar className="size-10">
              <AvatarImage src="" />
              <AvatarFallback>{(user?.nome || "U").charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate font-medium text-foreground">{user?.nome || "Usuario"}</p>
              <p className="truncate text-xs text-muted-foreground">{user?.email || "Sem email"}</p>
              <p className="mt-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
                {roleMeta.label}
              </p>
            </div>
          </div>
        </div>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
          <DropdownMenuLabel>Atalhos</DropdownMenuLabel>
					<DropdownMenuItem asChild>
            <Link href={getHomeByRole(role)}>
              <HomeIcon />
              Ir para meu painel
            </Link>
          </DropdownMenuItem>
					<DropdownMenuItem asChild>
            <Link href="/unauthorized">
              <ShieldIcon />
              Ver pagina de acesso
            </Link>
          </DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem className="w-full cursor-pointer" onClick={handleLogout} variant="destructive">
						<LogOutIcon />
						Sair
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
        </DropdownMenu>
    );
}
