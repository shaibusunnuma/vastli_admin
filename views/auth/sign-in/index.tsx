"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { useAuth } from "@/lib/AuthProvider";
import logger from "@/lib/logger";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export default function Login() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const router = useRouter();
  const { signIn } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { formState: { isSubmitting } } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const signInAttempt = await signIn.create(values);
      if (signInAttempt.status === "complete") {
        form.reset();
        router.push(callbackUrl);
      }
    } catch (error: any) {
      logger.error(error);
      const msg = error.message || "Something went wrong";
      toast.error(msg);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-balance text-sm text-muted-foreground">Enter your email below to login to your account</p>
        </div>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="email"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your vastli email" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between">
            <Button disabled={isSubmitting} type="submit">{isSubmitting ? "Logging in..." : "Login"}</Button>
            <button
              type="button"
              className="text-sm text-muted-foreground hover:underline ml-4"
              onClick={() => router.push("/forgot-password")}
            >
              Forgot password?
            </button>
          </div>
        </div>
      </form>
    </Form>
  );
}
