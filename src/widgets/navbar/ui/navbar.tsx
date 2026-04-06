"use client";
import { SearchInput } from "@/featuries/GlobalSearch/ui/SearchInput";
import { authClient } from "@/shared/lib/auth-client";
import { Button, buttonVariants } from "@/shared/ui/button";
import { ThemeToggle } from "@/shared/ui/theme-toggle";
import { useConvexAuth } from "convex/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const NavBar = ({ hasToken }: { hasToken: boolean }) => {
  const router = useRouter();

  const { isLoading } = useConvexAuth();
  return (
    <nav className="w-full py-5 flex items-center justify-between relative">
      <div className="flex items-center gap-8">
        <Link href="/">
          <h1 className="text-3xl font-bold">
            Aura<span className="text-blue-500">Pro</span>
          </h1>
        </Link>

        <div className="flex items-center gap-8">
          <Link className={buttonVariants({ variant: "ghost" })} href="/">
            Home
          </Link>
          <Link className={buttonVariants({ variant: "ghost" })} href="/blog">
            Blog
          </Link>
          <Link className={buttonVariants({ variant: "ghost" })} href="/create">
            Create
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="hidden md:block mr-2">
          <SearchInput />
        </div>
        {isLoading ? null : hasToken ? (
          <Button
            onClick={() =>
              authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    toast.success("Logged out successfully");
                    router.refresh();
                  },
                  onError: (e) => {
                    toast.error(e.error.message);
                  },
                },
              })
            }
          >
            Logout
          </Button>
        ) : (
          <>
            <Link
              className={buttonVariants({ variant: "default" })}
              href="/auth/sign-up"
            >
              Sign Up
            </Link>
            <Link
              className={buttonVariants({ variant: "secondary" })}
              href="/auth/login"
            >
              Login
            </Link>
          </>
        )}

        <ThemeToggle />
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 md:w-1/2 h-px bg-linear-to-r from-transparent via-blue-500/50 to-transparent" />
    </nav>
  );
};
export default NavBar;
