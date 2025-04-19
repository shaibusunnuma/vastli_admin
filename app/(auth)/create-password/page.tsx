import CreatePassword from "@/views/auth/create-password";
import { use } from "react";

export default function CreatePasswordPage({ params }: { params: Promise<{ email: string }> }) {
  const { email } = use(params);
  return <CreatePassword email={email} />;
}
