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

export default function BlogPage() {
  // const data = useQuery(api.posts.getPosts);
  // const data = await fetchQuery(api.posts.getPosts);

  return (
    <div className="py-12">
      <div className="text-center pb-12">
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
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const data = await fetchQuery(api.posts.getPosts);
  console.log("FIRST POST URL:", data[0]?.imageUrl);
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
