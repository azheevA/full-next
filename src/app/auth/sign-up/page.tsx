"use client";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/shared/api/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { authClient } from "@/shared/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type SignUpSchema = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const router = useRouter();
  const { control, handleSubmit } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignUpSchema) => {
    await authClient.signUp.email({
      email: data.email,
      name: data.name,
      password: data.password,
      fetchOptions: {
        onSuccess: () => {
          toast.success("Account created successfully");
          router.push("/");
          router.refresh();
        },
        onError: (e) => {
          toast.error(e.error.message);
        },
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create an account to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup className="space-y-4">
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Full Name</FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    placeholder="John Doe"
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
            <Button>Sign Up</Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignUp;
