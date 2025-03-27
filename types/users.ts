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
  createdAt?: string;
  updatedAt?: string;
}

export interface Customer extends User {
  visits: number;
  lastVisit: string;
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
