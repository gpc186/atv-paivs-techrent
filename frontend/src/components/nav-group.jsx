import Link from "next/link";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ChevronRightIcon } from "lucide-react";

export function NavGroup({
    label,
    items
}) {
	return (
        <SidebarGroup>
            {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
            <SidebarMenu>
				{items.map((item) => (
					<Collapsible
                        asChild
                        className="group/collapsible"
                        defaultOpen={
							!!item.isActive ||
							item.subItems?.some((i) => !!i.isActive)
						}
                        key={item.title}>
						<SidebarMenuItem>
							{item.subItems?.length ? (
								<>
									<CollapsibleTrigger asChild>
										<SidebarMenuButton isActive={item.isActive} className={`transition-all duration-200 ${item.isActive ? 'bg-primary/10 border-l-4 border-l-primary' : 'hover:bg-muted'}`}>
											{item.icon}
											<span>{item.title}</span>
											<ChevronRightIcon
                                                className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
										</SidebarMenuButton>
									</CollapsibleTrigger>
									<CollapsibleContent>
										<SidebarMenuSub>
											{item.subItems?.map((subItem) => (
												<SidebarMenuSubItem key={subItem.title}>
													<SidebarMenuSubButton asChild isActive={subItem.isActive} className={`transition-all duration-200 ${subItem.isActive ? 'bg-primary/5 border-l-2 border-l-primary' : 'hover:bg-muted/50'}`}>
														<Link href={subItem.path}>
															{subItem.icon}
															<span>{subItem.title}</span>
														</Link>
													</SidebarMenuSubButton>
												</SidebarMenuSubItem>
											))}
										</SidebarMenuSub>
									</CollapsibleContent>
								</>
							) : (
								<SidebarMenuButton asChild isActive={item.isActive} className={`transition-all duration-200 ${item.isActive ? 'bg-primary/10 border-l-4 border-l-primary' : 'hover:bg-muted'}`}>
									<Link href={item.path}>
										{item.icon}
										<span>{item.title}</span>
									</Link>
								</SidebarMenuButton>
							)}
						</SidebarMenuItem>
					</Collapsible>
				))}
			</SidebarMenu>
        </SidebarGroup>
    );
}
