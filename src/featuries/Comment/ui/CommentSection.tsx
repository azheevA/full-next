"use client";
import { commentSchema } from "@/shared/api/comment";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Field, FieldError, FieldLabel } from "@/shared/ui/field";
import { Separator } from "@/shared/ui/separator";

import { Textarea } from "@/shared/ui/textarea";
import { api } from "@@/convex/_generated/api";
import { Id } from "@@/convex/_generated/dataModel";
import { zodResolver } from "@hookform/resolvers/zod";
import { Preloaded, usePreloadedQuery, useMutation } from "convex/react";
import { Loader2, MessageSquare } from "lucide-react";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

// interface ICommentProps {
//   comments: {
//     _id: Id<"comments">;
//     _creationTime: number;
//     body: string;
//     authorId: string;
//     postId: Id<"posts">;
//     authorName: string;
//   }[];
// }

export function CommentSection(props: {
  preloadedComments: Preloaded<typeof api.comments.getCommentsbyPostId>;
}) {
  const params = useParams<{ postId: Id<"posts"> }>();
  const [isPending, startTransition] = useTransition();
  const createComment = useMutation(api.comments.createComment);
  const commentsById = usePreloadedQuery(props.preloadedComments);

  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      postId: params.postId,
      body: "",
    },
  });
  async function onSubmit(data: z.infer<typeof commentSchema>) {
    startTransition(async () => {
      console.log("SUBMIT DATA:", data);
      try {
        await createComment({ body: data.body, postId: params.postId });
        toast.success("Comment created successfully");
        reset({ body: "", postId: params.postId });
      } catch {
        toast.error("Something went wrong");
      }
    });
  }

  if (commentsById === undefined) {
    return <p>loading...</p>;
  }
  return (
    <Card>
      <CardHeader className=" flex flex-row items-center gap-2 border-b">
        <MessageSquare className="size-5" />
        <h2 className="text-xl font-bold">{commentsById.length} comments</h2>
      </CardHeader>
      <CardContent className="space-y-8">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="body"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Create Comment</FieldLabel>
                <Textarea
                  aria-invalid={fieldState.invalid}
                  placeholder="Share your thoughts..."
                  {...field}
                />
                {fieldState.error && (
                  <FieldError
                    errors={[{ message: fieldState.error.message }]}
                  />
                )}
              </Field>
            )}
          />
          <Button disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Loading ...</span>
              </>
            ) : (
              <span>Post Comment</span>
            )}
          </Button>
        </form>
        {/* {JSON.stringify(data)} */}
        <Separator className="" />
        {commentsById.length === 0 ? (
          <p className="text-lg flex items-center justify-center  text-muted-foreground pb-3">
            No comments . . .
          </p>
        ) : (
          <section className="space-y-6 p-6">
            {commentsById?.map((comment) => (
              <div key={comment._id} className="flex gap-4">
                <Avatar className="size-10 shrink-0">
                  <AvatarImage
                    src={`https://avatar.vercel.sh/rauchg?${comment.authorName}`}
                    alt={comment.authorName}
                  />
                  <AvatarFallback>
                    {comment.authorName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm">
                      {comment.authorName}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {new Date(comment._creationTime).toLocaleDateString(
                        "en-US",
                        {
                          day: "numeric",
                          year: "numeric",
                          month: "long",
                        },
                      )}
                    </p>
                  </div>
                  <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">
                    {comment.body}
                  </p>
                </div>
              </div>
            ))}
          </section>
        )}
      </CardContent>
    </Card>
  );
}
