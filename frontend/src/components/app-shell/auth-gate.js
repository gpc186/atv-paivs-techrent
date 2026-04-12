"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getSessionUser, isAuthenticated } from "@/lib/auth-storage";
import { getHomeByRole, hasAccess, isPublicPath } from "@/lib/route-guard";

export default function AuthGate({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const auth = isAuthenticated();
  const user = getSessionUser();

  useEffect(() => {
    if (!auth && !isPublicPath(pathname)) {
      router.replace("/login");
      return;
    }

    if (auth && isPublicPath(pathname) && user?.nivel_acesso) {
      router.replace(getHomeByRole(user.nivel_acesso));
      return;
    }

    if (auth && !hasAccess(pathname, user?.nivel_acesso)) {
      router.replace("/unauthorized");
    }
  }, [auth, pathname, router, user?.nivel_acesso]);

  const shouldHide =
    (!auth && !isPublicPath(pathname)) ||
    (auth && isPublicPath(pathname) && Boolean(user?.nivel_acesso)) ||
    (auth && !hasAccess(pathname, user?.nivel_acesso));

  if (shouldHide) {
    return <div className="p-6 text-sm text-muted-foreground">Carregando...</div>;
  }

  return children;
}
