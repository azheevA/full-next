import { api } from "@@/convex/_generated/api";
import { Id } from "@@/convex/_generated/dataModel";
import { fetchQuery, preloadQuery } from "convex/nextjs";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/shared/ui/separator";
import { CommentSection } from "@/featuries/Comment/ui/CommentSection";
import { Metadata } from "next";
interface PostIdRouteProps {
  params: Promise<{
    postId: Id<"posts">;
  }>;
}

export async function generateMetadata({
  params,
}: PostIdRouteProps): Promise<Metadata> {
  const { postId } = await params;
  if (!postId) return {};

  const post = await fetchQuery(api.posts.getPostById, { postId });

  if (!post) {
    return {
      title: "Post not found",
    };
  }
  return {
    title: post.title,
    description: post.body.slice(0, 160),
    openGraph: {
      title: post.title,
      description: post.body.slice(0, 160),
      images: post.imageUrl
        ? [
            {
              url: post.imageUrl,
              alt: post.title,
            },
          ]
        : undefined,
    },
  };
}

export default async function PostIdRoute({ params }: PostIdRouteProps) {
  const { postId } = await params;
  if (!postId) return <div>Invalid post ID</div>;
  const [post, preloadedComments] = await Promise.all([
    fetchQuery(api.posts.getPostById, { postId }),
    preloadQuery(api.comments.getCommentsbyPostId, { postId }),
  ]);

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
        <CommentSection preloadedComments={preloadedComments} />
      </div>
    </div>
  );
}
