import { isAuthenticated } from "@/shared/lib/auth-server";
import NavBar from "@/widgets/navbar/ui/navbar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const hasToken = await isAuthenticated();

  return (
    <div>
      <NavBar hasToken={!!hasToken} />
      {children}
    </div>
  );
}
