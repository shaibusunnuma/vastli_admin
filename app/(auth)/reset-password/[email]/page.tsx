import ResetPassword from "@/views/auth/reset-password";

export default function ResetPasswordPage({ params }: { params: { email: string } }) {
  const decodedEmail = decodeURIComponent(params.email);
  return <ResetPassword email={decodedEmail} />;
}
