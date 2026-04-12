import AppShell from "@/components/app-shell/app-shell";

export default function ProtectedLayout({ children }) {
  return <AppShell>{children}</AppShell>;
}
