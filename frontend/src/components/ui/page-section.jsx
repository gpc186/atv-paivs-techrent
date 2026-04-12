export default function PageSection({ title, description, children }) {
  return (
    <section className="rounded-2xl border border-border/80 bg-card/95 p-5 shadow-sm backdrop-blur-sm">
      <h2 className="text-lg font-semibold text-card-foreground">{title}</h2>
      {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
      <div className="mt-4">{children}</div>
    </section>
  );
}
