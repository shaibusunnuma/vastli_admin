export interface Reservation {
  id: string;
  userId?: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  restaurantId: string;
  bookingDateTime: string;
  dietaryRestrictions?: string[];
  specialRequirements?: string;
  status: ReservationStatus;
  spend?: number;
  numberOfGuests: number;
  assignedTableId?: string;
  serverId?: string;
  checkInTime?: string;
  checkOutTime?: string;
}

export enum PERIOD {
  DAY = "DAY",
  WEEK = "WEEK",
  MONTH = "MONTH",
}

export enum ReservationStatus {
  PENDING = "PENDING",
  WAITLISTED = "WAITLISTED",
  CONFIRMED = "CONFIRMED",
  SEATED = "SEATED",
  SERVED = "SERVED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  NO_SHOW = "NO_SHOW",
}

interface PaginationMetadata {
  total: number;
  page: number;
  lastPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface BookingsResponse {
  data: Reservation[];
  metadata: PaginationMetadata;
}
