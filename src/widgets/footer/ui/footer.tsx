import Link from "next/link";
import { Mail, Sparkles } from "lucide-react";
import { FaGithub, FaDiscord, FaVk } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="relative border-t border-muted/50 bg-background/50 backdrop-blur-md overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 md:w-1/2 h-px bg-linear-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="flex items-center flex-col px-4 py-10 md:py-12 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 mb-10 md:mb-12 w-full">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="size-8 rounded-lg bg-blue-500 flex items-center justify-center group-hover:rotate-12 transition-transform">
                <Sparkles className="size-5 text-white" />
              </div>
              <span className="text-lg md:text-xl font-bold tracking-tight text-foreground">
                Aura<span className="text-blue-500">Pro</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Next-generation platform for those shaping the future. Write,
              share, and inspire within a high-performance environment.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h4 className="font-semibold mb-4 text-foreground">Navigation</h4>

              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/blog"
                    className="hover:text-blue-500 transition-colors"
                  >
                    All Posts
                  </Link>
                </li>
                <li>
                  <Link
                    href="/create"
                    className="hover:text-blue-500 transition-colors"
                  >
                    Create Post
                  </Link>
                </li>
                <li>
                  <Link
                    href="/auth/login"
                    className="hover:text-blue-500 transition-colors"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/auth/sign-up"
                    className="hover:text-blue-500 transition-colors"
                  >
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <div className="flex items-center md:items-end flex-col">
              <h4 className="font-semibold mb-4 text-foreground">Connect</h4>
              <div className="flex gap-4 mb-6 justify-center md:justify-end">
                <a
                  href="https://discord.gg/your-invite"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-muted/50 hover:bg-blue-500/10 hover:text-[#5865F2] transition-all border border-transparent hover:border-[#5865F2]/20"
                >
                  <FaDiscord className="size-5" />
                </a>
                <a
                  href="https://github.com/your-username"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-muted/50 hover:bg-blue-500/10 hover:text-foreground transition-all border border-transparent hover:border-foreground/10"
                >
                  <FaGithub className="size-5" />
                </a>
                <a
                  href="https://vk.com/ghostraven72"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-muted/50 hover:bg-blue-500/10 hover:text-[#0077FF] transition-all border border-transparent hover:border-[#0077FF]/20"
                >
                  <FaVk className="size-5" />
                </a>
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground bg-muted/30 p-2 md:p-3 rounded-xl border border-muted/50 w-fit">
                <Mail className="size-4 text-blue-500" />
                <span className="break-all">sazheev@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 md:pt-8 border-t border-muted/30 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-muted-foreground w-full">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} AuraPro. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-1 text-center">
            <span>Built with</span>
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-blue-500 font-medium"
            >
              Next.js
            </a>
            <span className="mx-1 text-muted-foreground/50">&</span>
            <a
              href="https://convex.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-blue-500 font-medium"
            >
              Convex
            </a>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-10 -left-10 w-32 md:w-40 h-32 md:h-40 bg-blue-500/5 rounded-full blur-3xl -z-10" />
    </footer>
  );
}
