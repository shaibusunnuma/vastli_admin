import { User } from "./users";

export interface AuthUser extends User {
  accountId: string;
  imageUrl: string | null;
  inviter?: string;
}

export interface AuthState {
  isSignedIn: boolean;
  userId: string | null;
  user: AuthUser | null;
  isLoading: boolean;
}

export interface SignInParams {
  email: string;
  password: string;
}

export interface VerificationResource {
  status: "unverified" | "verified" | "transferable" | "failed" | "expired";
}

export interface UserResource extends AuthUser {
  update: (userData: Partial<AuthUser>) => Promise<void>;
  reload: () => Promise<void>;
}
