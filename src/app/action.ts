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
  try {
    const imageUrl = await fetchMutation(
      api.posts.generateImageUploadUrl,
      {},

      { token },
    );
    const uploadResult = await fetch(imageUrl, {
      method: "POST",
      headers: {
        "Content-Type": parsed.data.image.type,
      },
      body: parsed.data.image,
    });
    if (!uploadResult.ok) {
      return {
        error: new Error("Failed to upload image"),
      };
    }
    const { storageId } = await uploadResult.json();
    await fetchMutation(
      api.posts.createPost,
      {
        title: parsed.data.title,
        body: parsed.data.content,
        imageStorageId: storageId,
      },
      { token },
    );
  } catch (error) {
    console.error("Error creating post:", error);
    throw new Error("Failed to create post");
  }
}
