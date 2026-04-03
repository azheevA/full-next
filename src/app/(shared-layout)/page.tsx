import Link from "next/link";
import { buttonVariants } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { Zap, Shield, ArrowRight, Globe, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-20 -right-4 w-96 h-96 bg-purple-500/10 rounded-full blur-[150px] -z-10" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />
      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="flex flex-col items-center text-center justify-center gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm font-medium rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-500 animate-in fade-in slide-in-from-bottom">
            <Sparkles className="size-4" />
            <span>Next Generation Blogging Platform</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/60">
            Write the Future with <br />
            Aura<span className="text-blue-500">Pro</span>
          </h1>

          <p className="max-w-2xl mx-auto text-xl text-muted-foreground mb-10 leading-relaxed">
            Immerse yourself in the world of high-performance blogging. A fast,
            secure, and stunningly beautiful interface for your thoughts.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/create"
              className={buttonVariants({
                size: "lg",
                className: "px-8 shadow-lg shadow-blue-500/25",
              })}
            >
              Get Started <ArrowRight className="ml-2 size-4" />
            </Link>
            <Link
              href="/blog"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "px-8 backdrop-blur-sm",
              })}
            >
              Read Articles
            </Link>
          </div>
        </div>
      </section>
      <section className="py-20 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="text-blue-500" />}
              title="Lightning Fast"
              description="Optimized performance utilizing Next.js App Router and Server Actions for instant delivery."
            />
            <FeatureCard
              icon={<Shield className="text-blue-500" />}
              title="Secure by Default"
              description="Advanced authentication and data protection keeping your publications safe at the core level."
            />
            <FeatureCard
              icon={<Globe className="text-blue-500" />}
              title="Global Reach"
              description="Your content is available anywhere in the world instantly thanks to high-performance Edge Runtime."
            />
          </div>
        </div>
      </section>
      <section className="py-20 border-t border-muted/50 ">
        <div className="flex justify-center px-4 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold mb-2">99.9%</h3>
              <p className="text-muted-foreground">Uptime</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">~100ms</h3>
              <p className="text-muted-foreground">Response Time</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">24/7</h3>
              <p className="text-muted-foreground">Convex Support</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">AI</h3>
              <p className="text-muted-foreground">Enhanced Content</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-24">
        <div className="flex justify-center px-4 mx-auto">
          <div className="relative p-12 rounded-3xl overflow-hidden border bg-card/50 backdrop-blur-md text-center">
            <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 via-transparent to-purple-500/10 -z-10" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to share your story?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Join a community of professionals and begin your journey in the
              modern tech world today.
            </p>
            <Link
              href="/create"
              className={buttonVariants({
                size: "lg",
                className: "rounded-full px-10",
              })}
            >
              Create Your First Post
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="group hover:border-blue-500/50 transition-all duration-300 bg-card/50 backdrop-blur-sm">
      <CardContent className="pt-6">
        <div className="size-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}
