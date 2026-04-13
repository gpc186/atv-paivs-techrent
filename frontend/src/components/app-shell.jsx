import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";

export function AppShell({
    children
}) {
	return (
        <SidebarProvider suppressHydrationWarning>
            <AppSidebar />
            <SidebarInset className="flex flex-col">
				<AppHeader />
				<main className="flex-1 overflow-y-auto p-4 md:p-6">
					{children}
				</main>
			</SidebarInset>
        </SidebarProvider>
    );
}
