import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbSeparator,
	BreadcrumbPage,
} from "@/components/ui/breadcrumb";

export function AppBreadcrumbs({
    page
}) {
	if (!page?.title) {
		return null;
	}

	return (
        <Breadcrumb>
            <BreadcrumbList>
				{page.section ? (
          <>
            <BreadcrumbItem className="hidden md:block">
              <span className="text-muted-foreground">{page.section}</span>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
          </>
        ) : null}
				<BreadcrumbItem>
					<BreadcrumbPage className="flex items-center gap-2 [&>svg]:size-3.5">
						{page.icon}
						{page.title}
					</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
        </Breadcrumb>
    );
}
