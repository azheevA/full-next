"use client";
import { blogSchema } from "@/shared/api/blog";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { api } from "@@/convex/_generated/api";

export default function CreatePage() {
  const mutation = useMutation(api.posts.createPost);
  type BlogSchema = z.infer<typeof blogSchema>;
  const { control, handleSubmit } = useForm<BlogSchema>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });
  function onSubmit(values: BlogSchema) {
    mutation({ title: values.title, body: values.content });
  }
  return (
    <div className="py-12 ">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Create Post
        </h1>
        <p className="text-xl text-muted-foreground pt-4">
          Share your thoughts the big world
        </p>
      </div>
      <Card className="w-full max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Create Blog Article</CardTitle>
          <CardDescription>Create a new blog article</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="title"
                control={control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Title</FieldLabel>
                    <Input
                      aria-invalid={fieldState.invalid}
                      placeholder="Title of article"
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
              <Controller
                name="content"
                control={control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Content</FieldLabel>
                    <Textarea
                      aria-invalid={fieldState.invalid}
                      placeholder="We can write article"
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
              <Button>Create Post</Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
