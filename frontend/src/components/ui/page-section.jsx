import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function PageSection({ title, description, children, className }) {
  return (
    <Card className={cn("page-enter", className)}>
      {(title || description) ? (
        <CardHeader className="border-b">
          {title ? <CardTitle>{title}</CardTitle> : null}
          {description ? <CardDescription>{description}</CardDescription> : null}
        </CardHeader>
      ) : null}
      <CardContent className="pt-5">{children}</CardContent>
    </Card>
  );
}
