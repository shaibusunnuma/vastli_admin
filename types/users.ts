export enum UserRole {
  CUSTOMER = "CUSTOMER",
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  SERVER = "SERVER",
}
export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  DELETED = "DELETED",
  BANNED = "BANNED",
  PENDING = "PENDING",
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  restaurantId: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  primaryEmailAddress: EmailAddress;
  primaryPhoneNumber: PhoneNumber;
  emailAddresses: EmailAddress[];
  phoneNumbers: PhoneNumber[];
  createdAt?: string;
  updatedAt?: string;
}

export interface EmailAddress {
  emailAddress: string;
  verified: boolean;
}
export interface PhoneNumber {
  phoneNumber: string;
  verified: boolean;
}

export interface Operator extends User {
  accountId: string;
  imageUrl: string | null;
  inviter?: string;
}

export interface Customer extends User {
  visits: number;
  lastVisit: string;
  reservations?: number;
  lastActive?: string;
  imageUrl?: string;
  restaurants?: string[];
}

export interface CustomerStats {
  total: number;
  statusCounts: Record<string, number>;
  newCustomers: {
    today: number;
    last7Days: number;
    last30Days: number;
  };
  loginStats: {
    loggedInLast7Days: number;
    neverLoggedIn: number;
  };
  generatedAt: Date;
}
export interface Server extends User {}

interface PaginationMetadata {
  total: number;
  page: number;
  lastPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface UserResponse<T> {
  data: T[];
  metadata: PaginationMetadata;
}
