"use client";
import { Card, CardContent } from "@/shared/ui/card";
import { api } from "@@/convex/_generated/api";
import { useQuery } from "convex/react";
import Link from "next/link";

export default function BlogPage() {
  const data = useQuery(api.posts.getPosts);
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
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((post) => (
          <Card key={post._id}>
            <div className="relative h-48 w-full overflow-hidden">
              {/* <Image src="" alt={post.title} width={400} height={300} /> */}
            </div>
            <CardContent>
              <Link href={`/blog/${post._id}`}>
                <h1 className="text-2xl font-bold text-primary">
                  {post.title}
                </h1>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
