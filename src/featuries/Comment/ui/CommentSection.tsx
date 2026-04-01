"use client";
import { commentSchema } from "@/shared/api/comment";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Field, FieldError, FieldLabel } from "@/shared/ui/field";

import { Textarea } from "@/shared/ui/textarea";
import { api } from "@@/convex/_generated/api";
import { Id } from "@@/convex/_generated/dataModel";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { Loader2, MessageSquare } from "lucide-react";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export function CommentSection() {
  const params = useParams<{ postId: Id<"posts"> }>();
  const [isPending, startTransition] = useTransition();
  const createComment = useMutation(api.comments.createComment);
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
  return (
    <Card>
      <CardHeader className=" flex flex-row items-center gap-2 border-b">
        <MessageSquare className="size-5" />
        <h2 className="text-xl font-bold">Comments</h2>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}
