import { api } from "@@/convex/_generated/api";
import { Id } from "@@/convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/shared/ui/separator";
import { CommentSection } from "@/featuries/Comment/ui/CommentSection";
interface PostIdRouteProps {
  params: Promise<{
    postid: Id<"posts">;
  }>;
}

export default async function PostIdRoute({ params }: PostIdRouteProps) {
  const { postid } = await params;
  const post = await fetchQuery(api.posts.getPostById, { postId: postid });
  if (!post) {
    return (
      <div className="text-6xl font-extrabold text-red-600 py-20">
        Post not found
      </div>
    );
  }
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 animate-in fade-in duration-500 relative">
      <Link
        href="/blog"
        className="text-sm text-primary absolute top-4 left-4 mb-4"
      >
        &larr; Back to Blog
      </Link>
      <div className="relative w-full h-100 mb-8 rounded-xl overflow-hidden shadow-sm mt-6">
        <Image
          src={post.imageUrl || "/sky.jpg"}
          alt="Blog Post Image"
          fill
          unoptimized
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="space-y-4 flex flex-col">
        <h1 className="text-4xl font-bold mb-4 tracking-tight text-foreground">
          {post.title}
        </h1>
        <p className="text-sm text-muted-foreground">
          Posted on:{" "}
          {new Date(post._creationTime).toLocaleDateString("en-US", {
            day: "numeric",
            year: "numeric",
            month: "long",
          })}
        </p>
        <Separator className="my-4" />
        <p className=" text-lg leading-relaxed text-foreground/90">
          {post.body}
        </p>
        <Separator className="my-8" />
        <CommentSection />
      </div>
    </div>
  );
}
