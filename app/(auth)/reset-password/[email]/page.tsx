import ResetPassword from "@/views/auth/reset-password";
import { use } from "react";

export default function ResetPasswordPage({ params }: { params: Promise<{ email: string }> }) {
  const { email } = use(params);
  const decodedEmail = decodeURIComponent(email);
  return <ResetPassword email={decodedEmail} />;
}
