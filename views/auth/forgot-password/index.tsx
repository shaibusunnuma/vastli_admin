"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/AuthProvider";
import logger from "@/lib/logger";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Schema = z.object({
  email: z.string().min(1, "Email is required").email(),
});

type SchemaType = z.infer<typeof Schema>;

export const ForgotPassword = () => {
  const router = useRouter();
  const { signIn } = useAuth();
  const form = useForm<SchemaType>({
    resolver: zodResolver(Schema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: SchemaType) => {
    try {
      const { email } = data;
      await signIn.prepareFirstFactor({
        email,
      });
      router.push(`/reset-password/${email}`);
    } catch (error: any) {
      logger.error(error);
      const msg = error.message || "Error sending code";
      toast.error(msg);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Forgot Password?</h1>
          <p className="text-balance text-sm text-muted-foreground">Enter your email below to reset your password</p>
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

          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? "Submitting..." : "Send Code"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
