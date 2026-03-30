"use server";

import { blogSchema } from "@/shared/api/blog";
import { getToken } from "@/shared/lib/auth-server";
import { api } from "@@/convex/_generated/api";
import { fetchMutation } from "convex/nextjs";
import z from "zod";

export async function createBlogAction(values: z.infer<typeof blogSchema>) {
  const parsed = blogSchema.safeParse(values);
  if (!parsed.success) {
    throw new Error("something went wrong");
  }

  const token = await getToken();

  await fetchMutation(
    api.posts.createPost,
    {
      title: parsed.data.title,
      body: parsed.data.content,
    },
    { token },
  );
}
