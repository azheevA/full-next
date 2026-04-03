// "use client";
import { buttonVariants } from "@/shared/ui/button";
import { Card, CardContent, CardFooter } from "@/shared/ui/card";
// import { api } from "@@/convex/_generated/api";
// import { useQuery } from "convex/react";
import Link from "next/link";
import Image from "next/image";
import { fetchQuery } from "convex/nextjs";
import { api } from "@@/convex/_generated/api";
import { Suspense } from "react";
import { Skeleton } from "@/shared/ui/skeleton";
import { Metadata } from "next";
import { connection } from "next/server";
// import { cacheLife, cacheTag } from "next/cache";

// export const dynamic = "force-static";
// export const revalidate = 30;
export const metadata: Metadata = {
  title: "Blog",
  description: "Insights, thoughts, and trends from our team",
  category: "Web development",
  authors: [{ name: "Azheev Alexandr" }],
};

export default function BlogPage() {
  // const data = useQuery(api.posts.getPosts);
  // const data = await fetchQuery(api.posts.getPosts);

  return (
    <div className="py-12">
      <div className="text-center pb-12 ">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Blog
        </h1>
        <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
          Insights, thoughts, and trends from our team
        </p>
      </div>
      <Suspense fallback={<SkeletonFunction />}>
        <LoadBlogList />
      </Suspense>
    </div>
  );
}

async function LoadBlogList() {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  // "use cache";
  // cacheLife("hours");
  // cacheTag("blog");
  // cacheLife({
  //   stale: 3600,
  //   revalidate: 7200,
  //   expire: 86400,
  // });
  await connection();
  const data = await fetchQuery(api.posts.getPosts);

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Link href="/create" className="group flex flex-col items-center">
          <div className="bg-primary/10 rounded-full p-4 mb-4 transition-colors group-hover:bg-primary/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12 text-primary"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>

          <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
            No posts found
          </h3>
        </Link>

        <p className="text-muted-foreground mt-3 mb-8 max-w-sm mx-auto text-lg">
          The blog is currently empty. Be the first to share your thoughts with
          the world!
        </p>
      </div>
    );
  }
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data?.map((post) => (
        <Card key={post._id} className="pt-0">
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={post.imageUrl || "/sky.jpg"}
              alt={post.title}
              fill
              unoptimized
              className="rounded-t-lg object-cover"
            />
          </div>
          <CardContent>
            <Link href={`/blog/${post._id}`}>
              <h1 className="text-2xl font-bold text-primary">{post.title}</h1>
            </Link>
            <p className="text-muted-foreground line-clamp-1">{post.body}</p>
          </CardContent>
          <CardFooter>
            <Link
              href={`/blog/${post._id}`}
              className={buttonVariants({ variant: "link" })}
            >
              Read more
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

function SkeletonFunction() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="pt-0">
          <div className="flex flex-col space-y-3 ">
            <Skeleton className="h-48 w-full rounded-xl" />
            <div className="space-y-2 flex flex-col">
              <Skeleton className="h-6 w-3/4 rounded-xl" />
              <Skeleton className="h-4 w-full rounded-xl" />
            </div>
            <div className="flex items-center justify-start">
              <Skeleton className="h-6 w-20 rounded-xl" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
