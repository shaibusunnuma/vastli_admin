import { User } from "./users";

export interface AuthUser extends User {
  accountId: string;
  imageUrl: string | null;
  inviter?: string;
  primaryEmailAddress?: EmailAddress;
  primaryPhoneNumber?: PhoneNumber;
  emailAddresses: EmailAddress[];
  phoneNumbers: PhoneNumber[];
}

export interface ExtendedUser extends AuthUser {
  primaryEmailAddress?: EmailAddressResource;
  primaryPhoneNumber?: PhoneNumberResource;
  emailAddresses: EmailAddressResource[];
  phoneNumbers: PhoneNumberResource[];
}

export interface EmailAddress {
  emailAddress: string;
  verified: boolean;
}
export interface PhoneNumber {
  phoneNumber: string;
  verified: boolean;
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

export interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
}

export interface EmailVerificationParams {
  strategy: VerificationStrategy;
}

export type VerificationStrategy = "email_code" | "sms_code";

export interface VerificationAttemptParams {
  code: string;
}

export interface VerificationResource {
  status: "unverified" | "verified" | "transferable" | "failed" | "expired";
}

export interface SignUpResponse {
  id: string;
  status: "pending_verification" | "complete";
  prepareEmailVerification: (params: EmailVerificationParams) => Promise<void>;
}

export interface IdenfierReturn {
  resource: EmailAddress | PhoneNumber;
  verification: VerificationResource;
  status: "pending" | "sent" | "complete";
}

export interface EmailAddressResource extends EmailAddress {
  verification: VerificationResource;
  prepareVerification: (strategy: VerificationStrategy) => Promise<IdenfierReturn>;
  attemptVerification: ({ code }: { code: string }) => Promise<EmailAddressResource>;
  destroy: () => Promise<void>;
}
export interface PhoneNumberResource extends PhoneNumber {
  status: "pending" | "sent" | "complete";
  verification: VerificationResource;
  prepareVerification: (strategy: VerificationStrategy) => Promise<PhoneNumberResource>;
  attemptVerification: ({ code }: { code: string }) => Promise<PhoneNumberResource>;
  destroy: () => Promise<void>;
}

export interface UserResource extends ExtendedUser {
  createPhoneNumber: (phone: string) => Promise<PhoneNumberResource>;
  createEmailAddress: (email: string) => Promise<EmailAddressResource>;
  update: (userData: Partial<AuthUser>) => Promise<void>;
  reload: () => Promise<void>;
  setProfileImage: (imageFile: string | File) => Promise<void>;
  removeProfileImage: () => Promise<void>;
  createPassKey: () => Promise<void>;
}
