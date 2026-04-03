"use client";
import { signInSchema } from "@/shared/api/auth";
import { authClient } from "@/shared/lib/auth-client";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const Login = () => {
  const [isPending, startTransition] = useTransition();
  const hasShownToast = useRef(false);
  const searchParams = useSearchParams();
  type signInSchema = z.infer<typeof signInSchema>;
  const { control, handleSubmit } = useForm<signInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const onSubmit = (data: signInSchema) => {
    startTransition(async () => {
      await authClient.signIn.email({
        email: data.email,
        password: data.password,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logged in successfully");
            router.push("/");
            router.refresh();
          },
          onError: (e) => {
            toast.error(e.error.message);
          },
        },
      });
    });
  };

  useEffect(() => {
    const error = searchParams.get("error");

    if (error === "unauthorized" && !hasShownToast.current) {
      toast.error("Session expired or you must be logged in", {
        classNames: {
          toast: "bg-red-50 border-red-200",
          title: "text-red-600",
          icon: "text-red-600",
        },
      });
      hasShownToast.current = true;
    }
  }, [searchParams]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Login on your account to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup className="space-y-4">
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    placeholder="your@gmail.com"
                    type="email"
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
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Password</FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    placeholder="*****"
                    type="password"
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
                <span>Login</span>
              )}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;
