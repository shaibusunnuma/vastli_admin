import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { useAuth } from "@/lib/AuthProvider";
import logger from "@/lib/logger";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const FormSchema = z.object({
  code: z.string().min(1, "Code is required"),
  password: z
    .string()
    .min(6, "Must be at least 8 characters in length")
    .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
    .regex(new RegExp(".*[a-z].*"), "One lowercase character")
    .regex(new RegExp(".*\\d.*"), "One number")
    .regex(new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"), "One special character"),
  confirmpassword: z
    .string()
    .min(6, "Must be at least 8 characters in length")
    .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
    .regex(new RegExp(".*[a-z].*"), "One lowercase character")
    .regex(new RegExp(".*\\d.*"), "One number")
    .regex(new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"), "One special character"),
});

type FormType = z.infer<typeof FormSchema>;

type Props = {
  email: string;
};

export default function CreatePassword({ email }: Props) {
  const { signIn } = useAuth();
  const { isLoading } = useAuth();

  const form = useForm<FormType>({
    resolver: zodResolver(FormSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: FormType) => {
    try {
      if (!email) return;
      const { code, password, confirmpassword } = data;
      if (password === confirmpassword) {
        const result = await signIn.attemptFirstFactor({
          strategy: "reset_password_email_code",
          code,
          password,
          email,
        });
        if (result?.status === "complete") {
          form.reset();
        } else {
          toast.error("Please use a different password from before");
        }
      } else {
        toast.error("Passwords do not match");
      }
    } catch (error: any) {
      logger.error(error);
      const msg = error.message || "Error resetting password";
      toast.error(msg);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-md mx-auto py-10">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Create your password</h1>
          <p className="text-balance text-sm text-muted-foreground">Set a strong password for your account</p>
        </div>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
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
          <FormField
            control={form.control}
            name="confirmpassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Confirm password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? "Creating..." : "Create Password"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
