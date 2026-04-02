import { ConvexClientProvider } from "@/shared/api/ConvexClientProvider";
import { getToken } from "@/shared/lib/auth-server";

export async function ConvexClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = await getToken();

  return (
    <ConvexClientProvider initialToken={token}>{children}</ConvexClientProvider>
  );
}
