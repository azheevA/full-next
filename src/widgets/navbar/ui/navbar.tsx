import { buttonVariants } from "@/shared/ui/button";
import { ThemeToggle } from "@/shared/ui/theme-toggle";
import Link from "next/link";

function NavBar() {
  return (
    <nav className="w-full py-5 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link href="/">
          <h1 className="text-3xl font-bold">
            Next<span className="text-blue-500">Pro</span>
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
        <ThemeToggle />
      </div>
    </nav>
  );
}

export default NavBar;
